import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

import { ingredientsSearch, firstLetterSearch, nameSearch } from '../api/foodsAPI';
import { ingredientDrink, ingredientDrinkName, firstLetterDrink } from '../api/drinksAPI';

function AppProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [recomendationDrink, setRecomendationDrink] = useState([]);
  const [recomendationFood, setRecomendationFood] = useState([]);

  const handleFoods = async (input, radio) => {
    if (radio === 'ingredientSearch') {
      setData(await ingredientsSearch(input));
    }
    if (radio === 'nameSearch') {
      setData(await nameSearch(input));
    }
    if (radio === 'firstLetterSearch') {
      return (input.length > 1)
        ? global.alert('Your search must have only 1 (one) character')
        : setData(await firstLetterSearch(input));
    }
  };

  const handleDrinks = async (input, radio) => {
    if (radio === 'ingredientSearch') {
      setData(await ingredientDrink(input));
    }
    if (radio === 'nameSearch') {
      setData(await ingredientDrinkName(input));
    }
    if (radio === 'firstLetterSearch') {
      return (input.length > 1)
        ? global.alert('Your search must have only 1 (one) character')
        : setData(await firstLetterDrink(input));
    }
  };

  const handleCLickIngredients = (input, radio) => {
    if (page === 'Foods') {
      handleFoods(input, radio);
      return;
    }
    handleDrinks(input, radio);
  };
  return (
    <AppContext.Provider
      value={ {
        showSearch,
        setShowSearch,
        handleCLickIngredients,
        data,
        setData,
        setPage,
        page,
        setCategories,
        categories,
        category,
        setCategory,
        recomendationDrink,
        setRecomendationDrink,
        recomendationFood,
        setRecomendationFood,
      } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = ({
  children: PropTypes.any,
}).isRequired;

export default AppProvider;
