/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../redux/actions';

const Login = () => {
  const history = useHistory();
  const {
    isAuthenticated,
    errorMessage,
  } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/list/favorites');
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  const formRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      username: inputUsername,
      password: inputPassword,
    } = formRef.current;
    dispatch(login({
      username: inputUsername.value.trim(),
      password: inputPassword.value.trim(),
    }));
    return false;
  };

  const bgColor = errorMessage ? 'bg-red-600' : 'bg-primary';
  return (
    <div className="w-full h-full flex flex-col flex-no-wrap items-center justify-around">
      {!isAuthenticated && (
        <form
          className={`px-5 flex flex-col items-center text-secondary rounded p-2 ${bgColor}`}
          onSubmit={(event) => handleSubmit(event)}
          ref={formRef}
        >
          <h2 className="text-xl text-center p-2">
            Log in
          </h2>
          <p className="p-2 text-center">
            {errorMessage || (
              <>
                {'Use your account for '}
                <a href="https://www.themoviedb.org/"><em>The Movie DB</em></a>
              </>
            )}
          </p>
          <ul>
            <li className="flex items-center p-2">
              <label className="flex-1 pr-5" htmlFor="username">
                User name:
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="rounded text-center bg-black text-white"
              />
            </li>
            <li className="flex items-center p-2">
              <label className="flex-1 pr-5" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="rounded text-center bg-black text-white"
              />
            </li>
            <li className="p-2 text-center">
              <input
                type="submit"
                value="Enter"
                className={`py-1 px-5 border border-black border-solid rounded-lg ${bgColor} text-black focus:bg-black focus:text-primary`}
              />
            </li>
          </ul>
        </form>
      )}
    </div>
  );
}; // Login

export default Login;
