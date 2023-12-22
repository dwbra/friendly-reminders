'use client';
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FRContext = createContext(null);

const FRProvider = ({ children }) => {
  const [tokens, updateTokens] = useState({
    accessToken: '',
    refreshToken: '',
  });

  return <FRContext.Provider value={[tokens, updateTokens]}>{children}</FRContext.Provider>;
};

const useTokens = () => useContext(FRContext);

export { FRProvider, useTokens };

FRProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
