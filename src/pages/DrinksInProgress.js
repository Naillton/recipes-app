import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { idSearch } from '../api/drinksAPI';
import shareIcon from '../images/shareIcon.svg';
import './styles.css';
import {
  removeFavorite,
  saveFavorite,
  getFavorite,

  updateInProgressRecipes,
  saveDoneRecipes } from '../helpers/tokenLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const five = 5;
function DrinksInProgress(props) {
  const { match: { params: { recipeId } } } = props;
  const [recipe, setRecipe] = useState({});

  const { push } = useHistory();

  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [checkedIndex, setCheckedIndex] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);

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
    const date = new Date();
    const dateNow = date.toLocaleDateString();
    const tagList = recipe.strTags.split(',');
    const done = {
      id: recipeId,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: dateNow,
      tags: tagList,
    };
    saveDoneRecipes(done);
    push('/done-recipes');
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

  const handleCheckBox = () => {
    const obj = { id: recipeId, ingredients: usedIngredients };
    updateInProgressRecipes(obj, 'drinks');
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((item) => item.includes('strIngredient'));
  const measure = recipeKeys.filter((item) => item.includes('strMeasure'));

  useEffect(() => {
    const allIngredients = ingredients.filter((item) => recipe[item]
      !== null && recipe[item] !== '');
    console.log(checkedIndex);
    if (allIngredients.length > 0 && allIngredients.length === checkedIndex.length) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedIndex]);

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
      {linkCopied && <span>Link copied!</span>}
      <button type="button" onClick={ handleClick }>
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorito"
          data-testid="favorite-btn"
        />
      </button>
      <p
        data-testid="recipe-category"
      >
        {`${recipe.strCategory} ${recipe.strAlcoholic}`}
      </p>
      { ingredients.filter((item) => recipe[item] !== null && recipe[item] !== '')
        .map((i, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `ingredient-${index}` }
          >
            <input
              type="checkbox"
              id={ `ingredient-${index}` }
              name={ index }
              onClick={ ({ target }) => {
                if (checkedIndex.includes(`${index}`)) {
                  setCheckedIndex(checkedIndex.filter((e) => +e !== index));
                  setUsedIngredients(usedIngredients.filter((itm) => itm !== recipe[i]));
                  handleCheckBox();
                  return;
                }
                setCheckedIndex([...checkedIndex, target.name]);
                setUsedIngredients([...usedIngredients, recipe[i]]);
                handleCheckBox();
              } }
            />
            <span
              key={ index }
              className={ checkedIndex.some((item) => +item === index) ? 'checkbox' : '' }
            >
              { recipe[i] !== '' && `${recipe[measure[index]]} ${recipe[i]}` }
            </span>
          </label>
        ))}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
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

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksInProgress;
