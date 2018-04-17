import LocalQueue from './local-queue';

/**
 * Dependent env variable: MESSAGE_QUEUE. It can be either memory | rabbit
 */
const createPubsub = worker => {
  if (process.env.MESSAGE_QUEUE === 'memory') {
    return new LocalQueue(worker);
  }
  return null;
};

export default {
  createPubsub,
};
