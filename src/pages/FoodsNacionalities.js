import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { nameSearch, nationalitiesList, nationalityFilter } from '../api/foodsAPI';
import RecipeCard from '../components/RecipeCard';

const doze = 12;

function FoodsNacionalities() {
  const [saveNationalities, setSaveNationalities] = useState([]);
  const [nationalitySelected, setNationalitySelected] = useState('');
  const [meals, setMeals] = useState([]);
  const [copyMeals, setCopyMeals] = useState([]);

  useEffect(() => {
    const getNationaties = async () => {
      const nationalities = await nationalitiesList();
      setSaveNationalities(nationalities.meals.map((e) => (e.strArea)));
    };
    const getMeals = async () => {
      const allMeals = await nameSearch();
      setMeals(allMeals);
      setCopyMeals(allMeals);
    };

    getNationaties();
    getMeals();
  }, []);

  const handleOption = ({ target }) => {
    setNationalitySelected(target.value);
  };

  useEffect(() => {
    const nationalityChange = async () => {
      if (nationalitySelected !== '' && nationalitySelected !== 'All') {
        const getMealsNationality = await nationalityFilter(nationalitySelected);
        setMeals(getMealsNationality.meals);
      }
      if (nationalitySelected === 'All') setMeals(copyMeals);
    };
    nationalityChange();
  }, [nationalitySelected, copyMeals]);

  return (
    <div className="explore-nationalities">
      <Header title="Explore Nationalities" show />

      <select
        className="button-nationalities"
        onClick={ handleOption }
        data-testid="explore-by-nationality-dropdown"
      >
        <option value="All" data-testid="All-option">All</option>
        {
          saveNationalities !== []
          && saveNationalities
            .map((nationality) => (
              <option
                key={ nationality }
                value={ nationality }
                data-testid={ `${nationality}-option` }
              >
                { nationality}
              </option>
            ))
        }
      </select>
      <div className="recipe-card">
        {
          meals.filter((f, i) => i < doze).map((food, index) => (
            <Link to={ `/foods/${food.idMeal}` } key={ index }>
              <RecipeCard
                index={ index }
                name={ food.strMeal }
                img={ `${food.strMealThumb}/preview` }
                key={ index }
              />
            </Link>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default FoodsNacionalities;
