# Stripe Payment Integration Setup Guide

## 🎯 Overview
This guide will help you set up real payment processing with Stripe for the Shorthand Tutor app.

## 📋 Prerequisites
1. Stripe account (sign up at https://stripe.com)
2. Node.js backend server (for secure API keys)
3. SSL certificate (required for production payments)

## 🔧 Setup Steps

### Step 1: Create Stripe Account
1. Go to https://stripe.com
2. Sign up for a free account
3. Complete business verification
4. Get your API keys from the Dashboard

### Step 2: Install Stripe Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
npm install stripe  # For backend (if using Node.js server)
```

### Step 3: Environment Variables
Create a `.env` file in your project root:

```env
# Stripe Public Key (safe to expose in frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...your_key_here

# Stripe Secret Key (NEVER expose - backend only!)
STRIPE_SECRET_KEY=sk_test_...your_key_here

# Webhook Secret (for payment verification)
STRIPE_WEBHOOK_SECRET=whsec_...your_webhook_secret
```

### Step 4: Backend API Setup (Required for Production)

You need a backend server to:
- Process payments securely
- Store subscription data
- Handle webhooks

**Option A: Node.js/Express Backend**
```javascript
// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    metadata: { 
      product: 'shorthand-premium',
      userId: req.body.userId 
    }
  });
  
  res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(3001, () => console.log('Payment server running on port 3001'));
```

**Option B: Firebase Cloud Functions**
```javascript
// functions/index.js
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret);

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount * 100,
    currency: 'usd',
    metadata: {
      userId: context.auth.uid,
      product: 'shorthand-premium'
    }
  });
  
  return { clientSecret: paymentIntent.client_secret };
});
```

**Option C: Netlify Functions**
```javascript
// netlify/functions/create-payment.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { amount, userId } = JSON.parse(event.body);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    metadata: { userId, product: 'shorthand-premium' }
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
  };
};
```

### Step 5: Webhook Setup (Payment Verification)

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint URL: `https://yourdomain.com/webhook`
3. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`

Backend webhook handler:
```javascript
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update user subscription in your database
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed');
      break;
  }

  res.json({received: true});
});
```

## 🚀 Deployment Checklist

### Testing Phase (Use Test Mode)
- [ ] Use test API keys (pk_test_... and sk_test_...)
- [ ] Test with card: 4242 4242 4242 4242
- [ ] Verify webhook events are received
- [ ] Test failed payments: 4000 0000 0000 0002

### Production Phase
- [ ] Switch to live API keys (pk_live_... and sk_live_...)
- [ ] Enable SSL/HTTPS on your domain
- [ ] Set up proper error logging
- [ ] Configure webhook endpoints for production URL
- [ ] Test with real card (small amount)
- [ ] Set up email receipts in Stripe Dashboard
- [ ] Configure tax settings if needed
- [ ] Set up refund policy

## 💰 Pricing Configuration

Current setup:
- **One-time payment**: $29.99 USD
- **Product**: Lifetime Premium Access

To change pricing, update:
1. `useSubscription.jsx` - PREMIUM_PRICE constant
2. Stripe Dashboard - Create product & price
3. Backend API - amount calculation

## 🔒 Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Always validate payments** on backend before granting access
3. **Use webhooks** to verify payment completion
4. **Store subscription status** in secure database
5. **Implement rate limiting** on payment endpoints
6. **Log all payment attempts** for fraud detection

## 📊 Monitoring & Analytics

1. **Stripe Dashboard** - Monitor payments in real-time
2. **Webhook logs** - Track payment events
3. **Failed payments** - Set up alerts for failures
4. **Revenue reports** - Export data for accounting

## 🆘 Testing Cards

Use these test cards in Stripe test mode:

| Card Number | Result |
|------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Declined |
| 4000 0000 0000 0002 | Declined (generic) |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |

Use any future expiry date, any 3-digit CVV.

## 📞 Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Test Mode: Always test thoroughly before going live!

## ⚠️ Important Notes

1. **PCI Compliance**: Using Stripe Elements handles PCI compliance for you
2. **Country Restrictions**: Stripe availability varies by country
3. **Bank Account**: Link your bank account in Stripe for payouts
4. **Business Verification**: Required before processing live payments
5. **Pricing**: Stripe charges 2.9% + $0.30 per successful transaction

---

**Next Steps**: Follow the backend setup guide for your chosen platform (Firebase, Netlify, or custom server).
