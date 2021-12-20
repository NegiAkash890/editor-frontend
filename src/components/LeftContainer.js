/* eslint-disable no-console */
/* eslint no-unused-vars: 0 */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { useTheme } from '../reducer/context/Themeprovider';

const LeftContainer = ({
  pre, ext, updateOutput, updateLoading,
}) => {
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(pre);
  const [input, setInput] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    setCode(pre);
  }, [pre]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };
  const takeInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLoading('true');
    const data = {
      language: ext,
      code,
      input,
    };

    axios
      .post('https://editor-backend-v1.herokuapp.com/compile', data)
      .then((res) => {
        updateLoading('false');
        if (res.data.result.output.search('error') !== -1) {
          return updateOutput(res, 'error');
        }
        return updateOutput(res, 'response');
      })
      .catch((err) => updateOutput(err, 'error'));
  };

  return (
    <div className="left__container">
      <div className="header__info">
        <div className="file__name">
          <span>
            code.
            {ext}
          </span>
        </div>
        <div>
          {/* Button for download & Submit */}
          <button className="btn" type="button">
            <img
              title="Run"
              src={`${process.env.PUBLIC_URL}/assets/play.png`}
              alt="Submit Code"
              onClick={handleSubmit}
            />
          </button>
        </div>
      </div>
      <div
        className={`code__body ${
          theme === 'light' ? 'code__body_light-mode' : ''
        }`}
      >
        <div className="logger__head_left">
          <h3 className="logger__heading">Editor</h3>
          <div className="tooltipBoundary">
            <Popup
              trigger={(
                <button
                  type="button"
                  style={{ backgroundColor: 'blueviolet', border: 'none' }}
                >
                  <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                    <img
                      width="24px"
                      src={`${process.env.PUBLIC_URL}/assets/copy.png`}
                      alt="Copy to ClipBoard"
                      title="Copy Code"
                    />
                  </CopyToClipboard>
                </button>
              )}
              position={['top center', 'bottom right', 'bottom left']}
              closeOnDocumentClick
              keepTooltipInside=".tooltipBoundary"
            >
              Copied!
            </Popup>
          </div>
        </div>
        <form>
          {/* textarea for codeblock */}
          <textarea
            className={`code__block ${
              theme === 'light' ? 'code__block_light-mode' : ''
            }`}
            spellCheck="false"
            placeholder="Input the Code Here"
            onChange={handleChange}
            // defaultValue={pre}
            value={code}
            // defaultValue={boilerplateCode}
          />
          {/* textarea for Input Data */}
          <textarea
            placeholder="Input the Data Here"
            spellCheck="false"
            onChange={takeInput}
            className={`input__block ${
              theme === 'light' ? 'input__block_light-mode' : ''
            }`}
            default={input}
          />
        </form>
      </div>
    </div>
  );
};
LeftContainer.propTypes = {
  pre: PropTypes.string.isRequired,
  ext: PropTypes.string.isRequired,
  updateOutput: PropTypes.func.isRequired,
  updateLoading: PropTypes.func.isRequired,
};
export default LeftContainer;
