import React from 'react';
import styles from './Modal.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Notiflix from 'notiflix';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Modal = ({ handleCloseModal, newOperation, setNewOperation, handleAddOperation }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOperation({ ...newOperation, [name]: value });
  };

  const handleTypeChange = (type) => {
    setNewOperation({ ...newOperation, type });
  };

  const handleDateChange = (date) => {
    setNewOperation({ ...newOperation, date: date.toISOString().slice(0, 10) });
  };

  const handleCategoryChange = (category) => {
    setNewOperation({ ...newOperation, category });
  };

  const handleAdd = () => {
    if (!newOperation.date || !newOperation.type || !newOperation.sum) {
      Notiflix.Notify.failure('Please fill out all fields!');
      return;
    }
    handleAddOperation(newOperation);
    handleCloseModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Add Transaction</h2>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Date:</label>
            <DatePicker
              selected={newOperation.date ? new Date(newOperation.date) : null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className={styles.datePicker}
              placeholderText="YYYY-MM-DD"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Type:</label>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.typeButton} ${newOperation.type === 'INCOME' ? styles.active : ''}`}
                onClick={() => handleTypeChange('INCOME')}
              >
                Income
              </button>
              <button
                className={`${styles.typeButton} ${newOperation.type === 'EXPENSE' ? styles.active : ''}`}
                onClick={() => handleTypeChange('EXPENSE')}
              >
                Expense
              </button>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Category:</label>
            <Dropdown
              onSelect={handleCategoryChange}
              selectedCategory={newOperation.category}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Comment:</label>
            <input
              type="text"
              name="comment"
              value={newOperation.comment}
              onChange={handleChange}
              placeholder="Comment"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Sum:</label>
            <input
              type="text"
              name="sum"
              value={newOperation.sum}
              onChange={handleChange}
              placeholder="Sum"
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.addOperationBtn} onClick={handleAdd}>
              Add Operation
            </button>
            <button className={styles.closeModalBtn} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
