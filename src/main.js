// @flow
import pubsub from './pubsub';
import config from './config';
import subscriber from './subscriber/subscriber';
import websocketDispatcher from './dispatchers/websocket_dispatcher';
// import createLinksHighlights from './operations/create_links_highlights';

config.setup();

const queue = pubsub.createPubsub(subscriber.subscribe);
websocketDispatcher.init({ queue });
