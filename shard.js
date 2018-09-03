const discord = require('discord.js');
const pg = require('pg');
const prefix = require('./util/prefix.js');

class PGClient extends pg.Client {
  // A expansion of pg.Client in order for ease of use
  constructor(dburl) {
    super({
      'connectionString': dburl
    })
  }
  serverSmall(serverId) {
    // get server data from databse via snowflake id
    return new Promise((resolve,reject) => {
      this.query({
        'text':'SELECT server_id,prefix,locale WHERE server_id=$1::text',
        'values': [serverId],
        'rowMode':'array'}).then((res) => {
        if (res.rowCount > 0) {
          resolve(res.rows[0]);
        } else {
          reject('Not found');
        }
      }).catch(reject);
    })
  }
}

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
