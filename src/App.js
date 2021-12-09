import Footer from './components/Footer';
import Main from './components/Main';
import NavBar from './components/NavBar';
import './App.css';
import { LanguageContextProvider } from './components/Context/languageContext';
import { useState } from 'react';

function App() {
  const [language,setLanguage] = useState('cpp');
  return (
    <div className="App">
    <LanguageContextProvider value={{language,setLanguage}}>
      {/* Landing Navigation Bar */}
      
      <NavBar/>

      {/* Main Container */}
      
      <Main/>

      {/* Footer Container */}

      <Footer/>
    </LanguageContextProvider> 
    </div>
  );
}

export default App;
