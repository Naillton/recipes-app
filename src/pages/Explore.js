import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const { push } = useHistory();

  return (
    <div className="explore">
      <Header title="Explore" show={ false } />
      <div>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
