import ReactSelect from 'react-select';
import { connect } from 'react-redux';
import styles from './selectColection.module.css';
import { iconsMapDisplay } from '../../utils/icons';

const SelectColection = (props) => {
  const { value, onChange, colections } = props;
  const colectionsArr = colections.map((colection) => {
    const Icon = iconsMapDisplay[colection.icon].label;
    return {
      label: (
        <div style={{ color: 'black', display: 'flex', alignItems: 'center' }}>
          <Icon size="20" color={colection.color} />
          <div>{colection.name}</div>
        </div>
      ),
      value: colection.id,
    };
  });
  return (
    <ReactSelect
      className={styles.select}
      options={colectionsArr}
      value={value}
      placeholder="Colection"
      onChange={onChange}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    colections: state.colections,
  };
};

export default connect(mapStateToProps, null)(SelectColection);
