// DOM elements
const progressSlider = document.getElementById('progress-slider');
const progressFill = document.getElementById('progress-fill');
const progressThumb = document.getElementById('progress-thumb');
const progressPercentage = document.getElementById('progress-percentage');
const navButtons = document.querySelectorAll('.nav-icon');

// App state
let currentProgress = 60;
let isDragging = false;

// Update progress display
function updateProgress() {
    if (!progressSlider || !progressFill || !progressThumb) return;
    
    const progress = progressSlider.value;
    currentProgress = parseInt(progress);
    progressFill.style.width = `${progress}%`;
    progressThumb.style.left = `calc(${progress}% - 16px)`;
    updateProgressText();
    
    // Save progress to localStorage
    localStorage.setItem('userProgress', progress);
    
    // Persist to faux backend
    if (window.RevibeStore) {
        window.RevibeStore.saveProgress(progress).catch(console.error);
    }
}

// Update progress text
function updateProgressText() {
    if (!progressSlider || !progressPercentage) return;
    
    const progress = progressSlider.value;
    progressPercentage.textContent = `${progress}% Complete`;
}

// Update time display
function updateTime() {
    const timeElements = document.querySelectorAll('.time');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    timeElements.forEach(element => {
        element.textContent = timeString;
    });
}

// List of motivational messages
const motivationalMessages = [
    "Take care of your knees!",
    "You're doing great!",
    "Keep pushing forward!",
    "Every step counts!",
    "You've got this!",
    "Stay strong!",
    "Believe in yourself!",
    "Progress, not perfection!",
    "You're stronger than you think!",
    "Keep going, warrior!"
];

let currentMessageIndex = 0;

// Update conversation bubble message
function updateConversationBubble() {
    const bubbleContent = document.querySelector('.bubble-content');
    if (bubbleContent) {
        // Fade out
        bubbleContent.style.opacity = '0';
        
        setTimeout(() => {
            // Change message
            bubbleContent.textContent = motivationalMessages[currentMessageIndex];
            
            // Fade in
            bubbleContent.style.opacity = '1';
            
            // Move to next message
            currentMessageIndex = (currentMessageIndex + 1) % motivationalMessages.length;
        }, 300);
    }
}

// Update current date
function updateCurrentDate() {
    const today = new Date();

    // Update calendar days with rolling window centered on today
    const dayItems = document.querySelectorAll('.day-item');
    dayItems.forEach((item, index) => {
        const day = new Date();
        day.setDate(today.getDate() + index - 2);

        const dayDate = item.querySelector('.day-date');
        const dayName = item.querySelector('.day-name');

        if (dayName) {
            dayName.textContent = day
                .toLocaleDateString('en-US', { weekday: 'short' })
                .toUpperCase();
        }

        if (dayDate) {
            dayDate.textContent = day.getDate().toString().padStart(2, '0');
            if (day.toDateString() === today.toDateString()) {
                dayDate.classList.add('active');
            } else {
                dayDate.classList.remove('active');
            }
        }
    });
}

// Load user progress from localStorage
function loadUserProgress() {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress && progressSlider) {
        progressSlider.value = savedProgress;
        updateProgress();
    }
}

// Pull profile info from data layer
async function hydrateProfile() {
    if (!window.RevibeStore) return;
    try {
        const profile = await window.RevibeStore.getProfile();
        if (profile && progressSlider) {
            const pct = profile.progress ?? 60;
            progressSlider.value = pct;
            updateProgress();
        }
        const greeting = document.getElementById('greeting-text');
        if (greeting && profile?.name) {
            greeting.textContent = `Hi, ${profile.name}`;
        }
    } catch (err) {
        console.error('Profile load failed', err);
    }
}

async function refreshUpcomingSession() {
    const label = document.getElementById('upcoming-session-label');
    if (!label || !window.RevibeStore) return;
    try {
        const events = await window.RevibeStore.listCalendar();
        if (!events.length) {
            label.textContent = 'No upcoming sessions';
            return;
        }
        const next = events[0];
        const start = new Date(next.start);
        label.textContent = `${next.title} • ${start.toLocaleDateString()} @ ${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } catch (e) {
        console.error('Failed to load calendar', e);
        label.textContent = 'Calendar unavailable';
    }
}

// Navigation function
function navigateTo(path) {
    console.log('navigateTo function called with path:', path);
    
    try {
        // Convert route paths to actual HTML files with new folder structure
        let targetFile = path;
        
        if (path === '/') {
            // Check if we're in a subdirectory and need to go up
            const currentPath = window.location.pathname;
            if (currentPath.includes('/pages/')) {
                targetFile = '../../index.html';
            } else {
                targetFile = 'index.html';
            }
        } else if (path.startsWith('/')) {
            const pageName = path.substring(1);
            // Check if we're in a subdirectory and need to go up
            const currentPath = window.location.pathname;
            if (currentPath.includes('/pages/')) {
                targetFile = `../../pages/${pageName}/${pageName}.html`;
            } else {
                targetFile = `pages/${pageName}/${pageName}.html`;
            }
        }
        
        console.log(`Navigating to: ${targetFile}`);
        console.log(`Current path: ${window.location.pathname}`);
        
        // Navigate immediately
        window.location.href = targetFile;
        
    } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to simple navigation
        window.location.href = path;
    }
}

// Progress slider drag functionality
function setupProgressSlider() {
    if (!progressSlider) return;
    
    progressSlider.addEventListener('mousedown', () => {
        isDragging = true;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    progressSlider.addEventListener('input', updateProgress);
    progressSlider.addEventListener('change', () => {
        // Save progress when user finishes dragging
        localStorage.setItem('userProgress', progressSlider.value);
    });
}

// Update progress cards
function updateProgressCards() {
    const lowerCard = document.querySelector('.lower-card .card-value');
    const upperCard = document.querySelector('.upper-card .card-value');
    
    if (lowerCard) {
        const lowerProgress = Math.min(100, Math.floor(currentProgress * 0.5));
        lowerCard.textContent = `${lowerProgress}%`;
    }
    
    if (upperCard) {
        const upperProgress = Math.min(100, Math.floor(currentProgress * 0.85));
        upperCard.textContent = `${upperProgress}%`;
    }
}

// Add card hover effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize the app
function initializeApp() {
    // Load saved progress
    loadUserProgress();
    
    // Update time every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Update current date
    updateCurrentDate();
    
    // Setup progress slider
    setupProgressSlider();
    
    // Update progress cards
    updateProgressCards();
    
    // Setup card effects
    setupCardEffects();
    
    // Start conversation bubble message cycling
    updateConversationBubble();
    setInterval(updateConversationBubble, 3000);

    // Data hydration
    hydrateProfile();
    refreshUpcomingSession();

    // Active nav
    setActiveNav();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initializeApp();
    
    // Initial progress update
    if (progressSlider) {
        updateProgress();
    }
});

// Export functions for potential use in other scripts
window.appFunctions = {
    navigateTo,
    updateProgress,
    updateTime,
    updateCurrentDate
};

// Make navigateTo globally accessible
window.navigateTo = navigateTo;

// Test function
console.log('Script loaded, navigateTo function available:', typeof navigateTo); 

// Active nav setter
function setActiveNav() {
    const path = window.location.pathname.replace('.html', '');
    navButtons.forEach(btn => {
        const route = btn.getAttribute('data-route');
        if (!route) return;
        if ((route === '/' && (path === '/' || path.endsWith('index.html'))) || path.includes(route)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}