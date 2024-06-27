import Navigation from './Navigation';
import Balance from './Balance';
import Currency from './Currency';
import styles from './home/home.module.css';
import { Outlet } from 'react-router-dom';
import Home from './home/Home'


function DashboardPage() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftSide}>
        <Navigation />
        <Balance />
        <Currency />
      </div>
      <div className={styles.rightSide}>
        <Home/>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;