import { saveDoneRecipes } from './tokenLocalStorage';

const treatRecipe = (id, recipe, type) => {
  const date = new Date();
  const dateNow = date.toLocaleDateString();
  const tagList = recipe.strTags ? recipe.strTags.split(',') : [];
  const nationality = type === 'food' ? recipe.strArea : '';
  const alcoholicOrNot = type === 'drink' ? recipe.strAlcoholic : '';
  const done = {
    id,
    type,
    nationality,
    category: recipe.strCategory,
    alcoholicOrNot,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: dateNow,
    tags: tagList,
  };
  saveDoneRecipes(done);
};

export default treatRecipe;
