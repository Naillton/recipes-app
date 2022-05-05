import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';
import AppContext from '../context/AppContext';

function FavoriteRecipes() {
  const [favoritesFilter, setFavoritesFilter] = useState([]);
  const [filter, setFilter] = useState('');
  const { favoriteRecipes } = useContext(AppContext);

  useEffect(() => {
    if (filter !== '') {
      setFavoritesFilter(favoritesFilter.filter((item) => item.type === filter));
    }
  }, [filter]);

  useEffect(() => {
    setFavoritesFilter(favoriteRecipes);
  }, [favoriteRecipes]);

  return (
    <div>
      <Header title="Favorite Recipes" show={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFavoritesFilter(favoriteRecipes) }
        name="all"
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => setFilter(target.name) }
        name="food"
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => setFilter(target.name) }
        name="drink"
      >
        Drinks

      </button>
      {favoritesFilter.filter((e) => e !== null).map((recipe, index) => (
        <DoneRecipesCard
          key={ index }
          recipe={ recipe }
          index={ index }
          showHeart="heart"
        />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
