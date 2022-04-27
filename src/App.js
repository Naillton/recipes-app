import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodsDetails from './pages/FoodsDetails';
import DrinksRecipes from './pages/DrinksRecipes';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import FoodInProgress from './pages/FoodInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import FoodsNacionalities from './pages/FoodsNacionalities';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/foods" component={ Foods } exact />
        <Route path="/drinks" component={ Drinks } exact />
        <Route path="/foods/:recipeId" component={ FoodsDetails } exact />
        <Route path="/drinks/:recipeId" component={ DrinksRecipes } exact />
        <Route path="/foods/:recipeId/in-progress" component={ FoodInProgress } exact />
        <Route
          path="/drinks/:recipeId/in-progress"
          component={ DrinksInProgress }
          exact
        />
        <Route path="/explore" component={ Explore } exact />
        <Route path="/explore/foods" component={ ExploreFoods } exact />
        <Route path="/explore/drinks" component={ ExploreDrinks } exact />
        <Route
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
          exact
        />
        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
          exact
        />
        <Route
          path="/explore/foods/nationalities"
          component={ FoodsNacionalities }
          exact
        />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/done-recipes" component={ DoneRecipes } exact />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } exact />
      </Switch>
    </AppProvider>
  );
}

export default App;
