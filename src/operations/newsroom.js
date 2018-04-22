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
import $ from 'cheerio';
import utils from './utils';
const mapIndexed = R.addIndex(R.map);

const TWD_MACHINE_LEARNING =
  'https://towardsdatascience.com/machine-learning/home';
const TWD_DATA_SCIENCE = 'https://towardsdatascience.com/data-science/home';
const puppeteerOptions = {args: ['--no-sandbox', '--disable-setuid-sandbox']}

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
  const browser = await puppeteer.launch(puppeteerOptions);
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

/*
Muting this function for now
Const getHitsFromChannel = async ({ dateSince, srcChannel }) => {
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
*/

const getMLMasteryHits = async ({ dateSince }) => {
  const link = 'https://machinelearningmastery.com/blog/';
  const browser = await puppeteer.launch(puppeteerOptions);
  const page = await browser.newPage();
  await page.goto(link);
  const content = await page.evaluate(
    () => document.querySelector('#main').outerHTML,
  );
  const articles = $(content).find('> article');
  return R.reduce(
    (acc, article) => {
      const createdAt = $(article)
        .find('.published')
        .attr('title');
      const title = $(article).find('header > .title a').innerText;
      const url = $(article)
        .find('header > .title a')
        .attr('href');
      if (moment(createdAt).isAfter(dateSince)) {
        const result = {
          title,
          createdAt,
          url,
        };
        return R.append(result, acc);
      }
      return acc;
    },
    [],
    articles,
  );
};

const constructNews = news => {
  const date = moment().format('DD-MM-YYYY');
  return R.compose(
    R.join('\n'),
    R.prepend(`DeepCollege top articles of ${date}`),
    mapIndexed((val, index) => {
      return `${index}. ${val.title} @ <${val.url}>`;
    }),
  )(news);
};

const handler = async ({ client }) => {
  moment.locale('en-AU');
  const yesterday = moment().subtract(1, 'day');

  // Place to post news back
  let newsroomChannel = client.channels.find('name', 'newsroom');

  const twdMLHits = await getHitsFromMedium({
    baseUrl: TWD_MACHINE_LEARNING,
    dateSince: yesterday,
  });
  const twdDSHits = await getHitsFromMedium({
    baseUrl: TWD_DATA_SCIENCE,
    dateSince: yesterday,
  });
  const mlMasteryHits = await getMLMasteryHits({ dateSince: yesterday });
  const collection = R.compose(R.uniqBy(R.prop('url')), R.flatten)([
    twdDSHits,
    twdMLHits,
    mlMasteryHits,
  ]);

  await newsroomChannel.send(constructNews(collection));
};

export default {
  handler,
};
