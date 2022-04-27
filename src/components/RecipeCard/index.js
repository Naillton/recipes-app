import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ index, img, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ img } data-testid={ `${index}-card-img` } alt={ name } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}
RecipeCard.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
export default RecipeCard;
