import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Clipboard from "@react-native-community/clipboard";
import AppContext from '../context/AppContext';
import { idSearch } from '../api/foodsAPI';
import { getDrinkRecomendation } from '../api/drinksAPI';
import shareIcon from '../images/shareIcon.svg';
import './styles.css';
import RecipeCard from '../components/RecipeCard';
import {
  getDoneRecipes,
  getInProgressRecipes,
  getFavorite,
  removeFavorite,
  saveFavorite,
} from '../helpers/tokenLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const six = 6;
function FoodsDetails(props) {
  const { match: { params: { recipeId } } } = props;
  const [recipe, setRecipe] = useState({});
  const [inProgressMeal, setInProgressMeal] = useState({ meals: {}, cocktails: {} });
  const [isFavorite, setIsFavorite] = useState(false);
  const { recomendationDrink,
    setRecomendationDrink,
    doneRecipes, setDoneRecipes } = useContext(AppContext);

  const history = useHistory();

  const [linkCopied, setLinkCopied] = useState(false);

  const getLink = () => {
    copy(window.location.href);
    setLinkCopied(true);
  };

  const checkButton = (array) => {
    if (array.length === 0) {
      return true;
    }
    return array.some(({ id }) => id !== recipeId);
  };

  const handleHeart = () => {
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    const obj = {
      id: recipeId,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    if (isFavorite) {
      removeFavorite(obj);
      handleHeart();
      return;
    }
    saveFavorite(obj);
    handleHeart();
  };

  useEffect(() => {
    const getRecipe = async () => {
      setRecipe(await idSearch(recipeId));
    };
    getRecipe();
  }, [recipeId]);

  useEffect(() => {
    const food = async () => {
      setRecomendationDrink(await getDrinkRecomendation());
    };
    food();
  }, []);

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);

  useEffect(() => {
    setInProgressMeal(getInProgressRecipes());
  }, []);

  useEffect(() => {
    const allFavorites = getFavorite();
    setIsFavorite(allFavorites.some((item) => item.id === recipeId));
  }, []);

  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((item) => item.includes('strIngredient'));
  const measure = recipeKeys.filter((item) => item.includes('strMeasure'));
  const recepiYTLink = recipe.strYoutube && recipe.strYoutube.split('=')[1];

  return (
    <div>
      <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
      <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="" />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => getLink() }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {linkCopied && <span>Link copied!</span>}
      <button type="button" onClick={ handleClick }>
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorito"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{ recipe.strCategory }</p>
      { ingredients.map((i, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { recipe[i] && `${recipe[measure[index]]} ${recipe[i]}` }
        </p>
        // <input type="checkbox" />
      ))}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <p>Details</p>
      <iframe
        title="video"
        width="320"
        height="240"
        data-testid="video"
        controls="controls"
        allow="autoplay; encrypted-media"
        src={ `https://www.youtube.com/embed/${recepiYTLink}` }
      />
      <div className="scroll">

        {recomendationDrink && recomendationDrink.filter((r, i) => i < six)
          .map((recomendation, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <RecipeCard
                name={ recomendation.strDrink }
                index={ index }
                img={ `${recomendation.strDrinkThumb}/preview` }
                ingredient={ false }
              />
            </div>
          ))}
      </div>
      { checkButton(doneRecipes) && (
        <button
          type="button"
          onClick={ () => history.push(`/foods/${recipeId}/in-progress`) }
          data-testid="start-recipe-btn"
          className="buttonStart"
        >
          {inProgressMeal && inProgressMeal.meals[recipeId] ? 'Continue Recipe'
            : 'Start Recipe'}
        </button>)}
    </div>
  );
}

FoodsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodsDetails;
