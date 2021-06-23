/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import movieDb from '../apis/movie-db';
import Logout from './Logout';
import countryNames from '../data/country-names.json';
import languageNames from '../data/language-names.json';

const UserProfile = () => {
  const {
    avatar, accountId, country, isAuthenticated, language, name, username,
  } = useSelector((state) => state.auth);
  const countryName = countryNames[country];
  const languageName = languageNames[language];
  if (isAuthenticated) {
    return (
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div className="flex p-2 bg-black-a50 rounded">
          <img className="rounded-lg" src={movieDb.userImage(avatar, 256)} alt={avatar} />
          <ul className="px-2 flex-1 flex flex-col items-end">
            <li className="pb-2 text-2xl self-start">{name}</li>
            <li className="py-1">Account id: {accountId}</li>
            <li className="py-1">User: {username}</li>
            <li className="py-1">Country: {countryName}</li>
            <li className="py-1">Language: {languageName}</li>
            <li className="pt-2 lex-1 self-center py-1">
              <Logout className="py-2 px-5 bg-green rounded-lg bg-primary text-secondary">Logout</Logout>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return <Redirect to="/login" />;
}; // UserProfile

export default UserProfile;
