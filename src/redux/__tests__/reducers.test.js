/* global jest describe test expect */
import { fetchList, fetchMovie } from '../actions';
import { newStore } from '../store';
import dataGetPopular from '../../apis/__mocks__/movie-popular.json';

jest.mock('../../apis/movie-db-api');

describe('reducers', () => {
  test('fetchList works for "popular"', async () => {
    const store = newStore();
    // Previous state
    const prevState = store.getState();
    expect(prevState?.lists?.popular).toBeDefined();
    expect(prevState.lists.popular.movies).toBeNull();
    expect(prevState?.movies).toEqual({});
    // Dispatch fetch
    const result = await store.dispatch(fetchList({ listId: 'popular' }));
    expect(result.type).toBe(fetchList.fulfilled.type);
    // Next state
    const nextState = store.getState();
    expect(nextState?.lists?.popular).toBeDefined();
    expect(nextState.lists.popular.movies).toBeOfType(Array);
    nextState.lists.popular.movies.forEach((movie) => {
      expect(movie).toBeOfType('number');
      expect(nextState.movies).toHaveProperty(`${movie}.id`, movie);
    });
  });

  test('fetchMovie works', async () => {
    const store = newStore();
    const testMovie = dataGetPopular.results[0];
    expect(testMovie?.id).toBeOfType('number');
    // Previous state
    const prevState = store.getState();
    expect(prevState?.movies).toEqual({});
    // Dispatch fetch
    const result = await store.dispatch(fetchMovie({ movieId: testMovie.id }));
    expect(result.error).not.toBeDefined();
    expect(result.type).toBe(fetchMovie.fulfilled.type);
    // Next state
    const nextState = store.getState();
    expect(nextState.movies).toHaveProperty(`${testMovie.id}`, {
      id: testMovie.id,
      poster: testMovie.poster_path,
      title: testMovie.title,
      trailer: '',
    });
  });
}); // describe reducers
