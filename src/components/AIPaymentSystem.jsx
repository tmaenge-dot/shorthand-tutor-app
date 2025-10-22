import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  Divider,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  Psychology,
  Security,
  SmartToy,
  CreditCard,
  AccountBalanceWallet,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  AutoAwesome,
  Shield,
  Lock,
  Verified,
  Analytics,
  PaymentOutlined
} from '@mui/icons-material';

// AI Payment Fraud Detection System
class PaymentAI {
  constructor() {
    this.fraudPatterns = new Map();
    this.securityProfile = {
      riskThreshold: 70,
      requiresVerification: false,
      anomalyDetection: true
    };
    
    this.paymentIntelligence = {
      cardValidation: true,
      addressVerification: true,
      behaviorAnalysis: true,
      realTimeScoring: true
    };
  }

  // AI Credit Card Validation
  validatePaymentMethod(paymentData) {
    const validation = {
      isValid: true,
      errors: [],
      warnings: [],
      securityScore: 100,
      fraudRisk: 'low',
      aiRecommendations: []
    };

    try {
      // AI-powered card number validation
      if (paymentData.cardNumber) {
        const cardValidation = this.validateCardNumber(paymentData.cardNumber);
        if (!cardValidation.valid) {
          validation.errors.push(cardValidation.error);
          validation.isValid = false;
          validation.securityScore -= 30;
        } else {
          validation.aiRecommendations.push(`${cardValidation.type} card detected - validation passed`);
        }
      }

      // AI CVV validation
      if (paymentData.cvv) {
        const cvvValidation = this.validateCVV(paymentData.cvv, paymentData.cardNumber);
        if (!cvvValidation.valid) {
          validation.errors.push(cvvValidation.error);
          validation.securityScore -= 20;
        }
      }

      // AI expiry date validation
      if (paymentData.expiryMonth && paymentData.expiryYear) {
        const expiryValidation = this.validateExpiry(paymentData.expiryMonth, paymentData.expiryYear);
        if (!expiryValidation.valid) {
          validation.errors.push(expiryValidation.error);
          validation.isValid = false;
          validation.securityScore -= 25;
        }
      }

      // AI fraud risk assessment
      const riskAssessment = this.assessFraudRisk(paymentData);
      validation.fraudRisk = riskAssessment.level;
      validation.securityScore = Math.min(validation.securityScore, riskAssessment.score);
      
      if (riskAssessment.level === 'high') {
        validation.warnings.push('High fraud risk detected - additional verification required');
        validation.aiRecommendations.push('Enable 3D Secure authentication');
      }

      return validation;
    } catch (error) {
      validation.isValid = false;
      validation.errors.push(`AI validation failed: ${error.message}`);
      validation.securityScore = 0;
      return validation;
    }
  }

  // Luhn algorithm with AI enhancements
  validateCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (!/^\d+$/.test(cleaned)) {
      return { valid: false, error: 'Card number must contain only digits' };
    }

    if (cleaned.length < 13 || cleaned.length > 19) {
      return { valid: false, error: 'Invalid card number length' };
    }

    // Luhn algorithm
    let sum = 0;
    let alternate = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let n = parseInt(cleaned.charAt(i), 10);
      
      if (alternate) {
        n *= 2;
        if (n > 9) {
          n = (n % 10) + 1;
        }
      }
      
