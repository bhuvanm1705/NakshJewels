import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShopContextProvider, ShopContext } from './context/ShopContext';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import Welcome from './pages/Welcome';
import './index.css?v=4';

const App = () => {
  const { cartItems } = React.useContext(ShopContext);
  const totalItems = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

  return (
    <div className="App">
      <ShopContextProvider>
        <BrowserRouter>
          <nav className="navbar">
            <div className="logo">
              <Link to="/">
                <span style={{ color: '#febd69' }}>Naksh</span> Jewels
              </Link>
            </div>
            <div className="links">
              <Link to="/shop">Shop</Link>
              <Link to="/cart" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path></svg>
                <span style={{ marginLeft: '5px' }}>Cart</span>
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-10px',
                    backgroundColor: '#f08804',
                    color: '#111',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/shop" element={<ProductListing />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </div>
  );
}

const AppWrapper = () => (
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
);

export default AppWrapper;
