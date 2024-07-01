import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, setNewOperation } from 'components/ModalComponents/ModalSlice/ModalSlice';
import { createOperation } from 'components/redux/fetchOperations/fetchOperations';
import Modal from 'components/ModalComponents/Modal/Modal';
import styles from './home.module.css';
import { nanoid } from 'nanoid';
import { MdOutlineModeEditOutline } from 'react-icons/md';

function Home() {
  const dispatch = useDispatch();
  const { operations, newOperation, isModalOpen } = useSelector((state) => state.modal);

  const handleOpenModal = () => {
    dispatch(setNewOperation({
      id: nanoid(),
      date: '', 
      type: 'INCOME', 
      category: '',
      comment: '',
      sum: '', 
    }));
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddOperation = (operation) => {
    dispatch(createOperation(operation));
  };

  return (
    <div className={styles.statistics}>
      <button onClick={handleOpenModal} className={styles.openModalBtn}>
        Add Transaction
      </button>
      {isModalOpen && (
        <Modal
          handleCloseModal={handleCloseModal}
          newOperation={newOperation}
          setNewOperation={(operation) => dispatch(setNewOperation(operation))}
          handleAddOperation={handleAddOperation}
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
          {operations.map((row) => (
            <div className={styles.transaction} key={row.id}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>{row.date}</div>
                <div className={styles.tableCell}>{row.type}</div>
                <div className={styles.tableCell}>{row.category || 'No category selected'}</div>
                <div className={styles.tableCell}>{row.comment}</div>
                <div className={styles.tableCell}>{row.sum} Lei</div>
                <div className={styles.tableCell}>
                  <button className={styles.deleteBtn}>
                    Delete
                  </button>
                  <button className={styles.editBtn}>
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
