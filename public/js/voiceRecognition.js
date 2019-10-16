    //                                          *********************** 
    //                                          *** Note before use ***
    //                          ! This script will ONLY EXECUTE IN CHROME AND FIREFOX
    //                              ! The webpack doesn't support other browsers
    //                                          ***********************
    //                                          ***********************

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

    // * Setting up a second recognition call. This one is for interracting with the AI better
    var dialogue = new SpeechRecognition();
    var dialogueList = new SpeechGrammarList();
    dialogueList.addFromString(grammar, 1);
    dialogue.lang = "en-US";
    dialogue.interimResults = false;

    dialogue.onspeechend = function(){
        dialogue.stop();
    }

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
        if(greetings.includes(userInput)){                          // ? If the user commmand is in the greetings arr
            console.log("Found in greetings");                      // ? Log that it's been found 
            var selector = randomNum(greetings);                    // ? Return a randomly generated greeting
            responsiveVoice.speak(greetings[selector]);             // ? Issue a voice response for the greeting
            console.log(greetings[selector]);
        } else if(commands.includes(userInput)){                    // ? If the user command is found in the command arr
            console.log("Found in commands");                       // ? Log that it was found
            var index = commands.indexOf(userInput);                // ? Find the command's index in the arr
            console.log(index);                                     // ? Log the index
            console.log(commandFunctions[index]);                   // ? Then put the index back into the array
        } else if(command.includes("what is the weather in")){      // ? If the user command includes a request for weather
            getWeather(command);                                    // ? Launch the weather function (line 132)
        } else if(command.includes("open")){                        // ? If the user command has "open" in it
            openSite(userInput);                                    // ? Launch the open external website function (Line 162)
        } else if(command.includes("show me recipes for")){         // ? If the user command has "show me recipes for" in it
            recipeSearch(userInput);                                    // ? Launch the recipe search function (Line 178)
        } else if(command.includes("search for")){                  // ? If the user command has "search for" in it
            recipeSearch(userInput);                                    // ? Launch the recipe search function (Line 178)                             
        } else if(command.includes("show me")){                     // ? If the user command has "show me" in it
            recipeSearch(userInput);                                    // ? Launch the recipe search function (Line 178)                             
        } else {
            console.log("Undefined");                               // ? Otherwise if the command can't be found, return undefined
            // ? Issue a response if the command is undefined
            responsiveVoice.speak("I'm sorry, I don't understand your command");
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

    // * Known commands
    const commands = [
        "what time is it",
        "what is today's date",
        "what is the weather in",
        "open",
        "show me recipes for",
        "search for",
        "show me"
    ]

    const codingAsist = [
        "make a for loop",
    ]

    // * The correlating functions for the previous commands arr
    const commandFunctions = [
        getTime(),                                                    // ? Function to get the time (Line 116)
        getDate(),                                                    // ? Function to get the date (Line 123)
        openSite(),                                                   // ? Function to open an external website (Line 162)
        recipeSearch(),                                               // ? Function to search recipes (Line 178)
    ]

    // * Might be beneficial to have different arrays to hold different but related commands.
    // * This way we can search for specific keywords in a user input and launch an appropriate command
    const weatherCommands = [
        "what is the weather in",
        "what's the weather in",
        "whats the weather in",
        "tell me the weather for"
    ]

    // ***************************************************************************************************************************
    //                                          TODO: CUSTOM FUNCTIONS LISTED BELOW
    // ***************************************************************************************************************************

    // * Simple function for getting the time.
    function getTime(){
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        responsiveVoice.speak("The current time is "+ time);
        return time;
    }

    // * Simple function for getting the date.
    function getDate(){
        var today = new Date();
        var date = today.getMonth() + "-" + today.getDate() + "-" + today.getFullYear();
        responsiveVoice.speak("Todays date is "+ date);
        return date;
    };

    // * Open a website
    // ? The command to open an external website is "open <web address>" i.e. "open google.com"
    // ? First we seperate the website
    // ? Then CAIT say "opening <website>"
    // ? Then a new tab opens with the requested site
    function openSite(string){
        var n = string.split(" ");                      // ? Turn the expression into an arr
        var lastWord = n.pop();                         // ? Pop to remove/return the last element. The last element will the website
        responsiveVoice.speak("Opening " + lastWord);   // ? Responding voice with the website to open
        console.log("Opening", lastWord);
        window.open("http://www." + lastWord);          // ? Opening the website requested in a new tab
    };

    // * My recipe search
    function recipeSearch (string){
        var n = string.toLowerCase().split(" ");                  // ? Turn the expression into an arr and lower case
        var lastWord = n.pop()
        if (lastWord === "recipes"){                                // ? Pulling the word before recipes to query
            lastWord = n.pop()
        } 
        responsiveVoice.speak("recipes for" + lastWord);          // ? Responding voice with the recipes to open
        console.log("Opening ", lastWord, " Recipe");
        window.open("https://api.edamam.com/recipes/" + lastWord) // ? for now opens recipes in a new tab
    }

    // * Weather function
    // ? The weather command is "What is the weather in <location>"
    // ? First we need to get the location
    function getWeather(string){
        var n = string.split(" ");                      // ? Turn the expression into an arr
        var lastWord = n.pop();                         // ? Pop to remove/return the last element. The last element will be our location
        console.log("Last word test: "+ lastWord);      // ? Testing the last element
                                                        // ! ^---This line can be removed for production version

        var modifiedExpression = n.splice(0, n.length); // ? Splice the array to remove the last element
        console.log(modifiedExpression);                // ? Testing the array
                                                        // ! ^---This line can be removed for production version

        // * Now that we have the last word, we can test further
        // * Since for the weather command, the last word is the location, we can pass that into an API. 
        var weatherApiKey = "45fcf52b47d79723b15c821561fb0595";
        // * QueryURL lastWord var is the location in the command.
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ lastWord +"&units=imperial&APPID="+ weatherApiKey;
        $.ajax({
            url: queryURL,                              // ? Send the request to the queryURL above
            method: "GET"
        }).then(
            function(response){                         
                console.log(response);
                console.log("The weather in "+ response.name + " is..")         // ? Return the response name
                console.log(response.weather[0].description);                   // ? Description of the weather (rain, partly cloudy, etc)
                console.log("With a temperature of: "+ response.main.temp);     // ? And temperature in F
                responsiveVoice.speak("The current weather in "+ response.name +
                ". The temperature is "+ response.main.temp +" degrees fahrenheit with "
                + response.weather[0].description);
            }
        )
    };

    // * Testing the coding assistant functionality.
        // ? The idea behind this is having a coding assistant. This can be a reference for coding. 
        // ? Other functions can be added to this
            // TODO: Once the response comes throguh, create a popup window
            // TODO: The popup window should display the code and have a "copy to clipboard" button
    function createForLoop(stirng){
        responsiveVoice.speak("Okay! Creating for loop.");                      // ? Acknowledge command
        responsiveVoice.speak("How many iterations would you like to do?")
            .then(recognitionStart())
            .then(function(command){
                responsiveVoice.speak("Creating a loop with "+ command +" iterations.");
            })

    }

    // * News
        // ? A user may want to check headlines for that day
        // ? By saying a command, return 10 headlines
        // ? Put the headlines into an arr, and ask the user if they'd like to hear more about the stories
            // ? If yes, read a summary of the story
    
    // * Recipies
        // ? Allow the user to search for recipies with their voice
        // ? Have the AI read out ingredients & instructions
        // ? Allow the ingredients to be added to your shopping list
            // ! Find a way to text the contents of the shopping list to the users phone
    // * Test button to activate
    var btn = document.createElement("BUTTON");
    btn.innerHTML="Recipe Test";
    var tdiv = document.getElementById("testDiv");
    tdiv.append(btn);
    btn.onclick = function(){
        getRecipies();
    }
    // * Need a test string to get started
    var testCommand = "Search for recipies";
    var testRecipe = "Pizza";

    function getRecipies(){
        // * Call back config for dialogue
        function voiceStartCallback() {
            console.log("Voice started");
        }
         
        function voiceEndCallback() {
            console.log("Voice ended");
        }
         
        var dialogueParameters = {
            onstart: voiceStartCallback,
            onend: voiceEndCallback
        }
        responsiveVoice.speak("Okay. Which recipe do you wish to search for?", dialogueParameters)
        console.log("is playing?" + responsiveVoice.isPlaying())
        var playState = responsiveVoice.isPlaying();
        if(playState == false){
            console.log("Playing audio...");
        } else if(playState == true){
            console.log("Not playing")
            
            console.log("is playing 2: "+ responsiveVoice.isPlaying())
            dialogue.start();

            dialogue.onresult = function(e){
                var last = e.results.length - 1;                // ? Get the last result
                var command = e.results[last][0].transcript;    // ? Get the last result's transcript
                var userInput = command.trim().toLowerCase();   // ? Save the transcript to the global
                console.log("Voice input: " + command);         // ? Console log the transcript
            }
        }
            
            
        }
        // * API Config
        var queryURL = "https://api.edamam.com/search"
        var recipeSearch;                                                       // ? Save the recipe the user wants to search for
    

})