// @flow
import pubsub from './pubsub';
import config from './config';
import subscriber from './subscriber/subscriber';
import websocketDispatcher from './dispatchers/websocket-dispatcher';

// Setup environment variables from .env
config.setup();

// Create a pubsub client
const queue = pubsub.createPubsub(subscriber.subscribe);

// Initialises websocket dispatcher, which uses discord.js
websocketDispatcher.init({ queue });
