import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [invalidLogin, setInvalidLogin] = useState(false);

  const validFields = () => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = emailPattern.test(input.email);
    const FIVE = 5;

    return validEmail && input.password.length > FIVE;
  };

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post('/login', input).then((res) => {
      if (res.data.errors) setInvalidLogin(true);
    });
  };

  return (
    <div>
      <section>
        <h4>Login</h4>
        <form onChange={ handleSubmit }>
          <label htmlFor="email">
            E-mail
            <input
              name="email"
              type="text"
              onChange={ handleInput }
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              type="password"
              onChange={ handleInput }
              data-testid="common_login__input-password"
            />
          </label>
          <button
            type="submit"
            name="login"
            data-testid="common_login__button-login"
            disabled={ !validFields() }
          >
            Log in
          </button>
          <button
            type="submit"
            data-testid="common_login__button-register"
          >
            Subscribe
          </button>
          {invalidLogin && (
            <p data-testid="common_login__element-invalid-email">Wrong credentials</p>
          )}
        </form>
      </section>
    </div>
  );
}
