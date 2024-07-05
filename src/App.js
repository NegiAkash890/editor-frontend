import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import NavBar from './components/NavBar';
import './App.css';
import Preloader from './components/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="App">
      <NavBar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
