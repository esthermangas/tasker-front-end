import React, { useState } from 'react';
import { FiArrowRight, FiChevronDown } from 'react-icons/all';
import classNames from 'classnames';
import styles from './accordion.module.css';
import iconsMap from '../selectIcons/icons';
import Item from './item/item.view';

const Accordion = (props) => {
  const { collection, tasks } = props;
  const icon = iconsMap[collection.icon].label;
  const [open, setOpen] = useState(false);
  const handleClickToOpen = () => {
    setOpen(!open);
  };
  const itemsContainerClass = classNames(styles.itemsContainer, {
    [styles.itemsContainerOpened]: open,
  });
  const footerClass = classNames(styles.footer, {
    [styles.footerClose]: !open,
  });
  const iconClass = classNames(styles.icon, {
    [styles.iconOpen]: open,
  });
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer} onClick={handleClickToOpen}>
        <div className={styles.nameContainer}>
          <span>{icon}</span>
          <div className={styles.name}>{collection.name}</div>
        </div>
        <span className={iconClass}>
          <FiChevronDown size="20" />
        </span>
      </div>
      <div className={itemsContainerClass}>
        {tasks && tasks.length > 0 && tasks.map((task) => <Item task={task} />)}
      </div>
      <div className={footerClass}>
        <div className={styles.footerText}>Go to Collection</div>
        <span className={styles.footerIcon}>
          <FiArrowRight />
        </span>
      </div>
    </div>
  );
};
export default Accordion;
