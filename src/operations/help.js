// @flow
const handler = async ({ message }) => {
  message.channel.send('fuck you');
  Promise.resolve();
};

export default {
  handler,
};
