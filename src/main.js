// @flow
import * as R from 'ramda';
import Discord from 'discord.js';
// import createLinksHighlights from './operations/create_links_highlights';
import config from './config';

// Setup environment variables
config.setup();

const client = new Discord.Client();

client.on('ready', () => {
  // createLinksHighlights(client).then();
  console.log('I am ready!');
});

const handleCondition = ({ condition, message }) => {
  const conditionName = R.head(Object.keys(condition));
  const value = R.prop(conditionName, condition);
  if (conditionName === 'contentEquals') {
    // Check if content message.content
    return R.equals(value, message.content);
  }
}

// Discord WebSocket actions dispatcher
client.on('message', message => {
  const operations = config.queryOperations({ type: 'websocket' })
  console.log('checking operations ', operations)
  R.forEach((op) => {
    const conditions = op.conditions
    // TODO: handle conditions OR or AND
    const results = R.map((condition) =>
      handleCondition({ condition, message }),
      conditions
    )
    console.log('cehcking conditions results ', results)
  }, operations)
  /*
  if (message.content === '!help') {
    message.channel.send('fuck you');
  }

  if (channels.includes(message.channel.name)) {
    var linksInMessage = urlify(message.content);
    if (linksInMessage) {
      linksInMessage.forEach(link => console.log(link));
    }
  }
  */
});

client.login(process.env.DISCORD_PRIV_KEY);
