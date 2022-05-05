import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getFavorite } from '../helpers/tokenLocalStorage';
import DoneRecipesCard from '../components/DoneRecipesCard';

function FavoriteRecipes() {
  const favorites = getFavorite();
  const [favoritesFilter, setFavoritesFilter] = useState(favorites);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter !== '') {
      setFavoritesFilter(favoritesFilter.filter((item) => item.type === filter));
    }
  }, [filter]);

  return (
    <div>
      <Header title="Favorite Recipes" show={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFavoritesFilter(favorites) }
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
