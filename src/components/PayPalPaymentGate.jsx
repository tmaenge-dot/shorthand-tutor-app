import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSubscription } from '../hooks/useSubscription';

const PayPalPaymentGate = ({ open, onClose }) => {
  const { upgradeToPremium, PREMIUM_PRICE } = useSubscription();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const premiumFeatures = [
    'Access to all 22 modules (A-V)',
    'Advanced shortforms and phrasing systems',
    'Complete stroke recognition training',
    'Speed development exercises',
    'Interactive practice sessions',
    'Progress tracking and analytics',
    'Lifetime access - pay once, use forever',
    'All future updates included',
  ];

  // PayPal configuration
  const paypalOptions = {
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'Pitman Shorthand Tutor - Premium Access (1 Year)',
          amount: {
            currency_code: 'USD',
            value: PREMIUM_PRICE.toFixed(2),
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };

  const onApprove = async (data, actions) => {
    setProcessing(true);
    setError('');

    try {
      const details = await actions.order.capture();
      
      // Extract payment details
      const paymentDetails = {
        orderId: details.id,
        payerId: details.payer.payer_id,
        payerEmail: details.payer.email_address,
        amount: PREMIUM_PRICE,
        currency: 'USD',
        status: details.status,
        paymentMethod: 'PayPal',
        timestamp: new Date().toISOString(),
      };

      // Update subscription to premium
      upgradeToPremium(paymentDetails);
      
      setSuccess(true);
      setProcessing(false);

      // Close dialog after 2 seconds
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to update UI
      }, 2000);

    } catch (err) {
      console.error('Payment capture error:', err);
      setError('Payment processing failed. Please try again or contact support.');
      setProcessing(false);
    }
  };

  const onError = (err) => {
    console.error('PayPal error:', err);
    setError('An error occurred with PayPal. Please try again.');
  };

  const onCancel = () => {
    setError('Payment was cancelled.');
  };

  const handleClose = () => {
    if (!processing) {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={processing}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Upgrade to Premium
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Unlock all features with one-time payment
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* Premium Features */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            What's Included:
          </Typography>
          <List dense>
            {premiumFeatures.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Price */}
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          textAlign: 'center',
          mb: 3 
        }}>
          <Typography variant="h4" fontWeight="bold">
            ${PREMIUM_PRICE}
          </Typography>
          <Typography variant="body2">
            One-time payment • Lifetime access
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Success Message */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Payment successful! Redirecting...
          </Alert>
        )}

        {/* PayPal Buttons */}
        {!success && (
          <PayPalScriptProvider options={paypalOptions}>
            <Box sx={{ mt: 2 }}>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
                disabled={processing}
                style={{
                  layout: 'vertical',
                  color: 'gold',
                  shape: 'rect',
                  label: 'paypal',
                }}
              />
            </Box>
          </PayPalScriptProvider>
        )}

        {processing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Processing payment...</Typography>
          </Box>
        )}

        {/* Security Note */}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
          🔒 Secure payment powered by PayPal
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={processing}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayPalPaymentGate;
