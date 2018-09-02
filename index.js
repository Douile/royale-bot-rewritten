const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('shard.js',{
  'respawn': true,
  'token': process.env.TOKEN;
})
