import React, { useState, useEffect } from 'react';
import styles from './pages.module.css';
import ProductGrid from '../components/ProductGrid';
import { recommendationAPI } from '../services/api';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await recommendationAPI.getPersonalized();
      setRecommendations(response.data.data);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading recommendations...</div>;

  return (
    <div className={styles.recommendationsPage}>
      <h1>Personalized Recommendations for You</h1>
      <p className={styles.subtitle}>Based on your browsing history and preferences</p>
      <ProductGrid />
    </div>
  );
};

export default Recommendations;
