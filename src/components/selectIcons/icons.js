import {
  FiBookOpen,
  FiBriefcase,
  FiDribbble,
  FiFolder,
  FiClipboard,
  FiCoffee,
  FiHome,
  FiMap,
  FiShoppingCart,
  FiShoppingBag,
  FiUsers,
  FiUser,
} from 'react-icons/fi';
import styles from './selectIcons.module.css';
import { hashCode, intToRGB } from '../../utils/randomColorsGenerator';

const iconsArr = [
  { icon: FiBookOpen, value: 'School' },
  { icon: FiBriefcase, value: 'Job' },
  { icon: FiDribbble, value: 'Sport' },
  { icon: FiFolder, value: 'Folder' },
  { icon: FiClipboard, value: 'Clipboard' },
  { icon: FiCoffee, value: 'FreeTime' },
  { icon: FiHome, value: 'HouseWorks' },
  { icon: FiMap, value: 'Travels' },
  { icon: FiShoppingCart, value: 'CartShopping' },
  { icon: FiShoppingBag, value: 'BagShopping' },
  { icon: FiUsers, value: 'FriendsTime' },
  { icon: FiUser, value: 'Personal' },
];

const iconsMap = {};

iconsArr.forEach((el) => {
  const Icon = el.icon;
  const obj = {
    label: (
      <span
        className={styles.spanIcon}
        style={{ backgroundColor: `#${intToRGB(hashCode(el.value))}` }}
      >
        <Icon size="20" />
      </span>
    ),
    value: el.value,
  };
  iconsMap[el.value] = obj;
});

export default iconsMap;
