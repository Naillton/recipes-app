import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/foods" component={ Foods } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/foods/{id-da-receita}" />
        <Route path="/drinks/{id-da-receita}" />
        <Route path="/foods/{id-da-receita}/in-progress" />
        <Route path="/drinks/{id-da-receita}/in-progress" />
        <Route path="/explore" component={ Explore } />
        <Route path="/explore/foods" />
        <Route path="/explore/drinks" />
        <Route path="/explore/foods/ingredients" />
        <Route path="/explore/drinks/ingredients" />
        <Route path="/explore/foods/nationalities" />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
