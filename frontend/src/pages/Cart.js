import React, { useState, useEffect } from 'react';
import styles from './pages.module.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  return (
    <div className={styles.cartPage}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className={styles.empty}>
          <p>Your cart is empty</p>
          <a href="/products">Continue Shopping</a>
        </div>
      ) : (
        <div className={styles.cartContent}>
          {/* Cart items will be displayed here */}
        </div>
      )}
    </div>
  );
};

export default Cart;
