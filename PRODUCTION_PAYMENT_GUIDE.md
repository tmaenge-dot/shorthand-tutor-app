# 💰 Production Payment Setup - Step by Step Guide

## 🎯 Goal
Enable **real money** payments for your Shorthand Tutor app using Stripe.

## 📋 What You Need
1. ✅ Stripe account (business account)
2. ✅ Backend server (Firebase, Netlify, or custom)
3. ✅ SSL certificate (HTTPS) - required for payments
4. ✅ Bank account for receiving payouts
5. ✅ Business verification documents

---

## Step 1: Install Stripe Dependencies

```bash
cd /home/oem/Desktop/shorthand-tutor-app
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

## Step 2: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start Now" - it's free
3. Fill in business details:
   - Business type (Individual or Company)
   - Country
   - Business name
   - Tax ID (if applicable)
4. Link your bank account
5. Verify your identity (photo ID required)

---

## Step 3: Get Your API Keys

1. Log into Stripe Dashboard
2. Go to **Developers** > **API Keys**
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

⚠️ **Important**: 
- Use **test keys** (`pk_test_`, `sk_test_`) for development
- Use **live keys** (`pk_live_`, `sk_live_`) for production
- **NEVER** expose secret keys in frontend code!

---

## Step 4: Set Up Environment Variables

Create `.env` file in project root:

```env
# Stripe Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Webhook Secret (get this after creating webhook)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

---

## Step 5: Choose Your Backend Platform

### Option A: Firebase (Recommended for beginners)

**Advantages:**
- Easy setup
- Free tier available
- Automatic scaling
- Built-in database

**Setup:**
```bash
npm install -g firebase-tools
firebase login
firebase init functions
cd functions
npm install stripe
firebase functions:config:set stripe.secret="sk_test_YOUR_KEY"
firebase deploy --only functions
```

### Option B: Netlify Functions

**Advantages:**
- Integrated with GitHub
- Automatic deployments
- Free tier generous

**Setup:**
```bash
npm install netlify-cli -g
ntl init
# Create netlify/functions/create-payment.js
ntl deploy
```

### Option C: Custom Node.js Server

**Advantages:**
- Full control
- Can use any hosting
- More flexibility

**Setup:**
```bash
npm install express stripe cors
# Create server.js
# Deploy to Heroku, Railway, or DigitalOcean
```

---

## Step 6: Update the App to Use Stripe Component

Replace `PaymentGate.jsx` with `StripePaymentGate.jsx`:

```javascript
// In SimpleDashboard.jsx and LessonModule.tsx
import StripePaymentGate from './components/StripePaymentGate'

// Use it:
<StripePaymentGate
  open={showPaymentGate}
  onClose={() => setShowPaymentGate(false)}
  moduleId={selectedModule}
  moduleName={moduleName}
/>
```

---

## Step 7: Create Payment Endpoint

Choose your backend and create the payment endpoint:

### Firebase Example:
```javascript
// functions/index.js
exports.createPaymentIntent = functions.https.onCall(async (data) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount * 100,
    currency: 'usd'
  })
  return { clientSecret: paymentIntent.client_secret }
})
```

### API URL will be:
- Firebase: `https://us-central1-YOUR_PROJECT.cloudfunctions.net/createPaymentIntent`
- Netlify: `https://YOUR_SITE.netlify.app/.netlify/functions/create-payment`
- Custom: `https://your-domain.com/api/create-payment`

---

## Step 8: Set Up Webhooks

Webhooks verify payments and prevent fraud.

1. Go to Stripe Dashboard > **Developers** > **Webhooks**
2. Click "+ Add endpoint"
3. Enter your endpoint URL:
   - Firebase: `https://us-central1-YOUR_PROJECT.cloudfunctions.net/stripeWebhook`
   - Netlify: `https://YOUR_SITE.netlify.app/.netlify/functions/stripe-webhook`
   - Custom: `https://your-domain.com/webhook`

4. Select events to listen to:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`

5. Copy the **Signing secret** and add to your `.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

---

## Step 9: Test Payments

### Use Test Cards:

| Card Number | Result | Use For |
|------------|--------|---------|
| 4242 4242 4242 4242 | ✅ Success | Testing successful payment |
| 4000 0000 0000 9995 | ❌ Declined (insufficient funds) | Testing failure |
| 4000 0000 0000 0002 | ❌ Declined (generic) | Testing decline |
| 4000 0025 0000 3155 | 🔐 Requires authentication | Testing 3D Secure |

