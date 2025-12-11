/**
 * Firebase Cloud Functions for Stripe Payment Processing
 * 
 * Setup:
 * 1. Install Firebase CLI: npm install -g firebase-tools
 * 2. Initialize functions: firebase init functions
 * 3. Install Stripe: cd functions && npm install stripe
 * 4. Set Stripe secret key: firebase functions:config:set stripe.secret="sk_test_YOUR_KEY"
 * 5. Deploy: firebase deploy --only functions
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stripe = require('stripe')(functions.config().stripe.secret)

admin.initializeApp()

/**
 * Create Payment Intent
 * Called from frontend to initialize payment
 */
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to make payment'
    )
  }

  const { amount, currency = 'usd' } = data
  const userId = context.auth.uid

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      metadata: {
        userId: userId,
        product: 'shorthand-premium',
        timestamp: new Date().toISOString()
      },
      description: 'Shorthand Tutor - Premium Subscription'
    })

    // Log payment attempt
    await admin.firestore().collection('payment_attempts').add({
      userId: userId,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw new functions.https.HttpsError('internal', error.message)
  }
})

/**
 * Stripe Webhook Handler
 * Handles payment confirmation from Stripe
 */
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature']
  const webhookSecret = functions.config().stripe.webhook_secret

  let event

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object)
      break

    case 'payment_intent.payment_failed':
      await handlePaymentFailure(event.data.object)
      break

    case 'charge.refunded':
      await handleRefund(event.data.object)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(paymentIntent) {
  const userId = paymentIntent.metadata.userId

  try {
    // Update user subscription in Firestore
    await admin.firestore().collection('users').doc(userId).update({
      subscription: {
        isPremium: true,
        plan: 'premium',
        startDate: admin.firestore.FieldValue.serverTimestamp(),
        expiryDate: null, // Lifetime access
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })

    // Log successful payment
    await admin.firestore().collection('payments').add({
      userId: userId,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'succeeded',
      product: 'shorthand-premium',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    // Send confirmation email (optional)
    // await sendConfirmationEmail(userId, paymentIntent)

    console.log(`Payment succeeded for user ${userId}`)
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(paymentIntent) {
  const userId = paymentIntent.metadata.userId

  try {
    // Log failed payment
    await admin.firestore().collection('payment_failures').add({
      userId: userId,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      error: paymentIntent.last_payment_error?.message || 'Unknown error',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    console.log(`Payment failed for user ${userId}`)
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

/**
 * Handle refund
 */
async function handleRefund(charge) {
  const paymentIntentId = charge.payment_intent

  try {
    // Find the original payment
    const paymentsRef = admin.firestore().collection('payments')
    const snapshot = await paymentsRef.where('paymentIntentId', '==', paymentIntentId).get()

    if (!snapshot.empty) {
      const paymentDoc = snapshot.docs[0]
      const userId = paymentDoc.data().userId

      // Revoke premium access
      await admin.firestore().collection('users').doc(userId).update({
        'subscription.isPremium': false,
        'subscription.refundedAt': admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })

      // Log refund
      await admin.firestore().collection('refunds').add({
        userId: userId,
        paymentIntentId: paymentIntentId,
        chargeId: charge.id,
        amount: charge.amount_refunded / 100,
        currency: charge.currency,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      })

      console.log(`Refund processed for user ${userId}`)
    }
  } catch (error) {
    console.error('Error handling refund:', error)
  }
}

/**
 * Get user subscription status
 */
exports.getSubscriptionStatus = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid

  try {
    const userDoc = await admin.firestore().collection('users').doc(userId).get()
    
    if (!userDoc.exists) {
      return { isPremium: false }
    }

    const subscription = userDoc.data().subscription || {}
    
    return {
      isPremium: subscription.isPremium || false,
      plan: subscription.plan || 'free',
      startDate: subscription.startDate,
      expiryDate: subscription.expiryDate
    }
  } catch (error) {
    console.error('Error getting subscription status:', error)
    throw new functions.https.HttpsError('internal', error.message)
  }
})
