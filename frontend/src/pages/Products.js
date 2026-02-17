import React, { useState, useEffect } from 'react';
import styles from './pages.module.css';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
  const [filters, setFilters] = useState({});

  const categories = ['Electronics', 'Home & Garden', 'Fashion', 'Sports', 'Books', 'Toys', 'Beauty', 'Food'];

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.productsPage}>
      <h1>All Products</h1>
      <SearchBar onSearch={handleSearch} categories={categories} />
      <ProductGrid filters={filters} />
    </div>
  );
};

export default Products;
