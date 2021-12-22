import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import preload from './SplashScreen.module.css';

const Preloader = () => (
  <div className={preload.preload}>
    <img
      className={preload.logo}
      src={`${process.env.PUBLIC_URL}/assets/main-logo.png`}
      alt=""
      height="150rem"
    />
    <br />
    <PropagateLoader size="20px" />
  </div>
);

export default Preloader;
