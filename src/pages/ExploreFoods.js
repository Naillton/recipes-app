import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { foodRandom } from '../api/foodsAPI';
// push('/foods/:recipeId')

function ExploreFoods() {
  const { push } = useHistory();

  const foodSurprise = async () => {
    const fRandom = await foodRandom();
    push(`/foods/${fRandom[0].idMeal}`);
  };

  return (
    <div>
      <Header title="Explore Foods" show={ false } />
      <button
        type="button"
        name="byIngredient"
        data-testid="explore-by-ingredient"
        onClick={ () => push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        name="byNationality"
        data-testid="explore-by-nationality"
        onClick={ () => push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        name="bySurprise"
        data-testid="explore-surprise"
        onClick={ foodSurprise }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
