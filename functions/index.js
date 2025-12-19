const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// STUB: Stripe Webhook
// In production, verify the signature from Stripe
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const event = req.body;

    try {
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const bookingId = paymentIntent.metadata.bookingId;

            // Update Booking Payment Status
            await admin.firestore().collection('bookings').doc(bookingId).update({
                paymentStatus: 'paid',
                paymentId: paymentIntent.id,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // Record Payment
            await admin.firestore().collection('payments').add({
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                bookingId: bookingId,
                stripeId: paymentIntent.id,
                status: 'succeeded',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            console.log(`Payment confirmed for booking ${bookingId}`);
        }

        res.json({ received: true });
    } catch (err) {
        console.error(err);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

// STUB: Automated Driver Assignment
// Triggered when a new booking is created
exports.assignDriver = functions.firestore
    .document('bookings/{bookingId}')
    .onCreate(async (snap, context) => {
        const booking = snap.data();
        const bookingId = context.params.bookingId;

        if (booking.driverId) {
            console.log(`Booking ${bookingId} already has specific driver ${booking.driverId}`);
            return null;
        }

        // Logic to find nearest/available driver would go here
        console.log(`Auto-assigning driver for booking ${bookingId}...`);

        // Stub: Assign to first available driver in city
        const driversRef = admin.firestore().collection('drivers');
        // const availableDriver = ... query logic

        // For now, no-op or mock assignment
        return null;
    });
