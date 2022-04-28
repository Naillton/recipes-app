import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';

import {
  categoriesListDrink,
  categoryFilterDrink,
  ingredientDrinkName,
} from '../../api/drinksAPI';
import { categoriesList, categoryFilter, nameSearch } from '../../api/foodsAPI';

const cinco = 5;

function Categories() {
  const { page,
    setData, categories, setCategories, category, setCategory } = useContext(AppContext);

  useEffect(() => {
    if (page === 'Foods') {
      const resultFoodCategories = async () => {
        const apiResult = await categoriesList();
        console.log(apiResult);
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
      setData(await nameSearch());
      return;
    }
    if (categorie === category && page === 'Drinks') {
      setData(await ingredientDrinkName());
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
      setData(await nameSearch());
      return;
    }
    setData(await ingredientDrinkName());
    setCategory('');
  };

  return (
    <div>
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
