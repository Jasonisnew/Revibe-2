let video;
let bodyPose;
let poses = [];
let connections;
let successSound;
let successTriggered = false;

// Debug logging
console.log("Camera.js loaded");

// Test if camera container exists
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("camera-container");
  if (container) {
    console.log("Camera container found:", container);
  } else {
    console.error("Camera container not found!");
  }
});

function preload() {
  console.log("Preload function called");
  bodyPose = ml5.bodyPose();
  
  // Create success sound using oscillator
  successSound = new p5.Oscillator('sine');
  successSound.freq(800);
  successSound.amp(0.3);
  console.log('Success sound created');
  
  console.log("BodyPose model loaded");
}

function setup() {
  // Calculate available space for camera
  let cameraWidth = window.innerWidth;
  let cameraHeight = window.innerHeight - 100 - 280; // Account for top offset and bottom nav

  console.log(
    "Setting up camera with dimensions:",
    cameraWidth,
    "x",
    cameraHeight
  );

  // Create canvas with proper dimensions
  let canvas = createCanvas(cameraWidth, cameraHeight);
  canvas.parent("camera-container");

  // Debug: Check if canvas was created
  console.log("Canvas created:", canvas);
  console.log("Camera container:", document.getElementById("camera-container"));

  textAlign(CENTER, TOP);
  textSize(24);

  video = createCapture(VIDEO);
  video.size(cameraWidth, cameraHeight);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();

  console.log(
    "Camera setup complete - dimensions:",
    cameraWidth,
    "x",
    cameraHeight
  );
}

