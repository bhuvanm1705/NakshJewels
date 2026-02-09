import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-hero">
            <div className="welcome-content">
                <h1>Welcome to Naksh Jewels</h1>
                <p>Discover our exclusive collection of premium jewelry.</p>
                <div className="welcome-buttons">
                    <button onClick={() => navigate('/shop')}>Shop Now</button>
                    <button onClick={() => navigate('/cart')} className="secondary">View Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
