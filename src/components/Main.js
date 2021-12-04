/* eslint no-unused-vars: 0 */
import React, { useState } from 'react';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import SelectBar from './SelectBar';

const Main = () => {
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState('cpp');
  const [error, setError] = useState(false);
  const [intial, setIntial] = useState('');
  const [loading, setLoading] = useState('false');

  const updateOutput = (res, type) => {
    if (type === 'clear') {
      setOutput('Console Cleared');
    } else if (type === 'error') {
      setError(true);
      setOutput(res.data.result.output);
    } else {
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
    <div className="main__container">
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
        />
      </div>
    </div>
  );
};

export default Main;
