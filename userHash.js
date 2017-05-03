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
                this.users.set(memberID, {'member': member, 'strikes': 0, 'lastMessage': '0', 'strikeArray': [], 'kickArray': [], 'kicks': 0});
        }
    }
    
    // searches the hash for a user by thier servername, return the ID for the first match
    // returns null if there is no match
    getID(userName) {
        var id = null;
        for(const [ID, user] of this.users){
            if(user.member.displayName === userName)
                id = ID;
        }
        return id;
    }

    // adds a strike with given comment to user by their servername
    addStrike(userName, comment) {
        var id = this.getID(userName);

        if (this.users.has(id)){
            this.users.get(id).strikes ++;
            this.users.get(id).strikeArray.push(comment);
        }
        else
            console.log("No record of user " + userName + " found.");
    }  

    // adds a kick with given comment to user by their servername
    addKick(userName, comment){
        var id = this.getID(userName);

        if (this.users.has(id)){
            this.users.get(id).kicks ++;
            this.users.get(id).kickArray.push(comment);
        }
        else
            console.log("No record of user " + userName + " found.");
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

    // gets the list of comments for each stike for a user and pm's them to the user who called listStrikes
    listStrikes(userName){
        var strikeList = "User " + userName + " has the following strikes: \n";
        var id = this.getID(userName);
            if(id != null) {
                var user = this.users.get(id);
                for(var i = 0; i<user.strikeArray.length; i++){
                    strikeList = strikeList + (i+1) + ": " + user.strikeArray[i] + "\n"; 
                }
            }
            else 
                strikeList = "No record of user " + userName + " found.";
        return strikeList; 
    }

    // gets the list of comments for each kick for a user and pm's them to the user who called listKicks
    listkicks(userName){
        var kickList = "User " + userName + " has the following kicks: \n";
        var id = this.getID(userName);
            if(id != null) {
                var user = this.users.get(id);
                for(var i = 0; i<user.kickArray.length; i++){
                    kickList = kickList + (i+1) + ": " + user.kickArray[i] + "\n"; 
                }
            }
            else 
                kickList = "No record of user " + userName + " found.";
        return kickList; 
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