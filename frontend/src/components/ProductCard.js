import React from 'react';
import styles from './ProductCard.module.css';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/250'} 
          alt={product.name}
          className={styles.image}
        />
        {product.originalPrice && (
          <span className={styles.badge}>
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.rating}>
          <FaStar className={styles.star} />
          <span>{product.rating?.toFixed(1) || 'N/A'}</span>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>${product.originalPrice}</span>
          )}
        </div>
        <div className={styles.actions}>
          <button 
            className={styles.buyNow}
            onClick={() => onAddToCart?.(product)}
          >
            🛍️ Buy Now
          </button>
          <button 
            className={styles.addCart}
            onClick={() => onAddToCart?.(product)}
          >
            <FaShoppingCart /> Add to Cart
          </button>
          <button 
            className={styles.wishlist}
            onClick={() => onAddToWishlist?.(product)}
            title="Add to Wishlist"
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
