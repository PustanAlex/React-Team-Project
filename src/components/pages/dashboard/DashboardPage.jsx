import Navigation from './Navigation';
import Balance from './Balance';
import Currency from './Currency';
import styles from './home/home.module.css';
import { Outlet } from 'react-router-dom';
import Home from './home/Home'
import Header from '../Header/Header';


function DashboardPage() {
  return (
    <>
      <Header />
      <div className={styles.homeContainer}>
        <div className={styles.leftSide}>
          <Navigation />
          <Balance />
          <Currency />
        </div>
        <div className={styles.rightSide}>
          <Home />
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default DashboardPage;