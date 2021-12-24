/* eslint no-unused-vars: 0 */
import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { useTheme } from '../reducer/context/Themeprovider';

const RightContainer = ({
  output, loading, updateOutput, error, disable,
}) => {
  const { theme } = useTheme();

  return (
    <div className="right__container">
      <div className="header__info">
        <div className="file__name">
          <span>Output Terminal</span>
        </div>
        <div>
          <button
            className="btn"
            type="button"
            onClick={() => updateOutput('Console Cleared', 'clear')}
            disabled={disable}
          >
            <img
              title="Clear Terminal"
              alt="Clear Terminal"
              src={`${process.env.PUBLIC_URL}/assets/clear-icon.png`}
            />
          </button>
        </div>
      </div>
      <div
        className={`logger__head_right ${
          theme === 'light' ? 'logger__head_right_light-mode' : ''
        }`}
      >
        <div
          className={`output ${theme === 'light' ? 'output_light-mode' : ''}`}
        >
          {output}
        </div>
        <Loader
          className="loader"
          width="100"
          height="100"
          type="Rings"
          color="blueviolet"
          visible={loading}
        />
      </div>
    </div>
  );
};
RightContainer.propTypes = {
  output: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
  updateOutput: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
};
export default RightContainer;
