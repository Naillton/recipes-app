import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { idSearch } from '../api/drinksAPI';
import { getFoodRecomendation } from '../api/foodsAPI';
import shareIcon from '../images/shareIcon.svg';
import './styles.css';
import RecipeCard from '../components/RecipeCard';
import { getDoneRecipes } from '../helpers/tokenLocalStorage';

const six = 6;
function DrinksRecipes(props) {
  // getDrinkRecomendation
  const { match: { params: { recipeId } } } = props;
  const [recipe, setRecipe] = useState({});
  const { doneRecipes, setDoneRecipes } = useContext(AppContext);
  const [recomendationFood, setRecomendationFood] = useState([]);

  const { push } = useHistory();

  const getLink = () => {
    Document.execCommand('copy');
    global.alert('Link copied!');
  };

  const checkButton = (array) => {
    console.log(array);
    return array.length === 0 ? true : array.some(({ id }) => id !== recipeId);
  };

  useEffect(() => {
    const getRecipe = async () => {
      setRecipe(await idSearch(recipeId));
    };
    getRecipe();
  }, [recipeId]);

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, [setDoneRecipes]);

  useEffect(() => {
    const drink = async () => {
      setRecomendationFood(await getFoodRecomendation());
    };
    drink();
  }, []);

  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((item) => item.includes('strIngredient'));
  const measure = recipeKeys.filter((item) => item.includes('strMeasure'));
  const recepiYTLink = recipe.strYoutube && recipe.strYoutube.split('=')[1];

  return (
    <div>
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="" />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => getLink() }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p
        data-testid="recipe-category"
      >
        {`${recipe.strCategory} ${recipe.strAlcoholic}`}
      </p>
      { ingredients.map((i, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { recipe[i] && `${recipe[measure[index]]} ${recipe[i]}` }
        </p>
      ))}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <p>Details</p>
      <iframe
        title="video"
        width="320"
        height="240"
        controls="controls"
        data-testid="video"
        allow="autoplay; encrypted-media"
        src={ `https://www.youtube.com/embed/${recepiYTLink}` }
      />
      <div className="scroll">
        {recomendationFood.length !== 0 && recomendationFood.filter((r, i) => i < six)
          .map((recomendation, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <RecipeCard
                name={ recomendation.strMeal }
                index={ index }
                img={ `${recomendation.strMealThumb}/preview` }
                ingredient={ false }
              />
            </div>
          ))}
      </div>
      { checkButton(doneRecipes) && (
        <button
          type="button"
          onClick={ () => push(`/drinks/${recipeId}/in-progress`) }
          data-testid="start-recipe-btn"
          className="buttonStart"
        >
          Start Recipe
        </button>)}
    </div>
  );
}

DrinksRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksRecipes;
