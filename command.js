var Command = new class Command {

    constructor() { 
        this.blacklist = require('./blacklist');
    }

    parseCommand(cmd, message) {
        var words = message.content.toLowerCase().split(/[ ]+/);

        switch (words[0]) {
            // say hello
            case cmd + "hello":
                message.channel.sendMessage('Hello there, ' + message.author.username);
                break;

            // test function
            case cmd + "test":
                this.blacklist.test(message);
                break;
            
            // add word to the blacklist
            case cmd + "add":
                if(words.length > 1)
                    this.blacklist.add(words[1]);
                message.channel.sendMessage("Word added to blacklist.");
                break;

            // remove a word from the blacklist
            case cmd + "remove":
                if(words.length > 1)
                    this.blacklist.remove(words[1]);
                message.channel.sendMessage("Word removed from blacklist.");
                break;

            // remove all words from the blacklist
            case cmd + "clear":
                this.blacklist.clear();
                message.channel.sendMessage("Blacklist cleared of all words.");
        }
    }
}
module.exports = Command;