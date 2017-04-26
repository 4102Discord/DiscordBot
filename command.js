// command.js
// this module parses and handles commands given to the bot, it is called by bot.js

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 0.5 };

var Command = new class Command {

    constructor() { 
        this.blacklist = require('./blacklist');
        this.userHash = require('./userHash');
        this.connection = null;
    }

    parseCommand(cmd, message) {
        var words = message.content.split(/[ ]+/);

        switch (words[0].toLowerCase()) {
            // displays all commands the bot can recieve
            case cmd + "help":
                message.channel.sendMessage('The commands this bot can receive are:\n' +
                    cmd + 'hello - say hello\n' +
                    cmd + 'music <youtube url> - plays audio from a youtube video\n' +
                    cmd + 'stop - stops currently playing audio\n' +
                    cmd + 'add <word> - add a word to the Blacklist\n' +
                    cmd + 'remove <word> - remove a word from the Blacklist\n' +
                    cmd + 'clear - clears all words form the Blacklist\n' +
                    cmd + 'showblacklist - displays all words in the Blacklist\n' +
                    cmd + 'kick <username>- kicks the user specified by the Owner or Mod\n' +
                    cmd + 'listStrikes <username> - messages you a list of the strikes that the specified user has against them'
                );
                break;

            // stop music
            case cmd + "stop":
                if(this.connection != null) {
                    message.channel.sendMessage("Stopping audio playback...");
                    this.connection.disconnect();
                }
                break;

            // play music
            case cmd + "music":
                if(words.length > 1) {
                    if(!(message.member.voiceChannel === undefined)) {
                        message.member.voiceChannel.join()
                        .then(connection => {
                            message.channel.sendMessage("Playing audio stream...");
                            this.connection = connection;
                            const stream = ytdl(words[1], {filter : 'audioonly'});
                            const dispatcher = connection.playStream(stream, streamOptions);
                        }).catch(console.error);
                    }
                    else
                        message.channel.sendMessage(message.member.displayName + " is not connected to a voice channel!");
                } 
                else
                    message.channel.sendMessage("No audio source specified!");
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
                this.blacklist.showBlacklist(message.channel);
                break;

            case cmd + "liststrikes":
                if(words.length > 1)
                    message.author.sendMessage(this.userHash.listStrikes(words[1]));
                else
                    message.channel.sendMessage("This command requires a username!");    
                break;
            //adds a strike to a user within the users hash and also includes a reason as a string.
            case cmd +"addstrike":
                var reason = " ";
                //this for loop iterates through the array of words that the user passed to the command. It concatanates everything past the command words at words[1] into a single string to be passed to the addstrike command.
                for(var i = 2; i < words.length; i++){ 
                    reason += (words[i] + " ");
                }

                if(words.length > 2){
                    this.userHash.addStrike(words[1], reason);
                    message.channel.sendMessage("Strike added to " + words[1] + "!");
                }           
                else    
                    message.channel.sendMessage("Please provide a reason for the strike!")
                break;

            
            // kicks a user specified
                case cmd + "kick":
        if(hasRole(message.member, "Owner") || (hasRole(message.member, "Mod"))){
            if(words.length === 1){
            message.channel.sendMessage('You did not define an argument Usage: !kick [message to kick a user]');
           } else {
                message.guild.member(message.mentions.users.first()).kick();
            } 
        }
        else {
                message.channel.sendMessage("You are not an Owner or a Mod");
    }
                break;
        }
    }
}
module.exports = Command;
