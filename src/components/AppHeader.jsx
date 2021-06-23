/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import movieDb from '../apis/movie-db';

const THE_MOVIE_DB_LOGO = 'https://www.themoviedb.org/assets/2/v4/logos/stacked-green-cae7a95e2590dbdde28284ac26245cb2792788838f5c498b892e8d01c183e6f3.svg';

const AppHeader = () => {
  const {
    avatar,
    isAuthenticated,
    username,
  } = useSelector((state) => state.auth);
  return (
    <header className="w-full flex flex-no-wrap items-center p-5 justify-between bg-black-fade-down">
      <span className="text-2xl absolute w-full text-center z-0">The Movie DB Browser</span>
      <a className="pr-3 z-10" href="https://www.themoviedb.org">
        <img className="w-12" src={THE_MOVIE_DB_LOGO} alt="The Movie DB logo" />
      </a>
      {isAuthenticated && (
        <Link className="px-2 flex items-center z-10" to="/profile">
          <span className="px-2">{username}</span>
          <img className="rounded-full" src={movieDb.userImage(avatar)} alt={username} />
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          className="py-2 px-5 bg-green rounded-lg bg-primary text-secondary z-10"
          to="/login"
        >
          Log in
        </Link>
      )}
    </header>
  );
}; // AppHeader

export default AppHeader;
