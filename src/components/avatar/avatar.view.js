import React from 'react';
import styles from './avatar.module.css';
import { displayName, intToRGB, hashCode } from '../../utils/avatarFunctions';

const Avatar = (props) => {
  const { name } = props;
  return (
    <div>
      <span className={styles.img} style={{ backgroundColor: `#${intToRGB(hashCode(name))}` }}>
        {displayName(name)}
      </span>
    </div>
  );
};

export default Avatar;
