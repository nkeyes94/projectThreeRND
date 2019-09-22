const video = document.getElementById('video')
console.log("Loading script.js..?")
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),     // * Face detection API
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),    // * API for finding where a face is located
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),   // * Face detection API
  faceapi.nets.faceExpressionNet.loadFromUri('/models')     // * API for finding the facial expression
]).then(startVideo)

// * Starting the video taken from the .html file
function startVideo() {
  navigator.getUserMedia(                                   // * Allowing the use of a webcam
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})