/* global expect */
/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

/** Custom matchers.
 *
 */
expect.extend({
  /** Tests the type of the received value. If `type` is a string the `typeof`
   * operator is used. Else it is assumed `type` is a function, and the
   * `instanceof` operator is used.
  */
  toBeOfType(received, type) {
    // eslint-disable-next-line valid-typeof
    const pass = typeof type === 'string' ? (typeof received === type)
      : (received instanceof type);
    if (pass) {
      return {
        message: () => `expected ${received} not to be of type ${type}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be of type ${type}`,
      pass: false,
    };
  },
});
