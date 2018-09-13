const discord = require('discord.js');
const PGClient = require('PGClient.js');
const { CommandHandler } = require('./util/command.js');

const client = discord.Client({
  'shardId': process.env.SHARD_ID,
  'shardCount': process.env.SHARD_COUNT,
  'messageCacheMaxSize': 150,
  'messageCacheLifetime': 10,
  'messageCacheSweepInterval': 30,
  'fetchAllMembers': false,
  'disableEveryone': true,
  'disabledEvents': [
    'TYPING_START',
    'VOICE_STATE_UPDATE',
    'VOICE_SERVER_UPDATE'
  ]
})
const pgClient = new PGClient(process.env.DATABASE_URL);

client.on('message',(message) => {
  if (!message.guild) return 0;
  pgClient.serverSmall(message.guild.id).then((server) => {
    let prefixes = [
      server.prefix,
      `<@${message.client.user.id}>`
    ];
    var match = prefix.testPrefixes(message.content,prefixes);
    if (match !== false) {
      if (match === server.prefix) {
        // pass to command handler
      } else {
        // pass to special handler
      }
    }
  }).catch(console.error);
})

client.login(process.env.CLIENT_TOKEN).then(() => {
  console.log('DClient connected');
  pgClient.connect().then(() => {
    console.log('PGClient connected');
  }).catch((e) => {
    console.error('PGClient connection error',e.stack);
  })
}).catch((e) => {
  console.error('DClient connection error',e.stack);
});
