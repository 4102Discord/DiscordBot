var Blacklist = new class Blacklist {

    constructor() {
        this.list = ["noodle", "bonk", "flower"];
    }

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
            if(this.list[i] == word) { //this.list[i].includes(word)) {
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

    // clears all words from the blacklist
    clear(message) {
        this.list = [];
        message.channel.sendMessage("Blacklist cleared of all words.");
    }
}
module.exports = Blacklist;