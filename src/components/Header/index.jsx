import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, show }) {
  return (
    <header>
      <Link to="/profile">
        <img
          src={ profile }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <div data-testid="page-title">
        {' '}
        { title }
        {' '}
      </div>
      { show && <img
        src={ searchIcon }
        alt="icon"
        data-testid="search-top-btn"
      />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
}.isRequired;

export default Header;
