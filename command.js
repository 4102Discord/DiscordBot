// command.js
// this module parses and handles commands given to the bot, it is called by bot.js
var Command = new class Command {

    constructor() { 
        this.blacklist = require('./blacklist');
    }

    parseCommand(cmd, message) {
        var words = message.content.toLowerCase().split(/[ ]+/);

        switch (words[0]) {
            // displays all commands the bot can recieve
            case cmd + "help":
                message.channel.sendMessage('The commands this bot can recieve are:\n' +
                    cmd + 'hello - say hello\n' +
                    cmd + 'add - add a word to the Blacklist\n' +
                    cmd + 'remove - remove a word from the Blacklist\n' +
                    cmd + 'clear - clears all words form the Blacklist\n' +
                    cmd + 'showblacklist - displays all words in the Blacklist'
                );
                break;

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
                break;

            // displays all words in the blacklist
            case cmd + "showblacklist":
                this.blacklist.showBlacklist();
                message.author.sendMessage(showBlacklist);
                break;
        }
    }
}
module.exports = Command;
