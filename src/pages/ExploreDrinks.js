import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { drinkRandom } from '../api/drinksAPI';

function ExploreDrinks() {
  const { push } = useHistory();

  const drinkSurprise = async () => {
    const dRandom = await drinkRandom();
    push(`/drinks/${dRandom[0].idDrink}`);
  };

  return (
    <div className="explore-drinks">
      <Header title="Explore Drinks" show={ false } />
      <img
        className="gif-drink"
        alt="gif-drink"
        width="100px"
        src="https://media0.giphy.com/media/ZaQvK2f4IN59E9vsHy/giphy.gif?cid=ecf05e47m19w4ozjj6ag8696vz9w30mc5fyydy5x7w5vdhps&rid=giphy.gif&ct=s"
      />
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