**Use:**
- Any future expiry date (e.g., 12/25)
- Any 3-digit CVV (e.g., 123)
- Any postal code (e.g., 12345)

---

## Step 10: Go Live!

### Pre-Launch Checklist:

- [ ] ✅ Test with all test cards
- [ ] ✅ Verify webhook events received
- [ ] ✅ Test refund process
- [ ] ✅ Business verified in Stripe
- [ ] ✅ Bank account linked
- [ ] ✅ SSL certificate installed (HTTPS)
- [ ] ✅ Update to live API keys
- [ ] ✅ Set production webhook URL
- [ ] ✅ Test with real card (small amount)
- [ ] ✅ Enable email receipts in Stripe
- [ ] ✅ Set up tax settings (if applicable)
- [ ] ✅ Create refund policy page

### Switch to Live Mode:

1. **Update `.env`:**
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   ```

2. **Update backend:**
   ```bash
   firebase functions:config:set stripe.secret="sk_live_YOUR_LIVE_KEY"
   firebase deploy --only functions
   ```

3. **Create live webhook:**
   - Create new webhook endpoint in Stripe Dashboard (live mode)
   - Use production URL
   - Update `STRIPE_WEBHOOK_SECRET` with live secret

4. **Test with real payment:**
   - Make small test payment ($0.50)
   - Verify it appears in Stripe Dashboard
   - Verify user gets premium access
   - Request refund to test refund flow

---

## 💸 Pricing & Fees

**Stripe Fees:**
- 2.9% + $0.30 per successful transaction
- No setup fees
- No monthly fees
- No hidden costs

**Your Pricing:**
- Current: $29.99 one-time payment
- You receive: ~$28.82 per sale
- Payout schedule: 7-day rolling basis (default)

**To change price:**
1. Update `PREMIUM_PRICE` in `useSubscription.jsx`
2. Update payment intent amount in backend
3. Update marketing materials

---

## 🔒 Security Checklist

- [ ] ✅ Secret keys stored in environment variables
- [ ] ✅ Webhook signature verification enabled
- [ ] ✅ HTTPS enforced on all pages
- [ ] ✅ PCI compliance (handled by Stripe Elements)
- [ ] ✅ Rate limiting on payment endpoints
- [ ] ✅ User authentication required
- [ ] ✅ Payment logs monitored
- [ ] ✅ Failed payment alerts set up

---

## 📊 Monitor Your Business

### Stripe Dashboard:
- View all payments in real-time
- Track revenue
- See failed payments
- Export data for accounting
- View customer details

### Set up alerts for:
- Failed payments (potential issues)
- Chargebacks (fraud prevention)
- High-value transactions
- Refund requests

---

## 🆘 Troubleshooting

### Payment Not Working?
1. Check browser console for errors
2. Verify API keys are correct
3. Check webhook is receiving events
4. Ensure HTTPS is enabled
5. Test with different card

### User Not Getting Premium?
1. Check webhook was received
2. Verify database update occurred
3. Check payment intent succeeded
4. Review backend logs

### Refunds:
1. Go to Stripe Dashboard > Payments
2. Find the payment
3. Click "Refund"
4. User premium status will be revoked automatically

---

## 📞 Support Resources

- **Stripe Docs**: https://stripe.com/docs
- **Stripe Support**: support@stripe.com
- **Test Mode**: Always safe to experiment!
- **Integration Guide**: https://stripe.com/docs/payments/accept-a-payment

---

## 🚀 Next Steps

1. **Now**: Install dependencies and set up Stripe account
2. **This week**: Choose backend platform and deploy
3. **Testing**: Test thoroughly with test cards
4. **Go Live**: Switch to live keys when ready
5. **Scale**: Monitor and optimize

**Ready to accept real payments? Follow this guide step by step!** 💰

---

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install @stripe/stripe-js @stripe/react-stripe-js

# 2. Create Stripe account at stripe.com

# 3. Add your test key to .env
echo "VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY" > .env

# 4. Update SimpleDashboard.jsx to use StripePaymentGate

# 5. Test with card: 4242 4242 4242 4242

# Done! Ready for production when you add backend!
```

