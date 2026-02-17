import React, { useState, useEffect } from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from './ProductCard';
import { productAPI } from '../services/api';

const ProductGrid = ({ filters = {}, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setPage(1);
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAll({
        ...filters,
        page,
        limit: 12
      });
      setProducts(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`✅ ${product.name} added to cart!`);
    localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
  };

  if (loading) return <div className={styles.loading}>Loading products...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (products.length === 0) return <div className={styles.empty}>No products found</div>;

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={(p) => onProductClick?.('wishlist', p)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
