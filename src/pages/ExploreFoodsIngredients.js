import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ingredientsList } from '../api/foodsAPI';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

function ExploreFoodsIngredients() {
  const [ingredientsListF, setIngredientsListF] = useState([]);
  const doze = 12;

  useEffect(() => {
    const getList = async () => {
      const list = await ingredientsList();
      console.log(list.meals);
      setIngredientsListF(list.meals);
    };
    getList();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" show={ false } />
      {
        ingredientsListF && ingredientsListF
          .filter((f, i) => i < doze).map((food, index) => (
            <Link to="/foods" key={ index }>
              <RecipeCard
                index={ index }
                name={ food.strIngredient }
                img={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png
                ` }
                key={ index }
                ingredient="ingredient"
              />
            </Link>))
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
