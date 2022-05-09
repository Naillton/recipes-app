import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import AppContext from '../context/AppContext';
import { idSearch } from '../api/foodsAPI';
import shareIcon from '../images/shareIcon.svg';
import './styles.css';
import {
  getFavorite,
  removeFavorite,
  saveFavorite,
} from '../helpers/tokenLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import treatRecipe from '../helpers/treatingDataForLocal';

const copy = require('clipboard-copy');

const five = 5;

function FoodInProgress(props) {
  const { match: { params: { recipeId } } } = props;
  const [recipe, setRecipe] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

  const [linkCopied, setLinkCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checkedIndex, setCheckedIndex] = useState([]);

  const getLink = () => {
    const string = window.location.href;
    const URL = string.split('/').splice(0, five).join('/');
    copy(URL);
    setLinkCopied(true);
  };

  const handleHeart = () => {
    setIsFavorite(!isFavorite);
  };

  const finishRecipe = () => {
    treatRecipe(recipeId, recipe, 'food');
    history.push('/done-recipes');
  };

  const handleCheckBox = () => {
    const obj = { id: recipeId, ingredients: checkedIndex };
    console.log(obj);
    // updateInProgressRecipes(obj, 'food');
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
    const allFavorites = getFavorite();
    setIsFavorite(allFavorites.some((item) => item.id === recipeId));
  }, []);

  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((item) => item.includes('strIngredient'));
  const measure = recipeKeys.filter((item) => item.includes('strMeasure'));
  useEffect(() => {
    const allIngredients = ingredients.filter((item) => recipe[item]
      !== null && recipe[item] !== '');

    if (allIngredients.length > 0 && allIngredients.length === checkedIndex.length) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedIndex]);
  return (
    <div>
      <h1 data-testid="recipe-title" className="header">{ recipe.strMeal }</h1>
      <div className="contImage">
        <img
          className="image"
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt="food"
        />
      </div>
      <div className="contIcons">
        <button
          type="button"
          className="btn"
          data-testid="share-btn"
          onClick={ () => getLink() }
        >
          <img className="icons" src={ shareIcon } alt="shareIcon" />
        </button>
        {linkCopied && <span>Link copied!</span>}
        <button className="btn" type="button" onClick={ handleClick }>
          <img
            className="icons"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorito"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <div className="receita">
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        { ingredients.filter((item) => recipe[item] !== null && recipe[item] !== '')
          .map((i, index) => (
            <label
              key={ index }
              htmlFor={ `ingredient-${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                className="checks"
                id={ `ingredient-${index}` }
                name={ index }
                onClick={ ({ target }) => {
                  if (checkedIndex.includes(`${index}`)) {
                    setCheckedIndex(checkedIndex.filter((e) => +e !== index));
                    handleCheckBox();
                    return;
                  }
                  setCheckedIndex([...checkedIndex, target.name]);
                  handleCheckBox();
                } }
              />
              <span
                key={ index }
                className={
                  checkedIndex.some((item) => +item === index) ? 'checkbox' : ''
                }
              >
                { `${recipe[measure[index]]} ${recipe[i]}` }
              </span>
            </label>
          ))}
        <p data-testid="instructions" className="text">{ recipe.strInstructions }</p>
      </div>
      <button
        type="button"
        onClick={ finishRecipe }
        data-testid="finish-recipe-btn"
        className="buttonFinish"
        disabled={ isDisabled }
      >
        Finish recipe
      </button>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodInProgress;
