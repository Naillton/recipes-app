import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser, clearStorage } from '../helpers/tokenLocalStorage';

function Profile() {
  const history = useHistory();
  const user = getUser();

  const redirect = () => {
    clearStorage();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" show={ false } />

      <div data-testid="profile-email">{ user.email }</div>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ redirect }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
