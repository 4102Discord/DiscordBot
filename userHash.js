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
                this.users.set(memberID, {'member': member, 'strikes': 0, 'lastMessage': '0'});
        }
    }
    
    // looks up user by ID and adds one strike, if they exist
    addStrike(ID) {
        if (this.users.has(ID)) 
            this.users.get(ID).strikes ++;
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