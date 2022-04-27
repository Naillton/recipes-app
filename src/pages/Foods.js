import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';

function Foods() {
  const { setPage, data } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    setPage('Foods');
  }, [setPage]);

  useEffect(() => {
    if (data.meals && data.meals.length === 1) {
      history.push(`/foods/${data.meals[0].idMeal}`);
    }
  }, [data, history]);

  return (
    <div>
      <Header title="Foods" show />
      <Footer />
    </div>
  );
}

export default Foods;
