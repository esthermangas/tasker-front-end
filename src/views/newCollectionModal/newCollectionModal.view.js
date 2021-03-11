import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './newCollectionModal.module.css';
import Modal from '../../components/modal';
import Input from '../../components/input';
import Select from '../../components/selectIcons';
import Button from '../../components/button';
import taskerTypes from '../../context/types';

const NewCollectionModal = (props) => {
  const { openModal, closeModal } = props;
  const [colData, setColData] = useState({ icon: '', name: '' });
  const handleCreateCollection = (e) => {
    setColData({ ...colData, name: e.target.value });
  };
  const handleSelectIcon = (obj) => {
    setColData({ ...colData, icon: obj.value });
  };
  const handleCloseModal = () => {
    closeModal();
    setColData({ icon: '', name: '' });
  };
  return (
    <Modal open={openModal} closeModal={handleCloseModal}>
      <div className={styles.modalContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.select}>
            <Select value={colData.icon} onChange={handleSelectIcon} />
            <div className={styles.input}>
              <Input
                label="New collection name"
                value={colData.name}
                onChange={handleCreateCollection}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button label="create" variant="primary" onClick={handleCreateCollection} />
          <Button label="cancel" variant="secondary" onClick={handleCloseModal} />
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    openModal: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: taskerTypes.MODAL_CLOSE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCollectionModal);
