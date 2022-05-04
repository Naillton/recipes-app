import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { drinksIngredients } from '../api/drinksAPI';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';

function ExploreDrinksIngredients() {
  const { setIngredientChosen } = useContext(AppContext);

  const [ingredientsList, setIngredientsList] = useState([]);
  const doze = 12;

  const { push } = useHistory();

  useEffect(() => {
    const getList = async () => {
      const list = await drinksIngredients();
      setIngredientsList(list);
    };
    getList();
  }, []);

  const redirectClick = async (name) => {
    setIngredientChosen(name);
    push('/drinks');
  };

  return (
    <div>
      <Header title="Explore Ingredients" show={ false } />
      {
        ingredientsList && ingredientsList
          .filter((f, i) => i < doze).map((drink, index) => (
            <button
              type="button"
              key={ index }
              onClick={ () => redirectClick(drink.strIngredient1) }
            >
              <RecipeCard
                index={ index }
                name={ drink.strIngredient1 }
                img={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                key={ index }
                ingredient="ingredient"
              />
            </button>))
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
