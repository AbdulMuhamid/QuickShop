import React, { useState, useEffect } from 'react';
import styles from './pages.module.css';
import { userAPI } from '../services/api';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await userAPI.getProfile();
      setWishlist(response.data.data.wishlist || []);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await userAPI.removeFromWishlist(productId);
      setWishlist(wishlist.filter(p => p._id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  if (loading) return <div className={styles.loading}>Loading wishlist...</div>;

  return (
    <div className={styles.wishlistPage}>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className={styles.empty}>
          <p>Your wishlist is empty</p>
          <a href="/products">Continue Shopping</a>
        </div>
      ) : (
        <div className={styles.wishlistGrid}>
          {wishlist.map(product => (
            <div key={product._id} className={styles.wishlistItem}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button 
                onClick={() => handleRemove(product._id)}
                className={styles.removeBtn}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
