import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import NavBar from './components/NavBar';
import './App.css';
import Preloader from './components/Splash Screen/SplashScreen';

const App = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    // If page is still loading then splash screen
    <Preloader />
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
