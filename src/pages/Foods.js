import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';

const doze = 12;
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

  useEffect(() => {
    if (data.meals === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [data]);

  return (
    <div>
      <Header title="Foods" show />
      {data.meals && data.meals.filter((f, i) => i < doze).map((food, index) => (
        <RecipeCard
          index={ index }
          name={ food.strMeal }
          img={ food.strMealThumb }
          key={ index }
        />
      ))}
      <Footer />
    </div>
  );
}

export default Foods;
