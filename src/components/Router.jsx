import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

const Router = ({
  children,
  location,
}) => {
  if (location) {
    return <StaticRouter location={location}>{children}</StaticRouter>;
  }
  return <BrowserRouter>{children}</BrowserRouter>;
}; // Router

Router.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
};

Router.defaultProps = {
  location: null,
};

export default Router;
