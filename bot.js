// bot.js
// this is the main module for ModBot

const Discord = require('discord.js');
const client = new Discord.Client();

// the string that flags a statement/message as a command for ModBot, must preceed the comand word
const CMD = "!";
// the login token for ModBot, provided by the owner's discord account (https://discordapp.com/developers/applications/me)
const TOKEN = 'Mjg0MTA5Nzk1NTAwNDkwNzU0.C6howA.vlvZ_YYgbe8Fylc2ub6TR2cMtBM'; // these tokens are for demonstration only
// const TOKEN = 'Mjk0MjAwNzU4ODY4NjM5NzY0.C7R8jQ.ABf0d3hqS2OhLxFNMIu2IfOf-cg'; // alternate demonstration token
// ModBot's client id, also provided by the owner's discord account (https://discordapp.com/developers/applications/me)
const ID = '284109795500490754'; // these ID's are for demonstration only
//const ID = '294200758868639764' // alternate demonstration ID

var command = require('./command');
var blacklist = require('./blacklist');
var userHash = require('./userHash');

// is called when ModBot logs in
client.on('ready', () =>{
    console.log('The robot is online!');
    // display welcome message to general channel of ModBot's server
    var myServer = client.channels.find("name", "general");
    userHash.scanServer(myServer);
    myServer.sendMessage("Hello, I'm ModBod! Type !help for a list of my commands!");
})

// logs ModBot into discord
client.login(TOKEN);

// is called every time a message is posted on channel the bot is connected to
client.on('message', message => {
    // ignore ModBot's own messages
    if(!(message.author.id === ID)){
        // check for a command to ModBot
        if(message.content.startsWith(CMD))
            command.parseCommand(CMD, message);
        else {        
            // check the message's text against the blacklist
            if(blacklist.detection(message.content.toLowerCase())) {
                // display message and add strike for a blacklist detection
                message.channel.sendMessage(message.member.displayName + " used a blacklisted word!");
                userHash.addStrike(message.member.displayName, "This strike was for using a blacklisted word");
                message.channel.sendMessage(message.member.displayName + " has " + userHash.getStrikes(message.author.id) + " strikes!");
                message.delete();
            } 
        // check with the userHash to see if the message is a duplicate
            else if (userHash.compareMessage(message)) 
                message.delete();
        }
    }
});