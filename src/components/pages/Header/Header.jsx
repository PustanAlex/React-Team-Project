import React from 'react';
import { useSelector } from 'react-redux';
import { IoExitOutline } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectUserName } from '../../redux/selectors';
import axios from 'axios';
import styles from './Header.module.css';
import icons from '../../Images/Icons/icons.svg';

function Header() {
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('https://wallet.b.goit.study/api/auth/sign-out', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token'); 
      navigate('/login'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={styles.styledHeader}>
      <div className={styles.headerWrapper}>
        <NavLink to="/dashboard" className={styles.logoWrapper}>
          <svg width={17} height={17}>
            <use href={`${icons}#icon-Logo`} />
          </svg>
          <p>Money Guard</p>
        </NavLink>
        <div className={styles.userInfoWrapper}>
          <span className={styles.usernameText}>{userName}</span>
          <button className={styles.styledExit} onClick={handleLogout}>
            <IoExitOutline size={18} />
            <p className={styles.exitText}>Exit</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
