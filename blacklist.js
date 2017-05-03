// blacklist.js
// this module stores the blacklist words, and checks strings if they contain a blacklisted word

var Blacklist = new class Blacklist {

    constructor() {
        // default blacklisted words for demonstration purposes
        this.list = ["noodle", "bonk", "flower"];
    }

    // return true if string contains a blacklisted word
    detection(string){
        var detect = false;
        for(var i=0; i<this.list.length; i++) {
            if(string.includes(this.list[i]))
                detect = true;
        }
        return detect;
    }

    test(message){
        message.channel.sendMessage("Test complete.");
    }

    // removes a word from the blacklist
    remove(word) {
        var size = this.list.length;
        for(var i=0; i<size; i++) {
            if(this.list[i] == word) { 
                if(i < (size-1))
                    this.list[i] = this.list[size-1];
                this.list.pop();
            }
        }
    }

    // add a word to the blacklist
    add(word) {
        this.list.push(word);
    }

    showBlacklist(message){
        message.author.sendMessage(this.list);
    }

    // clears all words from the blacklist
    clear() {
        this.list = [];
    }
}
module.exports = Blacklist;