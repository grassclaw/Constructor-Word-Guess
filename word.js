var Letter = require("./lib/letter");

function Word(word){
    this.letters = [];

    var strArray = word.split();
    for (var i = 0; i<strArray.length; i++){
        this.letters.push(new Letter(strArray[i]));
    }
    // function --> display the word 
    // loop through this.letters
    // for each{
    // call the letter's displary ();
    // add to dipslay string 
    // }
    // return display string

    /*function make Guess(letter){
        changes boolean
        return a true or false for if it found one
    }*/
}
