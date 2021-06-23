import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Router from './Router';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Login from './Login';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import UserProfile from './UserProfile';

const App = ({
  location,
}) => {
  const home = useSelector((state) => (
    state.auth?.isAuthenticated ? '/list/favorites' : '/list/popular'
  ));
  return (
    <div className="h-full w-full flex flex-col">
      <Router location={location}>
        <AppHeader />
        <main className="flex-1 p-1">
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={UserProfile} />
          <Route path="/list/:id(\w+)" exact component={MovieList} />
          <Route path="/movie/:id(\d+)" exact component={MovieDetail} />
          <Redirect to={home} />
        </main>
        <AppFooter />
      </Router>
    </div>
  );
}; // App

App.propTypes = {
  location: PropTypes.string,
};

App.defaultProps = {
  location: null,
};

export default App;
