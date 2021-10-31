const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

var g_landmarks = [];

// ここからMediaPipeの記述（いじらなくてOK）
function onResults(results) {
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      g_landmarks = landmarks;
    }
  }
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
// ここまでMediaPipeの記述（いじらなくてOK）


var video;
var cam;

function setup() {
  // put setup code here
  var mycanvas = createCanvas(640, 360);
  mycanvas.parent('#p5canvas');
  video = createCapture(VIDEO);
  video.size(640, 360);
  video.hide();
}

function draw() {
  background(127);

  //  image(video, 0, 0);

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
