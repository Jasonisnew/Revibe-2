// Movements page specific JavaScript

// DOM elements
const searchInput = document.getElementById("search-input");
const clearSearch = document.getElementById("clear-search");
const frontViewBtn = document.getElementById("front-view-btn");
const backViewBtn = document.getElementById("back-view-btn");
const bodyDiagram = document.getElementById("body-diagram");
const categoryCards = document.querySelectorAll(".category-card");
const bodyParts = document.querySelectorAll(".body-part");

// Current view state
let currentView = "front";
let selectedCategory = null;
let selectedBodyPart = null;

// Exercise data for each body part
const exerciseData = {
  shoulder: {
    name: "Shoulder Exercises",
    exercises: [
      { name: "Cross-Body Shoulder Stretch", sets: 3, reps: 12, difficulty: "Beginner" },
      { name: "Banded External Rotation", sets: 3, reps: 15, difficulty: "Beginner" },
    ],
    description: "Strengthen and improve shoulder mobility",
  },
  arm: {
    name: "Arm Exercises",
    exercises: [
      { name: "Standing Biceps Stretch", sets: 3, reps: 12, difficulty: "Beginner" },
      { name: "Seated Biceps Stretch", sets: 3, reps: 10, difficulty: "Intermediate" },
      { name: "Overhead Triceps Stretch", sets: 3, reps: 12, difficulty: "Beginner" },
    ],
    description: "Build arm strength and definition",
  },
  chest: {
    name: "Chest Exercises",
    exercises: [
      { name: "Standing Chest Stretch", sets: 3, reps: 10, difficulty: "Beginner" },
      { name: "Cross-over Arm Swing", sets: 3, reps: 12, difficulty: "Beginner" },
      { name: "Cobra Pose", sets: 3, reps: 12, difficulty: "Intermediate" },
    ],
    description: "Develop chest strength and stability",
  },
  back: {
    name: "Back Exercises",
    exercises: [
      { name: "Cat-Cow Stretch", sets: 3, reps: 12, difficulty: "Beginner" },
      { name: "Child's Pose", sets: 3, reps: 8, difficulty: "Advanced" },
      { name: "Thread-the-Needle Pose", sets: 3, reps: 12, difficulty: "Intermediate" },
    ],
    description: "Strengthen back muscles and improve posture",
  },
  quadriceps: {
    name: "Quadriceps Exercises",
    exercises: [
      {
        name: "Crescent Lunge",
        sets: 3,
        reps: 15,
        difficulty: "Beginner",
      },
      { name: "Side Lying Quad Stretch", sets: 3, reps: 12, difficulty: "Intermediate" },
    ],
    description: "Build leg strength and stability",
  },
  hamstrings: {
    name: "Hamstring Exercises",
    exercises: [
      { name: "Mini Squat", sets: 3, reps: 10, difficulty: "Intermediate" },
      { name: "Active Assisted Hamstring Stretch", sets: 3, reps: 12, difficulty: "Beginner" },
    ],
    description: "Strengthen hamstrings and improve balance",
  },
};

// Search functionality
searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();

  if (searchTerm.length > 0) {
    clearSearch.classList.add("visible");
  } else {
    clearSearch.classList.remove("visible");
  }

  loadMovementLibrary(searchTerm);

  // Search through all exercises in exerciseData
  const allExercises = [];
  Object.keys(exerciseData).forEach(category => {
    exerciseData[category].exercises.forEach(exercise => {
      allExercises.push({
        name: exercise.name,
        category: category,
        difficulty: exercise.difficulty,
        sets: exercise.sets,
        reps: exercise.reps
      });
    });
  });

  // Filter exercises based on search term
  const matchingExercises = allExercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm) ||
    exercise.category.toLowerCase().includes(searchTerm) ||
    exercise.difficulty.toLowerCase().includes(searchTerm)
  );

  // Show search results
  showSearchResults(matchingExercises, searchTerm);
});

