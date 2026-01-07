// Profile page specific JavaScript

// User data
let userData = {
    name: '于涵菲要好好学习\n天天开心🌻',
    email: 'carol.johnson@email.com',
    avatar: '../../assets/images/profile.jpg',
    stats: {
        totalWorkouts: 24,
        currentStreak: 7,
        totalTime: 156
    }
};

// Load user data from localStorage
async function loadUserData() {
    const savedData = localStorage.getItem('userProfileData');
    if (savedData) {
        try {
            userData = { ...userData, ...JSON.parse(savedData) };
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }
    if (window.RevibeStore) {
        try {
            const profile = await window.RevibeStore.getProfile();
            userData = { ...userData, ...profile };
        } catch (e) {
            console.error('Failed to load store profile', e);
        }
    }
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('userProfileData', JSON.stringify(userData));
    if (window.RevibeStore) {
        window.RevibeStore.saveProfile(userData).catch(console.error);
    }
}

// Update profile display
function updateProfileDisplay() {
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const profileAvatar = document.getElementById('profile-avatar');
    
    if (userName) {
        // Replace newline characters with <br> tags for proper display
        const displayName = userData.name.replace(/\n/g, '<br>');
        userName.innerHTML = displayName;
    }
    if (userEmail) userEmail.textContent = userData.email;
    if (profileAvatar) profileAvatar.src = userData.avatar;
    
    // Update stats
    const totalWorkouts = document.getElementById('total-workouts');
    const currentStreak = document.getElementById('current-streak');
    const totalTime = document.getElementById('total-time');
    
    if (totalWorkouts) totalWorkouts.textContent = userData.stats.totalWorkouts;
    if (currentStreak) currentStreak.textContent = userData.stats.currentStreak;
    if (totalTime) totalTime.textContent = userData.stats.totalTime;

    // Form values
    const formName = document.getElementById('profile-name');
    const formEmail = document.getElementById('profile-email');
    const formGoals = document.getElementById('profile-goals');
    const formInjury = document.getElementById('profile-injury');
    const formReminders = document.getElementById('profile-reminders');
    if (formName) formName.value = userData.name || '';
    if (formEmail) formEmail.value = userData.email || '';
    if (formGoals) formGoals.value = userData.goals || '';
    if (formInjury) formInjury.value = userData.injuryFocus || '';
    if (formReminders) formReminders.checked = userData.notifications?.reminders ?? true;
}

// Toggle edit mode
function toggleEditMode() {
    const appContainer = document.querySelector('.app-container');
    const editButton = document.querySelector('.edit-button i');
    
    if (appContainer.classList.contains('edit-mode')) {
        appContainer.classList.remove('edit-mode');
        editButton.className = 'fas fa-edit';
        showNotification('Edit mode disabled', 'info');
    } else {
        appContainer.classList.add('edit-mode');
        editButton.className = 'fas fa-check';
        showNotification('Edit mode enabled', 'success');
    }
}

// Change avatar
function changeAvatar() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userData.avatar = e.target.result;
                updateProfileDisplay();
                saveUserData();
                showNotification('Avatar updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// Open setting modal
function openSetting(settingType) {
    showNotification(`${settingType} settings coming soon!`, 'info');
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

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    loadUserData().then(() => updateProfileDisplay());
    
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
    
    console.log('Profile page loaded');

    // Bind profile form
    const form = document.getElementById('profile-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            userData.name = document.getElementById('profile-name').value;
            userData.email = document.getElementById('profile-email').value;
            userData.goals = document.getElementById('profile-goals').value;
            userData.injuryFocus = document.getElementById('profile-injury').value;
            userData.notifications = {
                ...userData.notifications,
                reminders: document.getElementById('profile-reminders').checked
            };
            saveUserData();
            updateProfileDisplay();
            showNotification('Profile saved', 'success');
        });
    }
});

// Export functions
window.profileFunctions = {
    toggleEditMode,
    changeAvatar,
    openSetting,
    updateProfileDisplay
};
