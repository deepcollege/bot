// @flow
import moment from 'moment'

const handler = async (client) => {
  moment.locale('en-AU')
  const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')
  console.log('checking yes ', yesterday, ' today ', today)
  // Read more https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=fetchMessages
  client.channels.find('name', 'resources').search({
    after: yesterday,
    before: today
  }).then((res) => {
    const hit = res.messages[0].find(m => m.hit).content;
    console.log(`I found: **${hit}**, total results: ${res.totalResults}`);
  }).catch(console.error);
}

export default handler;
