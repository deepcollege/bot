// @flow
import Discord from 'discord.js';
import config from './config';

config.setup();
const client = new Discord.Client();

const urlify = (text) => text.match(/(https?:\/\/[^\s]+)/g);
// const processing = require('/utils').processing;

// The bot should be active in the following channels
const channels = ['resources', 'daily-cool-stuff']


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
    }

    // if the message is a link in the mentioned channels
    if (channels.includes(message.channel.name)) {
        var linksInMessage = urlify(message.content)
        if (linksInMessage) {
            // the function which will push the link to json file comes here
            linksInMessage.forEach((link) => console.log(link));
        }
    }
    // console.log(message.id, message.channel.name, message.position);


});

/*
Pending work:
[x] make it specific to channels
[x] store links for everyday in a json file
*/

// Log our bot in
client.login(process.env.DISCORD_PRIV_KEY);
