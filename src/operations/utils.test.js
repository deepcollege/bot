import * as R from 'ramda';
import utils from './utils';

describe('utils', () => {
  it('grab urls from a string', () => {
    const results = utils.urlify(`
    test test https://www.google.com
    https://zxc.com
    `);
    expect(R.contains('https://www.google.com', results)).toBe(true);
    expect(R.contains('https://zxc.com', results)).toBe(true);
  });
});
