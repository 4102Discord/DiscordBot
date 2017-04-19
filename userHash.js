// include and use collection from discord.js
const Collection = require('./node_modules/discord.js/src/util/Collection');

var UserHash = new class UserHash {
    constructor() {
        this.users = new Collection();
        
    }

    
    // scan a server and place any users into the Hash that aren't there already
    scanServer(server){
        for (const [memberID, member] of server.members) {
            if (!this.users.has(memberID)) 
                this.users.set(memberID, {'member': member, 'strikes': 0, 'lastMessage': '0', 'strikeHash': []});
        }
    }
    
    // looks up user by ID and adds one strike, if they exist
    addStrike(ID, comment) {
        if (this.users.has(ID)){
            this.users.get(ID).strikes ++;
            this.users.get(ID).strikeHash.push(comment);
            console.log(comment);
        }
    }

    // gets the strikes for the  user who's ID matches the parameter
    // is passed a user ID string
    // returns null if user not found 
    getStrikes(ID){
        if (this.users.has(ID))
            return this.users.get(ID).strikes;
        else
            return null;
    }
    //gets the list of comments for each stike for a user and pm's them to the user who called listStrikes
    listStrikes(userName){
        var strikeList = "User " + userName + " has the following strikes: \n";
        console.log(userName);
        for (const [ID, user] of this.users){
            console.log(user.member.displayName + " " + ID);
            if(user.member.displayName === userName){
                console.log("Match found");
                for(var i = 0; i<user.strikeHash.length; i++){
                    strikeList = strikeList + (i+1) + ": " + user.strikeHash[i] + "\n"; 

                }
               
             }
        }  
         console.log(strikeList);
         return strikeList; 
    }

    // looks up the user who sent the message in the Hash
    // returns true if the user's last message matches
    // adds new users to the Hash
    compareMessage(message) {
        // if the user is not in the Hash, add them and set thier lastMessage
        if(!this.users.has(message.author.id)) {
            this.users.set(message.author.id, {'member': message.author, 'strikes': 0, 'lastMessage': message.content});
            return false;
        }
        // if the user is in the Hash, compare lastMessage to current message
        if(message.content === this.users.get(message.author.id).lastMessage)
            return true;
        else {
            // update LastMessage if no match
            this.users.get(message.author.id).lastMessage = message.content;
            return false;
        }
    }
}
module.exports = UserHash;