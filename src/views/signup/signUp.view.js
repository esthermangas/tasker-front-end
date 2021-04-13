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
  const [error, setError] = useState('');
  const [bknError, setBknError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    if (data.password && data.password !== confirmPassword) {
      setError('The passwords not matches');
    }
  }, []);

  const handleChangeInput = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = () => {
    fetchResource('POST', 'register', { body: data })
      .then((res) => {
        setUserSession(res);
        history.push('/home');
      })
      .catch((apiError) => setBknError(apiError.response));
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
            />
          </div>
          <div className={styles.nameInput}>
            <Input
              label="Last Name"
              value={data.lastName}
              onChange={(e) => handleChangeInput(e, 'lastName')}
            />
          </div>
        </div>
        <div className={styles.input}>
          <Input
            label="Email"
            value={data.email}
            onChange={(e) => handleChangeInput(e, 'email')}
            error={bknError.error && bknError.error.email}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Password"
            type="password"
            value={data.password}
            onChange={(e) => handleChangeInput(e, 'password')}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Confirm password"
            type="password"
            size="big"
            error={error}
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
