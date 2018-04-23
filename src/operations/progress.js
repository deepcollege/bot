// @flow
import utils from './utils';

const handler = async ({ message }) => {
  const results = utils.getPercentage();
  message.channel.send(`${results.percentage}% of ${results.year}`);
  Promise.resolve();
};

export default {
  handler,
};
