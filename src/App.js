import Footer from './components/Footer';
import Main from './components/Main';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App"> 
      {/* Landing Navigation Bar */}
      
      <NavBar/>

      {/* Main Container */}
      
      <Main/>

      {/* Footer Container */}

      <Footer/>
    </div>
  );
}

export default App;
