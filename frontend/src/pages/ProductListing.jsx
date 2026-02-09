import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

const ProductListing = () => {
    const { products } = useContext(ShopContext);

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>Products</h1>
            </div>
            <div className="products">
                {products.map((product) => (
                    <ProductCard key={product._id} data={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
