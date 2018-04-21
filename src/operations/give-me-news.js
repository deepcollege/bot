// @flow
import moment from 'moment';

/**
 *
 * @param message
 * @returns {Promise.<void>}
 */
const handler = async ({ message }) => {
  moment.locale('en-AU');
  const yesterday = moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  message.client.channels
    .find('name', 'resources')
    .search({
      after: yesterday,
      before: today,
    })
    .then(res => {
      const hit = res.messages[0].find(m => m.hit).content;
      console.log('hit ', res.messages)
      console.log(`I found: **${hit}**, total results: ${res.totalResults}`);
    })
    .catch(console.error);
};

export default {
  handler,
};
