import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import styles from './index.module.css';

const Preloader = () => (
  <div className={styles.preload}>
    <img
      className={styles.logo}
      src={`${process.env.PUBLIC_URL}/assets/main-logo.png`}
      alt="Loading ..."
      height="150rem"
    />
    <br />
    <PropagateLoader size="20px" />
  </div>
);

export default Preloader;
