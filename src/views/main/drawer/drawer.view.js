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
    boxShadow: '1px 8px 8px 1px rgb(0 0 0 / 62%)',
  },
  anchorLeft: {
    borderRight: 'none',
  },
}));

const Drawer = (props) => {
  const { openDrawer, colections } = props;
  const materialStyles = useStyles();
  return (
    <MaterialDrawer
      variant="persistent"
      anchor="left"
      open={openDrawer}
      classes={{ paper: materialStyles.paper, paperAnchorDockedLeft: materialStyles.anchorLeft }}
    >
      <List items={colections} />
    </MaterialDrawer>
  );
};

const mapStateToProps = (state) => {
  return {
    openDrawer: state.drawer,
    colections: state.colections,
  };
};

export default connect(mapStateToProps)(Drawer);
