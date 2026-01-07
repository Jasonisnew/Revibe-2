// Daily Plans page specific JavaScript

// Exercise state
let currentExercise = null;
let exerciseProgress = {};
let dailyStats = {};

// Exercise data with categories
const exercises = {
    // Arms exercises
    'side-arms-raise': {
        name: 'Side Arms Raise',
        duration: '3 minutes',
        category: 'arms',
        description: '3 sets x 10 reps • Improve arm mobility',
        icon: 'fas fa-hand-paper'
    },

    // Chest exercises
    'chest-opener': {
        name: 'Chest Opener',
        duration: '3 minutes',
        category: 'chest',
        description: '3 sets x 10 reps • Open chest muscles',
        icon: 'fas fa-heart'
    },

    // Thighs exercises
    'seated-knee-extension': {
        name: 'Seated Knee Extension',
        duration: '4 minutes',
        category: 'thighs',
        description: '3 sets x 12 reps • Strengthen quadriceps',
        icon: 'fas fa-arrows-alt-v'
    },
    'mini-squat': {
        name: 'Mini Squat',
        duration: '3 minutes',
        category: 'thighs',
        description: '3 sets x 10 reps • Strengthen hamstrings',
        icon: 'fas fa-walking'
    },

    // Shoulders exercises
    'w-shape-stretch': {
        name: 'Standing W',
        duration: '3 minutes',
        category: 'shoulders',
        description: '3 sets x 10 reps • Shoulder mobility',
        icon: 'fas fa-arrows-alt-h'
    },
    'y-shape-stretch': {
        name: 'Standing Y',
        duration: '3 minutes',
        category: 'shoulders',
        description: '3 sets x 10 reps • Shoulder flexibility',
        icon: 'fas fa-arrow-up'
    }
};

// Category data
const categories = {
    arms: {
        name: 'Arms',
        icon: 'fas fa-hand-paper',
        exercises: ['side-arms-raise']
    },
    chest: {
        name: 'Chest',
        icon: 'fas fa-heart',
        exercises: ['chest-opener']
    },
    thighs: {
        name: 'Thighs',
        icon: 'fas fa-walking',
        exercises: ['seated-knee-extension', 'mini-squat']
    },
    shoulders: {
        name: 'Shoulders',
        icon: 'fas fa-dumbbell',
        exercises: ['w-shape-stretch', 'y-shape-stretch']
    }
};

// Load exercise progress from localStorage
function loadExerciseProgress() {
    const savedProgress = localStorage.getItem('exerciseProgress');
    if (savedProgress) {
        try {
            exerciseProgress = JSON.parse(savedProgress);
        } catch (error) {
            console.error('Error loading exercise progress:', error);
        }
    }
    
    // Load daily stats
    const savedStats = localStorage.getItem('dailyStats');
    if (savedStats) {
        try {
            dailyStats = JSON.parse(savedStats);
        } catch (error) {
            console.error('Error loading daily stats:', error);
        }
    }
}

// Save exercise progress to localStorage
function saveExerciseProgress() {
    localStorage.setItem('exerciseProgress', JSON.stringify(exerciseProgress));
    localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
}

