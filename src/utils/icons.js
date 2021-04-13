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
import styles from '../components/selectIcons/selectIcons.module.css';

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

export const iconsMap = {};
export const iconsMapDisplay = {};

iconsArr.forEach((el) => {
  const Icon = el.icon;
  const obj = {
    label: (
      <span className={styles.spanIcon}>
        <Icon size="20" />
      </span>
    ),
    value: el.value,
  };
  iconsMap[el.value] = obj;
});

iconsArr.forEach((el) => {
  const Icon = el.icon;
  const obj = {
    label: (props) => {
      const { color, padding } = props;
      const spanStyles = { backgroundColor: 'black' };
      if (color) {
        spanStyles.backgroundColor = color;
      }
      if (padding) {
        spanStyles.padding = padding;
      }
      return (
        <span className={styles.spanIcon} style={spanStyles}>
          <Icon size="20" />
        </span>
      );
    },
    value: el.value,
  };
  iconsMapDisplay[el.value] = obj;
});
