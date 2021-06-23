import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import MovieListItem from './MovieListItem';
import AppNav from './AppNav';
import { fetchList } from '../redux/actions';

const MovieList = ({
  match,
}) => {
  const listId = match.params.id;
  const movies = useSelector((state) => state.lists[listId]?.movies);
  const { sessionId, accountId } = useSelector((state) => state.auth);
  const fetchError = useSelector((state) => (
    state.requests.FETCH_LIST && state.requests.FETCH_LIST.error
  ));
  const dispatch = useDispatch();

  const renderMovies = () => {
    if (movies) {
      return (
        <ul className="w-full flex flex-wrap justify-between">
          {movies.map((id) => (
            <MovieListItem key={id} movieId={id} />
          ))}
        </ul>
      );
    }
    dispatch(fetchList({ sessionId, accountId, listId }));
    if (fetchError) { // movies' loading failed.
      // eslint-disable-next-line react/jsx-one-expression-per-line
      return <p>Loading movies with {fetchError}!</p>; // FIXME Show error.
    }
    return <p>Loading. Please wait...</p>;
  };

  return (
    <div className="">
      <AppNav className="flex flex-no-wrap" currentListId={listId} />
      {renderMovies()}
    </div>
  );
}; // MovieList

MovieList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired, // FIXME
};

export default MovieList;
