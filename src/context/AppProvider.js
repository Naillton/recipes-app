import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  console.log(searchInput, showSearch);

  function getValueInput(value) {
    setSearchInput(value);
  }

  return (
    <AppContext.Provider
      value={ {
        getValueInput,
        searchInput,
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
