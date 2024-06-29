import styles from './home/home.module.css';

function Balance() {
const currency = "$";
const balance ="2,345";

  return (
    <div className={styles.balanceContainer}>
        <div className={styles.balanceWrapper}>
        <div>YOUR BALANCE</div>
        <div className={styles.balanceSold}>{currency} {balance}</div>
        </div>
    </div>
  );
}

export default Balance;