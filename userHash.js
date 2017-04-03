var UserHash = new class UserHash {
    constructor() {
        import {serverUser} from './serverUser';
        var users = new Map();
        var temp = null;
    }

    // scan a server and place any users into the Hash that aren't there already
    scanServer(server){
        for (var [memberID, member] of this.users) {
            if (!users.has(member.id))
                users.set(member.id, new serverUser(member));
        }
    }
    
    // gets the strikes for the  user who's ID matches the parameter
    // is passed a user ID string
    // returns null if user not found 
    getStrikes(ID){
        if (this.users.has(ID))
            return this.users.get(ID).getStrikes;
        else
            return null;
    }

    // looks up the user who sent the message in the Hash
    // returns true if the user's last message matches
    // adds new users to the Hash
    compareMesage(message) {
        // if the user is not in the Hash, add them and set thier lastMessage
        if(!this.users.has(message.author.id)) {
            this.temp = new serverUser(message.author);
            this.temp.lastMessage = message.content; 
            this.users.set(message.author.id, temp);
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