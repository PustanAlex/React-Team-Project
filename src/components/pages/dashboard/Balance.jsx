import { useSelector } from 'react-redux';
import styles from './home/home.module.css';
import { selectBalance } from '../../redux/auth/selectors';

function Balance() {
const currency = "lei";
const balance = (+useSelector(selectBalance)).toFixed(2);

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