/* eslint no-unused-vars: 0 */
import React, { useState } from 'react';
import { useTheme } from '../reducer/context/Themeprovider';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import SelectBar from './SelectBar';

const Main = () => {
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState('cpp');
  const [error, setError] = useState(false);
  const [intial, setIntial] = useState('');
  const [loading, setLoading] = useState('false');
  const { theme } = useTheme();
  const [disable, setDisable] = useState(false);

  const updateOutput = (res, type) => {
    if (type === 'clear') {
      setOutput('Console Cleared');
      setDisable(true);
    } else if (type === 'error') {
      setDisable(false);
      setError(true);
      setOutput(res.data.result.output);
    } else {
      setDisable(false);
      setOutput(res.data.result.output);
    }
  };

  const updateError = (value) => {
    setError(value);
  };
  const updateLoading = (status) => {
    setLoading(status);
  };
  const changeLanguage = (value) => {
    setLang(value);
  };

  return (
    <div
      className={`main__container ${
        theme === 'light' ? 'main__container_light-mode' : ''
      }`}
    >
      <SelectBar changeLanguage={changeLanguage} />
      <div className="content__area">
        <LeftContainer
          ext={lang}
          pre={intial}
          updateOutput={updateOutput}
          updateLoading={updateLoading}
          updateError={updateError}
          loading={loading}
        />
        <RightContainer
          output={output}
          loading={loading}
          updateOutput={updateOutput}
          error={error}
          disable={disable}
        />
      </div>
    </div>
  );
};

export default Main;
