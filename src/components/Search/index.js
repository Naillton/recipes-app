import React, { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

function Search() {
  const { handleCLickIngredients } = useContext(AppContext);
  const [saveSearchInput, setSaveSearchInput] = useState('');
  const [saveRadio, setSaveRadio] = useState('');

  function handleChange({ target: { value } }) {
    setSaveSearchInput(value);
  }

  function handleRadio({ target: { id } }) {
    setSaveRadio(id);
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
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="nameSearch">
          Name
          <input
            type="radio"
            name="radioSearch"
            id="nameSearch"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="firstLetterSearch">
          First Letter
          <input
            type="radio"
            name="radioSearch"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleCLickIngredients(saveSearchInput, saveRadio) }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
