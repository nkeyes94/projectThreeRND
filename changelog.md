September 22, 2019 -- Facial recognition is working! Onto voice recognition

    -I was able to get facial detection working in another project which I was testing on, now I'm going to work at importing it to this project
    -Facial recognition successfully added to the project!
        -Need to find a way to allow for logging in
            -Perhaps setting some sort of ID, passing it into BCrypt for encryption then allowing users to login with that
    -Starting work on voice recognition
        -Using VSR (Voice Speech Recognition) by MIT
        -[Documentation](https://www.npmjs.com/package/voice-speech-recognition)
        -Created a new route "/voice"
        -Created a new handlebars page "voiceRecognition.handlebars"
        -The route is successfully rendering the handlebars page
    -Created voiceRecognition.js in /public/js
        -[link](/public/js/voiceRecognition.js)
    -Moved the script location for the facial recognition into it's HTML document (home.handlebars), as this was causing other pages to error out with a 404.
    -Ran into issues using VSR. As it's a node module, getting it to the front end isn't working all too well.
    -Began configuration of another recognition, which is to be built into browsers
        -speechRecognition webpack
        -NOTE ***** THIS WEBPACK ONLY WORKS FOR CHROME AND FIREFOX. *****
        -Using this with another browser may result in "Error: Network" thus not allowing the webpack to work
    -Began configuring different commands for the voice recognition
        -Need more functions programmed for it to have a wide use
        -Greetings are currently implemented
            -If a user inputs a greeting, they will be returned a random greeting from an array
    -Created a logs directory
        -This will aid in seeing which commmands are being used successfully

**********************************************************************************************************************************
September 21, 2019 (Do you remember the 21st of September?) -- Facial Recognition (cont)

    -In order to use Facial recognition, need to install the following:
        npm install --production windows-build-tools
            -This is a package which allows tensorflow to work correctly, getting resources from python

    -Changes to the facialRecognition.js file will be incoming in a future build:
        -Need to change the static image to a video and allow for the use of the webcam
            -In the HTML file:
                <video id="video" width="720" height="560" autoplay mute>
            -In the JS file I've already done the code for this, code located:
                [here](resources/videoRecognition.js)

    -Configured Handlebars in order to perform testing without getting client side erorrs (ie "require is not defined")
        -Handlebars will need to be changed over to react in the future
        -Imported required script and packages in [main](views/layouts/main.handlebars)

    -Created the public folder for use of front end JS
    -Linked the public folder in the server.js file
    -Created the "resources' folder in order to keep track of materials needed in the future 
    -Added a PDF book of Neural Network Design
    -Began using TensorFlow.JS 
        -TensorFlow.JS is a package that allows for easier deep learning and NN configuration
        -This is a time saver, despite needing the learn how to use TF, this will save me time from training AI myself
        -AI training can take ~1000 hrs
        -TF works with facial recognition

**********************************************************************************************************************************
September 20, 2019 -- Facial recognition

    -Added further configuration to the server.js file, including:
        -Handlebars (To be replaced with react!)
        -MySQL (To be replaced with MongoDB)
        -Passport
        -Sessions
    -Created index.html
        -Mostly for testing purposes, index.html will serve as a home page to test functions
    -Created facialRecognition.js 
        -This file will serve as the logic of the facial recognition
        -The end goal here is to have the webapp allow users to login via facial recognition
            -Seeing as the idea of this project is AI, this seems like a great feature to have
        -Added the different packages required from the api to make this function correctly
            -facialRecognitionNet
                -This is the main package for facial recognition
            -faceLandmark68Net
                -This package allows us to find the location of faces in an image
            -ssdMobilenetv1
                -This package allows the main feature of facial recognition to work

**********************************************************************************************************************************
September 18, 2019 -- Initialization:

    -Created the "server.js"
        -Configured the server here using express.
    -Created "neuralNet.js"
        -This document, located in ./assets/neuralNet.js contains a custom neural network for use later
        -Began to configure the neural network and have created the following fields:
            -Inputs
            -Weights
            -Bias
            -Target (For use with supervised learning)
            -Perceptron output
            -Neural output
            -Weighted sum (sigma)
        -TODO:
            -Create the functions for adjusting the weights, biases, etc.
            -Log the number of epochs required to reach the target