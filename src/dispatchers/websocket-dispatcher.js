// @flow
import * as R from 'ramda';
import Discord from 'discord.js';
import config from '../config';

/**
 * Discord Websocket dispatcher
 * @param queue
 */
const init = ({ queue }) => {
  // Setup environment variables

  const client = new Discord.Client();

  client.on('ready', () => {
    console.log('I am ready!');
  });

  const handleCondition = ({ condition, message }) => {
    const conditionName = R.head(Object.keys(condition));
    const value = R.prop(conditionName, condition);
    if (conditionName === 'contentEquals') {
      // Check if content message.content
      return R.equals(value, message.content);
    }
  };

  const constructPayload = ({ inputs, message }) => {
    const _startObject = {};
    return R.reduce(
      (acc, input) => {
        if (input === 'message') {
          const xLens = R.lensProp('message');
          return R.set(xLens, message, acc);
        }
        // If input type is not detected, it will skip
        console.warn(`Skipping payload construction for input ${input}`);
        return acc;
      },
      _startObject,
      inputs,
    );
  };

  const constructEvent = ({ func, payload }) => {
    // TODO: Should we check "fileName.method" pattern?
    const [action, handler] = R.split('.', func);
    return { action, handler, payload };
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
        const event = constructEvent({
          func: op.function,
          payload: constructPayload({ inputs, message }),
        });

        // If conditions are all good, publishes the event
        queue.push(event);
      }
    }, operations);
  });

  client.login(process.env.DISCORD_PRIV_KEY);
};

export default {
  init,
};
