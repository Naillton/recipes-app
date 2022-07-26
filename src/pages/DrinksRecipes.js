import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { idSearch } from '../api/drinksAPI';
import { getFoodRecomendation } from '../api/foodsAPI';
import shareIcon from '../images/shareIcon.svg';
import './styles.css';
import RecipeCard from '../components/RecipeCard';
import { getDoneRecipes,
  getInProgressRecipes,
  removeFavorite, saveFavorite, getFavorite } from '../helpers/tokenLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const six = 6;
function DrinksRecipes(props) {
  // getDrinkRecomendation
  const { match: { params: { recipeId } } } = props;
  const [recipe, setRecipe] = useState({});
  const { doneRecipes, setDoneRecipes } = useContext(AppContext);
  const [recomendationFood, setRecomendationFood] = useState([]);
  const [inProgressDrink, setInProgressDrink] = useState({ meals: {}, cocktails: {} });

  const { push } = useHistory();

  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getLink = () => {
    copy(window.location.href);
    setLinkCopied(true);
  };

  const checkButton = (array) => {
    console.log(array);
    return array.length === 0 ? true : array.some(({ id }) => id !== recipeId);
  };

  const handleHeart = () => {
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    const obj = {
      id: recipeId,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
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
    setDoneRecipes(getDoneRecipes());
  }, [setDoneRecipes]);

  useEffect(() => {
    const drink = async () => {
      setRecomendationFood(await getFoodRecomendation());
    };
    drink();
  }, []);

  useEffect(() => {
    setInProgressDrink(getInProgressRecipes());
  }, []);

  useEffect(() => {
    const allFavorites = getFavorite();
    setIsFavorite(allFavorites
      .filter((e) => e !== null).some((item) => item.id === recipeId));
  }, []);

  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((item) => item.includes('strIngredient'));
  const measure = recipeKeys.filter((item) => item.includes('strMeasure'));
  const recepiYTLink = recipe.strYoutube && recipe.strYoutube.split('=')[1];

  return (
    <div className="drinks-details">
      <img
        className="image"
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt="drink"
        width="360px"
      />
      <div className="share-favorite">
        <h1
          className="title-drinks-details"
          data-testid="recipe-title"
        >
          { recipe.strDrink }
        </h1>
        <div>
          <button
            className="share"
            type="button"
            data-testid="share-btn"
            onClick={ () => getLink() }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          {linkCopied && <span>Link copied!</span>}
          <button className="favorite" type="button" onClick={ handleClick }>
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favorito"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </div>
      <div>
        <p
          className="category"
          data-testid="recipe-category"
        >
          {`${recipe.strCategory} ${recipe.strAlcoholic}`}
        </p>
        <p className="title-ingredients">Ingredients</p>
        <div className="ingredients">
          { ingredients.map((i, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { recipe[i] && `- ${recipe[measure[index]]} ${recipe[i]}.` }
            </p>
          ))}
        </div>
        <p className="title-instructions">Instructions</p>
        <p className="text" data-testid="instructions">{ recipe.strInstructions }</p>
        <iframe
          className="video"
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
      </div>
      { checkButton(doneRecipes) && (
        <button
          type="button"
          onClick={ () => push(`/drinks/${recipeId}/in-progress`) }
          data-testid="start-recipe-btn"
          className="buttonStart"
        >
          {inProgressDrink && inProgressDrink.cocktails[recipeId] ? 'Continue Recipe'
            : 'Start Recipe'}
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
