const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Thay bằng khóa bí mật Stripe
const app = express();

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: 'vnd',
                    product_data: { name: item.name },
                    unit_amount: item.price,
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Thay bằng khóa bí mật Stripe

const app = express();
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { customer, items } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'vnd',
                    product_data: { name: item.name },
                    unit_amount: item.price,
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: customer.phone + '@example.com', // Sử dụng số điện thoại như email giả
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
