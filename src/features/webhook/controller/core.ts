import debug from 'debug';
import { Router, raw } from 'express';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '../../../constants';

const logger = debug('features:webhook:controller');
const route = Router();

const stripe = new Stripe(STRIPE_SECRET_KEY);
const webhookSecret = STRIPE_WEBHOOK_SECRET;

route.post('/', raw({ type: 'application/json' }), async (req, res) => {
    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature'] as string,
            webhookSecret
        );

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('PaymentIntent was successful!', event.data.object);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        logger('Failed to webhook: %O', error);
    }
});

export { route };
