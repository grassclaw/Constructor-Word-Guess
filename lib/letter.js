function Letter(letterVal){
    this.initLetter = letterVal;
    this.guessStatus = false;
    this.displayLetter = function(){
        if (!this.guessStatus){
            return this.initLetter
        }else{
            return "_";
        }
    },
    this.checkLetter = function(){
        // .....change guess status to true if guessed etc.

    }
}
