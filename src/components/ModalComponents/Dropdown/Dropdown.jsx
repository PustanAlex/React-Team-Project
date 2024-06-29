import React, { useState, useEffect } from 'react';
import styles from './Dropdown.module.css'; 
const Dropdown = () => {
  const [categoryText, setCategoryText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || [];
    setSelectedCategories(storedCategories);
  }, []);


  const handleAddCategory = () => {
    if (categoryText.trim() !== '') {
      const updatedCategories = [...selectedCategories, categoryText.trim()];
      setSelectedCategories(updatedCategories);
      localStorage.setItem('selectedCategories', JSON.stringify(updatedCategories));
      setCategoryText(''); 
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div> 
      <input
        type="text"
        className={styles.inputText}
        value={categoryText}
        onChange={(e) => setCategoryText(e.target.value)}
        placeholder="Enter category..."
      />
      <button className={styles.submitButton} onClick={handleAddCategory}>
        +
      </button>
      </div>
     
      <div className={styles.dropdown}>
        <select className={styles.selectDropdown} defaultValue="" onChange={() => {}}>
          <option value="" disabled hidden>Select category...</option>
          {selectedCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
