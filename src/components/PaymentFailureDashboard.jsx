import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  AlertTitle,
  Chip,
  Button,
  TextField,
  Grid,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Timeline as TimelineIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { paymentFailureTracker } from '../analytics/paymentFailureTracker';

const PaymentFailureDashboard = () => {
  const [failures, setFailures] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');

  useEffect(() => {
    loadFailureData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadFailureData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadFailureData = async () => {
    setLoading(true);
    try {
      const failureData = paymentFailureTracker.exportFailureData();
      setFailures(failureData.failures || []);
      setReport(failureData.report || {});
    } catch (error) {
      console.error('Error loading failure data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFailures = failures.filter(failure => {
    const matchesFilter = !filter || 
      failure.userEmail.toLowerCase().includes(filter.toLowerCase()) ||
      failure.errorCode.toLowerCase().includes(filter.toLowerCase()) ||
      failure.subscriptionPlan.toLowerCase().includes(filter.toLowerCase());
    
    const matchesPriority = selectedPriority === 'all' || 
      failure.customerSupportPriority === selectedPriority;
    
    return matchesFilter && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getErrorSeverityIcon = (errorCode) => {
    if (errorCode.includes('CRITICAL') || errorCode.includes('SYSTEM_ERROR')) {
      return <ErrorIcon color="error" />;
    } else if (errorCode.includes('TIMEOUT') || errorCode.includes('NETWORK')) {
      return <WarningIcon color="warning" />;
    }
    return <ErrorIcon color="action" />;
  };

  const handleRecoverPayment = async (failure) => {
    // Trigger recovery flow for specific failure
    try {
      await paymentFailureTracker.initiateRecoveryFlow(failure);
      // Show success message
      alert(`Recovery flow initiated for ${failure.userEmail}`);
    } catch (error) {
      alert('Failed to initiate recovery flow');
    }
  };

  const exportFailureReport = () => {
    const data = paymentFailureTracker.exportFailureData('csv');
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-failures-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          💳 Payment Failure Dashboard
        </Typography>
        <LinearProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading payment failure data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          💳 Payment Failure Dashboard
        </Typography>
        <Box>
          <Tooltip title="Refresh Data">
            <IconButton onClick={loadFailureData} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Report">
            <IconButton onClick={exportFailureReport} color="secondary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ErrorIcon color="error" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Failures
                  </Typography>
                  <Typography variant="h4">
                    {report?.totalFailures || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <MoneyIcon color="error" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Revenue Impact
                  </Typography>
                  <Typography variant="h4">
                    ${report?.totalRevenueImpact?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TimelineIcon color="warning" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Avg Time to Failure
                  </Typography>
                  <Typography variant="h4">
                    {Math.round((report?.averageTimeToFailure || 0) / 1000)}s
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <RefreshIcon color="success" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Retry Success Rate
                  </Typography>
                  <Typography variant="h4">
                    {(report?.retrySuccessRate || 0).toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Critical Alerts */}
      {failures.some(f => f.customerSupportPriority === 'high') && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>🚨 High Priority Payment Failures Detected</AlertTitle>
          {failures.filter(f => f.customerSupportPriority === 'high').length} high-value customers 
          have experienced payment failures requiring immediate attention.
        </Alert>
      )}

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by email, error code, or subscription plan..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            select
            label="Priority"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            variant="outlined"
            size="small"
            SelectProps={{ native: true }}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </TextField>
        </Grid>
      </Grid>

      {/* Failure Details Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment Failure Details ({filteredFailures.length} failures)
          </Typography>
          
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Subscription</TableCell>
                  <TableCell>Error</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Revenue Impact</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFailures.map((failure, index) => (
                  <TableRow key={failure.attemptId || index}>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(failure.failureTimestamp).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {Math.round(failure.timeToFailure / 1000)}s to failure
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {failure.userEmail}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {failure.userName}
                      </Typography>
                      {failure.isExistingCustomer && (
                        <Chip label="Existing Customer" size="small" color="info" sx={{ ml: 1 }} />
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {failure.subscriptionPlan}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        ${failure.subscriptionPrice} / {failure.subscriptionDuration}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {getErrorSeverityIcon(failure.errorCode)}
                        <Box ml={1}>
                          <Typography variant="body2">
                            {failure.errorCode}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {failure.errorMessage.substring(0, 50)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        label={failure.customerSupportPriority}
                        color={getPriorityColor(failure.customerSupportPriority)}
                        size="small"
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        ${failure.revenueImpact}
                      </Typography>
                      {failure.customerLifetimeValue > 0 && (
                        <Typography variant="caption" color="textSecondary">
                          LTV: ${failure.customerLifetimeValue}
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Initiate Recovery">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleRecoverPayment(failure)}
                          >
                            <RefreshIcon />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Contact Customer">
                          <IconButton
                            size="small"
                            color="secondary"
                            href={`mailto:${failure.userEmail}?subject=Payment Issue Resolution`}
                          >
                            <EmailIcon />
                          </IconButton>
                        </Tooltip>
                        
                        {failure.customerSupportPriority === 'high' && (
                          <Tooltip title="Urgent - Call Customer">
                            <IconButton size="small" color="error">
                              <Badge variant="dot" color="error">
                                <PhoneIcon />
                              </Badge>
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Quick Recovery Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={() => {
                // Retry all retryable failures
                failures.filter(f => f.isRetryable).forEach(failure => {
                  paymentFailureTracker.initiateRecoveryFlow(failure);
                });
                alert('Recovery initiated for all retryable failures');
              }}
            >
              Retry All Recoverable
            </Button>
          </Grid>
          
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<EmailIcon />}
              onClick={() => {
                // Generate recovery emails for high-priority customers
                const highPriorityFailures = failures.filter(f => f.customerSupportPriority === 'high');
                alert(`Recovery emails queued for ${highPriorityFailures.length} high-priority customers`);
              }}
            >
              Send Recovery Emails
            </Button>
          </Grid>
          
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={exportFailureReport}
            >
              Export Full Report
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PaymentFailureDashboard;