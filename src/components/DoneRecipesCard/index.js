import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

import {
  getFavorite, removeFavorite, saveFavorite,
} from '../../helpers/tokenLocalStorage';

const copy = require('clipboard-copy');

function DoneRecipesCard({ recipe, index, showHeart }) {
  const {
    id, type, image, category, name,
    doneDate, tags, nationality, alcoholicOrNot } = recipe;

  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const url = `http://localhost:3000/${type}s/${id}`;

  const getLink = () => {
    copy(url);
    setLinkCopied(true);
  };

  useEffect(() => {
    const allFavorites = getFavorite();
    setIsFavorite(allFavorites.some((item) => item.id === id));
  }, [id]);

  const handleHeart = () => {
    setIsFavorite(!isFavorite);
  };

  const handleFavorite = () => {
    const obj = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    if (isFavorite) {
      removeFavorite(obj);
      handleHeart();
      return;
    }
    saveFavorite(obj);
    handleHeart();
  };

  return (
    <div>
      <a href={ url }>
        <img
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt={ name }
          width="200"
        />
      </a>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {nationality}
        {' - '}
        {category}
        {' - '}
        {alcoholicOrNot}
      </p>
      <a href={ url }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </a>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <button
        type="button"
        onClick={ () => getLink() }
      >
        <img
          src={ shareIcon }
          alt="shareIcon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {linkCopied && <span>Link copied!</span>}
      {tags && tags.filter((i, r) => r < 2).map((tag, i) => (
        <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ i }>{tag}</span>
      ))}
      {
        showHeart && (
          <button type="button" onClick={ handleFavorite }>
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="FavoriteIcon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>)
      }
    </div>
  );
}

DoneRecipesCard.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.string,
  nationality: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default DoneRecipesCard;
