import React from 'react';
import { Link } from 'react-router-dom';
import styles from './pages.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to QuickShop</h1>
          <p>Discover personalized shopping experiences with AI-powered recommendations</p>
          <div className={styles.heroCTA}>
            <Link to="/products" className={styles.primaryBtn}>
              Shop Now
            </Link>
            <Link to="/recommendations" className={styles.secondaryBtn}>
              Get Recommendations
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2>Why Choose QuickShop?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🤖</div>
            <h3>AI-Powered Recommendations</h3>
            <p>Get personalized product suggestions based on your preferences and browsing history</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Smart Search</h3>
            <p>Find exactly what you're looking for with our intelligent search and filtering</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔔</div>
            <h3>Exclusive Offers</h3>
            <p>Receive personalized deals and notifications tailored to your interests</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Fast & Easy</h3>
            <p>Seamless shopping experience optimized for speed and simplicity</p>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <h2>Popular Categories</h2>
        <div className={styles.categoryGrid}>
          {['Electronics', 'Home & Garden', 'Fashion', 'Sports', 'Books', 'Toys', 'Beauty', 'Food'].map(cat => (
            <Link key={cat} to={`/products?category=${cat}`} className={styles.categoryCard}>
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2>What Our Customers Say</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonial}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p>"The recommendations are so accurate! I found exactly what I needed."</p>
            <span>- Sarah M.</span>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p>"Best shopping experience ever. Fast checkout and great selection!"</p>
            <span>- John D.</span>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p>"Love the personalized offers. I save money every time!"</p>
            <span>- Emma L.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
