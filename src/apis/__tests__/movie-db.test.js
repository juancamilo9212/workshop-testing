/* global describe, test, expect */
import { imageURL } from '../movie-db';

describe('movie-db', () => {
  test('imageURL references The Movie DB', () => {
    const expectedHostname = 'image.tmdb.org';
    const pathnameRegExp = /(\/\w+)*\/\w+\.(jpe?g|png)/;

    const url1 = imageURL('1234567890abcdef.jpg');
    expect(url1.hostname).toBe(expectedHostname);
    expect(url1.pathname).toMatch(pathnameRegExp);

    const url2 = imageURL('/1234567890abcdef.jpg');
    expect(url2.hostname).toBe(expectedHostname);
    expect(url2.pathname).toMatch(pathnameRegExp);
  });
}); // describe movie-db
