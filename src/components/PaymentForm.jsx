import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { paymentFailureTracker } from '../analytics/paymentFailureTracker';

const PaymentForm = ({ subscriptionPlan, onPaymentSuccess, onPaymentFailure }) => {
  const [loading, setLoading] = useState(false);
  const [currentAttemptId, setCurrentAttemptId] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    email: '',
    paymentMethod: 'credit_card'
  });
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);

  // Get user info for tracking
  const getUserInfo = () => ({
    userId: localStorage.getItem('userId') || null,
    email: formData.email,
    name: formData.holderName,
    isExistingCustomer: !!localStorage.getItem('userId'),
    customerLTV: parseFloat(localStorage.getItem('customerLTV')) || 0
  });

  // Form validation with detailed error tracking
  const validateForm = () => {
    const newErrors = {};
    const newValidationErrors = [];

    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Valid card number required';
      newValidationErrors.push('invalid_card_number');
    }

    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiry = 'Expiry date required';
      newValidationErrors.push('missing_expiry_date');
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Valid CVV required';
      newValidationErrors.push('invalid_cvv');
    }

    if (!formData.holderName.trim()) {
      newErrors.holderName = 'Cardholder name required';
      newValidationErrors.push('missing_cardholder_name');
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email required';
      newValidationErrors.push('invalid_email');
    }

    setErrors(newErrors);
    setValidationErrors(newValidationErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate payment processing with comprehensive error tracking
  const processPayment = async () => {
    const startTime = Date.now();
    
    try {
      // Track payment attempt
      const attemptId = paymentFailureTracker.trackPaymentAttempt(
        getUserInfo(),
        {
          plan: subscriptionPlan.name,
          price: subscriptionPlan.price,
          duration: subscriptionPlan.duration,
          paymentMethod: formData.paymentMethod
        }
      );
      
      setCurrentAttemptId(attemptId);

      // Simulate various payment scenarios for testing
      const simulatePaymentOutcome = () => {
        const random = Math.random();
        
        // 70% success rate for testing
        if (random < 0.7) {
          return { success: true, transactionId: 'txn_' + Date.now() };
        }
        
        // Simulate different types of failures
        if (random < 0.8) {
          throw new Error('CARD_DECLINED: Your card was declined by the bank');
        } else if (random < 0.85) {
          throw new Error('NETWORK_ERROR: Network connection failed during processing');
        } else if (random < 0.9) {
          throw new Error('TIMEOUT_ERROR: Payment processing timed out');
        } else if (random < 0.95) {
          throw new Error('VALIDATION_ERROR: Invalid payment information provided');
        } else {
          throw new Error('SYSTEM_ERROR: Internal server error occurred');
        }
      };

      // Add random delay to simulate real payment processing
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 3000));

      const result = simulatePaymentOutcome();

      // Track successful payment
      paymentFailureTracker.trackPaymentSuccess(attemptId, {
        transactionId: result.transactionId,
        amountCharged: subscriptionPlan.price,
        gatewayFees: subscriptionPlan.price * 0.029, // 2.9% typical fee
        gatewayResponse: { status: 'approved', authCode: 'AUTH123' }
      });

      if (onPaymentSuccess) {
        onPaymentSuccess(result);
      }

      return result;

    } catch (error) {
      const networkLatency = Date.now() - startTime;
      
      // Parse error message to extract type and code
      const errorMessage = error.message;
      const errorParts = errorMessage.split(': ');
      const errorCode = errorParts[0] || 'UNKNOWN_ERROR';
      const errorDescription = errorParts[1] || errorMessage;

      // Determine if error is retryable
      const retryableErrors = ['NETWORK_ERROR', 'TIMEOUT_ERROR', 'TEMPORARY_UNAVAILABLE'];
      const isRetryable = retryableErrors.some(code => errorCode.includes(code));

      // Track payment failure with detailed information
      const failureData = paymentFailureTracker.trackPaymentFailure(currentAttemptId, {
        type: 'payment_processing_error',
        errorCode: errorCode,
        errorMessage: errorDescription,
        stackTrace: error.stack,
        isRetryable: isRetryable,
        networkLatency: networkLatency,
        gatewayResponse: {
          error: errorCode,
          message: errorDescription,
          timestamp: new Date().toISOString()
        },
        cardLastFour: formData.cardNumber.slice(-4),
        cardType: getCardType(formData.cardNumber),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        validationErrors: validationErrors,
        customerLTV: getUserInfo().customerLTV,
        isExistingCustomer: getUserInfo().isExistingCustomer
      });

      if (onPaymentFailure) {
        onPaymentFailure(failureData);
      }

      throw error;
    }
  };

  // Get card type from number
  const getCardType = (cardNumber) => {
    const num = cardNumber.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'MasterCard';
    if (/^3[47]/.test(num)) return 'American Express';
    if (/^6/.test(num)) return 'Discover';
    return 'Unknown';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Track validation failure
      if (currentAttemptId) {
        paymentFailureTracker.trackPaymentFailure(currentAttemptId, {
          type: 'form_validation_error',
          errorCode: 'VALIDATION_ERROR',
          errorMessage: 'Form validation failed',
          validationErrors: validationErrors,
          isRetryable: true
        });
      }
      return;
    }

    setLoading(true);
    
    try {
      await processPayment();
      // Success handled in processPayment
    } catch (error) {
      // Error already tracked in processPayment
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <CreditCardIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5">
            Secure Payment
          </Typography>
          <SecurityIcon sx={{ ml: 'auto', color: 'success.main' }} />
        </Box>

        {/* Subscription Details */}
        <Box mb={3} p={2} bgcolor="grey.50" borderRadius={1}>
          <Typography variant="h6" gutterBottom>
            {subscriptionPlan.name}
          </Typography>
          <Typography variant="h4" color="primary.main">
            ${subscriptionPlan.price}
            <Typography component="span" variant="body1" color="text.secondary">
              /{subscriptionPlan.duration}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subscriptionPlan.description}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Customer Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.holderName}
                onChange={(e) => handleInputChange('holderName', e.target.value)}
                error={!!errors.holderName}
                helperText={errors.holderName}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>

            {/* Payment Method */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  label="Payment Method"
                >
                  <MenuItem value="credit_card">Credit/Debit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="apple_pay">Apple Pay</MenuItem>
                  <MenuItem value="google_pay">Google Pay</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Card Details */}
            {formData.paymentMethod === 'credit_card' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      // Format card number with spaces
                      const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                      handleInputChange('cardNumber', value);
                    }}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    inputProps={{ maxLength: 19 }}
                    required
                  />
                  {formData.cardNumber && (
                    <Chip 
                      label={getCardType(formData.cardNumber)} 
                      size="small" 
                      sx={{ mt: 1 }} 
                    />
                  )}
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Month"
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    error={!!errors.expiry}
                    inputProps={{ maxLength: 2 }}
                    placeholder="MM"
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Year"
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    error={!!errors.expiry}
                    helperText={errors.expiry}
                    inputProps={{ maxLength: 4 }}
                    placeholder="YYYY"
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    error={!!errors.cvv}
                    helperText={errors.cvv || "3-4 digits on back of card"}
                    inputProps={{ maxLength: 4 }}
                    required
                  />
                </Grid>
              </>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 2, py: 1.5 }}
              >
                {loading ? (
                  <Box display="flex" alignItems="center">
                    <CircularProgress size={20} sx={{ mr: 2 }} />
                    Processing Payment...
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center">
                    <SecurityIcon sx={{ mr: 1 }} />
                    Pay ${subscriptionPlan.price} Securely
                  </Box>
                )}
              </Button>
            </Grid>

            {/* Security Notice */}
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  🔒 Your payment information is encrypted and secure. 
                  We never store your card details.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;