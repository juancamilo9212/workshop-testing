import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions';

const Logout = ({
  children,
  className,
}) => {
  const sessionId = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClick = async () => {
    await dispatch(logout({ sessionId }));
    return false;
  };
  return (
    <Link
      className={className}
      onClick={(event) => handleClick(event)}
      to="/list/popular"
    >
      {children}
    </Link>
  );
}; // Logout

Logout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Logout.defaultProps = {
  className: '',
};

export default Logout;
