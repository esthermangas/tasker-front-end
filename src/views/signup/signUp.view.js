import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './signUp.module.css';
import Input from '../../components/input';
import Button from '../../components/button';
import { ReactComponent as TaskerLogo } from '../../assets/taskerLogo.svg';
import fetchResource from '../../utils/fetchResource';
import { setUserSession } from '../../utils/sesion';

const SignUp = () => {
  const history = useHistory();
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    if (data.password && data.password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'The passwords not matches' });
    }
  }, []);

  const handleChangeInput = (e, key) => {
    if (key === 'email') {
      setErrors({ ...errors, emailError: '' });
    }
    setData({ ...data, [key]: e.target.value });
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = (email) => {
    return emailRegex.test(email);
  };
  const handleSubmit = () => {
    if (validateEmail(data.email)) {
      fetchResource('POST', 'register', { body: data })
        .then((res) => {
          setUserSession(res);
          history.push('/app');
        })
        .catch((apiError) => setErrors({ ...errors, ...apiError.response }));
    } else {
      setErrors({ ...errors, emailError: 'Enter a valid email' });
    }
  };
  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        <TaskerLogo className={styles.logo} />
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.nameDiv}>
          <div className={styles.nameInput}>
            <Input
              label="Name"
              value={data.firstName}
              onChange={(e) => handleChangeInput(e, 'firstName')}
              error={errors && errors.name}
            />
          </div>
          <div className={styles.nameInput}>
            <Input
              label="Last Name"
              value={data.lastName}
              onChange={(e) => handleChangeInput(e, 'lastName')}
              errors={errors && errors.lastName}
            />
          </div>
        </div>
        <div className={styles.input}>
          <Input
            label="Email"
            value={data.email}
            onChange={(e) => handleChangeInput(e, 'email')}
            error={errors && errors.emailError}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Password"
            type="password"
            value={data.password}
            onChange={(e) => handleChangeInput(e, 'password')}
            error={errors && errors.password}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Confirm password"
            type="password"
            size="big"
            error={errors && errors.confirmPassword}
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
        </div>
        <div className={styles.button}>
          <Button label="ENTER" variant="primary" onClick={handleSubmit} />
        </div>
        <div className={styles.redirectText}>
          Are you registered already? Enter <Link to="/login">here</Link>.
        </div>
      </div>
    </div>
  );
};

export default SignUp;
