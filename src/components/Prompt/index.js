import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const ResetPrompt = ({ handleResetCode }) => (
  <Popup
    trigger={(
      <button className="btn" type="button">
        <img
          src={`${process.env.PUBLIC_URL}/assets/reset.png`}
          title="Reset"
          alt="Reset Code"
          width="24px"
          style={{ marginRight: '-15px' }}
        />
      </button>
)}
    modal
    nested
    contentStyle={{
      width: '85%', maxWidth: '500px', textAlign: 'center',
    }}
  >
    {(close) => (
      <div className={styles.modal}>
        <button className={styles.close} onClick={close} type="button">
          &times;
        </button>
        <div className={styles.header}> Reset Code </div>
        <div className="content">
          Are you sure you want to reset the current code? Your current written code will be lost.
        </div>
        <div className={styles.actions}>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              handleResetCode();
              close();
            }}
          >
            Reset
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </Popup>
);
ResetPrompt.propTypes = {
  handleResetCode: PropTypes.func.isRequired,
};
export default ResetPrompt;
