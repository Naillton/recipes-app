export const ingredientDrink = async (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const ingredientDrinkName = async (name = '') => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const firstLetterDrink = async (firstLetter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const categoriesListDrink = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const categoryFilterDrink = async (category) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};
