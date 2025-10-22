const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const { priceId, uid } = body

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.SUCCESS_URL || 'https://example.com'}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL || 'https://example.com'}/billing/cancel`,
      metadata: { uid }
    })

    return { statusCode: 200, body: JSON.stringify({ sessionId: session.id }) }
  } catch (err) {
    console.error('Stripe error', err)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
