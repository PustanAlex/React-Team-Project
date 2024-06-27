import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/auth/authActions';
import { MdEmail } from 'react-icons/md';
import { IoMdLock } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import styles from './Register.module.css'; 

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Repeat Password is required'),
    }),
    onSubmit: async (values) => {
      const { username, email, password } = values;
      const resultAction = await dispatch(registerUser({ username, email, password }));
      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/login');
      }
    },
  });

  return (
    <div className={styles.boxForm} >
      <div className={styles.registerBox}>
      <div className={styles.gradient}></div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <p className={styles.title}>Register</p>

        <div className={styles.labelBox}>
          <label htmlFor="username" className={styles.label}></label>
          <div className={styles.inputBox}>
            <FaUser className={styles.userIcon} />
            <input
              id="username"
              type="text"
              placeholder="Username"
              {...formik.getFieldProps('username')}
              className={styles.inputField}
            />
          </div>
          {formik.touched.username && formik.errors.username ? (
            <p className={styles.error}>{formik.errors.username}</p>
          ) : null}
        </div>

        <div className={styles.labelBox}>
          <label htmlFor="email" className={styles.label}></label>
          <div className={styles.inputBox}>
            <MdEmail className={styles.emailIcon} />
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              {...formik.getFieldProps('email')}
              className={styles.inputField}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p className={styles.error}>{formik.errors.email}</p>
          ) : null}
        </div>

        <div className={styles.labelBox}>
          <label htmlFor="password" className={styles.label}></label>
          <div className={styles.inputBox}>
            <IoMdLock className={styles.passwordIcon} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...formik.getFieldProps('password')}
              className={styles.inputField}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eye}>
              {showPassword ? <VscEyeClosed className={styles.noEyeIcon} /> : <VscEye className={styles.eyeIcon} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className={styles.error}>{formik.errors.password}</p>
          ) : null}
        </div>

        <div className={styles.labelBox}>
          <label htmlFor="repeatPassword" className={styles.label}></label>
          <div className={styles.inputBox}>
            <IoMdLock className={styles.passwordIcon} />
            <input
              id="repeatPassword"
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...formik.getFieldProps('repeatPassword')}
              className={styles.inputField}
            />
            <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className={styles.eye}>
              {showRepeatPassword ? <VscEyeClosed className={styles.noEyeIcon} /> : <VscEye className={styles.eyeIcon} />}
            </button>
          </div>
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <p className={styles.error}>{formik.errors.repeatPassword}</p>
          ) : null}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.registerButton}>Register</button>
        <Link to="/login" className={styles.link}>Login</Link>
      </form>
    </div>
    </div>
  );
};

export default Register;
