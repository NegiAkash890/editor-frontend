import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Popup.css';

const PopUpText = () => (
  <Popup
    trigger={(
      <img
        src={`${process.env.PUBLIC_URL}/assets/info.png`}
        alt="Info"
        title="Info"
      />
    )}
    modal
    nested
  >
    {(close) => (
      <div className="modal">
        <div className="modal__header">
          <div className="header"> Info Section </div>
          <button className="close" onClick={close} type="button">
            &times;
          </button>
        </div>
        <div className="content">
          {' '}
          <p>Welcome to Online Compiler</p>
          <p>
            As, if now the compiler has support for three languages
            <b> Python</b>
            <b>,C++</b>
            and
            <b>Java</b>
          </p>
          <p>
            This is an
            <b>open-source project</b>
            and contributions are appreciated. If interested or you have any
            suggestion click the
            <b>GitHub</b>
            icon at the bottom and raise an
            <b>issue.</b>
          </p>
        </div>
        <div className="actions">
          <button
            type="button"
            className="button"
            onClick={() => {
              close();
            }}
          >
            <a href="https://github.com/NegiAkash890/editor-backend">
              <img
                src={`${process.env.PUBLIC_URL}/assets/github.png`}
                title="Go to GitHub Repository"
                alt="GitHub Icon"
              />
            </a>
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export const BoundedTooltip = () => (
  <div
    style={{ height: 200, width: 400, border: '1px solid red' }}
    className="tooltipBoundary"
  >
    <Popup
      trigger={(
        <button type="button" className="button">
          Trigger 1
        </button>
      )}
      position="bottom right"
      closeOnDocumentClick
      keepTooltipInside=".tooltipBoundary"
    >
      Code Copied
    </Popup>
  </div>
);
export default PopUpText;
