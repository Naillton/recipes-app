import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ingredientsList } from '../api/foodsAPI';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';

function ExploreFoodsIngredients() {
  const { setIngredientChosen } = useContext(AppContext);

  const [ingredientsListF, setIngredientsListF] = useState([]);
  const doze = 12;

  const { push } = useHistory();

  useEffect(() => {
    const getList = async () => {
      const list = await ingredientsList();
      setIngredientsListF(list.meals);
    };
    getList();
  }, []);

  const redirectClick = async (name) => {
    setIngredientChosen(name);
    push('/foods');
  };

  return (
    <div className="explore-ingredients">
      <Header title="Explore Ingredients" show={ false } />
      <div className="explore-content-ingredient">
        {
          ingredientsListF && ingredientsListF
            .filter((f, i) => i < doze).map((food, index) => (
              <button
                type="button"
                key={ index }
                onClick={ () => redirectClick(food.strIngredient) }
              >
                <RecipeCard
                  index={ index }
                  name={ food.strIngredient }
                  img={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png
                  ` }
                  key={ index }
                  ingredient="ingredient"
                />
              </button>))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
