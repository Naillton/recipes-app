import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import AppContext from '../../context/AppContext';
import Search from '../Search';
import './Header.css';

function Header({ title, show }) {
  const { showSearch, setShowSearch } = useContext(AppContext);

  return (
    <div className="Header">
      <header>
        <Link className="button-profile" to="/profile">
          <img
            src={ profile }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <div className="title-header" data-testid="page-title">
          {' '}
          { title }
          {' '}
        </div>
        { show && (
          <button
            className="button-header"
            type="button"
            onClick={ () => setShowSearch(!showSearch) }
          >
            <img
              src={ searchIcon }
              alt="icon"
              data-testid="search-top-btn"
            />
          </button>)}
        {
          showSearch && <Search />
        }
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
}.isRequired;

export default Header;