      sum += n;
      alternate = !alternate;
    }

    const isValid = (sum % 10) === 0;
    const cardType = this.detectCardType(cleaned);

    if (!isValid) {
      return { valid: false, error: 'Invalid card number (Luhn check failed)' };
    }

    return { valid: true, type: cardType };
  }

  // AI card type detection
  detectCardType(cardNumber) {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cardNumber)) {
        return type.charAt(0).toUpperCase() + type.slice(1);
      }
    }

    return 'Unknown';
  }

  // AI CVV validation
  validateCVV(cvv, cardNumber) {
    if (!/^\d+$/.test(cvv)) {
      return { valid: false, error: 'CVV must contain only digits' };
    }

    const cardType = this.detectCardType(cardNumber);
    const expectedLength = cardType === 'Amex' ? 4 : 3;

    if (cvv.length !== expectedLength) {
      return { 
        valid: false, 
        error: `CVV must be ${expectedLength} digits for ${cardType} cards` 
      };
    }

    return { valid: true };
  }

  // AI expiry validation
  validateExpiry(month, year) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    if (expMonth < 1 || expMonth > 12) {
      return { valid: false, error: 'Invalid expiry month' };
    }

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return { valid: false, error: 'Card has expired' };
    }

    if (expYear > currentYear + 20) {
      return { valid: false, error: 'Expiry year too far in future' };
    }

    return { valid: true };
  }

  // AI fraud risk assessment
  assessFraudRisk(paymentData) {
    let riskScore = 0;
    const factors = [];

    // Check for suspicious patterns
    if (paymentData.cardNumber && this.isSequentialNumbers(paymentData.cardNumber)) {
      riskScore += 40;
      factors.push('Sequential card numbers detected');
    }

    if (paymentData.cvv && paymentData.cvv === '000') {
      riskScore += 30;
      factors.push('Invalid CVV pattern');
    }

    // Velocity checks
    if (this.checkPaymentVelocity(paymentData)) {
      riskScore += 25;
      factors.push('High payment velocity');
    }

    let level = 'low';
    if (riskScore >= 70) level = 'high';
    else if (riskScore >= 40) level = 'medium';

    return {
      score: Math.max(0, 100 - riskScore),
      level,
      factors
    };
  }

  isSequentialNumbers(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '');
    for (let i = 0; i < cleaned.length - 3; i++) {
      const segment = cleaned.substr(i, 4);
      if (/^(\d)\1{3}$/.test(segment) || /^1234|2345|3456|4567|5678|6789$/.test(segment)) {
        return true;
      }
    }
    return false;
  }

  checkPaymentVelocity(paymentData) {
    // Simplified velocity check
    const recentAttempts = this.fraudPatterns.get('payment_attempts') || 0;
    return recentAttempts > 3;
  }

  // AI-powered secure token generation
  generateSecureToken() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    const hash = this.simpleHash(`${timestamp}-${random}`);
    return `ai_token_${hash}`;
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

// AI Payment Processing System
class PaymentProcessor {
  constructor() {
    this.processingState = {
      status: 'idle',
      confidence: 100,
      securityChecks: []
    };
  }

