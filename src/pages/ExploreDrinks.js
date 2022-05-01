import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { drinkRandom } from '../api/drinksAPI';
// push(`/drinks/${}`)

function ExploreDrinks() {
  const { push } = useHistory();

  const drinkSurprise = async () => {
    const dRandom = await drinkRandom();
    push(`/drinks/${dRandom[0].idDrink}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" show={ false } />
      <button
        type="button"
        name="byIngredient"
        data-testid="explore-by-ingredient"
        onClick={ () => push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        name="bySurprise"
        data-testid="explore-surprise"
        onClick={ drinkSurprise }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
