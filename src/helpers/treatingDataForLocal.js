import { saveDoneRecipes } from './tokenLocalStorage';

const treatRecipe = (id, recipe, type) => {
  const date = new Date();
  const dateNow = date.toLocaleDateString();
  const tagList = recipe.strTags ? recipe.strTags.split(',') : [];
  const done = {
    id,
    type,
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: dateNow,
    tags: tagList,
  };
  saveDoneRecipes(done);
};

export default treatRecipe;
