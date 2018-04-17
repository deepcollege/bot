// @flow
const get_percentage = require('./utils').get_percentage;

const handler = async ({ message }) => {
    var results = get_percentage();
    message.channel.send(`${results.percentage}% of ${results.year}`);
    Promise.resolve();
  };
  
  export default {
    handler,
  };
  