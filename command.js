// command.js
// this module parses and handles commands given to the bot, it is called by bot.js
function pluck(array){
             return array.map(function(item) {return item["name"]}); 
}
function hasRole(mem, role){
             return pluck(mem.roles).includes(role);

             if(pluck(mem.roles).includes(role))         
                return true;     
             else {         
                 return false;      
             }
} 
var Command = new class Command {

    constructor() { 
        this.blacklist = require('./blacklist');
        this.userHash = require('./userHash');
    }
    
            
    parseCommand(cmd, message) {
        var words = message.content.split(/[ ]+/);

        switch (words[0].toLowerCase()) {
            // displays all commands the bot can recieve
            case cmd + "help":
                message.channel.sendMessage('The commands this bot can receive are:\n' +
                    cmd + 'hello - say hello\n' +
                    cmd + 'add <word> - add a word to the Blacklist\n' +
                    cmd + 'remove <word> - remove a word from the Blacklist\n' +
                    cmd + 'clear - clears all words form the Blacklist\n' +
                    cmd + 'showblacklist - displays all words in the Blacklist\n' +
                    cmd + 'kick <username>- kicks the user specified by the Owner or Mod\n' +
                    cmd + 'listStrikes <username> - messages you a list of the strikes that the specified user has against them'
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
                this.blacklist.showBlacklist(message);
                message.channel.sendMessage("You have been sent a list of the blacklist");
                break;

            case cmd + "liststrikes":
                if(words.length > 1)
                    message.author.sendMessage(this.userHash.listStrikes(words[1]));
                else
                    message.channel.sendMessage("This command requires a username!");    
                break;

            case cmd + "listkicks":
                if(words.length > 1)
                    message.author.sendMessage(this.userHash.listkicks(words[1]));
                else
                    message.channel.sendMessage("This command requires a username!");    
                break;

            //adds a strike to a user within the users hash and also includes a reason as a string.
            case cmd +"addstrike":
                var reason = " ";
                //this for loop iterates through the array of words that the user passed to the command. It concatanates everything past the command word at words[1] into a single string to be passed to the addstrike command.
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
                    var comment = " ";
                    for(var i = 2; i < words.length; i++){
                        comment += (words[i] + " ");
                    }
                    var user = "@" + words[1];
                    message.content += user;
                    if(hasRole(message.member, "Owner") || (hasRole(message.member, "Mod"))){
                        if(words.length > 2){
                            message.guild.member(message.mentions.users.first()).kick();    
                            this.userHash.addKick(words[1], comment);
                        } else {
                            message.channel.sendMessage('You did not define an argument Usage: !kick <User> <Reason>');
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
