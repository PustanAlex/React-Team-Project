import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

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
        <div className={styles.homeContainer}>
            <div className={styles.leftSide}>
                <div className={styles.navLinks}>
                    <Link to="/">
                        <div>
                            <svg className="icon iconenvelope">
                                <use href="/Images/Icons/baseline-home.svg#icon"></use>
                            </svg>
                            Home
                        </div>
                    </Link>
                    <Link to="/statistics">
                        <div>Statistics</div>
                    </Link>
                </div>
                <div className={styles.balanceContainer}>
                    <p>YOUR BALANCE</p>
                    <h2 className={styles.balanceSold}>$2,345</h2>
                </div>
                <div className={styles.currencyContainer}>
                    <p>API</p>
                </div>
            </div>
            <div className={styles.rightSide}>
                
                <div className={styles.statisticContainer}>
                    <div className={styles.statistics}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Comment</th>
                                    <th>Sum</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.date}</td>
                                        <td>{row.type}</td>
                                        <td>{row.category}</td>
                                        <td>{row.comment}</td>
                                        <td>{row.sum}</td>
                                        <td>
                                            <button className={styles.deleteBtn} onClick={() => handleDeleteRow(row.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={styles.addBtn}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
