import Navigation from './Navigation';
import Balance from './Balance';
import Currency from './Currency';
import styles from './home/home.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { selectorIsLoading } from '../../redux/transactions/selectors';
import Loader from '../Loader';


function DashboardPage() {
  const isLoading = useSelector(selectorIsLoading);
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
          <div className={styles.rightContainer}>
            <Outlet />
          </div>
        </div>
      </div>
      <Loader hidden={!isLoading} />
    </>
  );
}
export default DashboardPage;