// Show search results
function showSearchResults(exercises, searchTerm) {
  // Remove existing search results
  const existingResults = document.querySelector(".search-results");
  if (existingResults) {
    existingResults.remove();
  }

  if (searchTerm.length === 0) {
    // Show normal body diagram
    bodyParts.forEach((part) => {
      part.style.opacity = "1";
    });
    return;
  }

  // Hide body parts when searching
  bodyParts.forEach((part) => {
    part.style.opacity = "0.3";
  });

  if (exercises.length === 0) {
    // Show no results message
    const noResults = document.createElement("div");
    noResults.className = "search-results";
    noResults.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search" style="font-size: 2rem; color: #9ca3af; margin-bottom: 1rem;"></i>
        <h3>No movements found</h3>
        <p>Try searching for different keywords like "stretch", "strength", or body parts like "shoulder", "arm", etc.</p>
      </div>
    `;
    noResults.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 10;
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 300px;
    `;
    document.querySelector(".body-diagram").appendChild(noResults);
    return;
  }

  // Create search results container
  const searchResults = document.createElement("div");
  searchResults.className = "search-results";
  searchResults.innerHTML = `
    <div class="search-results-header">
      <h3>Found ${exercises.length} movement${exercises.length !== 1 ? 's' : ''}</h3>
      <p>Click on a movement to see details</p>
    </div>
    <div class="search-results-list">
      ${exercises.map(exercise => `
        <div class="search-result-item" onclick="showExerciseDetails('${exercise.category}')">
          <div class="result-info">
            <h4>${exercise.name}</h4>
            <p>${exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)} • ${exercise.difficulty}</p>
            <span class="result-sets">${exercise.sets} sets × ${exercise.reps} reps</span>
          </div>
          <div class="result-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  searchResults.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 10;
    overflow-y: auto;
    padding: 1rem;
  `;

  document.querySelector(".body-diagram").appendChild(searchResults);
}

// Clear search
clearSearch.addEventListener("click", function () {
  searchInput.value = "";
  clearSearch.classList.remove("visible");

  // Remove search results
  const existingResults = document.querySelector(".search-results");
  if (existingResults) {
    existingResults.remove();
  }

  // Reset body part opacity
  bodyParts.forEach((part) => {
    part.style.opacity = "1";
  });

  loadMovementLibrary();
});

// View toggle functionality
frontViewBtn.addEventListener("click", function () {
  setView("front");
});

backViewBtn.addEventListener("click", function () {
  setView("back");
});

function setView(view) {
  currentView = view;

  // Update button states
  if (view === "front") {
    frontViewBtn.classList.add("active");
    backViewBtn.classList.remove("active");
  } else {
    backViewBtn.classList.add("active");
    frontViewBtn.classList.remove("active");
  }

  // Update body diagram
  updateBodyDiagram(view);
}

function updateBodyDiagram(view) {
  const frontView = bodyDiagram.querySelector(".front-view");
  const backView = bodyDiagram.querySelector(".back-view");

  if (view === "front") {
    frontView.classList.add("visible");
    backView.classList.remove("visible");
  } else {
    backView.classList.add("visible");
    frontView.classList.remove("visible");
  }
}

// Category card interactions
categoryCards.forEach((card) => {
  card.addEventListener("click", function () {
    const category = this.dataset.category;
    selectCategory(category);
  });
});

function selectCategory(category) {
  selectedCategory = category;

  // Remove active state from all cards
  categoryCards.forEach((card) => {
    card.classList.remove("active");
  });

  // Add active state to selected card
  const selectedCard = document.querySelector(`[data-category="${category}"]`);
  if (selectedCard) {
    selectedCard.classList.add("active");
  }

  // Highlight corresponding body parts
  highlightBodyParts(category);

  // Show exercise details
  showExerciseDetails(category);
}

function highlightBodyParts(category) {
  // Remove active state from all body parts
  bodyParts.forEach((part) => {
    part.classList.remove("active");
  });

  // Add active state to matching body parts
  const matchingParts = document.querySelectorAll(`[data-part="${category}"]`);
  matchingParts.forEach((part) => {
    part.classList.add("active");
  });
}

// Show exercise details modal
function showExerciseDetails(category) {
  const exerciseInfo = exerciseData[category];
  if (!exerciseInfo) return;

  // Remove existing modal
  const existingModal = document.querySelector(".exercise-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "exercise-modal";
  modal.innerHTML = `
         <div class="modal-content">
            <div class="status-bar">
                <img src="../../assets/images/header.png" alt="Header" class="header-image">
             </div>

            <div class="modal-header">
                <h3>${exerciseInfo.name}</h3>
                <button class="close-btn" onclick="closeExerciseModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p class="exercise-description">${exerciseInfo.description}</p>
                <div class="exercises-list">
                    <h4>Recommended Exercises:</h4>
                    ${exerciseInfo.exercises
                      .map((exercise) => {
                        let imageUrl =
                          "../../assets/images/shoulder-standingW.jpg"; // default for shoulder
                        if (category === "arm") {
                          if (exercise.name === "Standing Biceps Stretch") {
                            // Create scrollable image collection for standing biceps stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/arm 1/StandingBicepsStretch1.jpg" alt="Standing Biceps Stretch 1" class="scroll-image">
                                        <img src="../../assets/images/图片/arm 1/Standing Biceps Stretch2.jpg" alt="Standing Biceps Stretch 2" class="scroll-image">
                                        <img src="../../assets/images/图片/arm 1/Standing Biceps Stretch3.jpg" alt="Standing Biceps Stretch 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Seated Biceps Stretch") {
                            // Create scrollable image collection for seated biceps stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/arm 2/Seated Biceps Stretch1.jpg" alt="Seated Biceps Stretch 1" class="scroll-image">
                                        <img src="../../assets/images/图片/arm 2/Seated Biceps Stretch2.jpg" alt="Seated Biceps Stretch 2" class="scroll-image">
                                        <img src="../../assets/images/图片/arm 2/Seated Biceps Stretch3.jpg" alt="Seated Biceps Stretch 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Overhead Triceps Stretch") {
                            // Create scrollable image collection for overhead triceps stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/arm 3/Overhead Triceps Stretch1.jpg" alt="Overhead Triceps Stretch 1" class="scroll-image">
                                        <img src="../../assets/images/图片/arm 3/Overhead Triceps Stretch2.jpg" alt="Overhead Triceps Stretch 2" class="scroll-image">
                                        <img src="../../assets/images/图片/arm 3/Overhead Triceps Stretch3.jpg" alt="Overhead Triceps Stretch 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else {
                            imageUrl = "../../assets/images/placeholder.jpg"; // placeholder for other arm exercises
                          }
                        } else if (category === "shoulder") {
                          if (exercise.name === "Cross-Body Shoulder Stretch") {
                            // Create scrollable image collection for cross-body shoulder stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/shoulders 1/Cross-Body Shoulder1 .jpg" alt="Cross-Body Shoulder Stretch 1" class="scroll-image">
                                        <img src="../../assets/images/图片/shoulders 1/Cross-Body Shoulder2.jpg" alt="Cross-Body Shoulder Stretch 2" class="scroll-image">
                                        <img src="../../assets/images/图片/shoulders 1/Cross-Body Shoulder3.jpg" alt="Cross-Body Shoulder Stretch 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Banded External Rotation") {
                            // Create scrollable image collection for banded external rotation
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/shoulder 2/BandedExternalRotation1.jpg" alt="Banded External Rotation 1" class="scroll-image">
                                        <img src="../../assets/images/图片/shoulder 2/BandedExternalRotation2.jpg" alt="Banded External Rotation 2" class="scroll-image">
                                        <img src="../../assets/images/图片/shoulder 2/BandedExternalRotation3.jpg" alt="Banded External Rotation 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          }
                        } else if (category === "chest") {
                          if (exercise.name === "Standing Chest Stretch") {
                            // Create scrollable image collection for standing chest stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/chest 2/StandingChestStretch1.jpg" alt="Standing Chest Stretch 1" class="scroll-image">
                                        <img src="../../assets/images/图片/chest 2/StandingChestStretch2.jpg" alt="Standing Chest Stretch 2" class="scroll-image">
                                        <img src="../../assets/images/图片/chest 2/StandingChestStretch3.jpg" alt="Standing Chest Stretch 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Cross-over Arm Swing") {
                            // Create scrollable image collection for cross-over arm swing
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/chest 3/ Cross-overArmSwing1.jpg" alt="Cross-over Arm Swing 1" class="scroll-image">
                                        <img src="../../assets/images/图片/chest 3/ Cross-overArmSwing2.jpg" alt="Cross-over Arm Swing 2" class="scroll-image">
                                        <img src="../../assets/images/图片/chest 3/ Cross-overArmSwing3.jpg" alt="Cross-over Arm Swing 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Cobra Pose") {
                            // Create scrollable image collection for cobra pose
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/chest 4/CobraPose1.jpg" alt="Cobra Pose 1" class="scroll-image">
                                        <img src="../../assets/images/图片/chest 4/CobraPose2.jpg" alt="Cobra Pose 2" class="scroll-image">
                                        <img src="../../assets/images/图片/chest 4/CobraPose3.jpg" alt="Cobra Pose 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else {
                            imageUrl = "../../assets/images/placeholder.jpg"; // placeholder for other chest exercises
                          }
                        } else if (category === "quadriceps") {
                          if (exercise.name === "Crescent Lunge") {
                            // Create scrollable image collection for crescent lunge
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/quadrips1/Crescent Lunge1.jpg" alt="Crescent Lunge 1" class="scroll-image">
                                        <img src="../../assets/images/图片/quadrips1/Crescent Lunge2.jpg" alt="Crescent Lunge 2" class="scroll-image">
                                        <img src="../../assets/images/图片/quadrips1/Crescent Lunge3.jpg" alt="Crescent Lunge 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Side Lying Quad Stretch") {
                            // Create scrollable image collection for side lying quad stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/quadrips2/Side Lying Quad Stretch1.jpg" alt="Side Lying Quad Stretch 1" class="scroll-image">
                                        <img src="../../assets/images/图片/quadrips2/Side Lying Quad Stretch2.jpg" alt="Side Lying Quad Stretch 2" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else {
                            imageUrl = "../../assets/images/placeholder.jpg"; // placeholder for other quadriceps exercises
                          }
                        } else if (category === "hamstrings") {
                          if (exercise.name === "Active Assisted Hamstring Stretch") {
                            // Create scrollable image collection for active assisted hamstring stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/hamstring1/Active Assisted Hamstring Stretch.jpg" alt="Active Assisted Hamstring Stretch" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Mini Squat") {
                            imageUrl =
                              "../../assets/images/hamstring-minisquat.jpg";
                          } else {
                            imageUrl = "../../assets/images/placeholder.jpg"; // placeholder for other hamstring exercises
                          }
                        } else if (category === "back") {
                          if (exercise.name === "Cat-Cow Stretch") {
                            // Create scrollable image collection for cat-cow stretch
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/back1/cat-cow stretch1.jpg" alt="Cat-Cow Stretch 1" class="scroll-image">
                                        <img src="../../assets/images/图片/back1/cat-cow stretch2.jpg" alt="Cat-Cow Stretch 2" class="scroll-image">
                                        <img src="../../assets/images/图片/back1/cat-cow stretch3.jpg" alt="Cat-Cow Stretch 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Child's Pose") {
                            // Create scrollable image collection for child's pose
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/back2/Child's Pose1.jpg" alt="Child's Pose 1" class="scroll-image">
                                        <img src="../../assets/images/图片/back2/Child's Pose2.jpg" alt="Child's Pose 2" class="scroll-image">
                                        <img src="../../assets/images/图片/back2/Child's Pose3.jpg" alt="Child's Pose 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 2)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else if (exercise.name === "Thread-the-Needle Pose") {
                            // Create scrollable image collection for thread-the-needle pose
                            return `
                            <div class="exercise-item" style="position: relative;">
                                <div class="exercise-info">
                                    <h5>${exercise.name}</h5>
                                    <p>${exercise.sets} sets × ${exercise.reps} reps</p>
                                    <div class="exercise-info-row">
                                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                                        <button class="start-exercise-btn" onclick="startExercise('${category}', '${exercise.name}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="exercise-image-scrollable">
                                    <button class="scroll-nav prev" onclick="scrollToImage(this, 'prev')">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="scroll-nav next" onclick="scrollToImage(this, 'next')">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div class="image-scroll-container">
                                        <img src="../../assets/images/图片/back3/Thread-the-Needle Pose1.jpg" alt="Thread-the-Needle Pose 1" class="scroll-image">
                                        <img src="../../assets/images/图片/back3/Thread-the-Needle Pose3.jpg" alt="Thread-the-Needle Pose 3" class="scroll-image">
                                    </div>
                                    <div class="scroll-indicators">
                                        <span class="indicator active" onclick="scrollToImageByIndex(this, 0)"></span>
                                        <span class="indicator" onclick="scrollToImageByIndex(this, 1)"></span>
                                    </div>
                                </div>
                            </div>
                            `;
                          } else {
                            imageUrl = "../../assets/images/placeholder.jpg"; // placeholder for other back exercises
                          }
                        }
                        return `
                        <div class="exercise-item" style="position: relative;">
                            <div class="exercise-info">
                                <h5>${exercise.name}</h5>
                                <p>${exercise.sets} sets × ${
                          exercise.reps
                        } reps</p>
                                <div class="exercise-info-row">
                                    <span class="difficulty ${exercise.difficulty.toLowerCase()}">${
                          exercise.difficulty
                        }</span>
                                    <button class="start-exercise-btn" onclick="startExercise('${category}', '${
                          exercise.name
                        }')">
                                        <i class="fas fa-play"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="exercise-image" style="
                                content: '';
                                width: 50%;
                                height: 100%;
                                background-image: url('${imageUrl}');
                                background-size: contain;
                                background-position: center;
                                background-repeat: no-repeat;
                                border-radius: 0.5rem;
                                position: absolute;
                                right: 0;
                                top: 0;
                                bottom: 0;
                            "></div>
                        </div>
                    `;
                      })
                      .join("")}
                </div>
            </div>
        </div>
    `;

  modal.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
        cursor: pointer;
        overflow-y: auto;
    `;

  // Add click event to close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeExerciseModal();
    }
  });

  // Append to app container instead of body
  const appContainer = document.querySelector(".app-container");
  if (appContainer) {
    appContainer.appendChild(modal);
  } else {
    document.body.appendChild(modal);
  }
  
  // Setup scroll listeners for the newly created modal
  setTimeout(() => {
    const scrollContainers = modal.querySelectorAll('.image-scroll-container');
    scrollContainers.forEach(container => {
      container.addEventListener('scroll', function() {
        const indicators = this.parentElement.querySelectorAll('.indicator');
        const scrollLeft = this.scrollLeft;
        const containerWidth = this.offsetWidth;
        const currentIndex = Math.round(scrollLeft / containerWidth);
        
        // Update indicators
        indicators.forEach((indicator, index) => {
          if (index === currentIndex) {
            indicator.classList.add('active');
          } else {
            indicator.classList.remove('active');
          }
        });
        
        // Update navigation buttons
        updateNavigationButtons(this);
      }, { passive: true });
      
      // Initialize navigation button states
      updateNavigationButtons(container);
    });
  }, 100);
}

