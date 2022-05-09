import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';

import {
  categoriesListDrink,
  categoryFilterDrink,
} from '../../api/drinksAPI';
import { categoriesList, categoryFilter } from '../../api/foodsAPI';
import './Categories.css';

const cinco = 5;

function Categories() {
  const { page,
    setData,
    categories,
    setCategories,
    category,
    setCategory,
    recomendationDrink,
    recomendationFood } = useContext(AppContext);

  useEffect(() => {
    if (page === 'Foods') {
      const resultFoodCategories = async () => {
        const apiResult = await categoriesList();
        setCategories(apiResult);
      };
      resultFoodCategories();
      return;
    }
    const resultDrinks = async () => {
      const apiDrink = await categoriesListDrink();
      setCategories(apiDrink.drinks);
    };
    resultDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClick = async (categorie) => {
    if (categorie === category && page === 'Foods') {
      // setData(await nameSearch());
      setCategory('');
      setData(recomendationFood);
      return;
    }
    if (categorie === category && page === 'Drinks') {
      // const drinksArray = await ingredientDrinkName();
      setData(recomendationDrink);
      return;
    }
    if (page === 'Foods') {
      setCategory(categorie);
      setData(await categoryFilter(categorie));
      return;
    }
    setCategory(categorie);
    setData(await categoryFilterDrink(categorie));
  };

  const clearFilter = async () => {
    if (page === 'Foods') {
      // setData(await nameSearch());
      setData(recomendationFood);
      return;
    }
    // setData(await ingredientDrinkName());
    setData(recomendationDrink);
    setCategory('');
  };

  return (
    <div className="categories">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ clearFilter }
      >
        All
      </button>
      {categories.length !== 0 && categories.filter((c, i) => i < cinco)
        .map(({ strCategory }, index) => (
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ () => handleClick(strCategory) }
          >
            { strCategory }
          </button>
        ))}
    </div>
  );
}

export default Categories;
