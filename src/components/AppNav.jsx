import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppNav = ({
  className,
  currentListId,
}) => {
  const lists = useSelector((state) => state.lists);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const listLists = Object.values(lists);
  listLists.sort((list1, list2) => (
    list1.order - list2.order || list1.id.localeCompare(list2.id)
  ));
  return (
    <nav className={className}>
      {listLists.filter((list) => {
        const { userList } = list;
        return !userList || isAuthenticated;
      }).map((list) => {
        const { id, name } = list;
        if (id === currentListId) {
          return (
            <p
              key={id}
              className="px-2 py-1 text-black bg-white rounded font-bold"
            >
              {name}
            </p>
          );
        }
        return (
          <Link
            to={`/list/${id}`}
            key={id}
            className="px-2 py-1"
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}; // AppNav

AppNav.propTypes = {
  className: PropTypes.string,
  currentListId: PropTypes.string.isRequired,
};

AppNav.defaultProps = {
  className: '',
};

export default AppNav;
