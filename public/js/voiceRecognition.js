    //              *********************** 
    //              *** Note before use ***
    // ! This script will ONLY EXECUTE IN CHROME AND FIREFOX
    // ! The webpack doesn't support other browsers
    //              ***********************
    //              ***********************

$(document).ready(function(){

    // * Selecting our run button.
    $runBtn = $("#thisButton");
    
    // * Ensuring the button works
    $runBtn.on("click", function(){                    // ? When clicked...
        console.log("Run btn hit");                    // ? ...Log the event...
        recognition.start();                           // ? ...Start the voice recognition.
    });

    // * Need a global var to save the user input to
    const userInput ="";

    // * Getting the speech recognition packages
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    // * Grammar config
    // * In this case, we're using Java Speech Grammar Format (JSGF)
    var grammar = "#JSGF V1.0";

    // * Configuring the recognition API
    var recognition = new SpeechRecognition();          // ? Create a new speech recognition
    var recognitionList = new SpeechGrammarList();      // ? Create a new grammar list
    recognitionList.addFromString(grammar, 1);          // ? Load the new grammar list with our JSGF
    recognition.lang = "en-US";                         // ? Setting the language to English-US
    recognition.interimResults = false;

    // * Creating a function for when a command is entered
    recognition.onresult = function(e){
        var last = e.results.length - 1;                // ? Get the last result
        var command = e.results[last][0].transcript;    // ? Get the last result's transcript
        var userInput = command.trim().toLowerCase();   // ? Save the transcript to the global
        console.log("Voice input: " + command);         // ? Console log the transcript

        // * Command checking
        // * After a command is made, we should check it against our command arrays
            // TODO: Find a more effecient way to do this
            // TODO: Look into using FS, and saving these commands to individual text files
        if(greetings.includes(userInput)){
            console.log("Found in arr");
            var selector = randomNum(greetings);
            console.log(greetings[selector]);
        } else {
            console.log("Not found");
        }
    };

    // * Once voice input is no longer detected, stop the recognition software
    // * Note: This is built in functionality of the webpack
    recognition.onspeechend = function(){
        recognition.stop();
    };

    // * If there is an error, we will log the error
    // ! Common errors I've come across thus far
        // ! "Network" -> This is likely due to not using Chrome or Firefox (The webpack *ONLY* works with these browsers)
        // ! "HTML Error, Undefinted" -> This happens when you try to start another command while the program is parsing one
            // ? It takes approximately 1-2 seconds for the commmand to be returned as text
    recognition.onerror = function(err){
        console.log(err);
    };

    // * We can now begin to configure different commands with the voice recognition

    // * For statements, we can make a random number generator.
    function randomNum(arr){                                            // ? The arr takes the argument of an arr...
        var randomNumber = Math.floor(Math.random() * arr.length);      // ? ...then gets it's length for the maximum cap on the random function
        return randomNumber;                                            // ? And returns a random number generated from this
    }

    // TODO: Program different functions and commands based around the input text.

    // * An array of greetings
    const greetings = [
        "hello",
        "hi",
        "whats up?",
        "hey"
    ];

})