// @flow
import Discord from 'discord.js';
import createLinksHighlights from './operations/create_links_highlights';
import config from './config';

config.setup();
const client = new Discord.Client();


client.on('ready', () => {
  createLinksHighlights(client).then()
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});


client.login(process.env.DISCORD_PRIV_KEY);

