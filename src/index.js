import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/Providers/Themeprovider';
import { BoilerplateProvider } from './context/Providers/BoilerplateProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <BoilerplateProvider>
        <App />
      </BoilerplateProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
