// @flow
/**
 * Notes: Each news object should be
 * {
 *   title
 *   createdAt
 *   url
 * }
 */
import * as R from 'ramda';
import moment from 'moment';
import puppeteer from 'puppeteer';
import utils from './utils';

const MAX_MESSAGE_FETCH_CHANNEL = 100;
const TWD_MACHINE_LEARNING =
  'https://towardsdatascience.com/machine-learning/home';
const TWD_DATA_SCIENCE = 'https://towardsdatascience.com/data-science/home';

const getHitsFromMedium = async ({ dateSince, baseUrl }) => {
  if (!baseUrl || !baseUrl) {
    throw new Error(
      'Invalid arguments! baseUrl:',
      baseUrl,
      'dateSince:',
      dateSince,
    );
  }
  /**
   * Medium JSON datastructure
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
  await page.goto(`${baseUrl}?format=json`);
  const content = await R.composeP(
    x => JSON.parse(x),
    x => R.replace(/^]\)}while\(1\);<\/x>/g, '', x),
    () => page.evaluate(() => document.querySelector('body > pre').textContent),
  )();
  const postLens = R.lensPath(['payload', 'references', 'Post']);
  return R.compose(
    // Pick only values out because we've iterated over objects
    R.filter(x => moment(x.createdAt).isAfter(dateSince)),
    R.values,
    R.map(x => {
      return {
        title: x.title,
        url: `https://towardsdatascience.com/${x.uniqueSlug}`,
        createdAt: x.createdAt,
      };
    }),
    x => R.view(postLens, x),
  )(content);
};

const getHitsFromChannel = async ({ dateSince, srcChannel }) => {
  return R.composeP(
    R.flatten,
    // Extract urls from contents
    messageCollection =>
      messageCollection.map(msg => {
        return {
          createdAt: msg.createdAt,
          url: utils.urlify(msg.content), // TODO: Does it return multiple?
        };
      }),
    // Get message after yesterday
    messageCollection =>
      messageCollection.filter(msg => moment(msg.createdAt).isAfter(dateSince)),
    // Get message reservoir
    channel => channel.fetchMessages({ limit: MAX_MESSAGE_FETCH_CHANNEL }),
  )(srcChannel);
};

// Const constructNews = () => {};

const handler = async ({ message }) => {
  moment.locale('en-AU');
  const yesterday = moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  // Place to post news back
  const newsroomChannel = message.client.channels.find('name', 'newsroom');
  // Place to find news
  const resourcesChannel = message.client.channels.find('name', 'resources');

  const resourcesCollection = await getHitsFromChannel({
    dateSince: yesterday,
    srcChannel: resourcesChannel,
  });
  const twdMLHits = await getHitsFromMedium({
    baseUrl: TWD_MACHINE_LEARNING,
    dateSince: yesterday,
  });
  const twdDSHits = await getHitsFromMedium({
    baseUrl: TWD_DATA_SCIENCE,
    dateSince: yesterday,
  });
  const newsCollection = {
    deepLearning: twdMLHits,
    dataScience: twdDSHits,
    resources: resourcesCollection,
  };
  await newsroomChannel.send(JSON.stringify(newsCollection));
};

export default {
  handler,
};