// Close exercise modal
function closeExerciseModal() {
  const modal = document.querySelector(".exercise-modal");
  if (modal) {
    modal.remove();
  }
}

// Start exercise
function startExercise(category, exerciseName) {
  console.log(`Starting ${exerciseName} for ${category}`);

  // Show notification
  showNotification(`Starting ${exerciseName}...`, "success");

  // In a real app, this would navigate to the exercise interface
  // For now, we'll just show a notification
  setTimeout(() => {
    showNotification(`${exerciseName} completed! Great job!`, "success");
  }, 3000);
}

// Body part interactions
bodyParts.forEach((part) => {
  part.addEventListener("click", function () {
    const partType = this.dataset.part;
    const side = this.dataset.side;

    // Remove active state from all parts
    bodyParts.forEach((p) => p.classList.remove("active"));

    // Add active state to clicked part
    this.classList.add("active");

    // Update category selection
    updateCategorySelection(partType);

    // Show exercise details
    showExerciseDetails(partType);

    // Log the selection
    console.log(`Selected: ${partType} ${side || ""}`);
  });
});

function updateCategorySelection(partType) {
  selectedBodyPart = partType;

  // Remove active state from all category cards
  categoryCards.forEach((card) => {
    card.classList.remove("active");
  });

  // Add active state to matching category card
  const matchingCard = document.querySelector(`[data-category="${partType}"]`);
  if (matchingCard) {
    matchingCard.classList.add("active");
  }
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  const styles = {
    success: {
      background: "linear-gradient(to right, #bbf7d0, #86efac)",
      color: "#166534",
    },
    warning: {
      background: "linear-gradient(to right, #fef3c7, #fdba74)",
      color: "#000000",
    },
    info: {
      background: "linear-gradient(to right, #dbeafe, #93c5fd)",
      color: "#1e40af",
    },
  };

  const style = styles[type] || styles.info;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        font-size: 0.875rem;
        font-weight: 500;
        background: ${style.background};
        color: ${style.color};
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideUp 0.3s ease-out";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Initialize movements page
document.addEventListener("DOMContentLoaded", function () {
  // Set up search placeholder
  searchInput.placeholder = "Search Movement Name";

  // Initialize with front view
  setView("front");
  
  // Initialize scrollable image functionality
  initializeScrollableImages();

   // Load movement library
   loadMovementLibrary();

  // Add animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
        
        .exercise-modal .modal-content {
            background: white;
            border-radius: 0;
            max-width: 100%;
            width: 100%;
            max-height: 100vh;
            height: 100%;
            overflow-y: auto;
            box-shadow: none;
            display: flex;
            flex-direction: column;
        }
        
        .exercise-description {
            color: #6b7280;
            margin-bottom: 1rem;
        }
        
        .exercises-list h4 {
            margin-bottom: 1rem;
            color: #374151;
        }
        
        .exercise-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border: 1px solid #e5e7eb;
            border-radius: 1rem;
            margin-bottom: 1rem;
            background: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
                .exercise-info h5 {
            margin: 0 0 0.5rem 0;
            color: #374151;
            font-size: 1.25rem;
        }

        .exercise-info p {
            margin: 0 0 0.5rem 0;
            color: #6b7280;
            font-size: 1rem;
        }
        
        .difficulty {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-weight: 500;
        }
        
        .difficulty.beginner {
            background: #bbf7d0;
            color: #166534;
        }
        
        .difficulty.intermediate {
            background: #fef3c7;
            color: #000000;
        }
        
        .difficulty.advanced {
            background: #fecaca;
            color: #dc2626;
        }
        
        .start-exercise-btn {
            width: 3rem;
            height: 3rem;
            border: none;
            border-radius: 50%;
            background: linear-gradient(to bottom right, #fef3c7, #fdba74);
            color: #000000;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            font-size: 1.25rem;
        }
        
        .start-exercise-btn:hover {
            transform: scale(1.1);
        }
    `;
  document.head.appendChild(style);
});

// Global functions for scroll control
function scrollToImage(button, direction) {
  const container = button.closest('.exercise-image-scrollable').querySelector('.image-scroll-container');
  const containerWidth = container.offsetWidth;
  const currentScroll = container.scrollLeft;
  const totalImages = container.children.length;
  const currentIndex = Math.round(currentScroll / containerWidth);
  
  let targetIndex;
  let isCycling = false;
  
  if (direction === 'prev') {
    // Cycle to the last image if at the first
    if (currentIndex === 0) {
      targetIndex = totalImages - 1;
      isCycling = true;
    } else {
      targetIndex = currentIndex - 1;
    }
  } else {
    // Cycle to the first image if at the last
    if (currentIndex === totalImages - 1) {
      targetIndex = 0;
      isCycling = true;
    } else {
      targetIndex = currentIndex + 1;
    }
  }
  
  // Add cycling animation if cycling
  if (isCycling) {
    button.classList.add('cycling');
    setTimeout(() => {
      button.classList.remove('cycling');
    }, 1000);
  }
  
  container.scrollTo({
    left: targetIndex * containerWidth,
    behavior: 'smooth'
  });
  
  // Update navigation button states
  updateNavigationButtons(container);
}

function scrollToImageByIndex(indicator, index) {
  const container = indicator.closest('.exercise-image-scrollable').querySelector('.image-scroll-container');
  const containerWidth = container.offsetWidth;
  
  container.scrollTo({
    left: index * containerWidth,
    behavior: 'smooth'
  });
  
  // Update navigation button states
  updateNavigationButtons(container);
}

function updateNavigationButtons(container) {
  const scrollable = container.closest('.exercise-image-scrollable');
  const prevBtn = scrollable.querySelector('.scroll-nav.prev');
  const nextBtn = scrollable.querySelector('.scroll-nav.next');
  const scrollLeft = container.scrollLeft;
  const containerWidth = container.offsetWidth;
  const totalImages = container.children.length;
  const currentIndex = Math.round(scrollLeft / containerWidth);
  
  // For cyclic navigation, buttons are never disabled
  // But we can add visual feedback to show it's cycling
  if (prevBtn) {
    prevBtn.disabled = false;
    // Add a subtle visual indicator when cycling
    if (currentIndex === 0) {
      prevBtn.style.opacity = '0.8';
      prevBtn.title = 'Go to last image';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.title = 'Previous image';
    }
  }
  if (nextBtn) {
    nextBtn.disabled = false;
    // Add a subtle visual indicator when cycling
    if (currentIndex === totalImages - 1) {
      nextBtn.style.opacity = '0.8';
      nextBtn.title = 'Go to first image';
    } else {
      nextBtn.style.opacity = '1';
      nextBtn.title = 'Next image';
    }
  }
}

// Initialize scrollable images functionality
function initializeScrollableImages() {
  // Function to update indicators for a specific container
  function updateIndicators(container) {
    const indicators = container.parentElement.querySelectorAll('.indicator');
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const currentIndex = Math.round(scrollLeft / containerWidth);
    const totalImages = container.children.length;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
        
        // Add cycling animation if this is a boundary transition
        if ((currentIndex === 0 && scrollLeft < containerWidth * 0.1) || 
            (currentIndex === totalImages - 1 && scrollLeft > containerWidth * (totalImages - 1.1))) {
          indicator.classList.add('cycling');
          setTimeout(() => {
            indicator.classList.remove('cycling');
          }, 600);
        }
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // Update navigation buttons
    updateNavigationButtons(container);
  }
  
  // Add scroll event listeners to image containers
  function setupScrollListeners() {
    const scrollContainers = document.querySelectorAll('.image-scroll-container');
    scrollContainers.forEach(container => {
      container.addEventListener('scroll', function() {
        updateIndicators(this);
      }, { passive: true });
      
      // Initialize navigation button states
      updateNavigationButtons(container);
    });
  }
  
  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    const activeScrollable = document.querySelector('.exercise-image-scrollable');
    if (activeScrollable) {
      const container = activeScrollable.querySelector('.image-scroll-container');
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToImage(activeScrollable.querySelector('.scroll-nav.prev'), 'prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToImage(activeScrollable.querySelector('.scroll-nav.next'), 'next');
      }
    }
  });
  
  // Setup initial listeners
  setupScrollListeners();
  
  // Re-setup listeners when modal content is dynamically added
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if new scrollable containers were added
        const newContainers = document.querySelectorAll('.image-scroll-container');
        if (newContainers.length > 0) {
          setupScrollListeners();
        }
      }
    });
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Movement library from data store
async function loadMovementLibrary(term = '') {
  const container = document.getElementById('movement-library-list');
  if (!container || !window.RevibeStore) return;
  container.innerHTML = '<p class="muted">Loading…</p>';
  try {
    const items = await window.RevibeStore.listMovements({ term });
    if (!items.length) {
      container.innerHTML = '<p class="muted">No movements found.</p>';
      return;
    }
    container.innerHTML = '';
    items.forEach(m => container.appendChild(renderMovementCard(m)));
  } catch (e) {
    console.error('Movement library failed', e);
    container.innerHTML = '<p class="muted">Unable to load movements.</p>';
  }
}

function renderMovementCard(movement) {
  const card = document.createElement('div');
  card.className = 'movement-card';
  card.innerHTML = `
    <img src="${movement.asset}" alt="${movement.name}">
    <div>
      <h4>${movement.name}</h4>
      <p class="movement-meta">${movement.targetArea} • ${movement.difficulty}</p>
      <p class="movement-meta">${movement.instructions}</p>
      <div class="movement-actions">
        <button type="button" aria-label="Start in camera" onclick="startMovementSession('${movement.id}')"><i class="fas fa-play"></i>Start</button>
        <button type="button" aria-label="Schedule movement" onclick="scheduleMovementSession('${movement.id}')"><i class="fas fa-calendar"></i>Schedule</button>
      </div>
    </div>
  `;
  return card;
}

async function startMovementSession(id) {
  if (!window.RevibeStore) return;
  const movement = await window.RevibeStore.getMovementById(id);
  if (movement) {
    localStorage.setItem('currentExercise', JSON.stringify({
      id: movement.id,
      name: movement.name,
      duration: '5 minutes',
      category: movement.category,
      description: movement.instructions
    }));
  }
  navigateTo('/camera');
}

async function scheduleMovementSession(id) {
  if (!window.RevibeStore) return;
  const movement = await window.RevibeStore.getMovementById(id);
  const start = new Date();
  start.setMinutes(start.getMinutes() + 60);
  await window.RevibeStore.upsertCalendar({
    title: movement ? movement.name : 'Session',
    start: start.toISOString(),
    durationMinutes: 25,
    movementId: id,
    notes: 'Scheduled from Movement Library'
  });
  showNotification('Session scheduled', 'success');
}

// Export functions for potential use
window.movementsFunctions = {
  setView,
  selectCategory,
  showExerciseDetails,
  startExercise,
  initializeScrollableImages,
  loadMovementLibrary,
};
