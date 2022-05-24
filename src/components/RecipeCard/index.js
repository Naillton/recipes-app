import React from 'react';
import PropTypes from 'prop-types';
import './Recipe.css';

function RecipeCard({ index, img, name, ingredient }) {
  return (
    <div
      className="recipe"
      data-testid={
        !ingredient
          ? `${index}-recipe-card`
          : `${index}-ingredient-card`
      }
    >
      <img src={ img } data-testid={ `${index}-card-img` } alt={ name } width="150px" />
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
