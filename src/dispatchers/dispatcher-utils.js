// @flow
import * as R from 'ramda';

const constructEvent = ({ func, payload }) => {
  // TODO: Should we check "fileName.method" pattern?
  const [action, handler] = R.split('.', func);
  return { action, handler, payload };
};

const constructPayload = ({ inputs = [], message, client }) => {
  const _startObject = {};
  return R.reduce(
    (acc, input) => {
      if (input === 'message') {
        const xLens = R.lensProp('message');
        return R.set(xLens, message, acc);
      } else if (input === 'client') {
        const xLens = R.lensProp('client');
        return R.set(xLens, client, acc);
      } else {
        // If input type is not detected, it will skip
        console.warn(`Skipping payload construction for input ${input}`);
        return acc;
      }
    },
    _startObject,
    inputs,
  );
};

export default {
  constructEvent,
  constructPayload,
};
