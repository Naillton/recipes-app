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

// Bebidas aleatórias
export const drinkRandom = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(endpoint);
  const { drinks } = await response.json();
  return drinks;
};

export const drinksIngredients = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(endpoint);
  const { drinks } = await response.json();
  return drinks;
};
export const getDrinkRecomendation = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  const { drinks } = await response.json();
  return drinks;
};

// Pesquisa por ID
export const idSearch = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const { drinks } = await response.json();
  return drinks[0];
};
