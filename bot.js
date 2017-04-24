const Discord = require('discord.js');
const client = new Discord.Client();

// the string that flags a statement as a command for the robot
const CMD = "!";

var bannedWords = [];

var command = require('./command');
var blacklist = require('./blacklist');
var userHash = require('./userHash');

client.on('ready', () =>{
    console.log('The robot is online!');
    var myServer = client.channels.find("name", "general");
    userHash.scanServer(myServer);
    myServer.sendMessage("Hello, I'm ModBod! Type !help for a list of my commands!");
})

// Preston token
client.login('Mjg0MTA5Nzk1NTAwNDkwNzU0.C6howA.vlvZ_YYgbe8Fylc2ub6TR2cMtBM');
// John S token
//client.login('Mjk0MjAwNzU4ODY4NjM5NzY0.C7R8jQ.ABf0d3hqS2OhLxFNMIu2IfOf-cg');

//client.sendMessage(284110491994030080, "Test");
/*
function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("!" + str);
}

function pluck(array){
    return array.map(function(item) {return item["name"]});
}

function hasRole(mem, role){
    return pluck(mem.roles).includes(role);
    
    //if(pluck(mem.roles).includes(role))
    //    return true;
    //else {
    //    return false;
    //}
    
} 
*/


client.on('message', message => {
    //var args = message.content.split(/[ ]+/);

    // check for command
    if(message.content.startsWith(CMD)) {
        command.parseCommand(CMD, message);
    } else {
        // check text against blacklist
        if(blacklist.detection(message.content.toLowerCase())) {
            message.channel.sendMessage(message.author.username + " used a blacklisted word!");
            userHash.addStrike(message.author.username, "This strike was for using a blacklisted word");
            message.channel.sendMessage(message.author.username + " has " + userHash.getStrikes(message.author.id) + " strikes!");
            message.delete();
        } 
        // check if duplicate message
        else if (userHash.compareMessage(message)) {
            message.delete();
        }
    }

    /*
    if(commandIs("hello", message)){
        message.channel.sendMessage('Hello there, ' + message.author.username);
    }
    if(commandIs("youtube", message)){
        if(args.length === 1){
            message.channel.sendMessage('You did not define an argument, Usage: ');
        }
        else if(args.length  === 2)
        {
             message.channel.sendMessage('Hello, Youtube, This is episode ' + args[1]);
        }
        else {
            message.channel.sendMessage("You defined to many arguments");
        }
    }
    if(commandIs("say", message)){
        if(hasRole(message.member, "Owner") || (hasRole(message.member, "Mod"))){
            if(args.length === 1){
            message.channel.sendMessage('You did not define an argument Usage: say [message to say]');
           } else {
                message.channel.sendMessage(args.join(" ").substring(5));
            }
            } else {
                message.channel.sendMessage('You are not an Owner or Mod.');
            }
    }
    if(commandIs("delete", message)){
        if(hasRole(message.member, "Owner") || (hasRole(message.member, "Mod"))){
            if(args.length >= 3){
            message.channel.sendMessage('You defined an argument Usage: !delete [numbers of messages to delete]');
           } else {
                var msg;
                if(args.length === 1){
                    msg = 2;
                } else {
                    msg = parseInt(args[1]);
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
                }
            } else {
                message.channel.sendMessage('You are not an Owner or Mod.');
            }
    }
    if(commandIs("kick", message)){
        if(hasRole(message.member, "Owner") || (hasRole(message.member, "Mod"))){
            if(args.length === 1){
            message.channel.sendMessage('You did not define an argument Usage: !kick [message to kick a user]');
           } else {
                message.guild.member(message.mentions.users.first()).kick();
            }
    }
    }
    if(commandIs("commands", message)){
        message.channel.sendMessage('The commands are: \n!hello \n!say \n!delete \n!kick \n!blacklist \n!db');
    }
    if(commandIs("blacklist", message)){
        if(args.length === 1){
            message.channel.sendMessage('You did not define an argument Usage: !blacklist [message to say]')
        }
        else{
            bannedWords.push(args.join(" ").substring(10));
            message.channel.sendMessage(args.join(" ").substring(10) + " has been added to the blacklist")
            
        }
    }
    if(commandIs("db", message)){
       message.channel.sendMessage('These are the current banned words' + bannedWords.toString());
    }
    */
});