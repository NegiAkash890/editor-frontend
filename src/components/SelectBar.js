import React, { useState } from 'react';
import './Main.css';
import PropTypes from 'prop-types';
import { useBoilerplate } from '../context/Providers/BoilerplateProvider';

const SelectBar = ({ changeLanguage }) => {
  const [lang, setLang] = useState('cpp');
  const { setBoilerplateCode } = useBoilerplate();

  const handleClick = (e, value) => {
    switch (value) {
      case 'cpp':
        e.target.setAttribute(
          'src',
          `${process.env.PUBLIC_URL}/assets/c-active.png`,
        );
        setLang('cpp');
        break;
      case 'java':
        e.target.setAttribute(
          'src',
          `${process.env.PUBLIC_URL}/assets/java-active.png`,
        );
        setLang('java');
        break;
      case 'py':
        e.target.setAttribute(
          'src',
          `${process.env.PUBLIC_URL}/assets/py-active.png`,
        );
        setLang('py');
        break;
      case 'js':
        e.target.setAttribute(
          'src',
          `${process.env.PUBLIC_URL}/assets/js-active.png`,
        );
        setLang('js');
        break;
      default:
    }
    changeLanguage(value);
  };
  return (
    <div className="select__bar">
      <img
        src={
          lang === 'cpp'
            ? `${process.env.PUBLIC_URL}/assets/c-active.png`
            : `${process.env.PUBLIC_URL}/assets/c-inactive.png`
        }
        alt="C++"
        width="60px"
        onClick={(e) => {
          setBoilerplateCode({ type: 'CPP' });
          handleClick(e, 'cpp');
        }}
      />
      <img
        src={
          lang === 'java'
            ? `${process.env.PUBLIC_URL}/assets/java-active.png`
            : `${process.env.PUBLIC_URL}/assets/java-inactive.png`
        }
        alt="JS"
        width="60px"
        onClick={(e) => {
          setBoilerplateCode({ type: 'JAVA' });
          handleClick(e, 'java');
        }}
      />
      <img
        src={
          lang === 'py'
            ? `${process.env.PUBLIC_URL}/assets/py-active.png`
            : `${process.env.PUBLIC_URL}/assets/py-inactive.png`
        }
        alt="Python"
        width="60px"
        onClick={(e) => {
          setBoilerplateCode({ type: 'PYTHON' });
          handleClick(e, 'py');
        }}
      />
      <img
        src={
          lang === 'js'
            ? `${process.env.PUBLIC_URL}/assets/js-active.png`
            : `${process.env.PUBLIC_URL}/assets/js-inactive.png`
        }
        alt="Javascript"
        width="60px"
        style={{ backgroundColor: lang === 'js' ? 'white' : 'initial' }}
        onClick={(e) => {
          setBoilerplateCode({ type: 'JAVASCRIPT' });
          handleClick(e, 'js');
        }}
      />
    </div>
  );
};
SelectBar.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};
export default SelectBar;
