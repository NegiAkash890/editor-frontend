/* eslint-disable no-console */
/* eslint no-unused-vars: 0 */
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { Controlled as ControlledEditor } from 'react-codemirror2-react-17';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import { useTheme } from '../context/Providers/Themeprovider';
import downloadFile from '../utils/downloadFile';
import defaultConfig from '../utils/controlledEditorConfig';

const LeftContainer = ({
  pre, ext, updateOutput, updateLoading,
}) => {
  const [_copied, setCopied] = useState(false);
  const [code, setCode] = useState(pre);
  const [defaultTextAreaInput, setInput] = useState(null);
  const [fileinput, setFileInput] = useState();
  const [mode, setMode] = useState(ext);
  const hiddenFileInput = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setCode(pre);
    }, 0.5);
  }, [pre]);

  // set the language mode as per the file extension
  const setLanguageMode = () => {
    switch (ext) {
      case 'cpp':
        setMode('text/x-c++src');
        break;
      case 'java':
        setMode('text/x-java');
        break;
      case 'py':
        setMode('text/x-python');
        break;
      case 'js':
        setMode('text/javascript');
        break;
      default:
    }
  };

  useEffect(() => {
    setLanguageMode();
  }, [ext]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/')
      .then((_) => console.log('Ping'));
  }, []);

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setFileInput(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  useEffect(() => {
    setCode(fileinput);
  }, [fileinput]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const downloadTxtFile = () => downloadFile(code, 'myCode', ext);

  const handleControlledBeforeChangeCallBack = (_, __, value) => {
    setCode(value);
  };

  const handleTextAreaChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLoading('true');
    const data = {
      language: ext,
      code,
      input: defaultTextAreaInput,
    };

    axios
      .post('http://localhost:8080/compile', data)
      .then((res) => {
        updateLoading('false');
        if (res.data.result.stderr) {
          return updateOutput(res.data.result.stderr, 'error');
        }
        return updateOutput(res.data.result.stdout, 'response');
      })
      .catch((err) => {
        updateOutput(err, 'error');
      });
  };

  const config = defaultConfig(mode, theme, handleSubmit);
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
          <button className="btn" type="button" onClick={handleClick}>
            <img
              title="Upload Icon"
              src={`${process.env.PUBLIC_URL}/assets/upload.png`}
              alt="Upload Code"
              width="16px"
            />
          </button>
          <input
            type="file"
            onChange={showFile}
            style={{ display: 'none' }}
            ref={hiddenFileInput}
          />
          {/* Button for download & Submit */}
          <button className="btn" type="button">
            <img
              title="Run"
              src={`${process.env.PUBLIC_URL}/assets/play.png`}
              alt="Submit Code"
              onClick={handleSubmit}
              width="18px"
            />
          </button>
        </div>
      </div>
      <div
        className={`code__body ${theme === 'light' ? 'code__body_light-mode' : ''
        }`}
      >
        <div className="logger__head_left">
          <h3 className="logger__heading">Editor</h3>
          <div className="tooltipBoundary">
            <button className="btn" type="button">
              <img
                title="Download"
                src={`${process.env.PUBLIC_URL}/assets/download.png`}
                alt="Submit Code"
                onClick={downloadTxtFile}
              />
            </button>
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
          {/* code editor component */}
          <ControlledEditor
            onBeforeChange={handleControlledBeforeChangeCallBack}
            value={code}
            className="code-mirror-wrapper"
            options={config}
          />
          {/* textarea for Input Data */}
          <textarea
            placeholder="Input the Data Here"
            spellCheck="false"
            onChange={handleTextAreaChange}
            className={`input__block ${theme === 'light' ? 'input__block_light-mode' : ''
            }`}
            default={defaultTextAreaInput}
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