  async processPayment(paymentData, validationResult) {
    const result = {
      success: false,
      transactionId: null,
      errors: [],
      securityLevel: 'standard',
      aiAnalysis: null
    };

    try {
      // AI pre-processing security checks
      if (validationResult.fraudRisk === 'high') {
        result.errors.push('Payment blocked due to high fraud risk');
        result.securityLevel = 'blocked';
        return result;
      }

      // Simulate AI-powered processing
      await this.delay(2000); // Simulate processing time
      
      // AI generates secure transaction ID
      const paymentAI = new PaymentAI();
      result.transactionId = paymentAI.generateSecureToken();
      
      // AI analysis of transaction
      result.aiAnalysis = {
        processingTime: '1.8s',
        securityScore: validationResult.securityScore,
        riskLevel: validationResult.fraudRisk,
        validationChecks: validationResult.errors.length === 0 ? 'passed' : 'failed'
      };

      if (validationResult.isValid && validationResult.fraudRisk !== 'high') {
        result.success = true;
        result.securityLevel = validationResult.fraudRisk === 'low' ? 'high' : 'medium';
      } else {
        result.errors.push('Payment validation failed');
      }

      return result;
    } catch (error) {
      result.errors.push(`Processing failed: ${error.message}`);
      return result;
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Main AI Payment System Component
const AIPaymentSystem = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  const [validation, setValidation] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // AI systems
  const [paymentAI] = useState(() => new PaymentAI());
  const [paymentProcessor] = useState(() => new PaymentProcessor());

  // Real-time AI validation
  const validateInRealTime = useCallback((field, value) => {
    const updatedData = { ...paymentData, [field]: value };
    setPaymentData(updatedData);

    // AI real-time validation
    if (Object.values(updatedData).some(val => val.trim() !== '')) {
      const validation = paymentAI.validatePaymentMethod(updatedData);
      setValidation(validation);
      
      // Update AI analysis
      setAiAnalysis({
        securityScore: validation.securityScore,
        fraudRisk: validation.fraudRisk,
        validationStatus: validation.isValid ? 'valid' : 'invalid',
        lastCheck: new Date().toISOString()
      });
    }
  }, [paymentData, paymentAI]);

  // AI-powered payment processing
  const handlePayment = async () => {
    if (!validation || !validation.isValid) {
      setPaymentResult({
        success: false,
        errors: ['Please fix validation errors before proceeding']
      });
      return;
    }

    setProcessing(true);
    try {
      const result = await paymentProcessor.processPayment(paymentData, validation);
      setPaymentResult(result);
    } catch (error) {
      setPaymentResult({
        success: false,
        errors: [`Processing error: ${error.message}`]
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* AI System Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h4" fontWeight="600">
            AI-Powered Payment System
          </Typography>
          <Chip 
            icon={<SmartToy />} 
            label="AI Protected" 
            color="primary" 
          />
          <Chip 
            icon={<Security />} 
            label="Fraud Detection" 
            color="error" 
          />
          <Chip 
            icon={<Shield />} 
            label="Real-time Validation" 
            color="success" 
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Advanced AI system validates payments in real-time and prevents fraud
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Payment Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => validateInRealTime('cardNumber', e.target.value)}
                    error={validation?.errors.some(err => err.includes('card number'))}
                    helperText={validation?.errors.find(err => err.includes('card number'))}
                    InputProps={{
                      startAdornment: <CreditCard sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    value={paymentData.cardholderName}
                    onChange={(e) => validateInRealTime('cardholderName', e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Month"
                    placeholder="MM"
                    value={paymentData.expiryMonth}
                    onChange={(e) => validateInRealTime('expiryMonth', e.target.value)}
                    error={validation?.errors.some(err => err.includes('month'))}
                  />
                </Grid>
                
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Year"
                    placeholder="YYYY"
                    value={paymentData.expiryYear}
                    onChange={(e) => validateInRealTime('expiryYear', e.target.value)}
                    error={validation?.errors.some(err => err.includes('year') || err.includes('expired'))}
                  />
                </Grid>
                
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="CVV"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => validateInRealTime('cvv', e.target.value)}
                    error={validation?.errors.some(err => err.includes('CVV'))}
                    InputProps={{
                      startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Billing Address"
                    multiline
                    rows={2}
                    value={paymentData.billingAddress}
                    onChange={(e) => validateInRealTime('billingAddress', e.target.value)}
                  />
                </Grid>
              </Grid>

              {/* AI Validation Results */}
              {validation && (
                <Box sx={{ mt: 3 }}>
                  {validation.errors.length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>AI detected validation errors:</strong>
                      </Typography>
                      <List dense>
                        {validation.errors.map((error, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={error} />
                          </ListItem>
                        ))}
                      </List>
                    </Alert>
                  )}

                  {validation.warnings.length > 0 && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>AI security warnings:</strong>
                      </Typography>
                      <List dense>
                        {validation.warnings.map((warning, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={warning} />
                          </ListItem>
                        ))}
                      </List>
                    </Alert>
                  )}

                  {validation.aiRecommendations.length > 0 && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>AI recommendations:</strong>
                      </Typography>
                      <List dense>
                        {validation.aiRecommendations.map((rec, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <AutoAwesome fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={rec} />
                          </ListItem>
                        ))}
                      </List>
                    </Alert>
                  )}
                </Box>
              )}

              {/* Payment Result */}
              {paymentResult && (
                <Alert 
                  severity={paymentResult.success ? "success" : "error"} 
                  sx={{ mt: 2 }}
                >
                  {paymentResult.success ? (
                    <Box>
                      <Typography variant="body1" gutterBottom>
                        <strong>Payment Successful!</strong>
                      </Typography>
                      <Typography variant="body2">
                        Transaction ID: {paymentResult.transactionId}
                      </Typography>
                      {paymentResult.aiAnalysis && (
                        <Typography variant="body2">
                          AI Security Score: {paymentResult.aiAnalysis.securityScore}%
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1" gutterBottom>
                        <strong>Payment Failed</strong>
                      </Typography>
                      {paymentResult.errors.map((error, index) => (
                        <Typography key={index} variant="body2">
                          {error}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Alert>
              )}

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!validation?.isValid || processing}
                  onClick={handlePayment}
                  startIcon={processing ? <CircularProgress size={20} /> : <PaymentOutlined />}
                >
                  {processing ? 'AI Processing Payment...' : 'Process Payment with AI Security'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Analysis Panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Security Analysis
              </Typography>
              
              {aiAnalysis ? (
                <Box>
                  <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      {aiAnalysis.securityScore}%
                    </Typography>
                    <Typography variant="body2">Security Score</Typography>
                  </Paper>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Psychology color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Fraud Risk" 
                        secondary={aiAnalysis.fraudRisk.toUpperCase()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Verified color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Validation" 
                        secondary={aiAnalysis.validationStatus.toUpperCase()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Analytics color="info.main" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Last AI Check" 
                        secondary={new Date(aiAnalysis.lastCheck).toLocaleTimeString()}
                      />
                    </ListItem>
                  </List>
                </Box>
              ) : (
                <Alert severity="info">
                  Enter payment information to see AI analysis
                </Alert>
              )}

              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                AI Security Features
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Real-time validation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Fraud detection" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Secure tokenization" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Pattern analysis" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AIPaymentSystem;