import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import addToken from '../../helpers/tokenLocalStorage';

export default function Login() {
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const { email, password } = credential;

  useEffect(() => {
    const verificaForm = () => {
      const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
      const emailTest = regex.test(email);
      const magic = 6;
      if ((password.length > magic) && emailTest) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    verificaForm();
  }, [email, password]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCredential({ ...credential, [name]: value });
  };

  const handleClick = () => {
    addToken(email);
  };

  // handleClick = async () => {
  //   const { history, userSubmit, getToken, token } = this.props;
  //   const { email, name } = this.state;
  //   userSubmit(email, name);
  //   if (!token) await getToken();
  //   history.push('/game');
  // };

  return (
    <div>
      <input
        type="email"
        name="email"
        id="email"
        data-testid="email-input"
        value={ email }
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        id="password"
        data-testid="password-input"
        value={ password }
        onChange={ handleChange }
      />
      <Link to="/foods">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </Link>
    </div>
  );
}
