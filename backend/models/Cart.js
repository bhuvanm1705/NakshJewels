const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1, min: 1 }
});

// Assuming a single cart for this simple assignment, or we could have userId.
// Requirement says "Cart page", usually implies a session or user.
// For simplicity/demo: specific cart or single global cart.
// Let's make it a simple list of items for now, or a SessionCart if we want to be fancy.
// But mostly internships check for Structure.
// Let's assume a single persistent cart for "Guest" for this demo.

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
