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

export const clearStorage = () => localStorage.clear();
