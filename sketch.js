const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

var g_landmarks = [];

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
        { color: '#00FF00', lineWidth: 5 });
      drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
      g_landmarks = landmarks;
    }
  }
  canvasCtx.restore();




}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720
});
camera.start();

var video;
var cam;

function setup() {
  // put setup code here
  var mycanvas = createCanvas(640, 360);
  mycanvas.parent('#p5canvas');
  video = createCapture(VIDEO);
  video.size(640, 360);
  video.hide();

  //cam = createCamera();
  //frustum(0, 0, 0, 0, 0.1, 200);
}

function draw() {
  background(127);

  // cam.lookAt(0, 0, 0);
  // cam.setPosition(25, 25, 25);

  // put drawing code here

  image(video, 0, 0);

  if (g_landmarks.length > 0) {
    beginShape(POINTS);
    let count = 0;
    for (landmark of g_landmarks) {
      vertex(
        640 * landmark.x,
        360 * landmark.y
      );
      text(count, 640 * landmark.x, 360 * landmark.y);
      count++;
    }
    endShape();

  }
}

function keyPressed() {
  console.log(g_landmarks);
}
