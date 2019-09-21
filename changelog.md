
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