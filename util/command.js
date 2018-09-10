const EventEmitter = require('events');

exports.CommandHandler = class CommandHandler extends EventEmitter {
  constructor(options) {
    this.dynamicPrefix = this.optionGet(options,'dynamicPrefix',false);
    this.prefix = this.optionGet(options,'prefix','!');
    this.verboose = this.optionGet(options,'verboose',false);
  }
  registerCommand(command,callback) {
    if (typeof callback === 'function') {
      this.on(command,callback);
      if (this.verboose) console.log(`Registered a command ${command}`);
    }
  }
  handler(...args) {
    // if dynamicPrefix is true argument 0 must be the prefix (string)
    // after that arguments are as follows:
    // message (discord.Message), locale (string)
    var prefix;
    if (this.dynamicPrefix === true) {
      prefix = args.shift();
    } else {
      prefix = this.prefix;
    }
    if (args.length === 2) {
      var message = args[0],
      locale = args[1];
      delete args;
      if (message.content.startsWith(prefix)) {
        var content = message.content.substr(prefix.length);
        this.eventNames.forEach((command) => {
          if (content.startsWith(command)) {
            this.emit(command,message,locale);
            if (this.verboose) console.log(`Matched command ${command}`);
          }
        })
      }
    }
  }
  static optionGet(options,key,default) {
    if (key in options) {
      var v = options[key];
      if (typeof v === typeof default) {
        return v;
      }
    }
    return default;
  }
}
