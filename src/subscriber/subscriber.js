// @flow
import path from 'path';
import * as R from 'ramda';
import requireAll from 'require-all';

const subscribe = (event, done) => {
  const operationsPath = path.join(__dirname, '/../operations');
  const { action, handler, payload } = event;
  const allOperations = requireAll(operationsPath);
  const operation = R.prop(action, allOperations);
  // Function of the operation retrieved according to action and handler from event
  const handlerMethod = R.prop(handler, operation.default);
  handlerMethod(payload)
    .then(done)
    .catch(console.error);
};

export default {
  subscribe,
};
