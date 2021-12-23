import {
  createContext, useContext, useReducer, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import BoilerplateReducer from '../reducers/BoilerplateReducer';

const BoilerPlateContext = createContext();

export const BoilerplateProvider = ({ children }) => {
  const [boilerplateCode, setBoilerplateCode] = useReducer(BoilerplateReducer, '');

  useEffect(() => {
    setBoilerplateCode({ type: 'CPP' });
  }, []);

  return (
    /* eslint-disable */
    <BoilerPlateContext.Provider
      value={{ boilerplateCode, setBoilerplateCode }}
    >
      {children}
    </BoilerPlateContext.Provider>
    /* eslint-enable */
  );
};

BoilerplateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useBoilerplate = () => useContext(BoilerPlateContext);
