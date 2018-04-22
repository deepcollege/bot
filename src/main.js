// @flow
import Discord from 'discord.js';
import pubsub from './pubsub';
import config from './config';
import subscriber from './subscriber/subscriber';
import cronDispatcher from './dispatchers/cron-dispatcher';
import websocketDispatcher from './dispatchers/websocket-dispatcher';

// Setup environment variables from .env
config.setup();

// Create a pubsub client
const queue = pubsub.createPubsub(subscriber.subscribe);
// Setup environment variables

const client = new Discord.Client();

client.on('ready', () => {
  const newAvatarURL = config.loadOperations().avatar
  if (client.user.avatarURL !== newAvatarURL) {
    client.user.setAvatar(newAvatarURL);
  }
  console.log('I am ready!');
  cronDispatcher.init({ queue, client });
});

// Initialises websocket dispatcher, which uses discord.js
websocketDispatcher.init({ queue, client });

// Auth
client.login(process.env.DISCORD_PRIV_KEY);

