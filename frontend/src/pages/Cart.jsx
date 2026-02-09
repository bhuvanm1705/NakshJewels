import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();

    // Calculate total
    const totalAmount = cartItems.reduce((acc, item) => {
        return acc + (item.product.price * item.quantity);
    }, 0);

    return (
        <div className="cart">
            <div className="cart-container">
                <div className="cart-items-section">
                    <div className="cartTitle">
                        <h1>Shopping Cart</h1>
                    </div>
                    {cartItems.length > 0 ? cartItems.map((item) => {
                        const { _id, name, price, image } = item.product;
                        return (
                            <div className="cartItem" key={_id}>
                                <img src={image} alt={name} />
                                <div className="description">
                                    <p><b>{name}</b></p>
                                    <div className="price">₹{price}</div>
                                    <p style={{ color: '#007600', fontSize: '12px', margin: '5px 0' }}>In stock</p>
                                    <div className="countHandler">
                                        <button onClick={() => updateQuantity(_id, item.quantity, item.quantity - 1)}> - </button>
                                        <input value={item.quantity} readOnly />
                                        <button onClick={() => updateQuantity(_id, item.quantity, item.quantity + 1)}> + </button>
                                        <button className="removeBttn" onClick={() => removeFromCart(_id)}> Delete </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : <h2>Your Cart is empty.</h2>}
                </div>

                {cartItems.length > 0 &&
                    <div className="cart-summary-section">
                        <div className="checkout">
                            <p>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items): <b>₹{totalAmount}</b></p>
                            <button style={{ backgroundColor: '#FFD814', borderColor: '#FCD200' }}> Proceed to Buy </button>
                            <button onClick={() => navigate('/')} style={{ backgroundColor: 'white', borderColor: '#d5d9d9' }}> Continue Shopping </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;
