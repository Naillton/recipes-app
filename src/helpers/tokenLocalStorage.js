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

export const clearStorage = () => localStorage.clear();
