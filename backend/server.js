require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/naksh_jewels';

// Models
const Product = require('./models/Product');
const Cart = require('./models/Cart');

// Seeding Data
const seedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            const products = [
                { name: "Diamond Solitaire Ring", price: 55000, description: "Elegant diamond solitaire ring set in 18k white gold.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80", category: "Ring" },
                { name: "Gold Layered Necklace", price: 12000, description: "Simple yet stunning 24k gold layered necklace.", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80", category: "Necklace" },
                { name: "Crystal Drop Earrings", price: 2500, description: "Handcrafted crystal drop earrings for special occasions.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80", category: "Earrings" },
                { name: "Luxury Platinum Bracelet", price: 85000, description: "Premium platinum bracelet with intricate detailing.", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80", category: "Bracelet" }
            ];
            await Product.insertMany(products);
            console.log('Database seeded with initial products');
        }
    } catch (err) {
        console.error('Seeding error:', err);
    }
};

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected successfully');
        await seedProducts();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// GET /products
app.get('/products', async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// GET /cart (Helper to see cart)
app.get('/cart', async (req, res, next) => {
    try {
        // Simplified: Fetch the single existing cart or return empty
        const cart = await Cart.findOne().populate('items.product');
        res.json(cart ? cart.items : []);
    } catch (err) {
        next(err);
    }
});

// POST /cart - Add item (or update quantity)
app.post('/cart', async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'ProductId and Quantity are required' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find existing cart or create new one
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        // Check if item is already in cart
        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

        if (itemIndex > -1) {
            // Update quantity
            cart.items[itemIndex].quantity += quantity;
            // Remove if quantity <= 0
            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }
        } else if (quantity > 0) {
            // Add new item
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        // Return full cart details
        await cart.populate('items.product');
        res.json(cart.items);

    } catch (err) {
        next(err);
    }
});

// Helper: Basic validation middleware (already integrated in logic above, but per requirements)
// Just keeping the explicit error handling as structured.

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
