// * Document on ready function...
$(document).ready(function(){

    // * Grabbing our HTML video file
    $input = $("#inputVideo");
    var video = document.getElementById("inputVideo")
    // * Grabbing the button
    $runBtn = $("#btnOne");
    $runBtn.on("click", function(){
        console.log("run btn hit");
        run();
    })

    // * Adding and event listener to the video...
    video.addEventListener("play", function(){
        console.log("Video playing");
        console.log("Launching function...");
        onPlay();
    });


    // * Creating a function to dynamically resize the canvas that is dawn around the user's face
    function resizeCanvasAndResults(dimensions, canvas, results) {
        const { width, height } = dimensions instanceof HTMLVideoElement
          ? faceapi.getMediaDimensions(dimensions)
          : dimensions
        canvas.width = width
        canvas.height = height
      
        return results.map(res => res.forSize(width, height))
      }
      
      // * This function will return a box around the users face upon detection
      function drawDetections(dimensions, canvas, detections) {
        const resizedDetections = resizeCanvasAndResults(dimensions, canvas, detections)
        faceapi.drawDetection(canvas, resizedDetections)
      }
      
      // * This function looks at a users facial landmarks and maps them (giving the green overlay)
      function drawLandmarks(dimensions, canvas, results, withBoxes = true) {
        const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)
        if (withBoxes) {
            faceapi.drawDetection(canvas, resizedResults.map(det => det.detection))
        }
        const faceLandmarks = resizedResults.map(det => det.landmarks)
        const drawLandmarksOptions = { lineWidth: 2, drawLines: true, color: 'green' }
        faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
      }
        
      async function onPlay() {
         const videoEl = document.getElementById('inputVideo')
         const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold : 0.3 }) 
      
         
         result = await faceapi.detectSingleFace(videoEl, options).withFaceLandmarks(true)
         if (result) {
             drawLandmarks(videoEl, document.getElementById('overlay'), [result], true)
           
            // Just printing the first of 68 face landmark x and y 
            document.getElementById('infoDiv').innerHTML = 'First of 68 face landmarks, x: '+ 
              Math.round(result._unshiftedLandmarks._positions[0]._x) + ', y: '+ 
              Math.round(result._unshiftedLandmarks._positions[0]._y) +'<br>' 
              
         }
      
          setTimeout(() => onPlay())
      }
      
      // * Loading some required scripts to have the facial recognition work
      async function run() {
         await faceapi.loadTinyFaceDetectorModel('https://hpssjellis.github.io/face-api.js-for-beginners/')
         await faceapi.loadFaceLandmarkTinyModel('https://hpssjellis.github.io/face-api.js-for-beginners/')
            
         const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
         const videoEl = document.getElementById('inputVideo')
         videoEl.srcObject = stream
      }
});