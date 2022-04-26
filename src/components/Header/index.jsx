import React from 'react';

function Header() {
  return (
    <header>
      <div data-testid="profile-top-btn"> User </div>
      <div data-testid="page-title"> Title </div>
      <div data-testid="search-top-btn"> Search </div>
    </header>
  );
}

export default Header;
