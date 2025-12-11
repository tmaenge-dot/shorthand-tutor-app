# 🚀 Get Your Stripe Account & Start Making Money

## Step 1: Create FREE Stripe Account (10 minutes)

1. **Go to**: https://stripe.com
2. Click **"Start now"** - it's completely FREE
3. Fill in:
   - Email address
   - Password
   - Business name (can be your name)
   - Country

## Step 2: Get Your TEST API Keys (2 minutes)

1. After signing up, go to: https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) - Copy this!
   - **Secret key** (starts with `sk_test_...`) - Save for later

3. **Copy your publishable key** and paste it in `.env` file:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
   ```

## Step 3: Test Payments (NOW!)

Your app is already set up! Just:

1. Update `.env` with your pk_test_ key
2. Build and deploy: `npm run build && npm run deploy`
3. Visit your app
4. Click on Module E (or any premium module)
5. Use test card: **4242 4242 4242 4242**
   - Expiry: Any future date (12/25)
   - CVV: Any 3 digits (123)
   - ZIP: Any 5 digits (12345)

**You'll see the payment succeed!** (No real money charged in test mode)

## Step 4: Set Up Backend for REAL Money (1-2 hours)

Choose ONE option:

### Option A: Firebase (Easiest)
```bash
npm install -g firebase-tools
firebase login
firebase init functions
cd functions
npm install stripe
firebase functions:config:set stripe.secret="sk_test_YOUR_SECRET_KEY"
# Copy code from functions-example/index.js
firebase deploy --only functions
```

### Option B: Netlify Functions
```bash
npm install -g netlify-cli
ntl init
# Create netlify/functions/create-payment.js
ntl deploy --prod
```

## Step 5: Go LIVE and Make Real Money!

1. **Complete Stripe verification**:
   - Add business details
   - Upload photo ID
   - Link bank account

2. **Get LIVE keys**:
   - Go to: https://dashboard.stripe.com/apikeys (no /test/)
   - Copy **pk_live_...** key

3. **Update .env**:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   ```

4. **Deploy** and start earning!

## 💰 How You Get Paid

- Customer pays: $29.99
- Stripe fee: $1.17 (2.9% + $0.30)
- **You receive: $28.82** in your bank account
- Payout: Every 7 days automatically

## 🎯 Revenue Calculator

| Customers | Your Earnings |
|-----------|---------------|
| 10 | $288 |
| 50 | $1,441 |
| 100 | $2,882 |
| 500 | $14,410 |
| 1,000 | $28,820 |

## ⚠️ Important Notes

- **Test mode**: Use pk_test_ and test cards (no real money)
- **Live mode**: Use pk_live_ for real payments
- **Backend required**: For production, you MUST set up Firebase/Netlify
- **Test first**: Always test with small amounts before going live

## 📞 Support

- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Docs: https://stripe.com/docs
- Test Cards: https://stripe.com/docs/testing

---

**You're ready to make money! Start with test mode, then go live when ready!** 💰
