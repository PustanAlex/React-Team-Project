import { NavLink } from "react-router-dom";
import styles from './home/home.module.css';
import icons from '../../Images/Icons/symbol-defs.svg';


function Navigation() {
    return (
      <menu className={styles.navLinks}>
        <li className={styles.linkContainer}>
          <NavLink to="/home">
          <div>
          <svg className={styles.iconenvelope}  width={24} height={24}>
              <use href={icons+"#icon-baseline-home"}></use>
          </svg><span>Home</span>
          </div>
        </NavLink></li>
        <li className={styles.linkContainer} >
          <NavLink to="/statistics">
           <div>
           <svg className={styles.iconenvelope} >
              <use href={icons+"#icon-baseline-statistics"}></use>
          </svg><span>Statistics</span>
           </div>
        </NavLink></li>
      </menu>
    );
}

export default Navigation;