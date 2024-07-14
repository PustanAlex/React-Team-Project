import { useDispatch, useSelector } from 'react-redux';
import {
  openModal,
  closeModal,
  setNewOperation,
} from '../../../ModalComponents/ModalSlice/ModalSlice';
import Modal from '../../../ModalComponents/Modal/Modal';
import styles from './home.module.css';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import {
  selectTransactions,
  selectCategories,
} from '../../../redux/transactions/selectors';

function Home() {
  const dispatch = useDispatch();
  const { newOperation, isModalOpen } = useSelector(state => state.modal);
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  const handleOpenModal = (transaction = null) => {
    dispatch(transaction ? setNewOperation(transaction) : setNewOperation({
      transactionDate: '',
      type: '',
      categoryId: '',
      comment: '',
      amount: '',
    }));
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.statistics}>
      <button onClick={handleOpenModal} className={styles.openModalBtn}>
        +
      </button>
      {isModalOpen && (
        <Modal
          handleCloseModal={handleCloseModal}
          newOperation={newOperation}
          setNewOperation={operation => dispatch(setNewOperation(operation))}
        />
      )}
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>Date</div>
            <div className={styles.tableCell}>Type</div>
            <div className={styles.tableCell}>Category</div>
            <div className={styles.tableCell}>Comment</div>
            <div className={styles.tableCell}>Sum</div>
            <div className={styles.tableCell}>Action</div>
          </div>
        </div>
        <div className={styles.tableBody}>
          {transactions.map(row => (
            <div className={styles.transaction} key={row.id}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>{row.transactionDate}</div>
                <div className={styles.tableCell}>{row.type}</div>
                <div className={styles.tableCell}>
                  {categories.find(cat => cat.id === row.categoryId)?.name ||
                    'No category selected'}
                </div>
                <div className={styles.tableCell}>{row.comment}</div>
                <div className={styles.tableCell}>{row.amount} Lei</div>
                <div className={styles.tableCell}>
                  <button className={styles.deleteBtn}>Delete</button>
                  <button className={styles.editBtn} onClick={() => handleOpenModal(row)}>
                    <div>
                      <div className={styles.editIcon}>
                        <MdOutlineModeEditOutline />
                      </div>
                      <span>Edit</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
