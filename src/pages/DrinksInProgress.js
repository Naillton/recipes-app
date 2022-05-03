import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { idSearch } from '../api/drinksAPI';
import shareIcon from '../images/shareIcon.svg';
import './styles.css';
import {
  removeFavorite, saveFavorite, getFavorite } from '../helpers/tokenLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksInProgress(props) {
  // getDrinkRecomendation
  const { match: { params: { recipeId } } } = props;
  const [recipe, setRecipe] = useState({});

  const { push } = useHistory();

  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [isDisable, setIsDisable] = useState(false);

  const [checkedIndex, setCheckedIndex] = useState([]);

  const getLink = () => {
    copy(window.location.href);
    setLinkCopied(true);
  };

  const checkButton = () => {
    // todos os checkbox devem estar checked
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

  const checkIngredients = (target) => {
    setCheckedIndex((prev) => [...prev, target.name]);
    // const check = target;
    // check.className = 'checkbox';
    // console.log(target);
    // const checked = ingredients.every((item) => item.includes(target.name));
    // if (checked) {
    //   setIsDisabled(true);
    // } else {
    //   setIsDisabled(false);
    // }
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
          <label key={ index } htmlFor={ `ingredient-${index}` }>
            <input
              type="checkbox"
              id={ `ingredient-${index}` }
              name={ index }
              data-testid={ `${index}-ingredient-step` }
              onClick={ ({ target }) => checkIngredients(target) }
            />
            <span
              key={ index }
              className={ checkedIndex.some((item) => item === index) ? 'checkbox' : '' }
              // id="ingradient"
            >
              { recipe[i] !== '' && `${recipe[measure[index]]} ${recipe[i]}` }
            </span>
          </label>
        ))}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      { checkButton() && (
        <button
          type="button"
          onClick={ () => push('/done-recipes') }
          data-testid="finish-recipe-btn"
          className="buttonFinish"
          disabled={ isDisable }
        >
          Finish recipe
        </button>)}
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
