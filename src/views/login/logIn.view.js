import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './logIn.module.css';
import Input from '../../components/input';
import Button from '../../components/button';
import { ReactComponent as TaskerLogo } from '../../assets/taskerLogo.svg';

const LogIn = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const handleChangeInput = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        <TaskerLogo className={styles.logo} />
        <h1 className={styles.title}>Log In</h1>
        <div className={styles.input}>
          <Input
            label="Email"
            size="big"
            value={data.email}
            onChange={(e) => handleChangeInput(e, 'email')}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Password"
            type="password"
            size="big"
            value={data.password}
            onChange={(e) => handleChangeInput(e, 'password')}
          />
        </div>
        <div className={styles.button}>
          <Button label="ENTER" variant="primary" />
        </div>
        <div className={styles.redirectText}>
          Are you not registered yet? Do it <Link to="/signup">here</Link>.
        </div>
      </div>
    </div>
  );
};

export default LogIn;
