import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ index, img, name, ingredient }) {
  return (
    <div
      data-testid={
        !ingredient
          ? `${index}-recipe-card`
          : `${index}-ingredient-card`
      }
    >
      <img src={ img } data-testid={ `${index}-card-img` } alt={ name } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <p data-testid={ `${index}-recomendation-title` }>{name}</p>
    </div>
  );
}
RecipeCard.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
export default RecipeCard;
