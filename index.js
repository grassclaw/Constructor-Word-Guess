// Requires next js where word will be determined
var WordJs = require("./word");

// requires npm module to create prompts/form 
var inquirer = require("inquirer");
// NPM module used to read/append text file
var fs = require("fs");

var NewWord;
var KeyWord;
var guesses;
var guessesLeft;

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
            type: "list",
            message: '----------------------------------------\n      Welcome to "Wordificication!" \n  ----------------------------------------\n Choose what language you would like to practice\n',
            choices: ["English", "Spanish", "French"],
            name: "language",
        },
        {
            name: 'UserGuess',
            message: 'Guess a letter',
            validate: function (value) {
                var valid = (value.length === 1) && (/^[a-zA-Z]+$/.test(value));
                return valid || 'Please enter a single letter';
            }
        }
    ]
    ).then(function (user) {

        // User chooses language...
        switch (user.language) {
            // calls function to get tweets
            case "English":
                console.log('Welcome to "English!"');
                gameInit(wordlist);
                break;
            case "Spanish":
                console.log('Bienvenidos a "Spanish!"');
                gameInit(listadepalabras);
                break;
            case "French":
                console.log('Bonjour to... "French?"');
                gameInit(wordlist);
                break;
        }

    });

// Word lists
var wordlist = { //English list of words
    1: 'hedgehogs',
    2: 'hedgehogs rock this world',
    3: 'Follow my hedgehog on instagram',
    4: 'My Hedgehogs name is Quillinator',
    5: 'This list is about hedgehogs',
    6: 'good luck'
}
var listadepalabras = {//Spanish list of words
    1: 'erizos',
    2: 'erizos son los mejores',
    3: 'Mi erizo esta en instagram',
    4: 'Mi erizo se llama Quillinator',
    5: 'Esta lista de palabras es sobre la tema de erizos',
    6: 'Buena Suerte'
}

function wordSelect(wordList) { //also resets game 
    var KeyWord = wordList[Math.floor(Math.random() * wordList.length)]; //draws random word from wordlist object
    console.log(KeyWord);
    NewWord = new Word(KeyWord);
    NewWord.makeGuess(' ');
    guesses = [];
    guessesLeft = 9; //Number of guess for user
}

function gameInit(wordlist) {
    const questions = [
        {
            name: 'UserGuess',
            message: 'Guess a letter',
            validate: function (value) {
                var valid = (value.length === 1) && (/^[a-zA-Z]+$/.test(value));
                return valid || 'Please enter a single letter';
            },
            when: function () {
                return (!NewWord.allGuessed() && guessesLeft > 0); //Since && will return false if both conditions not met
            }
        },
        {
            type: 'confirm',
            name: 'playAgain',
            message: 'Want to play again?',
            // default: true,
            when: function () {
                return (NewWord.allGuessed() || guessesLeft <= 0); //As long as one condition is met it returns true
            }
        }
    ];
    // console.log('target.allGuessed():', target.allGuessed());
    if (!NewWord.allGuessed() && guessesLeft > 0) {
        console.log(NewWord + '');
    }

    inquirer.prompt(questions).then(answers => {
        // console.log('answers.playAgain ' + answers.playAgain);
        if ('playAgain' in answers && !answers.playAgain) {
            console.log('Thank you for playing');
            process.exit();
        }
        if (answers.playAgain) {
            wordSelect(wordlist);
        }

        if (answers.hasOwnProperty('UserGuess')) {
            var currentGuess = answers.UserGuess.toLowerCase();

            if (guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                NewWord.makeGuess(currentGuess);
                if (KeyWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log('You already guessed ', currentGuess);

            }
        }

        if (!NewWord.allGuessed()) {
            if (guessesLeft < 1) {
                console.log('No more guesses left...');
                console.log(KeyWord, 'was correct.');

            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remaining:', guessesLeft);
            }

        } else {
            console.log(KeyWord, 'is correct!');
            // console.log(answers.playAgain);
        }

        ask();
    }); // end inquirer.then

}
// n25qx4g