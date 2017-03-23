var Command = new class Command {

    constructor() { 
        this.blacklist = require('./blacklist');
    }

    parseCommand(cmd, message) {
        var words = message.content.toLowerCase().split(/[ ]+/);

        switch (words[0]) {   //(message.content.toLowerCase()) {
            case cmd + "hello":
                message.channel.sendMessage('Hello there, ' + message.author.username);
                break;

            case cmd + "test":
                this.blacklist.test(message);
                break;

            case cmd + "add":
                if(words.length > 1)
                    this.blacklist.add(words[1]);
                message.channel.sendMessage("Word added to blacklist.");
                break;

            case cmd + "remove":
                if(words.length > 1)
                    this.blacklist.remove(words[1]);
                message.channel.sendMessage("Word removed from blacklist.");
                break;
        }
    }
}
module.exports = Command;