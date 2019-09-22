$(document).ready(function(){

    var VSR = require("voice-speech-recognition");
    var config = {
        continuous: true, // default: true, interval: {true, false}
        interimResults: true, // default: true, interval: {true, false}
        maxAlternatives: 1, // default: 1, interval {1, 2, 3, 4, ...}
        lang: 'en-US', // default: 'en-US', one of language localisation
        grammars: undefined, // default: new SpeechGrammarList()
        serviceURI: undefined, // default: undefined
    };
     
    var recognizer = VSR.voiceSpeechRecognition(config);

    var text = recognizer.finalRecognizing;

    // * Getting the div from the document to append text to
    const testDiv = document.getElementById("testDiv");
    testDiv.append(text);

    // * Getting the button to run
    var runBtn = document.getElementById("thisButton");
    runBtn.on("click", function(){
        console.log("Run btn hit");
    })


})