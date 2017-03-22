var Command = new class Command {

    constructor() { 
        this.blacklist = require('./blacklist');
    }

    parseCommand(cmd, message) {
        switch (message.content.toLowerCase()) {
            case cmd + "hello":
                message.channel.sendMessage('Hello there, ' + message.author.username);
                break;
            case cmd + "test":
                this.blacklist.test(message);
                break;
        }
    }
}
module.exports = Command;