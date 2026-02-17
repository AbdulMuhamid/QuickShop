import React, { useState } from 'react';
import styles from './Navigation.module.css';
import { FaShoppingCart, FaUser, FaBell, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navigation = ({ cartCount = 0, wishlistCount = 0, notificationCount = 0 }) => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.icon}>🛍️</span>
          QuickShop
        </Link>

        <div className={styles.menu}>
          <Link to="/products" className={styles.link}>Products</Link>
          <Link to="/recommendations" className={styles.link}>Recommendations</Link>
          {user && <Link to="/my-orders" className={styles.link}>My Orders</Link>}
        </div>

        <div className={styles.actions}>
          {user ? (
            <>
              <Link to="/wishlist" className={styles.iconButton}>
                <FaHeart />
                {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className={styles.iconButton}>
                <FaShoppingCart />
                {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
              </Link>
              <Link to="/notifications" className={styles.iconButton}>
                <FaBell />
                {notificationCount > 0 && <span className={styles.badge}>{notificationCount}</span>}
              </Link>
              <div className={styles.dropdown}>
                <button 
                  className={styles.userButton}
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <FaUser /> {user.name}
                </button>
                {showMenu && (
                  <div className={styles.dropdownMenu}>
                    <Link to="/profile" className={styles.dropdownItem}>Profile</Link>
                    <button 
                      className={styles.dropdownItem}
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                      }}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.button}>Login</Link>
              <Link to="/register" className={`${styles.button} ${styles.primary}`}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
