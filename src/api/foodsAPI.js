// Lista de categorias (com descrição)
export const categoriesListDesc = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

// Lista de categorias (sem descrição - somente os nomes)
export const categoriesList = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
};

// Lista de todos os ingredientes (com descrição) esse
export const ingredientsList = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

// Lista as nacionalidades
export const nationalitiesList = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

// Filtra por categoria
export const categoryFilter = async (category) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
};

// Filtra por nacionalidade
export const nationalityFilter = async (nationality) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

// Pesquisa por ingredientes
export const ingredientsSearch = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
};

// Pesquisa por nome esse
export const nameSearch = async (name = '') => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
};

// Pesquisa por Primeira letra esse
export const firstLetterSearch = async (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
};

// Pesquisa por ID
export const idSearch = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const { meals } = await response.json();
  return meals[0];
};

// Imagens
export const imageIngredient = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

// Comidas aleatórias
export const foodRandom = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(endpoint);
  const { meals } = await response.json();
  return meals;
};

export const getFoodRecomendation = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  const { meals } = await response.json();
  return meals;
};
