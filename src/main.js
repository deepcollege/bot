// @flow
import Discord from 'discord.js';

// import createLinksHighlights from './operations/create_links_highlights';
import config from './config';
import {urlify, get_percentage} from './operations/utils';

config.setup();
const client = new Discord.Client();


// The bot should be active in the following channels
const channels = ['resources', 'daily-cool-stuff'];

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === '!help') {
    message.channel.send('fuck you');
  } else if (message.content === '!progress') {
    var results = get_percentage();
    message.channel.send(`${results.percentage}% of ${results.year}`);
  }

  // if the message is a link in the mentioned channels
  if (channels.includes(message.channel.name)) {
    var linksInMessage = urlify(message.content);
    if (linksInMessage) {
      // the function which will push the link to json file comes here
      linksInMessage.forEach(link => console.log(link));
    }
  }
  // console.log(message.id, message.channel.name, message.position);
});


// Log our bot in
client.login(process.env.DISCORD_PRIV_KEY);