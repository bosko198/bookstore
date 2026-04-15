const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { bookId, title, price } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: title },
            unit_amount: price * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;