// @flow
import Discord from 'discord.js';
import config from './config';

config.setup();
const client = new Discord.Client();


client.on('ready', () => {
  console.log('ready!!ZZ')
  console.log(client.users.get('tenshi'))
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});


client.login(process.env.DISCORD_PRIV_KEY);

