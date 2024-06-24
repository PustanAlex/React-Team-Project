import styles from './home/home.module.css';

function Balance() {
  return (
    <div className={styles.balanceContainer}>
        <p>YOUR BALANCE</p>
        <h2 className={styles.balanceSold}>$2,345</h2>
    </div>
  );
}

export default Balance;