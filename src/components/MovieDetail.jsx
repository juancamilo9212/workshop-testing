import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import YoutubeFrame from './YoutubeFrame';
import { fetchMovie, fetchTrailer, markSeen } from '../redux/actions';

const MovieDetail = () => {
  const match = useRouteMatch();
  const movieId = match.params.id;
  const movie = useSelector((state) => state.movies[movieId]);
  const movieFetchError = useSelector((state) => (
    state.requests.FETCH_MOVIE && state.requests.FETCH_MOVIE.error
  ));
  const trailerFetchError = useSelector((state) => (
    state.requests.FETCH_TRAILER && state.requests.FETCH_TRAILER.error
  ));
  const title = movie && movie.title;
  const trailer = movie && movie.trailer;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleBackClick = (event) => {
    event.preventDefault();
    history.goBack();
  };

  if (!title) {
    dispatch(fetchMovie({ movieId }));
    return (
      <div className="text-center">
        <p className="text-xl">
          {!movieFetchError
            ? 'Loading. Please wait...'
            : `Loading movie failed with ${movieFetchError}!`}
        </p>
      </div>
    );
  }
  if (!trailer) {
    dispatch(fetchTrailer({ movieId }));
  } else {
    dispatch(markSeen({ movieId }));
  }
  return (
    <div className="h-full flex flex-col items-center justify-between">
      <h1 className="text-2xl">{title}</h1>
      {trailer
        ? <YoutubeFrame videoId={trailer} title={`Trailer for ${title}`} />
        : (
          <p className="text-xl">
            {trailerFetchError
              ? `Loading trailer failed with ${trailerFetchError}!`
              : 'Loading. Please wait...'}
          </p>
        )}
      <button
        id="back"
        onClick={(event) => handleBackClick(event)}
        type="button"
      >
        &larr; Back
      </button>
    </div>
  );
}; // MovieDetail

export default MovieDetail;
