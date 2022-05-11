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
        <img
          className="gif-search"
          alt="gif-search"
          width="100px"
          src="https://media1.giphy.com/media/1pUvx2WHilZYxZ60e1/giphy.gif?cid=ecf05e47vrefj9gkn0n984bspga4nrbn6uskn7pz1ic9fqj4&rid=giphy.gif&ct=s"
        />
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
