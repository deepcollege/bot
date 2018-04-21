// @flow
import * as R from 'ramda';
import moment from 'moment';
import puppeteer from 'puppeteer';
import utils from './utils';

const MAX_MESSAGE_FETCH_CHANNEL = 100;

const getHitsFromTowardsDataScience = async () => {
  /**
   * TowardsDataScience JSON datastructure
   * {
   *   success
   *   payload {
   *      collection
   *      topic
   *      header
   *      streamItems
   *      references {
   *        Collection
   *        User
   *        Post   <---- We are interested in this
   *      }
   *   }
   * }
   */
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    'https://towardsdatascience.com/machine-learning/home?format=json',
  );
  const content = await R.composeP(
    x => JSON.parse(x),
    x => R.replace(/^]\)}while\(1\);<\/x>/g, '', x),
    () => page.evaluate(() => document.querySelector('body > pre').textContent),
  )();
  const postLens = R.lensPath(['payload', 'references', 'Post']);
  const posts = R.compose(
    // Pick only values out because we've iterated over objects
    R.values,
    R.map(x => {
      return {
        title: x.title,
        url: `https://towardsdatascience.com/${x.uniqueSlug}`,
      };
    }),
    x => R.view(postLens, x),
  )(content);
  console.log(posts);
};

const getHitsFromChannel = async ({ dateSince, targetChannel }) => {
  return R.composeP(
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
  await getHitsFromTowardsDataScience();
};

export default {
  handler,
};
