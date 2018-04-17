import LocalQueue from './LocalQueue';

/**
 * Dependent env variable: MESSAGE_QUEUE. It can be either memory | rabbit
 */
const createPubsub = worker => {
  console.log('message que ', process.env.MESSAGE_QUEUE);
  if (process.env.MESSAGE_QUEUE === 'memory') {
    return new LocalQueue(worker);
  }
  return null;
};

export default {
  createPubsub,
};
