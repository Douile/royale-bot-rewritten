// modal.js
// Module for creating modal messages using reactions

class ModalHandler {
  class Modal {
    constructor(channel,content) {
      this.channel = channel;
      this.content = content;
      this.actions = new Map();
      this.message = null;
    }
    addAction(emoji,action) {
      this.actions.set(emoji,action);
      return this;
    }
    send() {
      return new Promise((resolve,reject) => {
        channel.send(this.content).then((message) => {
          this.message = message;
          var iter = this.actions.keys(),
          iterate = () => {
            var next = iter.next();
            if (next.done === true) {
              resolve(this);
            } else {
              this.message.react(next.value).then(iterate).catch(reject);
            }
          };
          iterate()
        }).catch(reject);
      })
    }
  }
  constructor() {
    this.registered = new Map();
  }
}