function draw() {
  background(0);

  // Debug: Check if video is available
  if (!video) {
    console.log("Video not available");
    return;
  }

  // Flip video and skeleton
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  // Draw skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke("#FFB0A3");
        strokeWeight(3);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw keypoints
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {
        fill("#FFB0A3");
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
  pop(); // End flip

  // Arm angle analysis (text not flipped)
  if (poses.length > 0) {
    let pose = poses[0];

    let lShoulder = pose.keypoints[5];
    let lElbow = pose.keypoints[7];
    let lWrist = pose.keypoints[11];

    let rShoulder = pose.keypoints[6];
    let rElbow = pose.keypoints[8];
    let rWrist = pose.keypoints[12];

    fill("#FFB0A3");
    noStroke();

    // Left arm
    if (
      lShoulder.confidence > 0.1 &&
      lElbow.confidence > 0.1 &&
      lWrist.confidence > 0.1 &&
      rShoulder.confidence > 0.1 &&
      rElbow.confidence > 0.1 &&
      rWrist.confidence > 0.1
    ) {
      let lAngle = getAngle(lElbow, lShoulder, lWrist);
      let rAngle = -getAngle(rElbow, rShoulder, rWrist);

      // Update navigation labels based on arm angles
      updatePredictionDisplay(lAngle, rAngle);

      //   textWeight(BOLD);

      // Check for success condition (both arms at 90 degrees)
      
      
      


    }
  }
}

function gotPoses(results) {
  poses = results;
}

function getAngle(a, b, c) {
  let ab = createVector(a.x - b.x, a.y - b.y);
  let cb = createVector(c.x - b.x, c.y - b.y);
  return degrees(ab.angleBetween(cb));
}

// Update prediction display based on pose analysis
function updatePredictionDisplay(lAngle, rAngle) {
  const class1Label = document.getElementById("class1-label");
  const class2Label = document.getElementById("class2-label");

  if (!class1Label || !class2Label) return;

  let exerciseStatus = "";
  let confidence = 0;

  // Analyze both arms
  let avgAngle = (lAngle + rAngle) / 2;

  if (avgAngle > 90) {
    exerciseStatus = "Arm Too High";
    confidence = Math.min(100, ((avgAngle - 90) / 30) * 100);
  } else if (avgAngle < 50) {
    exerciseStatus = "Raise Higher";
    confidence = Math.min(100, ((50 - avgAngle) / 30) * 100);
  } else {
    exerciseStatus = "Correct Form";
    confidence = 100 - (Math.abs(70 - avgAngle) / 20) * 100;
  }

  // Update navigation labels
  if (exerciseStatus === "Correct Form") {
    class1Label.textContent = "Incorrect";
    class1Label.style.color = "#FFB0A3";
    class2Label.textContent = `Correct`;
    class2Label.style.color = "#FFB0A3";
        } else {
    class1Label.textContent = `${exerciseStatus}`;
    class1Label.style.color = "#FFB0A3";
    class2Label.textContent = "Correct Form";
    class2Label.style.color = "#FFB0A3";
  }
}

// Exercise switching functionality
let currentExerciseIndex = 0;

function switchToPreviousExercise() {
    currentExerciseIndex = Math.max(0, currentExerciseIndex - 1);
    updateExerciseLabel();
    showExerciseNotification(`Switched to Exercise ${currentExerciseIndex + 1}`);
}

function switchToNextExercise() {
  currentExerciseIndex = Math.min(9, currentExerciseIndex + 1);
  updateExerciseLabel();
  showExerciseNotification(`Switched to Exercise ${currentExerciseIndex + 1}`);
}

function updateExerciseLabel() {
  const exerciseLabel = document.getElementById("exercise-label");
  const exerciseName = document.getElementById("exercise-name");
  const exerciseImg = document.getElementById("exercise-img");
  
  // Exercise data with names, images, and sets/time
  const exerciseData = [
    {
      name: "Shoulder Stretch",
      image: "../../assets/images/shoulder-standingW.jpg",
      sets: "3 sets / 30 sec"
    },
    {
      name: "Arm Extension",
      image: "../../assets/images/arms-standingT.jpg",
      sets: "4 sets / 45 sec"
    },
    {
      name: "Chest Opener",
      image: "../../assets/images/chest-chestopener.jpg",
      sets: "3 sets / 40 sec"
    },
    {
      name: "Back Stretch",
      image: "../../assets/images/back.png",
      sets: "2 sets / 60 sec"
    },
    {
      name: "Hamstring Stretch",
      image: "../../assets/images/hamstring-minisquat.jpg",
      sets: "3 sets / 35 sec"
    },
    {
      name: "Quadriceps Exercise",
      image: "../../assets/images/Quadriceps-seatedkneextesion.jpg",
      sets: "4 sets / 50 sec"
    },
    {
      name: "Core Strengthening",
      image: "../../assets/images/shoulder-standingY.jpg",
      sets: "3 sets / 45 sec"
    },
    {
      name: "Balance Training",
      image: "../../assets/images/w-shape-stretch.jpeg",
      sets: "2 sets / 90 sec"
    },
    {
      name: "Flexibility Work",
      image: "../../assets/images/shoulder.jpg",
      sets: "3 sets / 40 sec"
    },
    {
      name: "Strength Building",
      image: "../../assets/images/front.png",
      sets: "4 sets / 60 sec"
    }
  ];

  if (exerciseLabel) {
    exerciseLabel.textContent = `Exercise ${currentExerciseIndex + 1}`;
  }
  
  if (exerciseName) {
    exerciseName.textContent = exerciseData[currentExerciseIndex]?.name || `Exercise ${currentExerciseIndex + 1}`;
  }
  
  if (exerciseImg) {
    exerciseImg.src = exerciseData[currentExerciseIndex]?.image || "../../assets/images/shoulder-standingW.jpg";
  }
  
  // Update sets/time
  const exerciseSets = document.getElementById("exercise-sets");
  if (exerciseSets) {
    exerciseSets.textContent = exerciseData[currentExerciseIndex]?.sets || "3 sets / 30 sec";
  }
}

function showExerciseNotification(message) {
  const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(59, 130, 246, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        text-align: center;
        z-index: 1000;
        font-weight: 600;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        animation: slideDown 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize exercise labels when page loads
document.addEventListener("DOMContentLoaded", function () {
  updateExerciseLabel();
});