// Switch category function
function switchCategory(categoryName) {
    // Update active category in sidebar
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeCategoryItem = document.querySelector(`[onclick="switchCategory('${categoryName}')"]`);
    if (activeCategoryItem) {
        activeCategoryItem.classList.add('active');
    }
    
    // Hide all exercise sections
    const exerciseSections = document.querySelectorAll('.exercise-section');
    exerciseSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected category section
    const targetSection = document.getElementById(`${categoryName}-section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Update progress for the selected category
    updateCategoryProgress(categoryName);
}

// Update category progress
function updateCategoryProgress(categoryName) {
    const category = categories[categoryName];
    if (!category) return;
    
    const completedExercises = category.exercises.filter(exerciseId => {
        const exercise = exercises[exerciseId];
        if (!exercise) return false;
        
        const exerciseItems = document.querySelectorAll('.exercise-item');
        for (let item of exerciseItems) {
            const exerciseName = item.querySelector('h4').textContent;
            if (exerciseName === exercise.name) {
                return item.classList.contains('completed');
            }
        }
        return false;
    }).length;
    
    const totalExercises = category.exercises.length;
    const progressPercentage = Math.round((completedExercises / totalExercises) * 100);
    
    console.log(`${category.name} progress: ${completedExercises}/${totalExercises} (${progressPercentage}%)`);
}

// Start exercise function - navigate to camera page
function startExercise(exerciseId) {
    const exercise = exercises[exerciseId];
    if (!exercise) {
        console.error('Exercise not found:', exerciseId);
        return;
    }
    
    console.log(`Starting exercise: ${exercise.name}`);
    
    // Store exercise data for camera page
    localStorage.setItem('currentExercise', JSON.stringify({
        id: exerciseId,
        name: exercise.name,
        duration: exercise.duration,
        category: exercise.category,
        description: exercise.description
    }));
    
    // Navigate to camera page
    navigateTo('/camera');
}

// Start all exercises in a category
function startCategoryExercises(categoryName) {
    const category = categories[categoryName];
    if (!category) {
        console.error('Category not found:', categoryName);
        return;
    }
    
    console.log(`Starting all exercises in category: ${category.name}`);
    
    // Store category data for camera page
    localStorage.setItem('currentCategory', JSON.stringify({
        name: categoryName,
        displayName: category.name,
        exercises: category.exercises
    }));
    
    // Navigate to camera page
    navigateTo('/camera');
}

// Start all exercises
function startAllExercises() {
    console.log('Starting all exercises');
    
    // Store all exercises data for camera page
    const allExercises = [];
    Object.keys(categories).forEach(categoryName => {
        const category = categories[categoryName];
        category.exercises.forEach(exerciseId => {
            const exercise = exercises[exerciseId];
            if (exercise) {
                allExercises.push({
                    id: exerciseId,
                    name: exercise.name,
                    duration: exercise.duration,
                    category: exercise.category,
                    description: exercise.description
                });
            }
        });
    });
    
    localStorage.setItem('allExercises', JSON.stringify(allExercises));
    
    // Navigate to camera page
    navigateTo('/camera');
}

// Update exercise status
function updateExerciseStatus(exerciseId, status) {
    const exercise = exercises[exerciseId];
    if (!exercise) return;
    
    const exerciseItems = document.querySelectorAll('.exercise-item');
    
    exerciseItems.forEach(item => {
        const exerciseName = item.querySelector('h4').textContent;
        if (exerciseName === exercise.name) {
            // Remove all status classes
            item.classList.remove('completed', 'active');
            
            // Add new status class
            if (status === 'completed') {
                item.classList.add('completed');
                updateProgressBar();
            } else if (status === 'active') {
                item.classList.add('active');
            }
        }
    });
}

// Update progress bar
function updateProgressBar() {
    const completedExercises = document.querySelectorAll('.exercise-item.completed').length;
    const totalExercises = document.querySelectorAll('.exercise-item').length;
    const progressPercentage = Math.round((completedExercises / totalExercises) * 100);
    
    const progressBar = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-percentage');
    
    if (progressBar && progressText) {
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}%`;
        
        // Update progress card color based on percentage
            progressBar.style.background = 'linear-gradient(to right, #FFB0A3, #FFD3A7, #FFEB99, #BBF6C6)';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const styles = {
        success: {
            background: 'linear-gradient(to right, #bbf7d0, #86efac)',
            color: '#166534'
        },
        warning: {
            background: 'linear-gradient(to right, #fef3c7, #fdba74)',
            color: '#000000'
        },
        info: {
            background: 'linear-gradient(to right, #dbeafe, #93c5fd)',
            color: '#1e40af'
        }
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
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Initialize daily plans page
document.addEventListener('DOMContentLoaded', function() {
    // Load exercise progress
    loadExerciseProgress();
    
    // Update current date
    updateCurrentDate();
    
    // Update progress bar
    updateProgressBar();
    
    // Add click handlers for category start buttons
    const categoryStartButtons = document.querySelectorAll('.category-start-btn');
    categoryStartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryName = this.getAttribute('data-category');
            startCategoryExercises(categoryName);
        });
    });
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    document.head.appendChild(style);
    
    console.log('Daily plans page loaded');

    // Planner
    setupPlanner();
});

// Export functions for potential use
window.dailyPlansFunctions = {
    startExercise,
    startCategoryExercises,
    startAllExercises,
    switchCategory,
    updateCurrentDate,
    showNotification
}; 

// ---------- Calendar / Planner ----------
async function populateMovementSelect() {
    const select = document.getElementById('session-movement');
    if (!select || !window.RevibeStore) return;
    try {
        const moves = await window.RevibeStore.listMovements();
        moves.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = `${m.name} (${m.category})`;
            select.appendChild(opt);
        });
    } catch (e) {
        console.error('Failed to load movements', e);
    }
}

