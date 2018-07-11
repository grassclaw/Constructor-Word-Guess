// Requires next js where word will be determined
var WordJs = require("./word.js");

// requires npm module to create prompts/form 
var inquirer = require("inquirer");

var fs = require("fs");


// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
            type: "list",
            message: "Choose what language you would like to practice",
            choices: ["English", "Spanish", "French"],
            name: "language",
        }
    ]
)