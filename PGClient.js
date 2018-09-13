// Copyright 2018 Douile
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const pg = require('pg');

class PGClient extends pg.Client {
  class NotFoundError extends Error {
    constructor(item) {
      super(`${item} not found in the database`);
    }
  }
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
          reject(new PGClient.NotFoundError('server'));
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
            reject(new PGClient.NotFoundError('server'));
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
          reject(new PGClient.NotFoundError('server'));
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
          reject(new PGClient.NotFoundError('server'));
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
      this.query(ops).then(resolve).catch(reject);
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
      this.query(ops).then(resolve).catch(reject);
    })
  }
  channelsSubscribed() {
    return new Promise((resolve,reject) => {
      this.query({
        'text': 'SELECT channel_type, COUNT(channel_type) FROM server_channels GROUP BY channel_type ORDER BY COUNT(channel_type) DESC',
        'rowMode': 'array'
      }).then(resolve).catch(reject);
    })
  }
  usersLinked() {
    return new Promise((resolve,reject) => {
      this.query({
        'text': 'SELECT COUNT(DISTINCT user_id) FROM user_links',
        'rowMode': 'array'
      }).then((res) => {
        if (res.rowCount > 0) {
          resolve(res.rows[0].count);
        } else {
          reject(new PGClient.NotFoundError('users'));
        }
      }).catch(reject);
    })
  }
}

module.exports = PGClient;
