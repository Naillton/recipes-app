import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <AppContext.Provider
      value={ {
        showSearch,
        setShowSearch } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = ({
  children: PropTypes.any,
}).isRequered;

export default AppProvider;
