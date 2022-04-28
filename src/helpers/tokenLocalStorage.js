export const addToken = (email) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const clearStorage = () => localStorage.clear();
