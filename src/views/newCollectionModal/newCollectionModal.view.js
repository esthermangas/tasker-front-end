import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './newCollectionModal.module.css';
import Modal from '../../components/modal';
import Input from '../../components/input';
import Select from '../../components/selectIcons';
import Button from '../../components/button';
import taskerTypes from '../../context/types';
import fetchResource from '../../utils/fetchResource';
import ColorPicker from '../../components/colorPicker';

const NewCollectionModal = (props) => {
  const {
    openModal,
    closeModal,
    setRefresh,
    setRefreshColection,
    editData,
    cleanEditValues,
  } = props;
  const [colData, setColData] = useState({ icon: '', name: '', color: '#e21b1b' });
  const [error, setError] = useState({});
  const editMode = () => {
    return Object.keys(editData).length > 0;
  };
  useEffect(() => {
    if (editMode()) {
      setColData({ name: editData.name, icon: editData.icon, color: editData.color });
    }
  }, [editData]);
  const handleNameCollection = (e) => {
    setColData({ ...colData, name: e.target.value });
  };
  const handleSelectIcon = (obj) => {
    setColData({ ...colData, icon: obj.value });
  };

  const handleChangeColor = (newColor) => {
    setColData({ ...colData, color: newColor });
  };

  const handleCloseModal = () => {
    closeModal();
    setColData({ icon: '', name: '', color: '#e21b1b' });
    cleanEditValues();
    setError({});
  };

  const handleSubmit = () => {
    if (!editMode()) {
      if (colData.name) {
        fetchResource('POST', 'colection', { body: colData }, {}).then(() => {
          setRefresh(true);
          closeModal();
          setColData({ icon: '', name: '', color: '#e21b1b' });
          setError({});
        });
      } else {
        setError({ name: 'Collection needs a name' });
      }
    }
    if (editMode()) {
      if (colData.name) {
        const finalData = {
          name: colData.name,
          icon: colData.icon,
          color: colData.color,
        };
        fetchResource('PATCH', `colection/${editData.id}`, { body: finalData }, {}).then(() => {
          setRefreshColection(true);
          cleanEditValues();
          closeModal();
          setError({});
        });
      } else {
        setError({ name: 'Collection needs a name' });
      }
    }
  };

  return (
    <Modal open={openModal} closeModal={handleCloseModal}>
      <div className={styles.modalContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.data}>
            <Select value={colData.icon} onChange={handleSelectIcon} />
            <div className={styles.dataPicker}>
              <ColorPicker color={colData.color} onChange={handleChangeColor} />
            </div>
          </div>
          <div className={styles.input}>
            <Input
              label="New collection name"
              value={colData.name}
              onChange={handleNameCollection}
              error={error.name}
            />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          {!editMode() && <Button label="create" variant="primary" onClick={handleSubmit} />}
          {editMode() && <Button label="update" variant="primary" onClick={handleSubmit} />}
          <Button label="cancel" variant="secondary" onClick={handleCloseModal} />
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    openModal: state.modal,
    editData: state.toEditColection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: taskerTypes.MODAL_CLOSE }),
    setRefresh: (value) => dispatch({ type: taskerTypes.SET_REFRESH, payload: value }),
    setRefreshColection: (value) =>
      dispatch({ type: taskerTypes.SET_REFRESH_COLECTION, payload: value }),
    cleanEditValues: () => dispatch({ type: taskerTypes.CLEAN_EDIT_MODAL_FORM }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCollectionModal);
