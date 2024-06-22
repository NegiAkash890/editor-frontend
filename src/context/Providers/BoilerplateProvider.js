import {
  React, createContext, useContext, useReducer, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import BoilerplateReducer from '../reducers/BoilerplateReducer';

const BoilerPlateContext = createContext();

export const BoilerplateProvider = ({ children }) => {
  const [boilerplateCode, setBoilerplateCode] = useReducer(BoilerplateReducer, '');
  const boilerplateContextValue = useMemo(() => ({
    boilerplateCode, setBoilerplateCode,
  }));

  useEffect(() => {
    setBoilerplateCode({ type: 'CPP' });
  }, []);

  return (
    <BoilerPlateContext.Provider
      value={boilerplateContextValue}
    >
      {children}
    </BoilerPlateContext.Provider>
  );
};

BoilerplateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useBoilerplate = () => useContext(BoilerPlateContext);
