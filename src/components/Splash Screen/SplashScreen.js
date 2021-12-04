import React from "react";
import preload from "./SplashScreen.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";

const Preloader = () => {
  return (
    <div className={preload.preload}>
      <img
        className={preload.logo}
        src={`${process.env.PUBLIC_URL}/assets/main-logo.png`}
        alt=""
        height="150rem"
      />
      <br />
      <PropagateLoader size="20" />
    </div>
  );
};

export default Preloader;

