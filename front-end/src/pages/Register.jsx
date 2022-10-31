import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [input, setInput] = useState({ name: '', email: '', password: '' });
  const [invalidRegistered, setInvalidRegistered] = useState(false);

  const navigate = useNavigate();

  const validateFields = () => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = emailPattern.test(input.email);
    const FIVE = 5;
    const ELEVEN = 11;

    return validEmail && input.password.length > FIVE && input.name.length > ELEVEN;
  };

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:3001/register', input)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        if (!data.token) {
          setInvalidRegistered(true);
        } else {
          const stringfyData = JSON.stringify(data);
          localStorage.setItem('userData', stringfyData);
          navigate('/customer/products');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <section>
        <h4>Register</h4>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="name">
            Name
            <input
              name="name"
              type="text"
              onChange={ handleInput }
              data-testid="common_register__input-name"
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              name="email"
              type="text"
              onChange={ handleInput }
              data-testid="common_register__input-email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              type="password"
              onChange={ handleInput }
              data-testid="common_register__input-password"
            />
          </label>
          <button
            type="submit"
            name="login"
            disabled={ !validateFields() }
            data-testid="common_register__button-register"
          >
            Register
          </button>
          {invalidRegistered && (
            <p data-testid="common_register__element-invalid_register">
              Already registered
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
