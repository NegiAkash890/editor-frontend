import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import Reset from '../../icons/Reset';

const baseCSSStyles = {
  background: 'none',
  border: 'none',
};

const ResetPrompt = ({ handleResetCode }) => (
  <Popup
    contentStyle={baseCSSStyles}
    trigger={
    (
      <button className="btn_wt_icon" type="button">
        <Reset width={16} height={16} />
        Reset
      </button>
    )
    }
    closeOnEscape
    modal
  >
    {(close) => (
      <div className={styles.modal}>
        <button className={styles.close} onClick={close} type="button">
          &times;
        </button>
        <div className={styles.heading}> Reset Code </div>
        <div className={styles.content}>
          Are you sure you want to reset the current code? Your current written code will be lost.
        </div>
        <div>
          <button
            className={styles.actions}
            type="button"
            onClick={() => {
              handleResetCode();
              close();
            }}
          >
            Yes
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
