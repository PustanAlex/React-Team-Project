import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Dropdown.module.css'; 
import { getTransactionsCategories } from 'components/redux/transactions/operations';
import { selectCategories } from '../../redux/transactions/selectors';

const Dropdown = ({ selected, onSelect, placeholder }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown}>
        <select 
          className={styles.selectDropdown} 
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
