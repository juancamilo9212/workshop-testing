/** Takes an asynchronous function that takes a callback and an _errback_ as
 * its last arguments, and builds a version that uses `Promise`.
 *
 * @param {function} fn - The function to _promisify_.
 * @param {function} [result=null] - A function to process the result.
 * @returns {function} A promisified version of `fn`.
 */
const promisify = (fn, result = null) => (...args) => new Promise((resolve, reject) => {
  const successCallback = (...callbackArgs) => {
    if (result) {
      resolve(result(...callbackArgs));
    } else if (callbackArgs.length < 2) {
      resolve(callbackArgs[0]); // Undefined is used intentionally.
    } else {
      resolve(callbackArgs);
    }
  };
  const newArgs = [...args, successCallback, reject];
  fn.apply(this, newArgs);
});

export default promisify;
