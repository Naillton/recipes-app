import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipesCard({ recipe, index }) {
  const { id,
    type,
    image, category, name, doneDate, tags, nationality, alcoholicOrNot } = recipe;
  const [linkCopied, setLinkCopied] = useState(false);
  const url = `http://localhost:3000/${type}s/${id}`;

  console.log(tags);
  const getLink = () => {
    copy(url);
    setLinkCopied(true);
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
