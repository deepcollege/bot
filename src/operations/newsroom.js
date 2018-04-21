// @flow
import * as R from 'ramda';
import moment from 'moment';
import utils from './utils';

const MAX_MESSAGE_FETCH_CHANNEL = 100;

const getHitsFromTowardsDataScience = async () => {};

const getHitsFromChannel = async ({ dateSince, targetChannel }) => {
  return await R.composeP(
    R.flatten,
    // Extract urls from contents
    messageCollection =>
      messageCollection.map(msg => utils.urlify(msg.content)),
    // Get message after yesterday
    messageCollection =>
      messageCollection.filter(msg => moment(msg.createdAt).isAfter(dateSince)),
    // Get message reservoir
    channel => channel.fetchMessages({ limit: MAX_MESSAGE_FETCH_CHANNEL }),
  )(targetChannel);
};

const handler = async ({ message }) => {
  moment.locale('en-AU');
  const yesterday = moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  const today = moment().format('YYYY-MM-DD');

  // Place to post news back
  const newsroomChannel = message.client.channels.find('name', 'newsroom');
  console.log('checking news ', newsroomChannel);
  // Place to find news
  const resourcesChannel = message.client.channels.find('name', 'resources');
  console.log('resource channel ', resourcesChannel);

  const messageCollection = await getHitsFromChannel({
    dateSince: yesterday,
    targetChannel: resourcesChannel,
  });
  console.log(messageCollection);
};

export default {
  handler,
};
