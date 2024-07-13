import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from './index.module.css';
import Info from '../../icons/Info';
import { useTheme } from '../../context/Providers/Themeprovider';

const PopUpText = () => {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? 'white' : 'black';
  return (
    <Popup
      trigger={
        <Info width={30} height={30} stroke={accentColor} fill={accentColor} />
      }
      modal
    >
      {(close) => (
        <div className={styles.modal}>
          <div className={styles.header}>
            <div className={styles.heading}>About Project</div>
            <button className={styles.close} onClick={close} type="button">
              &times;
            </button>
          </div>
          <div className={styles.content}>
            {`
            Welcome to Online Compiler
            Currently, the Project supports for
              Python
              ,C++,
              JavaScript
              and
              Java
               This is an
              open-source project
              and contributions are appreciated. If interested or you have any
              suggestion click the
              GitHub
              icon at the bottom and raise an
              issue.
            `}
          </div>
          <div>
            <a className={styles.actions} href="https://github.com/NegiAkash890/editor-frontend">
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopUpText;
