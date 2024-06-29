import React, { useState } from 'react';
import styles from './home.module.css';
import { MdOutlineModeEditOutline } from "react-icons/md";

function Home() {
    // Dummy data 
    const [rows, setRows] = useState([
        { id: 1, date: '2024-06-20', type: 'Expense', category: 'Food', comment: 'Lunch', sum: '$10.50' },
        { id: 2, date: '2024-06-19', type: 'Income', category: 'Salary', comment: 'Monthly payment', sum: '$2500.00' },
        { id: 3, date: '2024-06-18', type: 'Expense', category: 'Transportation', comment: 'Bus fare', sum: '$2.50' }
    ]);

 
    const handleDeleteRow = (id) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };

    return (
        <div className={styles.statistics}>
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
          {rows.map(row => (
            <div className={styles.transaction} key={row.id}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}><span>Date:</span> {row.date}</div>
                <div className={styles.tableCell}><span>Type:</span> {row.type}</div>
                <div className={styles.tableCell}><span>Category:</span> {row.category}</div>
                <div className={styles.tableCell}><span>Comment:</span> {row.comment}</div>
                <div className={styles.tableCell}><span>Sum:</span> {row.sum}</div>
                <div className={styles.tableCell}>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteRow(row.id)}>Delete</button>
                  <button className={styles.editBtn}><div><div className={styles.editIcon}><MdOutlineModeEditOutline /></div><span>Edit</span></div></button>
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
