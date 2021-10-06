function preload() {
    video = createCapture(VIDEO);
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 320);
    canvas.center();
}


function draw() {
    image(video, 0, 0, 480, 500);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetetor = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition;

recognition.onresult = function run(event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("status").innerHTML = Content;
    if(Content == "take my selfie") {
        console.log("taking a selfie");
        speak();
    }
}