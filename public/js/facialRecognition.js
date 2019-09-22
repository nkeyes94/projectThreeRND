console.log("hello world");
$(document).ready(function(){
    console.log("Hitting the file: facialRecognition.js");

    const cameraImage = document.getElementById("image"); // ! Note: this image should be one from the webcam.

    // * These should be run Async, use promise.all to achieve this
    // * Configuration for the facial recognition API
    // * After the async function, launch another function, start, where the code for the facial recognition will launch
    Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri("../models"),   // ? Main API for the recognition
        faceapi.nets.faceLandmark68Net.loadFromUri("../models"),    // ? This API locates the faces
        faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),       // ? This API is the recognition for faces
    ]).then(start)

    function start() {
        // ? Noting that the image recognition is loaded
        // ! Change to console log for production
        document.body.append("Facial recognition loaded");

        // * Add an event listener to the image to execute detection
        cameraImage.addEventListener("change", async function(){
            const image = await faceapi.bufferToImage(cameraImage.files[0]);    // ? Takes the image and turns it into a file to be read by the net 
            const detect = await faceapi        // ? Detecting the face in the image
                .detectAllFaces(image)
                .withFaceLandmarks()
                .withFaceDescriptors();

            // * To view the image that was uploaded...
            document.body.append(image);

            // * If there are >1 faces in the image, this will allow us to see how many are detected
            // ! Change to console log for production
            document.body.append(detect.length); 

            // * Creating a div to display the boundaries of a face that has been detected
            const faceContainer = document.createElement("div");
            faceContainer.style.position = "relative";
            document.body.append(faceContainer);

            // * Creating the canvas from the API
            const canvas = faceapi.createCanvasFromMedia(image);
            faceContainer.append(canvas);

            // * Setting the display size 
            const displaySize = {
                width: image.width,
                height: image.height
            };

            // * Resizing the canvas to be the same size as the image
            faceapi.matchDimensions(canvas, displaySize);

            // * Resizing the detected face div (the box drawn around a face, idiot)
            const detectedFace = faceapi.resizeResults(detection, displaySize);

            // * Create the actual box now
            // * This will loop through, if there are >1 face(s) detected, this will draw a box for each, labeling it as 'face detected'
            detectedFace.forEach(function(detect){
                const box = detect.detection.box;
                const faceBox = new faceapi.draw.drawBox(box, { label : "face detected" });
                faceBox.draw(canvas);
            })
        })
    }

    function loadProperLabels() {

    }

});