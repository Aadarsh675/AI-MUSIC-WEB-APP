song1 = "";
song2 = "";
song1status = "";
song2status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}
function draw() {
    image(video, 0, 0, 500, 500);
        fill("red");
        stroke("red");
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song2status == false) {
            playSong1();
        }
        fill("blue");
        stroke("blue");
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song1status == false) {
            playSong2();
        }
}
function playSong1() {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    song2.stop();
}
function playSong2() {
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
    song1.stop();
}
function modelLoaded() {
    console.log("PoseNet Loaded Successfully");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY + ", rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist)
    }
}