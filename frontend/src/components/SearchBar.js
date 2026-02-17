import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, categories = [] }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      search: query,
      category: category || undefined,
      minPrice: priceRange.min || undefined,
      maxPrice: priceRange.max || undefined
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.searchInput}>
          <FaSearch className={styles.icon} />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select 
          className={styles.filter}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className={styles.priceRange}>
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
          />
        </div>

        <button type="submit" className={styles.button}>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
