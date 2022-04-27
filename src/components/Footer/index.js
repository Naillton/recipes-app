import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link
        to="/drinks"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </Link>
      <Link
        to="/explore"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
      >
        <img src={ exploreIcon } alt="exploreIcon" />
      </Link>
      <Link
        to="/foods"
        src={ mealIcon }
        data-testid="food-bottom-btn"
      >
        <img src={ mealIcon } alt="mealIcon" />
      </Link>
    </footer>
  );
}

export default Footer;
