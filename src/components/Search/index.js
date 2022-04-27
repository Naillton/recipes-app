import React, { useState } from 'react';

function Search() {
  const [saveSearchInput, setSaveSearchInput] = useState('');

  function handleChange({ target }) {
    const { value } = target;
    setSaveSearchInput(value);
  }

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          value={ saveSearchInput }
          data-testid="search-input"
          onChange={ handleChange }
        />
      </label>
      <div>
        <label htmlFor="ingredientSearch">
          Ingredients
          <input
            type="radio"
            name="radioSearch"
            id="ingredientSearch"
            data-testid="ingredient-search-radio"
            onChange={ () => {} }
          />
        </label>
        <label htmlFor="nameSearch">
          Name
          <input
            type="radio"
            name="radioSearch"
            id="nameSearch"
            data-testid="name-search-radio"
            onChange={ () => {} }
          />
        </label>
        <label htmlFor="firstLetterSearch">
          First Letter
          <input
            type="radio"
            name="radioSearch"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            onChange={ () => {} }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {} }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
