import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { drinksIngredients } from '../api/drinksAPI';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

function ExploreDrinksIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const doze = 12;

  useEffect(() => {
    const getList = async () => {
      const list = await drinksIngredients();
      console.log(list);
      setIngredientsList(list);
    };
    getList();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" show={ false } />
      {
        ingredientsList && ingredientsList
          .filter((f, i) => i < doze).map((drink, index) => (
            <Link to="/drinks" key={ index }>
              <RecipeCard
                index={ index }
                name={ drink.strIngredient1 }
                img={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                key={ index }
                ingredient="ingredient"
              />
            </Link>))
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
