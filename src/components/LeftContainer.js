/* eslint-disable no-console */
/* eslint no-unused-vars: 0 */
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
import downloadFile from '../utils/downloadFile';
import defaultConfig from '../utils/controlledEditorConfig';
import { useBoilerplate } from '../context/Providers/BoilerplateProvider';
import ResetPrompt from './Prompt';
import Upload from '../icons/Upload';
import Play from '../icons/Play';
import Download from '../icons/Download';
import Copy from '../icons/Copy';

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
  const { boilerplateCode } = useBoilerplate();

  useEffect(() => {
    setTimeout(() => {
      setCode(pre);
    }, 0.5);
  }, [pre]);

  useEffect(() => {
    const cachedUserCode = localStorage.getItem(mode);
    if (cachedUserCode) {
      setCode(cachedUserCode);
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

  useEffect(() => {
    axios
      .get('https://main--editor-backend-compile.netlify.app/.netlify/functions/api')
      .then((_) => console.log('Ping'))
      .catch((error) => console.error('Error:', error));
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

  const handleResetCode = () => {
    localStorage.removeItem(mode);
    setCode(boilerplateCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLoading('true');
    const data = {
      language: ext,
      code,
      input: defaultTextAreaInput,
    };

    axios
      .post('https://main--editor-backend-compile.netlify.app/.netlify/functions/api/compile', data)
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
  const copyToClipBoard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied((currentState) => !currentState);
    }, 1000);
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
        <div className="d-flex">
          <button className="btn_wt_icon" type="button" onClick={handleClick}>
            <Upload width={16} height={16} />
            <label className="btn_label">Upload</label>
          </button>
          <input
            type="file"
            onChange={showFile}
            style={{ display: 'none' }}
            ref={hiddenFileInput}
          />
          <button className="btn_wt_icon" type="button" onClick={handleSubmit}>
            <Play width={16} height={16} fill="white" />
            <label className="btn_label">Run</label>
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
            <ResetPrompt handleResetCode={handleResetCode} />
            <button className="btn_wt_icon" type="button" onClick={downloadTxtFile}>
              <Download width={16} height={16} fill="white" />
              <label className="btn_label">Download</label>
            </button>

            <CopyToClipboard text={code} onCopy={copyToClipBoard}>
              <button className="btn_wt_icon" type="button">
                <Copy width={16} height={16} fill="white" />
                <label className="btn_label">{_copied ? 'Copied' : 'Copy'}</label>
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <form>
          <ControlledEditor
            onBeforeChange={handleControlledBeforeChangeCallBack}
            value={code}
            className="code-mirror-wrapper"
            options={config}
          />
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
