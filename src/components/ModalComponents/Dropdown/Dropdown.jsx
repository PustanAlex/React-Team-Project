import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Dropdown.module.css';

const Dropdown = ({ onSelect, selectedCategory }) => {
  const categories = useSelector(state => state.transactions.categories);
  const loading = useSelector(state => state.transactions.loading);

  const handleSelectChange = e => {
    const categoryId = e.target.value;
    onSelect(categoryId);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown}>
        <select
          className={styles.selectDropdown}
          value={selectedCategory}
          onChange={handleSelectChange}
          disabled={loading}
        >
          <option value="" disabled hidden>
            Select category...
          </option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default Dropdown;
