/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import movieDb from '../apis/movie-db';
import { markFavorite, markWatchlist } from '../redux/actions';

const MovieListItem = ({
  movieId,
}) => {
  const movie = useSelector((state) => state.movies?.[movieId]);
  const title = movie?.title ?? `Movie #${movieId}`;
  const poster = movie && movie.poster
    ? movieDb.imageURL(movie.poster) : null; // TODO proper error poster
  const { sessionId, accountId } = useSelector((state) => state.auth);

  const isFavorite = useSelector((state) => {
    const favorites = state.lists.favorites?.movies;
    return favorites && favorites.find((id) => id === movieId);
  });
  const isInWatchList = useSelector((state) => {
    const watchlist = state.lists.watchlist?.movies;
    return watchlist && watchlist.find((id) => id === movieId);
  });
  const dispatch = useDispatch();

  const renderFavoriteIcon = () => {
    const textStyle = isFavorite ? 'text-marked' : 'text-unmarked';
    const clickHandler = (event) => {
      event.preventDefault();
      dispatch(markFavorite({
        sessionId, accountId, movieId, mark: !isFavorite,
      }));
    };
    return (
      <button
        className={`icofont-heart ${textStyle} p-1 text-2xl`}
        onClick={clickHandler}
        type="button"
        aria-label={`${isFavorite ? 'unmark' : 'mark'} as favorite`}
      />
    );
  };

  const renderWatchlistIcon = () => {
    const textStyle = isInWatchList ? 'text-marked' : 'text-unmarked';
    const clickHandler = (event) => {
      event.preventDefault();
      dispatch(markWatchlist({
        sessionId, accountId, movieId, mark: !isInWatchList,
      }));
    };
    return (
      <button
        className={`icofont-book-mark ${textStyle} p-1 text-2xl`}
        onClick={clickHandler}
        type="button"
        aria-label={`${isFavorite ? 'unmark' : 'mark'} as watched`}
      />
    );
  };

  return (
    <li
      id={`movie-${movieId}`}
      key={movieId}
      className="movie-list-poster flex flex-col p-1 bg-black-a50"
    >
      <Link to={`/movie/${movieId}`}>
        <img className="flex-1" src={poster} alt={title} />
      </Link>
      <p className="flex-grow-0 flex text-xs sm:text-sm md:text-md bg-black rounded items-center h-10">
        {sessionId && renderFavoriteIcon()}
        <span className="flex-1 text-center">{title}</span>
        {sessionId && renderWatchlistIcon()}
      </p>
    </li>
  );
}; // MovieListItem

MovieListItem.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieListItem;
