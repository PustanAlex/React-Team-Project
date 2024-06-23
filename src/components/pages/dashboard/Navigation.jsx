import { NavLink } from "react-router-dom";
import styles from './home/home.module.css';
import icons from '../../Images/Icons/symbol-defs.svg';


function Navigation() {
    return (
      <menu className={styles.navLinks}>
        <li><NavLink to="/home">
          <svg className="icon iconenvelope" width={38} height={38}>
              <use href={icons+"#icon-baseline-home"}></use>
          </svg>Home
        </NavLink></li>
        <li><NavLink to="/statistics">
            <svg className="icon iconenvelope" width={38} height={38}>
              <use href={icons+"#icon-baseline-statistics"}></use>
          </svg>Statistics
        </NavLink></li>
      </menu>
    );
}

export default Navigation;