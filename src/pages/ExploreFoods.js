import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { foodRandom } from '../api/foodsAPI';

function ExploreFoods() {
  const { push } = useHistory();

  const foodSurprise = async () => {
    const fRandom = await foodRandom();
    push(`/foods/${fRandom[0].idMeal}`);
  };

  return (
    <div className="explore-foods">
      <Header title="Explore Foods" show={ false } />
      <img
        className="gif-food"
        alt="gif-food"
        width="180px"
        src="https://media2.giphy.com/media/kj0mk5gT1WvPn8INif/giphy.gif?cid=ecf05e47mhqe86wi6qs5u5qi45q86btqnyk21vzu9fg3p58v&rid=giphy.gif&ct=s"
      />
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
