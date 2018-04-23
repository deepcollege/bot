// @flow
import * as R from 'ramda';
import config from '../config';
import utils from './dispatcher-utils';

/**
 *
 * @param queue
 * @param client
 */
const init = ({ queue, client }) => {
  const handleCondition = ({ condition, message }) => {
    const conditionName = R.head(Object.keys(condition));
    const value = R.prop(conditionName, condition);
    if (conditionName === 'contentEquals') {
      // Check if content message.content
      return R.equals(value, message.content);
    }
  };
  client.on('message', message => {
    const operations = config.queryOperations({ type: 'websocket' });
    // Loops all websocket type operations
    R.forEach(op => {
      const conditions = op.conditions;
      const inputs = op.inputs;
      // Loops conditions condition results
      const results = R.map(
        condition => handleCondition({ condition, message }),
        conditions,
      );
      // TODO: At the moment it's only doing AND; we must handle OR and AND conditions
      if (R.all(R.equals(true), results)) {
        const event = utils.constructEvent({
          func: op.function,
          payload: utils.constructPayload({
            inputs,
            message,
            client,
          }),
        });

        // If conditions are all good, publishes the event
        queue.push(event);
      }
    }, operations);
  });
};

export default {
  init,
};
