// @flow
import * as R from 'ramda';
import utils from './dispatcher-utils';
import config from '../config';
const CronJob = require('cron').CronJob;

const init = ({ queue, client }) => {

  const operations = config.queryOperations({ type: 'cron' });
  R.forEach((op) => {
    const cronTime = op.time;
    const inputs = op.inputs;
    console.log('Registering a cron ', cronTime);
    new CronJob(cronTime, () => {
      console.log('Triggering cron at each ', cronTime);
      const event = utils.constructEvent({
        func: op.function,
        payload: utils.constructPayload({
          inputs,
          client,
        }),
      });
      queue.push(event);
    }, null, true, 'Australia/NSW');
  }, operations);
}

export default {
  init,
}
