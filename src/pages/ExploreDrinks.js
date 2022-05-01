import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const { push } = useHistory();

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
        onClick={ () => {} }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
