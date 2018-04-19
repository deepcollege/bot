// @flow
const getPercentage = require('./utils').getPercentage;

const handler = async ({ message }) => {
  const results = getPercentage();
  message.channel.send(`${results.percentage}% of ${results.year}`);
  Promise.resolve();
};

export default {
  handler,
};
