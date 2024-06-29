import React, { useState } from 'react';
import styles from './home.module.css';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Modal from 'components/ModalComponents/Modal/Modal';
import { nanoid } from 'nanoid';

function Home() {
  const [rows, setRows] = useState([]);

  const [newOperation, setNewOperation] = useState({
    id: nanoid(),
    date: '',
    type: 'INCOME',
    category: '',
    comment: '',
    sum: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleAddOperation = (operation) => {
    const updatedOperation = {
      ...operation,
    };
    setRows([...rows, updatedOperation]);
  };

  const handleOpenModal = () => {
    setNewOperation({
      id: nanoid(),
      date: '', 
      type: 'INCOME', 
      category: '',
      comment: '',
      sum: '', 
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          setNewOperation={setNewOperation}
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
          {rows.map((row) => (
            <div className={styles.transaction} key={row.id}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>
                {row.date}
                </div>
                <div className={styles.tableCell}>
                  {row.type}
                </div>
                <div className={styles.tableCell}>
                  {row.category ? row.category : 'No category selected'}
                </div>
                <div className={styles.tableCell}>
                  {row.comment}
                </div>
                <div className={styles.tableCell}>
                {row.sum} Lei
                </div>
                <div className={styles.tableCell}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteRow(row.id)}
                  >
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

