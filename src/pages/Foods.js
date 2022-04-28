import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import { nameSearch } from '../api/foodsAPI';
import Categories from '../components/Categories';

const doze = 12;
function Foods() {
  const { setPage, setData, data, categories } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    setPage('Foods');
  }, [setPage]);

  useEffect(() => {
    const callData = async () => {
      setData(await nameSearch());
    };
    callData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories.length === 0 && data.meals && data.meals.length === 1) {
      history.push(`/foods/${data.meals[0].idMeal}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, history]);

  useEffect(() => {
    if (data.meals === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [data]);

  return (
    <div>
      <Header title="Foods" show />
      <Categories />
      {data.meals && data.meals.filter((f, i) => i < doze).map((food, index) => (
        <Link to={ `/foods/${food.idMeal}` } key={ index }>
          <RecipeCard
            index={ index }
            name={ food.strMeal }
            img={ food.strMealThumb }
            key={ index }
          />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default Foods;
