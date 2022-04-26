const addToken = (email) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email }));
};

export default addToken;
