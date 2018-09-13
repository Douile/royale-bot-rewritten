const pg = require('pg');

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
        'text':'SELECT DISTINCT server_id,prefix,locale FROM server_data WHERE server_id=$1::text',
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
  serverDetail(serverId) {
    return new Promise((resolve,reject) => {
      this.query({
        'text':'SELECT DISTINCT server_id,server_name,last_help_msg,last_help_channel,next_shop,latest_shop,prefix,last_status_msg,last_status_channel,priority,premium,locale,last_seen FROM server_data WHERE server_id=$1::text',
        'values': [serverId],
        'rowMode':'array'}).then((res) => {
          if (res.rowCount > 0) {
            resolve(res.rows[0]);
          } else {
            reject('Not found');
          }
        }).catch(reject);
      })
    })
  }
  serverHelpChannel(serverId) {
    return new Promise((resolve,reject) => {
      this.query({
        'text':'SELECT DISTINCT server_id,prefix,locale,last_help_msg,last_help_channel FROM server_data WHERE server_id=$1::text',
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
  serverStatusChannel(serverId) {
    return new Promise((resolve,reject) => {
      this.query({
        'text':'SELECT DISTINCT server_id,prefix,locale,last_status_msg,last_status_channel FROM server_data WHERE server_id=$1::text',
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
  serverChannels(serverId,type) {
    return new Promise((resolve,reject) => {
      var ops;
      if (type) {
        ops = {
          'text': 'SELECT server_id,channel_type,channel_id FROM server_channels WHERE server_id=$1::text AND channel_type=$2::text',
          'values': [serverId,type],
          'rowMode': 'array'
        }
      } else {
        ops = {
          'text': 'SELECT server_id,channel_type,channel_id FROM server_channels WHERE server_id=$1::text',
          'values': [serverId],
          'rowMode': 'array'
        };
      }
      this.query(ops).then((res) => {
        resolve(res);
      }).catch(reject);
    })
  }
  serverBackgrounds(serverId,type) {
    return new Promise((resolve,reject) => {
      var ops;
      if (type) {
        ops = {
          'text': 'SELECT server_id,background_type,background_id FROM server_backgrounds WHERE server_id=$1::text AND background_type=$2::text',
          'values': [serverId,type],
          'rowMode': 'array'
        }
      } else {
        ops = {
          'text': 'SELECT server_id,background_type,background_id FROM server_backgrounds WHERE server_id=$1::text',
          'values': [serverId],
          'rowMode': 'array'
        };
      }
      this.query(ops).then((res) => {
        resolve(res);
      }).catch(reject);
    })
  }
}

module.exports = PGClient;
