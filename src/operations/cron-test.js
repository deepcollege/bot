// @flow
const handler = async ({ client }) => {
  const channel = client.channels.find('name', 'general');
  await channel.sendMessage('cron test!');
  Promise.resolve();
};

export default {
  handler,
};
