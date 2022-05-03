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

// export const saveFavorite = () => {
//   localStorage.setItem('favoriteRecipes',
//     // JSON.stringify({ id: obj.id,
//     //   type,
//     //   nationality,
//     //   category,
//     //   alcoholicOrNot,
//     //   name,
//     //   image })
//   // );
// };

export const getFavorite = () => {
  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    localStorage.setItem('user', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
};

export const getDoneRecipes = () => {
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('doneRecipes'));
};

export const clearStorage = () => localStorage.clear();
