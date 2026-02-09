import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    // Base URL for backend
    // In Docker, localhost:5000 is for browser -> host -> container 5000.
    // So http://localhost:5000 is correct for browser-side requests.
    const API_URL = 'http://localhost:5000';

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${API_URL}/cart`);
            // Backend returns array of items
            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            // Optimistic update? Or wait for server?
            // Let's wait for server for consistency with requirement.
            const response = await axios.post(`${API_URL}/cart`, { productId, quantity });
            setCartItems(response.data);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (productId) => {
        // We can use addToCart with negative quantity or implement delete.
        // My backend `POST /cart` handles negative to remove if qty <= 0.
        // But maybe I should find the current quantity?
        // Let's implement specific remove logic or just pass -1000?
        // Or better: update backend server.js to explicitly handle remove?
        // Actually, backend SPLICES if qty <= 0.
        // So passing { productId, quantity: -currentQty } works.
        const item = cartItems.find((item) => item.product._id === productId);
        if (item) {
            await addToCart(productId, -item.quantity);
        }
    };

    const updateQuantity = async (productId, currentQty, newQty) => {
        const diff = newQty - currentQty;
        if (diff !== 0) {
            await addToCart(productId, diff);
        }
    };

    const contextValue = {
        products,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
