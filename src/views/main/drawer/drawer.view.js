import React from 'react';
import { connect } from 'react-redux';
import { Drawer as MaterialDrawer, makeStyles } from '@material-ui/core';
import List from '../../../components/list';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 50,
    backgroundColor: '#222831',
    color: 'white',
    maxWidth: 200,
    overflow: 'hidden',
    zIndex: 1,
  },
  anchorLeft: {
    borderRight: 'none',
  },
}));

const collection = [
  'School',
  'Jobfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  'Home',
  'Gym',
];
const Drawer = (props) => {
  const { openDrawer } = props;
  const materialStyles = useStyles();
  return (
    <MaterialDrawer
      variant="persistent"
      anchor="left"
      open={openDrawer}
      classes={{ paper: materialStyles.paper, paperAnchorDockedLeft: materialStyles.anchorLeft }}
    >
      <List items={collection} />
    </MaterialDrawer>
  );
};

const mapStateToProps = (state) => {
  return {
    openDrawer: state.drawer,
  };
};

export default connect(mapStateToProps)(Drawer);
