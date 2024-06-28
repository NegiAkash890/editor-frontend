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
import 'codemirror/addon/edit/closebrackets';
import { useTheme } from '../context/Providers/Themeprovider';
import { useBoilerplate } from '../context/Providers/BoilerplateProvider';

const LeftContainer = ({
  pre, ext, updateOutput, updateLoading,
}) => {
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState();
  const [input, setInput] = useState(null);
  const [fileinput, setFileInput] = useState();
  const [mode, setMode] = useState(ext);
  const { theme } = useTheme();
  const { boilerplateCode } = useBoilerplate();

  useEffect(() => {
    setTimeout(() => {
      setCode(pre);
    }, 0.5);
  }, [pre]);

  useEffect(() => {
    if (localStorage.getItem(mode)) {
      setCode(localStorage.getItem(mode));
    }
  }, [mode]);

  // set the language mode as per the file extension
  const setLanguageMode = () => {
    let newMode = '';
    switch (ext) {
      case 'cpp':
        newMode = 'text/x-c++src';
        break;
      case 'java':
        newMode = 'text/x-java';
        break;
      case 'py':
        newMode = 'text/x-python';
        break;
      case 'js':
        newMode = 'text/javascript';
        break;
      default:
    }
    setMode((prevMode) => {
      localStorage.setItem(prevMode, code);
      return newMode;
    });
  };

  useEffect(() => {
    setLanguageMode();
  }, [ext]);

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = ev.target.result;
      setFileInput(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  useEffect(() => {
    setCode(fileinput);
  }, [fileinput]);

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    const fileName = 'myCode.'.concat(ext);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };
  const handleChange = (editor, data, value) => {
    setCode(value);
  };
  const takeInput = (e) => {
    setInput(e.target.value);
  };

  const handleResetCode = () => {
    localStorage.removeItem(mode);
    setCode(boilerplateCode);
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
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
        if (res.data.result.stderr) {
          return updateOutput(res.data.result.stderr, 'error');
        }
        return updateOutput(res.data.result.stdout, 'response');
      })
      .catch((err) => {
        updateOutput(err, 'error');
      });
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
          <button className="btn" type="button" onClick={handleClick}>
            <img
              title="Upload"
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
                src={`${process.env.PUBLIC_URL}/assets/reset.png`}
                title="Reset"
                alt="Reset Code"
                width="26px"
                style={{ marginRight: '-15px' }}
                onClick={handleResetCode}
              />
            </button>
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
            onBeforeChange={handleChange}
            value={code}
            className="code-mirror-wrapper"
            options={{
              lineWrapping: true,
              lint: true,
              mode,
              theme: theme === 'light' ? 'eclipse' : 'dracula',
              lineNumbers: true,
              extraKeys: {
                'Ctrl-Space': (event) => {
                  handleSubmit(event);
                },
              },
              smartIndent: true,
              indentWithTabs: true,
              tabSize: 2,
              indentUnit: 4,
              autoCloseBrackets: true,
            }}
          />
          {/* textarea for Input Data */}
          <textarea
            placeholder="Input the Data Here"
            spellCheck="false"
            onChange={takeInput}
            className={`input__block ${theme === 'light' ? 'input__block_light-mode' : ''
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
