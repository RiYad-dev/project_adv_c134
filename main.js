let music;
let status;
objects = [];
function preload() {
    music = loadSound('alert.mp3');
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function draw() {
    image(video, 0, 0, 380, 380);
    music.volume(1);
    music.speed(1);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            if (objects[0].label == "person") {
                document.getElementById("status_final").innerHTML = "Baby Detected";
                music.stop();
            } else {
                document.getElementById("status_final").innerHTML = "Baby is not Detected";
                music.play();
            }
        }
    } else {
        music.play();
    }
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        document.getElementById("status").innerHTML = "Status: Object Detected";
        console.log(results);
        objects = results;
    }
}