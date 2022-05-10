import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import { ingredientsSearch, nameSearch } from '../api/foodsAPI';
import Categories from '../components/Categories';
import './styles.css';

const doze = 12;
function Foods() {
  const {
    setPage, setData, data, category,
    setRecomendationFood, ingredientChosen, setIngredientChosen,
  } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    setPage('Foods');
  }, [setPage]);

  useEffect(() => {
    const callData = async () => {
      if (ingredientChosen !== '') {
        const foodAPI = await ingredientsSearch(ingredientChosen);
        setData(foodAPI);
        setIngredientChosen('');
        return;
      }
      const foodArray = await nameSearch();
      setRecomendationFood(foodArray);
      setData(foodArray);
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
    <div className="foods">
      <div className="food-content">
        <Header title="Foods" show />
        <Categories />
        <div className="recipe-card">
          {data && data.filter((f, i) => i < doze).map((food, index) => (
            <Link to={ `/foods/${food.idMeal}` } key={ index }>
              <RecipeCard
                index={ index }
                name={ food.strMeal }
                img={ `${food.strMealThumb}/preview` }
                key={ index }
              />
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Foods;
