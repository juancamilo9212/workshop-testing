/* global jest describe test expect */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, screen } from '@testing-library/react';
import { newStore } from '../../redux/store';
import { PREDEFINED_LISTS } from '../../apis/movie-db';
import { fetchMovie, fetchTrailer } from '../../redux/actions';
import MovieDetail from '../MovieDetail';
import YoutubeFrame from '../YoutubeFrame';

jest.mock('../../apis/movie-db-api');

const getTestMovie = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const { getter } of Object.values(PREDEFINED_LISTS)) {
    // eslint-disable-next-line no-await-in-loop
    const data = await getter({});
    return data.results[0];
  }
  return null;
};

const componentWithStoreAndRouter = (store, movie) => {
  const { id: testMovieId } = movie;
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/movie/${testMovieId}`]}>
        <Route path="/movie/:id" exact component={MovieDetail} />
      </MemoryRouter>
    </Provider>
  );
};

const dispatchAsyncThunk = async (store, action) => {
  const fetchMovieResult = await store.dispatch(action);
  expect(fetchMovieResult.type).toMatch(/\/fulfilled$/);
  return fetchMovieResult;
};

const enzymeMatchSnapshot = (wrapper) => {
  const wrapperJSON = toJson(wrapper);
  // This part of the snapshot changes almost on every run.
  // See <https://github.com/react-navigation/react-navigation/issues/2269>
  wrapperJSON.node.rendered.rendered.props.history.entries[0].key = '12345';
  expect(wrapperJSON).toMatchSnapshot();
};

describe('MovieDetail', () => {
  describe('(with enzyme)', () => {
    test('renders properly, without a movie', async () => {
      const testMovie = await getTestMovie();
      const store = newStore();
      const wrapper = mount(componentWithStoreAndRouter(store, testMovie));
      expect(wrapper.find('h1')).toHaveLength(0);
      expect(wrapper.find(YoutubeFrame)).toHaveLength(0);
      enzymeMatchSnapshot(wrapper);
    });

    test('renders properly, with movie but no trailer', async () => {
      const testMovie = await getTestMovie();
      const store = newStore();
      await dispatchAsyncThunk(store, fetchMovie({ movieId: testMovie.id }));
      const wrapper = mount(componentWithStoreAndRouter(store, testMovie));
      expect(wrapper.find('h1')).toHaveLength(1);
      expect(wrapper.find(YoutubeFrame)).toHaveLength(0);
      enzymeMatchSnapshot(wrapper);
    });

    test('renders properly, with movie and trailer', async () => {
      const testMovie = await getTestMovie();
      const store = newStore();
      await dispatchAsyncThunk(store, fetchMovie({ movieId: testMovie.id }));
      await dispatchAsyncThunk(store, fetchTrailer({ movieId: testMovie.id }));
      const wrapper = mount(componentWithStoreAndRouter(store, testMovie));
      expect(wrapper.find('h1')).toHaveLength(1);
      expect(wrapper.find(YoutubeFrame)).toHaveLength(1);
      enzymeMatchSnapshot(wrapper);
    });
  });

  describe('(with testing-library)', () => {
    test('renders properly, without a movie', async () => {
      const testMovie = await getTestMovie();
      const store = newStore();
      render(componentWithStoreAndRouter(store, testMovie));
      // screen.debug();
      expect(screen.queryByText(testMovie.title)).toBeNull();
      expect(screen.queryByText('Loading. Please wait...')).not.toBeNull();
    });

    test('renders properly, with movie but no trailer', async () => {
      const testMovie = await getTestMovie();
      const store = newStore();
      await dispatchAsyncThunk(store, fetchMovie({ movieId: testMovie.id }));
      render(componentWithStoreAndRouter(store, testMovie));
      expect(screen.queryByText(testMovie.title)).not.toBeNull();
      expect(screen.queryByText('Loading. Please wait...')).not.toBeNull();
    });

    test('renders properly, with movie and trailer', async () => {
      const testMovie = await getTestMovie();
      const store = newStore();
      await dispatchAsyncThunk(store, fetchMovie({ movieId: testMovie.id }));
      await dispatchAsyncThunk(store, fetchTrailer({ movieId: testMovie.id }));
      render(componentWithStoreAndRouter(store, testMovie));
      expect(screen.queryByText(testMovie.title)).not.toBeNull();
      expect(screen.queryByText('Loading. Please wait...')).toBeNull();
    });
  });
}); // describe MovieDetail
