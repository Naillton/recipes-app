import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';

function Drinks() {
  const { setPage, data } = useContext(AppContext);

  const history = useHistory();
  useEffect(() => {
    setPage('Drinks');
    if (data.drinks && data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
  }, [setPage, data, history]);

  return (
    <div>
      <Header title="Drinks" show />
      <Footer />
    </div>
  );
}

export default Drinks;
