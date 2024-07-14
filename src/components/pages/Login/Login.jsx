import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/authActions';
import { MdEmail } from 'react-icons/md';
import { IoMdLock } from 'react-icons/io';
import styles from './Login.module.css';
import icons from '../../Images/Icons/icons.svg';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      }
    },
  });

  return (
    <div className={styles.loginContainer}>


      <div className={styles.loginBox}>
        <div className={styles.logoGroup}>
          <svg className={styles.iconLogo} width={25} height={25}>
            <use href={`${icons}#icon-Logo`} />
          </svg>
          <span className={styles.title}>Money Guard</span>
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              <MdEmail className={styles.icon} />
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps('email')}
                className={styles.formInput}
                autoComplete="email"
              />
            </label>
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              <IoMdLock className={styles.icon} />
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...formik.getFieldProps('password')}
                className={styles.formInput}
                autoComplete="current-password"
              />
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>

          {error && <div className={styles.errorColor}>{error}</div>}

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <Link to="/register" className={styles.registerLink}>
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};


export default LoginForm;

