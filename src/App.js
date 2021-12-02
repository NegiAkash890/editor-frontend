import Footer from "./components/Footer";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import React, { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./App.css";

const App = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? (
    // If page is still loading then splash screen
    <div className="splash">
      <img
        src={`${process.env.PUBLIC_URL}/assets/main-logo.png`}
        alt=""
        width="auto"
        height="auto"
      />
      <PropagateLoader size="20" />
    </div>
  ) : (
    <div className="App">
      {/* Landing Navigation Bar */}

      <NavBar />

      {/* Main Container */}

      <Main />

      {/* Footer Container */}

      <Footer />
    </div>
  );
};

export default App;
