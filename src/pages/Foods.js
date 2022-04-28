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
  const { setPage, setData, data, category } = useContext(AppContext);

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
    if (data && category === '' && data.length === 1) {
      history.push(`/foods/${data[0].idMeal}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [data]);

  return (
    <div>
      <Header title="Foods" show />
      <Categories />
      {data && data.filter((f, i) => i < doze).map((food, index) => (
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
