import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getDoneRecipes } from '../helpers/tokenLocalStorage';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const doneRecipes = getDoneRecipes();
  const [doneRecipesFilter, setDoneRecipesFilter] = useState(doneRecipes);
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   setDoneRecipesFilter(doneRecipes);
  // }, []);

  useEffect(() => {
    if (filter !== '') {
      setDoneRecipesFilter(doneRecipes.filter((item) => item.type === filter));
    }
  }, [filter]);

  return (
    <div className="done-recipes">
      <Header title="Done Recipes" show={ false } />
      <div className="done-recipes-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setDoneRecipesFilter(doneRecipes) }
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
      </div>
      {doneRecipesFilter.map((recipe, index) => (
        <DoneRecipesCard key={ index } recipe={ recipe } index={ index } />
      ))}
    </div>
  );
}

export default DoneRecipes;
