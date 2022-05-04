export const addToken = (email) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getUser = () => {
  if (!JSON.parse(localStorage.getItem('user'))) {
    localStorage.setItem('user', JSON.stringify({ email: 'test@project.com' }));
  }
  return JSON.parse(localStorage.getItem('user'));
};

export const getFavorite = () => {
  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
};

export const removeFavorite = (obj) => {
  const readFavorites = getFavorite();
  const newFavorites = readFavorites.filter((fav) => fav.id !== obj.id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const saveFavorite = (obj) => {
  const readFavorites = getFavorite();
  localStorage.setItem('favoriteRecipes', JSON.stringify([...readFavorites, obj]));
};
export const getDoneRecipes = () => {
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('doneRecipes'));
};

export const saveDoneRecipes = (obj) => {
  const readDone = getDoneRecipes();
  localStorage.setItem('doneRecipes', JSON.stringify([...readDone, obj]));
};

export const getInProgressRecipes = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    return localStorage.setItem('inProgressRecipes', JSON.stringify(
      { meals: {}, cocktails: {} },
    ));
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
};

export const updateInProgressRecipes = (obj, type) => {
  const previousRecipes = getInProgressRecipes;
  if (type === 'food') {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { ...previousRecipes,
        meals: {
          ...previousRecipes.meals,
          [obj.id]: obj.ingredients,
        } },
    ));
    return;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    { ...previousRecipes,
      cocktails: {
        ...previousRecipes.cocktails,
        [obj.id]: obj.ingredients,
      } },
  ));
};

export const clearStorage = () => localStorage.clear();
