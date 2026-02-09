import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export const ProductCard = (props) => {
    const { _id, name, price, description, image } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const [added, setAdded] = useState(false);

    const cartItem = cartItems.find(item => item.product._id === _id);
    const cartItemAmount = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        addToCart(_id, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="product">
            <img src={image} alt={name} />
            <div className="description">
                <h3>{name}</h3>
                <div className="price">
                    <sup>₹</sup>{price}
                </div>
                <p>{description}</p>
            </div>
            <button
                className={`addToCartBttn ${added ? 'active' : ''}`}
                onClick={handleAddToCart}
                style={{ backgroundColor: added ? '#4CAF50' : '', color: added ? 'white' : '', borderColor: added ? '#4CAF50' : '' }}
            >
                {added ? 'Added!' : `Add to Cart ${cartItemAmount > 0 ? `(${cartItemAmount})` : ''}`}
            </button>
        </div>
    );
};
