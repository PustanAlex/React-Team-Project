import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './Modal.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Notiflix from 'notiflix';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addTransaction, updatedTransaction } from '../../redux/transactions/operations';

const Modal = ({ handleCloseModal, newOperation, setNewOperation }) => {
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setNewOperation({ ...newOperation, [name]: value });
  };

  const handleTypeChange = type => {
    setNewOperation({ ...newOperation, type });
  };

  const handleDateChange = date => {
    setNewOperation({
      ...newOperation,
      transactionDate: date.toISOString().slice(0, 10),
    });
  };

  const handleCategoryChange = categoryId => {
    setNewOperation({ ...newOperation, categoryId });
  };

  const handleAdd = () => {
    if (
      !newOperation.transactionDate ||
      !newOperation.type ||
      !newOperation.amount
    ) {
      Notiflix.Notify.failure('Please fill out all fields!');
      return;
    }
    const { id, transactionDate, type, comment, amount, categoryId } = newOperation
    newOperation = { id, transactionDate, type, comment, amount: +amount, categoryId }
    newOperation.amount *= (newOperation.type === 'INCOME') === (newOperation.amount > 0) ? 1 : -1
    dispatch(newOperation.id ? updatedTransaction(newOperation) : addTransaction(newOperation));
    handleCloseModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Add Transaction</h2>
          <div className={styles.inputGroup}>
            <DatePicker
              selected={
                newOperation.transactionDate
                  ? new Date(newOperation.transactionDate)
                  : null
              }
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className={styles.datePicker}
              placeholderText="YYYY-MM-DD"
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.typeButton} ${newOperation.type === 'INCOME' ? styles.active : ''
                  }`}
                onClick={() => handleTypeChange('INCOME')}
              >
                Income
              </button>
              <button
                className={`${styles.typeButton} ${newOperation.type === 'EXPENSE' ? styles.redActive : ''
                  }`}
                onClick={() => handleTypeChange('EXPENSE')}
              >
                Expense
              </button>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <Dropdown
              onSelect={handleCategoryChange}
              selectedCategory={newOperation.categoryId}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="comment"
              value={newOperation.comment}
              onChange={handleChange}
              placeholder="Comment"
              className={styles.inputText}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="number"
              name="amount"
              value={newOperation.amount}
              onChange={handleChange}
              placeholder="Amount"
              className={styles.inputText}
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

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  newOperation: PropTypes.object.isRequired,
  setNewOperation: PropTypes.func.isRequired,
};

export default Modal;
