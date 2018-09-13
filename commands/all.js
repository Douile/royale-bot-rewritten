const commandConfig = require('./config.json');

function register(commandHandler) {
  commandConfig.commands.forEach((command) => {
    var callback;
    try {
      callback = require(command.file).command;
    } catch(e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
      }
    } finally {
      if (typeof callback === 'function') {
        commandHandler.registerCommand(command.name,callback);
      }
    }
  })
}
exports.registerCommands = register;
