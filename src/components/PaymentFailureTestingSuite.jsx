import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Error as ErrorIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import PaymentForm from './PaymentForm';
import PaymentFailureDashboard from './PaymentFailureDashboard';
import { paymentFailureTracker } from '../analytics/paymentFailureTracker';

const PaymentFailureTestingSuite = () => {
  const [testingActive, setTestingActive] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [failureCount, setFailureCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  // Test subscription plans
  const testPlans = [
    {
      name: 'Basic Plan',
      price: 19.99,
      duration: 'month',
      description: 'Essential shorthand training'
    },
    {
      name: 'Professional Plan',
      price: 49.99,
      duration: 'month',
      description: 'Advanced features + AI assistance'
    },
    {
      name: 'Enterprise Plan',
      price: 199.99,
      duration: 'year',
      description: 'Full institutional access'
    }
  ];

  // Simulated failure scenarios for testing
  const failureScenarios = [
    {
      name: 'Card Declined',
      errorCode: 'CARD_DECLINED',
      errorMessage: 'Your card was declined by the bank',
      isRetryable: true,
      priority: 'high'
    },
    {
      name: 'Network Timeout',
      errorCode: 'NETWORK_TIMEOUT',
      errorMessage: 'Network connection timed out during processing',
      isRetryable: true,
      priority: 'medium'
    },
    {
      name: 'Invalid Card Details',
      errorCode: 'VALIDATION_ERROR',
      errorMessage: 'Invalid card number or CVV provided',
      isRetryable: true,
      priority: 'low'
    },
    {
      name: 'System Error',
      errorCode: 'SYSTEM_ERROR',
      errorMessage: 'Internal server error occurred',
      isRetryable: false,
      priority: 'high'
    },
    {
      name: 'Insufficient Funds',
      errorCode: 'INSUFFICIENT_FUNDS',
      errorMessage: 'Insufficient funds available on card',
      isRetryable: true,
      priority: 'medium'
    }
  ];

  // Run automated testing suite
  const runFailureTests = async () => {
    setTestingActive(true);
    setTestResults([]);
    setFailureCount(0);
    setSuccessCount(0);

    for (let i = 0; i < failureScenarios.length; i++) {
      const scenario = failureScenarios[i];
      const plan = testPlans[i % testPlans.length];
      
      setCurrentTest(`Testing: ${scenario.name}`);
      
      // Simulate payment attempt
      const userInfo = {
        userId: `test_user_${i}`,
        email: `testuser${i}@example.com`,
        name: `Test User ${i}`,
        isExistingCustomer: Math.random() > 0.5,
        customerLTV: Math.floor(Math.random() * 1000)
      };

      // Track payment attempt
      const attemptId = paymentFailureTracker.trackPaymentAttempt(userInfo, {
        plan: plan.name,
        price: plan.price,
        duration: plan.duration,
        paymentMethod: 'credit_card'
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Simulate failure
      const failureData = paymentFailureTracker.trackPaymentFailure(attemptId, {
        type: 'simulated_test_failure',
        errorCode: scenario.errorCode,
        errorMessage: scenario.errorMessage,
        isRetryable: scenario.isRetryable,
        networkLatency: Math.floor(Math.random() * 1000),
        cardLastFour: '1234',
        cardType: 'Visa',
        validationErrors: scenario.errorCode === 'VALIDATION_ERROR' ? ['invalid_card_number'] : [],
        customerLTV: userInfo.customerLTV,
        isExistingCustomer: userInfo.isExistingCustomer
      });

      const testResult = {
        id: attemptId,
        scenario: scenario.name,
        plan: plan.name,
        user: userInfo.email,
        errorCode: scenario.errorCode,
        priority: scenario.priority,
        revenueImpact: plan.price,
        timestamp: new Date().toISOString(),
        status: 'failed'
      };

      setTestResults(prev => [...prev, testResult]);
      setFailureCount(prev => prev + 1);

      // 30% chance of successful retry for retryable failures
      if (scenario.isRetryable && Math.random() < 0.3) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        paymentFailureTracker.trackPaymentSuccess(attemptId, {
          transactionId: `txn_${Date.now()}`,
          amountCharged: plan.price,
          gatewayFees: plan.price * 0.029
        });

        setTestResults(prev => prev.map(result => 
          result.id === attemptId 
            ? { ...result, status: 'recovered' }
            : result
        ));
        setSuccessCount(prev => prev + 1);
      }
    }

    setCurrentTest(null);
    setTestingActive(false);
  };

  // Clear test data
  const clearTestData = () => {
    // Clear localStorage test data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('payment_failure_') || key.startsWith('payment_attempt_'))) {
        localStorage.removeItem(key);
        i--; // Adjust index since localStorage.length decreased
      }
    }
    
    setTestResults([]);
    setFailureCount(0);
    setSuccessCount(0);
  };

  // Generate failure analytics report
  const generateReport = () => {
    const report = paymentFailureTracker.generateFailureReport();
    console.log('Payment Failure Report:', report);
    
    // Download report as JSON
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-failure-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        💳 Payment Failure Testing & Monitoring System
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          🧪 Testing Environment Active
        </Typography>
        This testing suite simulates real payment failures to demonstrate the comprehensive 
        tracking and recovery system. All test data is clearly marked and can be cleared.
      </Alert>

      {/* Testing Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Automated Failure Testing
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayIcon />}
                onClick={runFailureTests}
                disabled={testingActive}
              >
                Run Failure Test Suite
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                variant="outlined"
                onClick={clearTestData}
                disabled={testingActive}
              >
                Clear Test Data
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={generateReport}
              >
                Generate Analytics Report
              </Button>
            </Grid>
          </Grid>

          {testingActive && (
            <Box mt={2}>
              <Typography variant="body2" gutterBottom>
                {currentTest || 'Initializing test suite...'}
              </Typography>
              <LinearProgress />
            </Box>
          )}

          {testResults.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Test Results Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <ErrorIcon color="error" sx={{ fontSize: 40 }} />
                      <Typography variant="h4">{failureCount}</Typography>
                      <Typography variant="body2">Payment Failures</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <SuccessIcon color="success" sx={{ fontSize: 40 }} />
                      <Typography variant="h4">{successCount}</Typography>
                      <Typography variant="body2">Recoveries</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TimelineIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h4">
                        {failureCount > 0 ? Math.round((successCount / failureCount) * 100) : 0}%
                      </Typography>
                      <Typography variant="body2">Recovery Rate</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Test Results Detail */}
      {testResults.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Detailed Test Results
            </Typography>
            
            <List>
              {testResults.map((result, index) => (
                <React.Fragment key={result.id}>
                  <ListItem>
                    <ListItemIcon>
                      {result.status === 'recovered' ? (
                        <SuccessIcon color="success" />
                      ) : (
                        <ErrorIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography>{result.scenario}</Typography>
                          <Chip 
                            label={result.priority} 
                            color={
                              result.priority === 'high' ? 'error' :
                              result.priority === 'medium' ? 'warning' : 'info'
                            }
                            size="small"
                          />
                          <Chip 
                            label={result.status} 
                            color={result.status === 'recovered' ? 'success' : 'error'}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {result.user} • {result.plan} • ${result.revenueImpact} • {result.errorCode}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < testResults.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Live Payment Form for Manual Testing */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Manual Payment Testing
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Test the payment form manually. This will simulate random success/failure outcomes 
            with comprehensive tracking of each attempt.
          </Typography>
          
          <PaymentForm
            subscriptionPlan={testPlans[0]}
            onPaymentSuccess={(result) => {
              console.log('Payment succeeded:', result);
            }}
            onPaymentFailure={(failure) => {
              console.log('Payment failed:', failure);
            }}
          />
        </CardContent>
      </Card>

      {/* Payment Failure Dashboard */}
      <PaymentFailureDashboard />
    </Box>
  );
};

export default PaymentFailureTestingSuite;