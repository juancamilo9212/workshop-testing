/* global describe test expect */
import * as actions from '../actions';

describe('actions', () => {
  test('are defined as expected', () => {
    const allActions = Object.values(actions);
    allActions.forEach((action) => {
      expect(action).toBeOfType('function');
      if (action.type) { // Sync action
        expect(action.type).toBeOfType('string');
      } else { // Async thunk
        expect(action.typePrefix).toBeOfType('string');
        ['pending', 'fulfilled', 'rejected'].forEach((subtype) => {
          const subaction = action[subtype];
          expect(subaction).toBeOfType('function');
          expect(subaction.type).toBeOfType('string');
          expect(subaction.type).toBe(`${action.typePrefix}/${subtype}`);
        });
      }
    });
  });
}); // describe actions
