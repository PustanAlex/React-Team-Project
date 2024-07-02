import { useDispatch, useSelector } from 'react-redux';
import { IoExitOutline } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectUserName } from '../../redux/auth/selectors';
import styles from './Header.module.css';
import icons from '../../Images/Icons/icons.svg';
import { logout } from '../../redux/auth/authActions';

function Header() {
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());
    if (logout.fulfilled.match(resultAction)) 
      navigate('/login'); 
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