function prefillSessionDefaults() {
    const dateInput = document.getElementById('session-date');
    const timeInput = document.getElementById('session-time');
    const titleInput = document.getElementById('session-title');
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().slice(0, 10);
    }
    if (timeInput && !timeInput.value) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        timeInput.value = now.toISOString().slice(11, 16);
    }
    if (titleInput && !titleInput.value) {
        titleInput.value = 'Recovery block';
    }
}

async function loadSessions() {
    const list = document.getElementById('sessions-list');
    if (!list || !window.RevibeStore) return;
    list.innerHTML = '<p class="muted">Loading sessions…</p>';
    try {
        const sessions = await window.RevibeStore.listCalendar();
        if (!sessions.length) {
            list.innerHTML = '<p class="muted">No sessions yet. Add one above.</p>';
            return;
        }
        list.innerHTML = '';
        sessions.forEach(session => list.appendChild(renderSessionCard(session)));
    } catch (e) {
        console.error('Failed to load sessions', e);
        list.innerHTML = '<p class="muted">Unable to load sessions.</p>';
    }
}

function renderSessionCard(session) {
    const card = document.createElement('article');
    card.className = 'session-card';
    const start = new Date(session.start);
    card.innerHTML = `
        <header>
            <h4>${session.title}</h4>
            <span class="session-meta">${start.toLocaleDateString()} @ ${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </header>
        <p class="session-meta">${session.durationMinutes || 30} min ${session.notes ? ' • ' + session.notes : ''}</p>
        <div class="session-actions">
            <button type="button" aria-label="Start session" data-id="${session.id}" class="start-session-btn"><i class="fas fa-play"></i></button>
            <button type="button" aria-label="Edit session" data-id="${session.id}" class="edit-session-btn"><i class="fas fa-pen"></i></button>
            <button type="button" aria-label="Delete session" data-id="${session.id}" class="delete-session-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;
    card.querySelector('.start-session-btn').addEventListener('click', () => startScheduledSession(session));
    card.querySelector('.edit-session-btn').addEventListener('click', () => editSession(session));
    card.querySelector('.delete-session-btn').addEventListener('click', () => deleteSession(session.id));
    return card;
}

async function startScheduledSession(session) {
    if (session.movementId && window.RevibeStore) {
        const movement = await window.RevibeStore.getMovementById(session.movementId);
        if (movement) {
            localStorage.setItem('currentExercise', JSON.stringify({
                id: movement.id,
                name: movement.name,
                duration: `${session.durationMinutes || 30} minutes`,
                category: movement.category,
                description: movement.instructions
            }));
        }
    }
    navigateTo('/camera');
}

function editSession(session) {
    document.getElementById('session-id').value = session.id;
    document.getElementById('session-title').value = session.title;
    document.getElementById('session-date').value = session.start.slice(0,10);
    document.getElementById('session-time').value = new Date(session.start).toISOString().slice(11,16);
    document.getElementById('session-duration').value = session.durationMinutes || 30;
    document.getElementById('session-notes').value = session.notes || '';
    document.getElementById('session-movement').value = session.movementId || '';
    showNotification('Loaded session into form', 'info');
}

async function deleteSession(id) {
    if (!window.RevibeStore) return;
    await window.RevibeStore.deleteCalendar(id);
    await loadSessions();
    showNotification('Session deleted', 'success');
}

function resetPlannerForm() {
    document.getElementById('session-form').reset();
    document.getElementById('session-id').value = '';
    prefillSessionDefaults();
}

async function handlePlannerSubmit(e) {
    e.preventDefault();
    if (!window.RevibeStore) return;
    const id = document.getElementById('session-id').value;
    const title = document.getElementById('session-title').value;
    const date = document.getElementById('session-date').value;
    const time = document.getElementById('session-time').value;
    const duration = parseInt(document.getElementById('session-duration').value, 10) || 30;
    const movementId = document.getElementById('session-movement').value || null;
    const notes = document.getElementById('session-notes').value;
    const startIso = new Date(`${date}T${time}`).toISOString();

    await window.RevibeStore.upsertCalendar({
        id,
        title,
        start: startIso,
        durationMinutes: duration,
        movementId,
        notes,
    });
    showNotification('Session saved', 'success');
    resetPlannerForm();
    loadSessions();
}

// Hook planner listeners
function setupPlanner() {
    const form = document.getElementById('session-form');
    const resetBtn = document.getElementById('reset-form');
    if (form) form.addEventListener('submit', handlePlannerSubmit);
    if (resetBtn) resetBtn.addEventListener('click', resetPlannerForm);
    prefillSessionDefaults();
    populateMovementSelect();
    loadSessions();
}