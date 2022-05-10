import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser, clearStorage } from '../helpers/tokenLocalStorage';
import profile from '../images/profileIcon.svg';

function Profile() {
  const history = useHistory();
  const user = getUser();

  const redirect = () => {
    clearStorage();
    history.push('/');
  };

  return (
    <div className="profile">
      <Header title="Profile" show={ false } />
      <div className="content-profile">
        <img src={ profile } alt="profile" width="60px" />
        <p className="profile-email" data-testid="profile-email">{ user.email }</p>
        <div className="all">
          <button
            type="button"
            className="btnProfile"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            className="btnProfile"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            className="btnProfile"
            data-testid="profile-logout-btn"
            onClick={ redirect }
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
