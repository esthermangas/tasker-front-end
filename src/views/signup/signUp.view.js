import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './signUp.module.css';
import Input from '../../components/input';
import Button from '../../components/button';
import { ReactComponent as TaskerLogo } from '../../assets/taskerLogo.svg';
import fetchResource from '../../utils/fetchResource';
import { setUserSession } from '../../utils/sesion';

const SignUp = () => {
  const history = useHistory();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChangeInput = (e, key) => {
    setErrors({ ...errors, [key]: '' });
    setData({ ...data, [key]: e.target.value });
  };
  const emailRegex = /\S+@\S+\.\S+/;
  const validateData = (dataToValidate) => {
    const validationErrors = {};
    if (!dataToValidate.firstName) {
      validationErrors.firstName = 'A user must have a name';
    }
    if (!dataToValidate.lastName) {
      validationErrors.lastName = 'A user must have a last name';
    }
    if (!emailRegex.test(dataToValidate.email)) {
      validationErrors.email = 'Enter a valid email';
    }
    if (!dataToValidate.password) {
      validationErrors.password = 'Enter a password';
    }
    if (dataToValidate.password !== dataToValidate.confirmPassword) {
      validationErrors.confirmPassword = 'The passwords do not match';
    }
    return validationErrors;
  };
  const handleSubmit = () => {
    const validationErrors = validateData(data);
    if (Object.keys(validationErrors).length === 0) {
      fetchResource('POST', 'register', { body: data })
        .then((res) => {
          setUserSession(res);
          history.push('/app');
        })
        .catch((apiError) => {
          setErrors({ ...apiError.response });
        });
    } else {
      setErrors({ ...validationErrors });
    }
  };
  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        <TaskerLogo className={styles.logo} />
        <h3 className={styles.title}>Sign Up</h3>
        <div className={styles.nameDiv}>
          <div className={styles.nameInput}>
            <Input
              label="Name"
              value={data.firstName}
              onChange={(e) => handleChangeInput(e, 'firstName')}
              error={errors && errors.firstName}
            />
          </div>
          <div className={styles.nameInput}>
            <Input
              label="Last Name"
              value={data.lastName}
              onChange={(e) => handleChangeInput(e, 'lastName')}
              error={errors && errors.lastName}
            />
          </div>
        </div>
        <div className={styles.input}>
          <Input
            label="Email"
            value={data.email}
            onChange={(e) => handleChangeInput(e, 'email')}
            error={errors && errors.email}
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
            value={data.confirmPassword}
            onChange={(e) => handleChangeInput(e, 'confirmPassword')}
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
