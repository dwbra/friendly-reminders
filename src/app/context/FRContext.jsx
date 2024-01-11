'use client';
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FRContext = createContext(null);

const FRProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState({
    message: null,
    hasAccess: null,
  });

  return <FRContext.Provider value={[authentication, setAuthentication]}>{children}</FRContext.Provider>;
};

const useAuthentication = () => useContext(FRContext);

export { FRProvider, useAuthentication };

FRProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
