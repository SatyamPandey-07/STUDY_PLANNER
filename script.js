// Smart Study Planner JavaScript

// Google Calendar API Configuration
const GOOGLE_API_KEY = 'AIzaSyDPi_1B0kES8apESSijUi8IZF39oh5FVAA';
const GOOGLE_CLIENT_ID = '25924384895-t4uo7sq7akbm69mkn2f006taj6h7tol0.apps.googleusercontent.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

// OAuth Configuration
const OAUTH_CONFIG = {
    "web": {
        "client_id": "25924384895-t4uo7sq7akbm69mkn2f006taj6h7tol0.apps.googleusercontent.com",
        "project_id": "smart-momentum-471116-f1",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "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",
        "redirect_uris": ["http://localhost:3000/oauth2callback"]
    }
};

// Global variables for Google API
let gapi;
let isGoogleSignedIn = false;

// OAuth Helper Functions
function getRedirectUri() {
    // For development and file:// protocol, use a simple approach
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
        return 'http://localhost:3000/oauth2callback';
    }
    return window.location.origin + '/oauth2callback';
}

function isValidOAuthConfig() {
    return GOOGLE_CLIENT_ID && 
           GOOGLE_CLIENT_ID !== 'your-client-id.googleusercontent.com' &&
           GOOGLE_API_KEY && 
           GOOGLE_API_KEY !== 'your-api-key';
}

// Handle OAuth callback (for future use if needed)
function handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
        return false;
    }
    
    if (code) {
        // The Google API client will handle this automatically
        return true;
    }
    
    return false;
}

// Utility: Show/hide loading indicator
function showLoading() {
    const loader = document.getElementById('loadingIndicator');
    if (loader) loader.style.display = 'flex';
}
function hideLoading() {
    const loader = document.getElementById('loadingIndicator');
    if (loader) loader.style.display = 'none';
}

// Utility: Show loading skeleton
function showSkeleton(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="skeleton-item">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-meta"></div>
            </div>
            <div class="skeleton-item">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-meta"></div>
            </div>
            <div class="skeleton-item">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-meta"></div>
            </div>
        `;
    }
}

// Utility: Add ripple effect to buttons
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Pagination config (for future lazy-loading)
const TASKS_PER_PAGE = 20;

class StudyPlanner {
    /**
     * Render a monthly calendar view with tasks
     */
    renderCalendar(monthOffset = 0) {
        if (!this.currentCalendarDate) {
            this.currentCalendarDate = new Date();
        }
        if (monthOffset !== 0) {
            this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + monthOffset);
        }
        const calendarView = document.getElementById('calendarView');
        const currentMonth = document.getElementById('currentMonth');
        if (!calendarView || !currentMonth) return;
        const year = this.currentCalendarDate.getFullYear();
        const month = this.currentCalendarDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday start
        const daysInMonth = lastDay.getDate();
        currentMonth.textContent = this.currentCalendarDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        let html = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">';
        const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        weekDays.forEach(d => html += `<div style='font-weight:600;text-align:center;'>${d}</div>`);
        for (let i = 0; i < startDay; i++) html += `<div></div>`;
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d);
            const dayTasks = this.getTasksForDay(date);
            html += `<div style='min-height:60px;border-radius:8px;padding:4px 2px 2px 2px;background:#f8fafc;position:relative;'>`;
            html += `<div style='font-size:0.95em;font-weight:600;text-align:right;'>${d}</div>`;
            if (dayTasks.length > 0) {
                html += `<ul style='list-style:none;padding:0;margin:0;'>`;
                dayTasks.slice(0,2).forEach(task => {
                    html += `<li style='font-size:0.8em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${task.status==='completed'?'#38a169':'#2d3748'};'>${this.escapeHtml(task.title)}</li>`;
                });
                if (dayTasks.length > 2) html += `<li style='font-size:0.7em;color:#718096;'>+${dayTasks.length-2} more</li>`;
                html += `</ul>`;
            }
            html += `</div>`;
        }
        html += '</div>';
        calendarView.innerHTML = html;
    }
    
    constructor() {
        this.tasks = [];
        this.goals = [];
        this.currentWeekStart = this.getWeekStart(new Date());
        this.currentCalendarDate = new Date();
        this.editingTaskId = null;
        this.draggedTaskId = null;
        this.currentTheme = localStorage.getItem('studyPlannerTheme') || 'default';
        this.pomodoroTimer = {
            isActive: false,
            timeLeft: 25 * 60, // 25 minutes in seconds
            interval: null,
            type: 'work' // work, shortBreak, longBreak
        };
        this.overdueNotificationInterval = null;
        this.init();
    }

    init() {
        this.loadTasks();
        this.loadGoals();
        this.bindEvents();
        this.updateDashboard();
        this.renderTasks();
        this.renderTimeline();
        this.updateAnalytics();
        this.setDefaultDate();
        this.applyTheme(this.currentTheme);
        
        this.startOverdueNotifications();
        this.initTouchGestures();
    }

    bindEvents() {
        // Tab navigation (fix: show/hide tab content and set active class)
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                addRippleEffect(btn, e);
                const button = e.currentTarget;
                const tabName = button.dataset.tab;
                if (tabName) {
                    // Remove active from all tab buttons
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    button.classList.add('active');
                    // Hide all tab contents
                    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
                    // Show the selected tab content
                    const tabContent = document.getElementById(tabName);
                    if (tabContent) tabContent.classList.add('active');
                }
            });
        });

        // Add ripple effect to all buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!btn.classList.contains('no-ripple')) {
                    addRippleEffect(btn, e);
                }
            });
        });

        // Quick add form
        document.getElementById('quickAddForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addQuickTask();
        });

        // Add task modal
        document.getElementById('addTaskBtn').addEventListener('click', () => this.openTaskModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeTaskModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeTaskModal());
        document.getElementById('modalOverlay').addEventListener('click', () => this.closeTaskModal());

        // Task form
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Filters
        document.getElementById('filterStatus').addEventListener('change', () => this.renderTasks());
        document.getElementById('filterPriority').addEventListener('change', () => this.renderTasks());
        document.getElementById('searchTasks').addEventListener('input', () => this.renderTasks());

        // Timeline navigation
        document.getElementById('prevWeek').addEventListener('click', () => this.navigateWeek(-1));
        document.getElementById('nextWeek').addEventListener('click', () => this.navigateWeek(1));

        // Pomodoro timer events
        this.bindPomodoroEvents();
        // Theme selector events
        this.bindThemeEvents();
        // Goal management events
        this.bindGoalEvents();
        // Google Calendar sync events
        this.bindGoogleCalendarEvents();
        // Settings events
        this.bindSettingsEvents();
    }

    // Settings Management Methods
    bindSettingsEvents() {
        const importDataInput = document.getElementById('importDataInput');
        if (importDataInput) {
            importDataInput.addEventListener('change', (e) => this.importData(e));
        }

        const enableNotifications = document.getElementById('enableNotifications');
        if (enableNotifications) {
            enableNotifications.addEventListener('change', (e) => {
                localStorage.setItem('enableNotifications', e.target.checked);
            });
            enableNotifications.checked = localStorage.getItem('enableNotifications') !== 'false';
        }

        const enableSounds = document.getElementById('enableSounds');
        if (enableSounds) {
            enableSounds.addEventListener('change', (e) => {
                localStorage.setItem('enableSounds', e.target.checked);
            });
            enableSounds.checked = localStorage.getItem('enableSounds') !== 'false';
        }

        const enableOverdueAlerts = document.getElementById('enableOverdueAlerts');
        if (enableOverdueAlerts) {
            enableOverdueAlerts.addEventListener('change', (e) => {
                localStorage.setItem('enableOverdueAlerts', e.target.checked);
                if (e.target.checked) {
                    this.startOverdueNotifications();
                } else {
                    clearInterval(this.overdueNotificationInterval);
                }
            });
            enableOverdueAlerts.checked = localStorage.getItem('enableOverdueAlerts') !== 'false';
        }
    }

    // Goal Management Methods
    bindGoalEvents() {
        const addGoalBtn = document.getElementById('addGoalBtn');
        if (addGoalBtn) {
            addGoalBtn.addEventListener('click', () => this.openGoalModal());
        }
    }

    openGoalModal() {
        // This would open a goal creation modal - for now just create a simple goal
        const title = prompt('Goal Title:');
        if (!title) return;
        
        const description = prompt('Goal Description:');
        const targetValue = parseInt(prompt('Target Value (number):'));
        const type = prompt('Goal Type (tasks/hours/points):') || 'tasks';
        const targetDate = prompt('Target Date (YYYY-MM-DD):');
        
        if (title && !isNaN(targetValue) && targetDate) {
            this.addGoal({
                title,
                description: description || '',
                targetValue,
                type,
                targetDate
            });
        }
    }

    addGoal(goalData) {
        const goal = {
            id: Date.now().toString(),
            title: goalData.title,
            description: goalData.description,
            targetValue: goalData.targetValue,
            currentValue: 0,
            type: goalData.type,
            targetDate: goalData.targetDate,
            createdAt: new Date().toISOString()
        };

        this.goals.push(goal);
        this.saveGoals();
        this.renderGoals();
        this.showNotification('Goal added successfully!', 'success');
    }

    editGoal(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        const title = prompt('Goal Title:', goal.title);
        if (title === null) return;

        const description = prompt('Goal Description:', goal.description);
        const targetValue = parseInt(prompt('Target Value:', goal.targetValue));
        const type = prompt('Goal Type:', goal.type);
        const targetDate = prompt('Target Date (YYYY-MM-DD):', goal.targetDate);

        if (title && !isNaN(targetValue) && targetDate) {
            goal.title = title;
            goal.description = description || '';
            goal.targetValue = targetValue;
            goal.type = type;
            goal.targetDate = targetDate;

            this.saveGoals();
            this.renderGoals();
            this.showNotification('Goal updated successfully!', 'success');
        }
    }

    deleteGoal(goalId) {
        if (!confirm('Are you sure you want to delete this goal?')) return;

        this.goals = this.goals.filter(g => g.id !== goalId);
        this.saveGoals();
        this.renderGoals();
        this.showNotification('Goal deleted successfully!', 'success');
    }

    loadGoals() {
        try {
            const savedGoals = localStorage.getItem('studyPlannerGoals');
            this.goals = savedGoals ? JSON.parse(savedGoals) : [];
        } catch (error) {
            console.error('Error loading goals:', error);
            this.goals = [];
        }
    }

    saveGoals() {
        try {
            localStorage.setItem('studyPlannerGoals', JSON.stringify(this.goals));
        } catch (error) {
            console.error('Error saving goals:', error);
        }
    }

    // Google Calendar Integration Methods
    bindGoogleCalendarEvents() {
        const syncBtn = document.getElementById('googleCalendarSync');
        if (syncBtn) {
            syncBtn.addEventListener('click', () => this.syncWithGoogleCalendar());
        }
    }

    async initGoogleAPI() {
        try {
            // Check if we have valid OAuth configuration
            if (!isValidOAuthConfig()) {
                console.warn('Google Calendar integration requires valid API key and Client ID');
                this.updateGoogleCalendarUI();
                return false;
            }

            // Check if running from file:// protocol
            if (window.location.protocol === 'file:') {
                console.warn('Google Calendar requires HTTP/HTTPS protocol. Use start-server.bat for local development.');
                this.updateGoogleCalendarUI();
                return false;
            }

            console.log('=== Starting Google Calendar API initialization ===');
            console.log('Current URL:', window.location.href);
            console.log('Protocol:', window.location.protocol);

            // Step 1: Load Google API script with improved strategy
            if (typeof window.gapi === 'undefined') {
                console.log('Google API not found, loading script...');
                
                // Use the most reliable Google API URL
                const apiUrl = 'https://apis.google.com/js/api.js';
                
                try {
                    console.log(`Loading Google API from: ${apiUrl}`);
                    await this.loadScript(apiUrl);
                    console.log('Google API script loaded successfully');
                } catch (error) {
                    console.warn(`Failed to load Google API:`, error.message);
                    throw new Error('Failed to load Google API script. Please check your internet connection and browser settings.');
                }
            } else {
                console.log('Google API script already available');
            }
            
            // Step 2: Wait for gapi to be fully available
            console.log('Waiting for Google API to be ready...');
            let attempts = 0;
            const maxAttempts = 30; // 15 seconds with 500ms intervals
            
            while ((typeof window.gapi === 'undefined' || !window.gapi.load) && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 500));
                attempts++;
                
                if (attempts % 10 === 0) {
                    console.log(`Still waiting for Google API... (${attempts * 0.5}s)`);
                    
                    // Debug what's available
                    if (typeof window.gapi !== 'undefined') {
                        console.log('gapi object available, checking properties...');
                        console.log('gapi.load:', typeof window.gapi.load);
                        console.log('gapi keys:', Object.keys(window.gapi));
                    }
                }
            }
            
            if (typeof window.gapi === 'undefined' || !window.gapi.load) {
                throw new Error('Google API failed to load properly. The gapi object is not available.');
            }
            
            console.log('Google API is ready, loading client libraries...');
            console.log('Available gapi keys before loading:', Object.keys(window.gapi));
            
            // Step 3: Load client and auth2 libraries with direct approach
            console.log('Loading Google API client libraries...');
            
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    console.log('Timeout reached. Current gapi keys:', Object.keys(window.gapi));
                    console.log('window.gapi.client:', typeof window.gapi.client);
                    console.log('window.gapi.auth2:', typeof window.gapi.auth2);
                    reject(new Error('Google API client libraries loading timeout'));
                }, 20000);
                
                console.log('Calling gapi.load with client:auth2...');
                
                // Use the simplest possible approach
                window.gapi.load('client:auth2', function() {
                    clearTimeout(timeout);
                    console.log('gapi.load callback fired!');
                    console.log('Available gapi keys after loading:', Object.keys(window.gapi));
                    console.log('window.gapi.client:', typeof window.gapi.client);
                    console.log('window.gapi.auth2:', typeof window.gapi.auth2);
                    
                    if (window.gapi.client && window.gapi.auth2) {
                        console.log('Google API client libraries loaded successfully');
                        resolve();
                    } else {
                        console.error('Client libraries callback fired but client/auth2 not available');
                        reject(new Error('Client libraries loaded but not accessible'));
                    }
                });
                
                console.log('gapi.load call completed, waiting for callback...');
            });

            // Step 4: Initialize the Google client
            console.log('Initializing Google API client...');
            try {
                await window.gapi.client.init({
                    apiKey: GOOGLE_API_KEY,
                    clientId: GOOGLE_CLIENT_ID,
                    discoveryDocs: [DISCOVERY_DOC],
                    scope: SCOPES
                });
                console.log('Google API client initialized successfully');
            } catch (error) {
                console.error('Failed to initialize Google API client:', error);
                throw new Error('Failed to initialize Google API client. Please check your API configuration in Google Cloud Console.');
            }

            // Step 5: Get auth instance and set up listeners
            const authInstance = window.gapi.auth2.getAuthInstance();
            if (!authInstance) {
                throw new Error('Failed to get Google Auth instance. Please refresh the page and try again.');
            }
            
            // Update global state
            isGoogleSignedIn = authInstance.isSignedIn.get();
            
            // Listen for sign-in state changes
            authInstance.isSignedIn.listen((isSignedIn) => {
                console.log('Google sign-in state changed:', isSignedIn);
                isGoogleSignedIn = isSignedIn;
                this.updateGoogleCalendarUI();
                
                if (isSignedIn) {
                    this.showNotification('Google Calendar connected successfully!', 'success');
                } else {
                    this.showNotification('Google Calendar disconnected', 'info');
                }
            });
            
            // Update UI based on current sign-in status
            this.updateGoogleCalendarUI();
            
            console.log('=== Google Calendar API initialization completed successfully ===');
            this.showNotification('Google Calendar API ready' + (isGoogleSignedIn ? ' and connected' : ' - ready to connect'), 'success');
            
            return true;
            
        } catch (error) {
            console.error('=== Google API initialization failed ===');
            console.error('Error details:', error);
            
            // Show user-friendly error messages based on error type
            let errorMessage = 'Google Calendar integration is not working: ';
            
            if (error.message && error.message.includes('internet') || error.message.includes('connection')) {
                errorMessage += 'Please check your internet connection and try again.';
            } else if (error.message && error.message.includes('timeout')) {
                errorMessage += 'Connection timed out. The Google API may be blocked by your network.';
            } else if (error.message && error.message.includes('blocked')) {
                errorMessage += 'The Google API may be blocked by your firewall or antivirus.';
            } else if (error.details && error.details.includes('origin')) {
                errorMessage += 'OAuth error. Make sure you\'re accessing via http://localhost:3000';
            } else if (error.status === 403) {
                errorMessage += 'API key configuration issue. Check Google Cloud Console settings.';
            } else if (error.message && error.message.includes('API configuration')) {
                errorMessage += 'Please check your Google API configuration in the Google Cloud Console.';
            } else {
                errorMessage += 'The app will work without Google Calendar sync.';
            }
            
            this.showNotification(errorMessage, 'warning');
            this.updateGoogleCalendarUI();
            
            // Don't fail the entire app initialization - just disable Google Calendar
            console.log('Continuing app initialization without Google Calendar...');
            
            return false;
        }
    }

    // Add manual test method for Google API
    testGoogleAPIManually() {
        console.log('=== Manual Google API Test ===');
        
        if (typeof window.gapi === 'undefined') {
            console.log('❌ window.gapi is undefined - script not loaded');
            return false;
        }
        
        console.log('✅ window.gapi is available');
        console.log('Available methods:', Object.keys(window.gapi));
        
        if (typeof window.gapi.load !== 'function') {
            console.log('❌ window.gapi.load is not a function');
            return false;
        }
        
        console.log('✅ window.gapi.load is available');
        
        // Test loading client manually
        console.log('Testing gapi.load client...');
        window.gapi.load('client', function() {
            console.log('✅ Client library loaded successfully');
            console.log('window.gapi.client:', typeof window.gapi.client);
            
            // Test loading auth2 separately
            window.gapi.load('auth2', function() {
                console.log('✅ Auth2 library loaded successfully');
                console.log('window.gapi.auth2:', typeof window.gapi.auth2);
                console.log('✅ All Google API libraries are working!');
            });
        });
        
        return true;
    }
    diagnoseGoogleAPI() {
        console.log('=== Google API Diagnostics ===');
        console.log('Current URL:', window.location.href);
        console.log('Protocol:', window.location.protocol);
        console.log('User Agent:', navigator.userAgent);
        console.log('Online status:', navigator.onLine);
        console.log('typeof window.gapi:', typeof window.gapi);
        console.log('GOOGLE_API_KEY:', GOOGLE_API_KEY ? 'Set (' + GOOGLE_API_KEY.substring(0, 10) + '...)' : 'Not set');
        console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID ? 'Set (' + GOOGLE_CLIENT_ID.substring(0, 20) + '...)' : 'Not set');
        console.log('isValidOAuthConfig():', isValidOAuthConfig());
        
        if (typeof window.gapi !== 'undefined') {
            console.log('window.gapi.load:', typeof window.gapi.load);
            console.log('window.gapi.client:', typeof window.gapi.client);
            console.log('window.gapi.auth2:', typeof window.gapi.auth2);
            console.log('gapi object keys:', Object.keys(window.gapi));
            
            try {
                const authInstance = window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
                console.log('Auth instance:', authInstance ? 'Available' : 'Not available');
                if (authInstance) {
                    console.log('Is signed in:', authInstance.isSignedIn.get());
                }
            } catch (error) {
                console.log('Auth instance error:', error);
            }
        } else {
            console.log('window.gapi is undefined - API not loaded');
        }
        
        // Check for existing Google API script
        const existingScripts = document.querySelectorAll('script[src*="apis.google.com"]');
        console.log('Google API scripts in DOM:', existingScripts.length);
        existingScripts.forEach((script, index) => {
            console.log(`Script ${index + 1}:`, script.src);
            console.log(`  - async: ${script.async}, defer: ${script.defer}`);
            console.log(`  - readyState: ${script.readyState || 'unknown'}`);
        });
        
        // Test internet connectivity
        this.testInternetConnectivity();
        
        console.log('isGoogleSignedIn:', isGoogleSignedIn);
        console.log('==========================');
        
        // Show results in UI too
        this.showNotification('Diagnostics completed - check browser console for details', 'info');
    }

    async testInternetConnectivity() {
        console.log('=== Internet Connectivity Test ===');
        
        const testUrls = [
            'https://www.google.com/favicon.ico',
            'https://apis.google.com',
            'https://www.googleapis.com'
        ];
        
        for (const url of testUrls) {
            try {
                const response = await fetch(url, { 
                    method: 'HEAD', 
                    mode: 'no-cors',
                    cache: 'no-cache'
                });
                console.log(`✅ ${url}: Reachable`);
            } catch (error) {
                console.log(`❌ ${url}: Not reachable (${error.message})`);
            }
        }
        console.log('=================================');
    }

    // Add manual retry method
    async retryGoogleAPI() {
        console.log('=== Manual Google API Retry ===');
        this.showNotification('Retrying Google Calendar API initialization...', 'info');
        
        // Clear any existing state
        if (typeof window.gapi !== 'undefined') {
            console.log('Clearing existing gapi state...');
            // Remove existing scripts
            document.querySelectorAll('script[src*="apis.google.com"]').forEach(script => {
                script.remove();
            });
            
            // Clear gapi from global scope (if possible)
            try {
                delete window.gapi;
            } catch (e) {
                console.log('Could not delete gapi from window');
            }
        }
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try initialization again
        const success = await this.initGoogleAPI();
        
        if (success) {
            this.showNotification('Google Calendar API retry successful!', 'success');
        } else {
            this.showNotification('Google Calendar API retry failed. Please check your internet connection.', 'error');
        }
        
        return success;
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            console.log('Loading script:', src);
            
            // Check if script is already loaded and gapi is available
            const existingScript = document.querySelector(`script[src*="apis.google.com"]`);
            if (existingScript && typeof window.gapi !== 'undefined') {
                console.log('Google API script already loaded and available');
                resolve();
                return;
            }

            // Remove any existing failed scripts
            if (existingScript) {
                console.log('Removing existing script to reload');
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false; // Changed to false for synchronous loading
            script.defer = false;
            
            let timeoutId;
            let resolved = false;
            
            const cleanup = () => {
                if (timeoutId) clearTimeout(timeoutId);
            };
            
            const handleSuccess = () => {
                if (resolved) return;
                resolved = true;
                cleanup();
                console.log('Script loaded successfully:', src);
                resolve();
            };
            
            const handleError = (error) => {
                if (resolved) return;
                resolved = true;
                cleanup();
                console.error('Script failed to load:', src, error);
                script.remove();
                reject(new Error(`Failed to load script: ${src}`));
            };
            
            // Set up timeout (10 seconds)
            timeoutId = setTimeout(() => {
                handleError(new Error('Script loading timeout after 10 seconds'));
            }, 10000);
            
            script.onload = () => {
                console.log('Script onload fired for:', src);
                // Wait for gapi to be available on window object
                let attempts = 0;
                const checkGapi = () => {
                    attempts++;
                    console.log(`Checking for gapi, attempt ${attempts}...`);
                    if (typeof window.gapi !== 'undefined' && window.gapi.load) {
                        console.log(`gapi available after ${attempts} attempts`);
                        handleSuccess();
                    } else if (attempts < 10) { // Try for 5 seconds
                        setTimeout(checkGapi, 500);
                    } else {
                        console.log('Available on window:', Object.keys(window).filter(k => k.includes('gapi') || k.includes('google')));
                        handleError(new Error('Google API not available after waiting 5 seconds'));
                    }
                };
                checkGapi();
            };
            
            script.onerror = (error) => {
                console.error('Script onerror:', error);
                handleError(error);
            };
            
            // Add to head
            document.head.appendChild(script);
            console.log('Script element added to DOM');
        });
    }

    async syncWithGoogleCalendar() {
        try {
            // Check if running from file:// protocol
            if (window.location.protocol === 'file:') {
                this.showNotification('Google Calendar sync requires a web server. Please use start-server.bat or access via http://localhost:3000', 'error');
                return;
            }

            if (!isValidOAuthConfig()) {
                this.showNotification('Google Calendar integration is not properly configured', 'error');
                return;
            }

            // Check if Google API is loaded
            if (typeof window.gapi === 'undefined') {
                this.showNotification('Google API is not loaded. Please check your internet connection.', 'error');
                return;
            }

            // Check if Google API is initialized
            if (!window.gapi.auth2 || !window.gapi.auth2.getAuthInstance()) {
                this.showNotification('Google API is not initialized. Please refresh and try again.', 'error');
                return;
            }

            if (!isGoogleSignedIn) {
                this.showNotification('Signing in to Google Calendar...', 'info');
                const authInstance = window.gapi.auth2.getAuthInstance();
                try {
                    await authInstance.signIn();
                    isGoogleSignedIn = true;
                    this.updateGoogleCalendarUI();
                } catch (signInError) {
                    console.error('Sign-in failed:', signInError);
                    if (signInError.error === 'popup_blocked_by_browser') {
                        this.showNotification('Please allow popups and try again', 'error');
                    } else if (signInError.error === 'access_denied') {
                        this.showNotification('Access denied. Please grant calendar permissions.', 'error');
                    } else {
                        this.showNotification('Sign-in failed. Please try again.', 'error');
                    }
                    return;
                }
            }

            this.showNotification('Syncing with Google Calendar...', 'info');

            // Sync tasks to Google Calendar
            let syncedCount = 0;
            for (const task of this.tasks) {
                if (task.status !== 'completed' && !task.googleEventId) {
                    try {
                        await this.createGoogleCalendarEvent(task);
                        syncedCount++;
                    } catch (eventError) {
                        console.error('Failed to create event for task:', task.title, eventError);
                    }
                }
            }

            this.showNotification(`Successfully synced ${syncedCount} tasks to Google Calendar!`, 'success');
        } catch (error) {
            console.error('Google Calendar sync failed:', error);
            
            // Provide specific error messages
            if (error.status === 403) {
                this.showNotification('Calendar API access forbidden. Check your API key and permissions.', 'error');
            } else if (error.status === 401) {
                this.showNotification('Authentication failed. Please sign in again.', 'error');
                isGoogleSignedIn = false;
                this.updateGoogleCalendarUI();
            } else if (error.error === 'popup_blocked_by_browser') {
                this.showNotification('Please allow popups to sign in to Google Calendar', 'error');
            } else if (error.error === 'access_denied') {
                this.showNotification('Google Calendar access was denied', 'error');
            } else if (error.error === 'network_error') {
                this.showNotification('Network error. Please check your internet connection.', 'error');
            } else {
                this.showNotification(`Sync failed: ${error.message || 'Unknown error'}`, 'error');
            }
        }
    }

    async createGoogleCalendarEvent(task) {
        try {
            // Ensure we have a valid date
            const dueDate = new Date(task.dueDate);
            if (isNaN(dueDate.getTime())) {
                throw new Error(`Invalid due date for task: ${task.title}`);
            }

            // Default to 1 hour if no estimated time
            const estimatedHours = task.estimatedTime || 1;
            const endTime = new Date(dueDate.getTime() + estimatedHours * 60 * 60 * 1000);

            const event = {
                summary: task.title,
                description: task.description || 'Study task from Smart Study Planner',
                start: {
                    dateTime: dueDate.toISOString(),
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: 'email', minutes: 24 * 60 }, // 1 day before
                        { method: 'popup', minutes: 10 } // 10 minutes before
                    ]
                },
                colorId: task.priority === 'high' ? '11' : task.priority === 'medium' ? '5' : '2' // Red, Yellow, Green
            };

            const response = await window.gapi.client.calendar.events.insert({
                calendarId: 'primary',
                resource: event
            });

            if (response.result && response.result.id) {
                // Store the Google event ID in the task
                task.googleEventId = response.result.id;
                this.saveTasks();
            } else {
                throw new Error('No event ID returned from Google Calendar');
            }
        } catch (error) {
            console.error('Failed to create Google Calendar event for task:', task.title, error);
            throw error; // Re-throw so the sync function can handle it
        }
    }

    updateGoogleCalendarUI() {
        const syncBtn = document.getElementById('googleCalendarSync');
        const statusSpan = document.getElementById('googleCalendarStatus');
        
        if (syncBtn && statusSpan) {
            // Check if Google API is loaded
            if (typeof window.gapi === 'undefined') {
                syncBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Google API Not Loaded';
                syncBtn.disabled = true;
                statusSpan.textContent = 'API Not Loaded';
                statusSpan.className = 'status-error';
                return;
            }

            // Check if we have a valid auth instance
            let authInstance = null;
            try {
                authInstance = window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
            } catch (error) {
                console.warn('Could not get auth instance:', error);
            }

            if (!authInstance) {
                syncBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Google Calendar Unavailable';
                syncBtn.disabled = true;
                statusSpan.textContent = 'API Error (App works without Google Calendar)';
                statusSpan.className = 'status-warning';
                return;
            }

            // Update UI based on sign-in status
            if (isGoogleSignedIn) {
                syncBtn.innerHTML = '<i class="fas fa-sync"></i> Sync with Google Calendar';
                syncBtn.disabled = false;
                statusSpan.textContent = 'Connected';
                statusSpan.className = 'status-connected';
            } else {
                syncBtn.innerHTML = '<i class="fas fa-link"></i> Connect Google Calendar';
                syncBtn.disabled = false;
                statusSpan.textContent = 'Not connected';
                statusSpan.className = 'status-disconnected';
            }
        }
    }

    // Pomodoro Timer Methods
    bindPomodoroEvents() {
        const startBtn = document.getElementById('pomodoroStart');
        const pauseBtn = document.getElementById('pomodoroPause');
        const resetBtn = document.getElementById('pomodoroReset');
        const workBtn = document.getElementById('pomodoroWork');
        const shortBreakBtn = document.getElementById('pomodoroShortBreak');
        const longBreakBtn = document.getElementById('pomodoroLongBreak');

        if (startBtn) startBtn.addEventListener('click', () => this.startPomodoro());
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.pausePomodoro());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetPomodoro());
        if (workBtn) workBtn.addEventListener('click', () => this.setPomodoroType('work'));
        if (shortBreakBtn) shortBreakBtn.addEventListener('click', () => this.setPomodoroType('shortBreak'));
        if (longBreakBtn) longBreakBtn.addEventListener('click', () => this.setPomodoroType('longBreak'));
    }

    startPomodoro() {
        if (!this.pomodoroTimer.isActive) {
            this.pomodoroTimer.isActive = true;
            this.pomodoroTimer.interval = setInterval(() => {
                this.pomodoroTimer.timeLeft--;
                this.updatePomodoroDisplay();
                
                if (this.pomodoroTimer.timeLeft <= 0) {
                    this.pomodoroComplete();
                }
            }, 1000);
            this.updatePomodoroButtons();
        }
    }

    pausePomodoro() {
        this.pomodoroTimer.isActive = false;
        clearInterval(this.pomodoroTimer.interval);
        this.updatePomodoroButtons();
    }

    resetPomodoro() {
        this.pausePomodoro();
        this.setPomodoroType(this.pomodoroTimer.type);
        this.updatePomodoroDisplay();
    }

    setPomodoroType(type) {
        this.pausePomodoro();
        this.pomodoroTimer.type = type;
        
        switch (type) {
            case 'work':
                this.pomodoroTimer.timeLeft = 25 * 60;
                break;
            case 'shortBreak':
                this.pomodoroTimer.timeLeft = 5 * 60;
                break;
            case 'longBreak':
                this.pomodoroTimer.timeLeft = 15 * 60;
                break;
        }
        
        this.updatePomodoroDisplay();
        this.updatePomodoroButtons();
    }

    pomodoroComplete() {
        this.pausePomodoro();
        
        const message = this.pomodoroTimer.type === 'work' 
            ? 'Work session complete! Time for a break.' 
            : 'Break time over! Ready to work?';
            
        this.showNotification(message, 'success');
        
        // Play notification sound
        this.playNotificationSound();
        
        // Auto-switch to next session type
        if (this.pomodoroTimer.type === 'work') {
            // Determine if it's time for long break (every 4 work sessions)
            const workSessions = parseInt(localStorage.getItem('pomodoroWorkSessions') || '0') + 1;
            localStorage.setItem('pomodoroWorkSessions', workSessions.toString());
            
            if (workSessions % 4 === 0) {
                this.setPomodoroType('longBreak');
            } else {
                this.setPomodoroType('shortBreak');
            }
        } else {
            this.setPomodoroType('work');
        }
    }

    updatePomodoroDisplay() {
        const display = document.getElementById('pomodoroDisplay');
        if (display) {
            const minutes = Math.floor(this.pomodoroTimer.timeLeft / 60);
            const seconds = this.pomodoroTimer.timeLeft % 60;
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        const progress = document.getElementById('pomodoroProgress');
        if (progress) {
            const totalTime = this.pomodoroTimer.type === 'work' ? 25 * 60 : 
                             this.pomodoroTimer.type === 'shortBreak' ? 5 * 60 : 15 * 60;
            const percentage = ((totalTime - this.pomodoroTimer.timeLeft) / totalTime) * 100;
            progress.style.width = `${percentage}%`;
        }
    }

    updatePomodoroButtons() {
        const startBtn = document.getElementById('pomodoroStart');
        const pauseBtn = document.getElementById('pomodoroPause');
        
        if (startBtn && pauseBtn) {
            if (this.pomodoroTimer.isActive) {
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-flex';
            } else {
                startBtn.style.display = 'inline-flex';
                pauseBtn.style.display = 'none';
            }
        }
    }

    playNotificationSound() {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }

    // Theme Management Methods
    bindThemeEvents() {
        const themeSelector = document.getElementById('themeSelector');
        if (themeSelector) {
            themeSelector.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
            });
        }

        const customColorBtn = document.getElementById('customColorBtn');
        if (customColorBtn) {
            customColorBtn.addEventListener('click', () => this.openColorPicker());
        }
    }

    applyTheme(themeName) {
        this.currentTheme = themeName;
        localStorage.setItem('studyPlannerTheme', themeName);
        
        const themes = {
            default: {
                primary: '#5a67d8',
                secondary: '#667eea',
                success: '#48bb78',
                warning: '#ed8936',
                error: '#f56565',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            ocean: {
                primary: '#0891b2',
                secondary: '#06b6d4',
                success: '#059669',
                warning: '#d97706',
                error: '#dc2626',
                background: 'linear-gradient(135deg, #0891b2 0%, #164e63 100%)'
            },
            sunset: {
                primary: '#ea580c',
                secondary: '#f97316',
                success: '#16a34a',
                warning: '#ca8a04',
                error: '#dc2626',
                background: 'linear-gradient(135deg, #ea580c 0%, #92400e 100%)'
            },
            forest: {
                primary: '#16a34a',
                secondary: '#22c55e',
                success: '#15803d',
                warning: '#d97706',
                error: '#dc2626',
                background: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)'
            },
            midnight: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)'
            }
        };

        const theme = themes[themeName] || themes.default;
        
        // Apply CSS custom properties
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--success-color', theme.success);
        document.documentElement.style.setProperty('--warning-color', theme.warning);
        document.documentElement.style.setProperty('--error-color', theme.error);
        document.body.style.background = theme.background;
    }

    openColorPicker() {
        // Create a simple color picker modal
        const modal = document.createElement('div');
        modal.className = 'color-picker-modal';
        modal.innerHTML = `
            <div class="color-picker-content">
                <h3>Choose Custom Colors</h3>
                <div class="color-inputs">
                    <label>Primary Color: <input type="color" id="primaryColor" value="${getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#5a67d8'}"></label>
                    <label>Secondary Color: <input type="color" id="secondaryColor" value="${getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim() || '#667eea'}"></label>
                    <label>Success Color: <input type="color" id="successColor" value="${getComputedStyle(document.documentElement).getPropertyValue('--success-color').trim() || '#48bb78'}"></label>
                </div>
                <div class="color-picker-actions">
                    <button id="applyCustomColors" class="btn-primary">Apply</button>
                    <button id="cancelCustomColors" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('applyCustomColors').addEventListener('click', () => {
            const primary = document.getElementById('primaryColor').value;
            const secondary = document.getElementById('secondaryColor').value;
            const success = document.getElementById('successColor').value;
            
            document.documentElement.style.setProperty('--primary-color', primary);
            document.documentElement.style.setProperty('--secondary-color', secondary);
            document.documentElement.style.setProperty('--success-color', success);
            
            // Save custom theme
            localStorage.setItem('customTheme', JSON.stringify({primary, secondary, success}));
            this.currentTheme = 'custom';
            localStorage.setItem('studyPlannerTheme', 'custom');
            
            modal.remove();
        });
        
        document.getElementById('cancelCustomColors').addEventListener('click', () => {
            modal.remove();
        });
    }
    addQuickTask() {
        const title = document.getElementById('quickTaskTitle').value.trim();
        const date = document.getElementById('quickTaskDate').value;
        const priority = document.getElementById('quickTaskPriority').value;

        if (!title || !date) {
            alert('Please fill in all required fields');
            return;
        }

        const task = {
            id: Date.now().toString(),
            title,
            description: '',
            dueDate: new Date(date + 'T23:59:59'),
            priority,
            subject: '',
            estimatedTime: 1,
            tags: [],
            status: 'pending',
            createdAt: new Date(),
            completedAt: null
        };

        this.tasks.push(task);
        this.saveTasks();
        this.updateAll();
        this.addActivity('created', `Created task: ${title}`);
        
        // Reset form
        document.getElementById('quickAddForm').reset();
        this.setDefaultDate();
        
        // Show success feedback
        this.showNotification('Task added successfully!', 'success');
    }

    openTaskModal(taskId = null) {
        this.editingTaskId = taskId;
        const modal = document.getElementById('taskModal');
        const overlay = document.getElementById('modalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        
        if (taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                modalTitle.textContent = 'Edit Task';
                this.fillTaskForm(task);
            }
        } else {
            modalTitle.textContent = 'Add New Task';
            this.clearTaskForm();
        }
        
        modal.classList.add('active');
        overlay.classList.add('active');
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('taskTitle').focus();
        }, 100);
    }

    closeTaskModal() {
        const modal = document.getElementById('taskModal');
        const overlay = document.getElementById('modalOverlay');
        modal.classList.remove('active');
        overlay.classList.remove('active');
        this.editingTaskId = null;
        this.clearTaskForm();
    }

    fillTaskForm(task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = this.formatDateTimeLocal(task.dueDate);
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskSubject').value = task.subject;
        document.getElementById('taskEstimatedTime').value = task.estimatedTime;
        document.getElementById('taskTags').value = task.tags.join(', ');
    }

    clearTaskForm() {
        document.getElementById('taskForm').reset();
        this.setDefaultDate();
    }

    saveTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const dueDate = new Date(document.getElementById('taskDueDate').value);
        const priority = document.getElementById('taskPriority').value;
        const subject = document.getElementById('taskSubject').value.trim();
        const estimatedTime = parseFloat(document.getElementById('taskEstimatedTime').value) || 1;
        const tags = document.getElementById('taskTags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        // Recurring task support (tag: recurring X)
        let recurring = false, recurringDays = 0;
        tags.forEach(tag => {
            if (tag.toLowerCase().startsWith('recurring')) {
                recurring = true;
                const match = tag.match(/recurring\s*(\d+)/i);
                if (match) recurringDays = parseInt(match[1]);
            }
        });

        if (!title) {
            alert('Please enter a task title');
            return;
        }

        if (this.editingTaskId) {
            const taskIndex = this.tasks.findIndex(t => t.id === this.editingTaskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = {
                    ...this.tasks[taskIndex],
                    title,
                    description,
                    dueDate,
                    priority,
                    subject,
                    estimatedTime,
                    tags,
                    recurring,
                    recurringDays
                };
                this.addActivity('updated', `Updated task: ${title}`);
                this.showNotification('Task updated successfully!', 'success');
            }
        } else {
            const task = {
                id: Date.now().toString(),
                title,
                description,
                dueDate,
                priority,
                subject,
                estimatedTime,
                tags,
                status: 'pending',
                createdAt: new Date(),
                completedAt: null,
                recurring,
                recurringDays
            };
            this.tasks.push(task);
            this.addActivity('created', `Created task: ${title}`);
            this.showNotification('Task created successfully!', 'success');
        }

        this.saveTasks();
        this.updateAll();
        this.closeTaskModal();
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            if (task.status === 'completed') {
                task.status = 'pending';
                task.completedAt = null;
                this.addActivity('updated', `Reopened task: ${task.title}`);
                this.showNotification('Task marked as pending', 'info');
            } else {
                task.status = 'completed';
                task.completedAt = new Date();
                this.addActivity('completed', `Completed task: ${task.title}`);
                this.showNotification('Task completed! 🎉', 'success');
                
                // Update goal progress
                this.updateGoalProgress('tasks', 1);
                if (task.estimatedTime) {
                    this.updateGoalProgress('hours', task.estimatedTime);
                }
                
                // If recurring, create next instance
                if (task.recurring && task.recurringDays > 0) {
                    const nextDue = new Date(task.dueDate);
                    nextDue.setDate(nextDue.getDate() + task.recurringDays);
                    const newTask = { ...task, id: Date.now().toString(), status: 'pending', dueDate: nextDue, completedAt: null, createdAt: new Date() };
                    this.tasks.push(newTask);
                    this.addActivity('created', `Recurring task created: ${task.title}`);
                }
            }
            this.saveTasks();
            this.updateAll();
        }
    }

    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            const task = this.tasks[taskIndex];
            this.tasks.splice(taskIndex, 1);
            this.saveTasks();
            this.updateAll();
            this.addActivity('updated', `Deleted task: ${task.title}`);
            this.showNotification('Task deleted', 'info');
        }
    }

    // Touch Gesture Methods
    initTouchGestures() {
        let startX, startY, distX, distY;
        const threshold = 100; // Minimum distance for swipe
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            // Allow scrolling but capture for swipe detection
            if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startY)) {
                e.preventDefault(); // Prevent horizontal scroll for tab navigation
            }
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            distX = e.changedTouches[0].clientX - startX;
            distY = e.changedTouches[0].clientY - startY;
            
            // Check if it's a horizontal swipe
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                if (distX > 0) {
                    // Swipe right - previous tab
                    this.navigateTab(-1);
                } else {
                    // Swipe left - next tab
                    this.navigateTab(1);
                }
            }
            
            startX = startY = null;
        });
        
        // Add touch-friendly button sizes
        this.optimizeTouchTargets();
    }
    
    navigateTab(direction) {
        const tabs = Array.from(document.querySelectorAll('.tab-btn'));
        const activeTab = tabs.find(tab => tab.classList.contains('active'));
        const currentIndex = tabs.indexOf(activeTab);
        const newIndex = (currentIndex + direction + tabs.length) % tabs.length;
        
        tabs[newIndex].click();
    }
    
    optimizeTouchTargets() {
        // Increase button sizes on mobile
        if (window.innerWidth <= 768) {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn => {
                if (!btn.classList.contains('optimized')) {
                    btn.style.minHeight = '44px';
                    btn.style.minWidth = '44px';
                    btn.classList.add('optimized');
                }
            });
        }
    }

    // Overdue Notifications Methods
    startOverdueNotifications() {
        // Check for overdue tasks every 30 minutes
        this.overdueNotificationInterval = setInterval(() => {
            this.checkOverdueTasks();
        }, 30 * 60 * 1000);
        
        // Also check on startup
        setTimeout(() => this.checkOverdueTasks(), 5000);
    }

    checkOverdueTasks() {
        const now = new Date();
        const overdueTasks = this.tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate < now && task.status !== 'completed';
        });

        if (overdueTasks.length > 0) {
            const message = overdueTasks.length === 1 
                ? `You have 1 overdue task: "${overdueTasks[0].title}"`
                : `You have ${overdueTasks.length} overdue tasks`;
                
            this.showNotification(message, 'error');
            
            // Browser notification
            if (window.Notification && Notification.permission === 'granted') {
                new Notification('Overdue Tasks', {
                    body: message,
                    icon: '/favicon.ico'
                });
            }
            
            // Play notification sound
            this.playNotificationSound();
        }
    }

    // Drag and Drop Methods
    initDragAndDrop() {
        // This will be called when rendering tasks
    }

    makeDraggable(taskElement, taskId) {
        taskElement.draggable = true;
        
        taskElement.addEventListener('dragstart', (e) => {
            this.draggedTaskId = taskId;
            taskElement.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        
        taskElement.addEventListener('dragend', () => {
            taskElement.classList.remove('dragging');
            this.draggedTaskId = null;
        });
        
        taskElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        taskElement.addEventListener('drop', (e) => {
            e.preventDefault();
            if (this.draggedTaskId && this.draggedTaskId !== taskId) {
                this.reorderTasks(this.draggedTaskId, taskId);
            }
        });
    }

    reorderTasks(draggedId, targetId) {
        const draggedIndex = this.tasks.findIndex(t => t.id === draggedId);
        const targetIndex = this.tasks.findIndex(t => t.id === targetId);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
            // Remove dragged task and insert at target position
            const [draggedTask] = this.tasks.splice(draggedIndex, 1);
            this.tasks.splice(targetIndex, 0, draggedTask);
            
            this.saveTasks();
            this.renderTasks();
            this.showNotification('Task order updated', 'success');
        }
    }

    // Rendering Methods
    /**
     * Render the list of tasks with optional pagination (preparation for lazy-loading)
     */
    renderTasks(page = 1) {
        showLoading();
        const container = document.getElementById('tasksContainer');
        const statusFilter = document.getElementById('filterStatus').value;
        const priorityFilter = document.getElementById('filterPriority').value;
        const searchTerm = document.getElementById('searchTasks').value.toLowerCase();

    let filteredTasks = this.tasks.filter(task => {
            const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
            const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
            const matchesSearch = searchTerm === '' || 
                                task.title.toLowerCase().includes(searchTerm) || 
                                task.description.toLowerCase().includes(searchTerm) ||
                                task.subject.toLowerCase().includes(searchTerm) ||
                                task.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            return matchesStatus && matchesPriority && matchesSearch;
        });

        // Sort by due date, then by priority
        filteredTasks.sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            if (dateA.getTime() !== dateB.getTime()) {
                return dateA - dateB;
            }
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        // Pagination logic
        const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
        const pagedTasks = filteredTasks.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE);

        if (filteredTasks.length === 0) {
            container.innerHTML = '<p class="no-tasks">No tasks found matching your criteria.</p>';
            hideLoading();
            return;
        }

        const tasksHTML = pagedTasks.map(task => this.createTaskHTML(task)).join('');
        container.innerHTML = tasksHTML;

        // Pagination controls
        if (totalPages > 1) {
            let paginationHTML = '<div class="pagination" style="display:flex;gap:8px;justify-content:center;margin-top:16px;">';
            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += `<button class="pagination-btn" data-page="${i}" style="padding:6px 12px;border-radius:6px;border:none;background:${i===page?'#5a67d8':'#e2e8f0'};color:${i===page?'#fff':'#2d3748'};cursor:pointer;">${i}</button>`;
            }
            paginationHTML += '</div>';
            container.innerHTML += paginationHTML;
            // Bind pagination events
            container.querySelectorAll('.pagination-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.renderTasks(Number(btn.dataset.page));
                });
            });
        }

        // Bind task action events
        this.bindTaskEvents(container);
        
        // Add drag and drop to task items
        container.querySelectorAll('.task-item').forEach(taskElement => {
            const taskId = taskElement.dataset.taskId;
            if (taskId) {
                this.makeDraggable(taskElement, taskId);
            }
        });
        
        hideLoading();
    }

    createTaskHTML(task) {
        const dueDate = new Date(task.dueDate);
        const now = new Date();
        const isOverdue = dueDate < now && task.status !== 'completed';
        const tagsHTML = task.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        return `
            <div class="task-item ${task.priority} ${task.status === 'completed' ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-info">
                    <div class="task-title">${this.escapeHtml(task.title)}</div>
                    ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                    <div class="task-meta">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(dueDate)} ${isOverdue ? '<span class="priority-high">(Overdue)</span>' : ''}</span>
                        <span><i class="fas fa-flag"></i> <span class="priority-${task.priority}">${task.priority} priority</span></span>
                        ${task.subject ? `<span><i class="fas fa-book"></i> ${this.escapeHtml(task.subject)}</span>` : ''}
                        <span><i class="fas fa-clock"></i> ${task.estimatedTime}h</span>
                        <span class="status-badge status-${task.status}">${task.status.replace('-', ' ')}</span>
                    </div>
                    ${task.tags.length > 0 ? `<div class="task-tags">${tagsHTML}</div>` : ''}
                </div>
                <div class="task-actions">
                    <button class="btn-complete" data-task-id="${task.id}" title="${task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}">
                        <i class="fas ${task.status === 'completed' ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                    <button class="btn-edit" data-task-id="${task.id}" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" data-task-id="${task.id}" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Bind click/keyboard events for task actions (edit, complete, delete)
     */
    bindTaskEvents(container) {
        container.querySelectorAll('.btn-complete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTaskStatus(btn.dataset.taskId);
            });
        });

        container.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openTaskModal(btn.dataset.taskId);
            });
        });

        container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to delete this task?')) {
                    this.deleteTask(btn.dataset.taskId);
                }
            });
        });
    }

    /**
     * Update dashboard statistics and widgets
     */
    updateDashboard() {
        // Update stats
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('progressPercent').textContent = progressPercent + '%';

        // Update progress circle
        this.updateProgressCircle(progressPercent);

        // Update upcoming tasks
        this.renderUpcomingTasks();

        // Update recent activity
        this.renderRecentActivity();
    }

    /**
     * Update the progress circle UI
     */
    updateProgressCircle(percent) {
        const circle = document.getElementById('progressCircle');
        const value = document.getElementById('progressValue');
        
        circle.style.background = `conic-gradient(#5a67d8 ${percent * 3.6}deg, #e2e8f0 0deg)`;
        value.textContent = percent + '%';
    }

    /**
     * Render the list of upcoming tasks
     */
    renderUpcomingTasks() {
        const container = document.getElementById('upcomingTasksList');
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        const upcomingTasks = this.tasks
            .filter(task => task.status !== 'completed' && new Date(task.dueDate) <= nextWeek)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 5);

        if (upcomingTasks.length === 0) {
            container.innerHTML = '<p class="no-tasks">No upcoming tasks</p>';
            return;
        }

        const tasksHTML = upcomingTasks.map(task => {
            const dueDate = new Date(task.dueDate);
            const isOverdue = dueDate < now;
            return `
                <div class="task-item ${task.priority}" style="margin-bottom: 8px;">
                    <div class="task-info">
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        <div class="task-meta">
                            <span class="${isOverdue ? 'priority-high' : ''}">${this.formatDate(dueDate)} ${isOverdue ? '(Overdue)' : ''}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = tasksHTML;
    }

    /**
     * Render the recent activity feed
     */
    renderRecentActivity() {
        const container = document.getElementById('recentActivity');
        const activities = this.getRecentActivities().slice(0, 5);

        if (activities.length === 0) {
            container.innerHTML = '<p class="no-activity">No recent activity</p>';
            return;
        }

        const activitiesHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-text">${this.escapeHtml(activity.message)}</div>
                <div class="activity-time">${this.getTimeAgo(activity.timestamp)}</div>
            </div>
        `).join('');

        container.innerHTML = activitiesHTML;
    }

    /**
     * Render the timeline view for the current week
     */
    renderTimeline() {
        const container = document.getElementById('timelineDays');
        const weekStart = new Date(this.currentWeekStart);
        
        // Update week display
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
        document.getElementById('currentWeek').textContent = 
            `${this.formatDate(weekStart)} - ${this.formatDate(weekEnd)}`;

        const daysHTML = [];
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(weekStart.getTime() + i * 24 * 60 * 60 * 1000);
            const dayTasks = this.getTasksForDay(currentDay);
            
            const tasksHTML = dayTasks.map(task => `
                <div class="timeline-task ${task.priority}" title="${this.escapeHtml(task.title)} - ${task.subject ? this.escapeHtml(task.subject) : 'No subject'}">
                    ${this.escapeHtml(task.title)}
                    ${task.status === 'completed' ? ' ✓' : ''}
                </div>
            `).join('');

            const isToday = this.isSameDay(currentDay, new Date());
            const dayHeaderClass = isToday ? 'day-header today' : 'day-header';

            daysHTML.push(`
                <div class="timeline-day">
                    <div class="${dayHeaderClass}">
                        ${this.getDayName(currentDay)}
                        <br>
                        <small>${currentDay.getDate()}</small>
                        ${isToday ? '<small style="color: #5a67d8; font-weight: bold;">Today</small>' : ''}
                    </div>
                    <div class="day-tasks">
                        ${tasksHTML || '<p style="color: #999; font-size: 0.8rem; margin-top: 20px;">No tasks</p>'}
                    </div>
                </div>
            `);
        }

        container.innerHTML = daysHTML.join('');
    }

    /**
     * Update analytics widgets
     */
    updateAnalytics() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        document.getElementById('completionRate').textContent = completionRate + '%';
        
        // Calculate study streak
        const streak = this.calculateStudyStreak();
        document.getElementById('studyStreak').textContent = streak;

        // Priority distribution
        this.renderPriorityChart();
        
        // Weekly progress
        this.renderWeeklyChart();
    }

    /**
     * Render the priority distribution chart
     */
    renderPriorityChart() {
        const container = document.getElementById('priorityChart');
        const priorities = { high: 0, medium: 0, low: 0 };
        
        this.tasks.forEach(task => {
            priorities[task.priority]++;
        });

        const total = this.tasks.length;
        if (total === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">No data available</p>';
            return;
        }

        const chartHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #e53e3e; font-weight: 600;">High</span>
                    <div style="flex: 1; height: 10px; background: #f1f5f9; border-radius: 5px; margin: 0 12px; overflow: hidden;">
                        <div style="width: ${total > 0 ? (priorities.high / total) * 100 : 0}%; height: 100%; background: linear-gradient(90deg, #e53e3e, #fc8181); border-radius: 5px; transition: width 0.5s ease;"></div>
                    </div>
                    <span style="font-weight: 600; min-width: 20px; text-align: right;">${priorities.high}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #dd6b20; font-weight: 600;">Medium</span>
                    <div style="flex: 1; height: 10px; background: #f1f5f9; border-radius: 5px; margin: 0 12px; overflow: hidden;">
                        <div style="width: ${total > 0 ? (priorities.medium / total) * 100 : 0}%; height: 100%; background: linear-gradient(90deg, #dd6b20, #f6ad55); border-radius: 5px; transition: width 0.5s ease;"></div>
                    </div>
                    <span style="font-weight: 600; min-width: 20px; text-align: right;">${priorities.medium}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #38a169; font-weight: 600;">Low</span>
                    <div style="flex: 1; height: 10px; background: #f1f5f9; border-radius: 5px; margin: 0 12px; overflow: hidden;">
                        <div style="width: ${total > 0 ? (priorities.low / total) * 100 : 0}%; height: 100%; background: linear-gradient(90deg, #38a169, #68d391); border-radius: 5px; transition: width 0.5s ease;"></div>
                    </div>
                    <span style="font-weight: 600; min-width: 20px; text-align: right;">${priorities.low}</span>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    /**
     * Render the weekly progress chart
     */
    renderWeeklyChart() {
        const container = document.getElementById('weeklyChart');
        const weeklyData = this.getWeeklyCompletionData();
        
        const maxValue = Math.max(...weeklyData, 1);
        const chartHTML = weeklyData.map((value, index) => {
            const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
            const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
            return `
                <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                    <div style="height: 80px; display: flex; align-items: end; width: 100%;">
                        <div style="width: 24px; height: ${Math.max(height, 2)}%; background: linear-gradient(to top, #5a67d8, #667eea); border-radius: 3px 3px 0 0; margin: 0 auto; transition: height 0.5s ease;"></div>
                    </div>
                    <small style="margin-top: 8px; color: #718096; font-weight: 500;">${day}</small>
                    <small style="color: #2d3748; font-weight: 600;">${value}</small>
                </div>
            `;
        }).join('');

        container.innerHTML = `<div style="display: flex; gap: 8px; height: 120px; align-items: end;">${chartHTML}</div>`;
    }

    // Helper Methods
    /**
     * Switch between main tabs (dashboard, tasks, timeline, analytics)
     */
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Refresh content based on active tab
        if (tabName === 'timeline') {
            this.renderTimeline();
        } else if (tabName === 'analytics') {
            this.updateAnalytics();
        } else if (tabName === 'tasks') {
            this.renderTasks();
        } else if (tabName === 'calendar') {
            this.renderCalendar(0);
        } else if (tabName === 'goals') {
            this.renderGoals();
        } else if (tabName === 'pomodoro') {
            this.updatePomodoroDisplay();
        } else if (tabName === 'settings') {
            // Settings tab doesn't need special refresh
        }
    }

    // Calendar tab navigation helper method
    initCalendarNavigation() {
        const prevMonth = document.getElementById('prevMonth');
        const nextMonth = document.getElementById('nextMonth');
        if (prevMonth && nextMonth) {
            prevMonth.addEventListener('click', () => {
                this.renderCalendar(-1);
            });
            nextMonth.addEventListener('click', () => {
                this.renderCalendar(1);
            });
        }
    }

    /**
     * Get all tasks for a specific day
     */
    getTasksForDay(date) {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate >= dayStart && taskDate <= dayEnd;
        }).sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    /**
     * Move the timeline view by a week
     */
    navigateWeek(direction) {
        this.currentWeekStart = new Date(this.currentWeekStart.getTime() + direction * 7 * 24 * 60 * 60 * 1000);
        this.renderTimeline();
    }

    /**
     * Get the start of the week for a given date
     */
    getWeekStart(date) {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
        start.setDate(diff);
        start.setHours(0, 0, 0, 0);
        return start;
    }

    /**
     * Get the short weekday name for a date
     */
    getDayName(date) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    /**
     * Format a date as a readable string
     */
    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
        });
    }

    /**
     * Format a date for input[type=datetime-local]
     */
    formatDateTimeLocal(date) {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    }

    /**
     * Set default date values for new tasks
     */
    setDefaultDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(23, 59, 0, 0);
        
        const quickDate = document.getElementById('quickTaskDate');
        const taskDate = document.getElementById('taskDueDate');
        
        if (quickDate) quickDate.value = tomorrow.toISOString().split('T')[0];
        if (taskDate) taskDate.value = this.formatDateTimeLocal(tomorrow);
    }

    /**
     * Check if two dates are the same day
     */
    isSameDay(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }

    /**
     * Calculate the current study streak (consecutive days)
     */
    calculateStudyStreak() {
        const completedDates = this.tasks
            .filter(task => task.completedAt)
            .map(task => new Date(task.completedAt).toDateString())
            .filter((date, index, arr) => arr.indexOf(date) === index)
            .sort((a, b) => new Date(b) - new Date(a));

        if (completedDates.length === 0) return 0;

        let streak = 0;
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

        // Start from today or yesterday if there are completed tasks
        let startDate = null;
        if (completedDates.includes(today)) {
            startDate = today;
        } else if (completedDates.includes(yesterday)) {
            startDate = yesterday;
        } else {
            return 0;
        }

        // Count consecutive days
        let currentDate = new Date(startDate);
        while (completedDates.includes(currentDate.toDateString())) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        }

        return streak;
    }

    /**
     * Get weekly completion data for analytics
     */
    getWeeklyCompletionData() {
        const weekStart = this.getWeekStart(new Date());
        const data = [0, 0, 0, 0, 0, 0, 0]; // Mon-Sun

        this.tasks.forEach(task => {
            if (task.completedAt) {
                const completedDate = new Date(task.completedAt);
                const daysDiff = Math.floor((completedDate - weekStart) / (24 * 60 * 60 * 1000));
                if (daysDiff >= 0 && daysDiff < 7) {
                    data[daysDiff]++;
                }
            }
        });

        return data;
    }

    // Activity Management
    /**
     * Add an activity to the activity log
     */
    addActivity(type, message) {
        const activities = this.getActivities();
        activities.unshift({
            type,
            message,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 activities
        const limitedActivities = activities.slice(0, 50);
        this.saveActivities(limitedActivities);
    }

    /**
     * Get all activities from localStorage
     */
    getActivities() {
        try {
            return JSON.parse(localStorage.getItem('studyPlannerActivities') || '[]');
        } catch {
            return [];
        }
    }

    /**
     * Save activities to localStorage
     */
    saveActivities(activities) {
        try {
            localStorage.setItem('studyPlannerActivities', JSON.stringify(activities));
        } catch (e) {
            console.warn('Could not save activities:', e);
        }
    }

    /**
     * Get the most recent activities
     */
    getRecentActivities() {
        return this.getActivities().slice(0, 10);
    }

    /**
     * Get the icon for an activity type
     */
    getActivityIcon(type) {
        const icons = {
            completed: 'fa-check-circle',
            created: 'fa-plus-circle',
            updated: 'fa-edit'
        };
        return icons[type] || 'fa-circle';
    }

    /**
     * Get a human-readable time-ago string
     */
    getTimeAgo(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return past.toLocaleDateString();
    }

    // Utility Methods
    /**
     * Update all main UI sections
     */
    updateAll() {
        this.updateDashboard();
        this.renderTasks();
        this.renderTimeline();
        this.updateAnalytics();
    }

    /**
     * Escape HTML for safe rendering
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show a notification message
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Local Storage Methods
    /**
     * Load tasks from localStorage
     */
    loadTasks() {
        try {
            const saved = localStorage.getItem('studyPlannerTasks');
            if (saved) {
                this.tasks = JSON.parse(saved).map(task => ({
                    ...task,
                    dueDate: new Date(task.dueDate),
                    createdAt: new Date(task.createdAt),
                    completedAt: task.completedAt ? new Date(task.completedAt) : null
                }));
            }
        } catch (e) {
            console.warn('Could not load tasks from storage:', e);
            this.tasks = [];
        }
    }

    /**
     * Save tasks to localStorage
     */
    saveTasks() {
        try {
            localStorage.setItem('studyPlannerTasks', JSON.stringify(this.tasks));
        } catch (e) {
            console.warn('Could not save tasks to storage:', e);
            this.showNotification('Failed to save tasks', 'error');
        }
    }

    // Data Export/Import Methods
    /**
     * Export all planner data as JSON
     */
    exportData() {
        const data = {
            tasks: this.tasks,
            activities: this.getActivities(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `study-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully!', 'success');
    }

    /**
     * Import planner data from JSON
     */
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.tasks && Array.isArray(data.tasks)) {
                    // Validate and restore tasks
                    this.tasks = data.tasks.map(task => ({
                        ...task,
                        dueDate: new Date(task.dueDate),
                        createdAt: new Date(task.createdAt),
                        completedAt: task.completedAt ? new Date(task.completedAt) : null
                    }));
                    
                    this.saveTasks();
                    
                    if (data.activities && Array.isArray(data.activities)) {
                        this.saveActivities(data.activities);
                    }
                    
                    this.updateAll();
                    this.showNotification('Data imported successfully!', 'success');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                console.error('Import error:', error);
                this.showNotification('Failed to import data. Please check file format.', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    // Statistics Methods
    /**
     * Get statistics about tasks
     */
    getTaskStats() {
        const stats = {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.status === 'completed').length,
            pending: this.tasks.filter(t => t.status === 'pending').length,
            inProgress: this.tasks.filter(t => t.status === 'in-progress').length,
            overdue: this.tasks.filter(t => {
                const now = new Date();
                const dueDate = new Date(t.dueDate);
                return dueDate < now && t.status !== 'completed';
            }).length
        };
        
        stats.completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
        
        return stats;
    }

    /**
     * Get statistics about subjects
     */
    getSubjectStats() {
        const subjects = {};
        this.tasks.forEach(task => {
            if (task.subject) {
                if (!subjects[task.subject]) {
                    subjects[task.subject] = { total: 0, completed: 0 };
                }
                subjects[task.subject].total++;
                if (task.status === 'completed') {
                    subjects[task.subject].completed++;
                }
            }
        });
        
        return Object.entries(subjects).map(([subject, data]) => ({
            subject,
            total: data.total,
            completed: data.completed,
            completionRate: Math.round((data.completed / data.total) * 100)
        }));
    }

    // Search and Filter Methods
    /**
     * Search tasks by query string
     */
    searchTasks(query) {
        const searchTerm = query.toLowerCase();
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm) ||
            task.subject.toLowerCase().includes(searchTerm) ||
            task.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    /**
     * Get all tasks by priority
     */
    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }

    /**
     * Get all tasks by status
     */
    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    /**
     * Get all overdue tasks
     */
    getOverdueTasks() {
        const now = new Date();
        return this.tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate < now && task.status !== 'completed';
        });
    }

    // Reminder Methods
    /**
     * Check for tasks due soon and show reminders
     */
    checkReminders() {
        const now = new Date();
        const reminderTime = 24 * 60 * 60 * 1000; // 24 hours before due date
        this.tasks.forEach(task => {
            if (task.status !== 'completed') {
                const dueDate = new Date(task.dueDate);
                const timeDiff = dueDate - now;
                if (timeDiff > 0 && timeDiff <= reminderTime) {
                    this.showNotification(`Reminder: "${task.title}" is due tomorrow!`, 'info');
                    // Browser notification
                    if (window.Notification && Notification.permission === 'granted') {
                        new Notification('Task Reminder', { body: `${task.title} is due tomorrow!` });
                    }
                }
            }
        });
    }

    // Clear goal form method
    clearGoalForm() {
        const form = document.getElementById('goalForm');
        if (form) {
            form.reset();
        }
    }

    // Fill goal form method
    fillGoalForm(goal) {
        document.getElementById('goalTitle').value = goal.title;
        document.getElementById('goalDescription').value = goal.description;
        document.getElementById('goalTargetDate').value = goal.targetDate.toISOString().split('T')[0];
        document.getElementById('goalTargetValue').value = goal.targetValue;
        document.getElementById('goalType').value = goal.type;
    }

    // Render goals in the goals tab
    renderGoals() {
        const container = document.getElementById('goalsContainer');
        if (!container) return;

        if (this.goals.length === 0) {
            container.innerHTML = '<p class="no-goals">No goals set. Create your first goal!</p>';
            return;
        }

        const goalsHTML = this.goals.map(goal => {
            const progress = goal.type === 'tasks' ? 
                Math.min((goal.currentValue / goal.targetValue) * 100, 100) : 
                Math.min((goal.currentValue / goal.targetValue) * 100, 100);
            
            const isCompleted = goal.currentValue >= goal.targetValue;
            const isOverdue = new Date() > new Date(goal.targetDate) && !isCompleted;
            
            let statusClass = 'active';
            let statusText = 'Active';
            if (isCompleted) {
                statusClass = 'completed';
                statusText = 'Completed';
            } else if (isOverdue) {
                statusClass = 'overdue';
                statusText = 'Overdue';
            }

            return `
                <div class="goal-item ${statusClass}" data-goal-id="${goal.id}">
                    <div class="goal-info">
                        <h4>${this.escapeHtml(goal.title)}</h4>
                        <p>${this.escapeHtml(goal.description)}</p>
                        <div class="goal-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <div class="progress-text">${goal.currentValue} / ${goal.targetValue} ${goal.type}</div>
                        </div>
                        <div class="goal-meta">
                            <span><i class="fas fa-calendar"></i> Due: ${new Date(goal.targetDate).toLocaleDateString()}</span>
                            <span class="goal-status ${statusClass}">${statusText}</span>
                        </div>
                    </div>
                    <div class="goal-actions">
                        <button class="btn-secondary btn-sm" onclick="studyPlanner.editGoal('${goal.id}')" title="Edit Goal">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-danger btn-sm" onclick="studyPlanner.deleteGoal('${goal.id}')" title="Delete Goal">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = goalsHTML;
    }

    // Enhanced renderTasks method with skeleton loading
    renderTasksWithSkeleton(page = 1) {
        // Show skeleton while loading
        showSkeleton('tasksContainer');
        
        // Simulate loading delay for demonstration
        setTimeout(() => {
            this.renderTasks(page);
        }, 500);
    }

    // Enhanced notification sound method
    playNotificationSound() {
        if (localStorage.getItem('enableSounds') === 'false') return;
        
        try {
            // Create a simple beep sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.warn('Could not play notification sound:', error);
        }
    }

    // Enhanced overdue check method
    checkOverdueTasks() {
        if (localStorage.getItem('enableOverdueAlerts') === 'false') return;
        
        const now = new Date();
        const overdueTasks = this.tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate < now && task.status !== 'completed';
        });

        if (overdueTasks.length > 0) {
            const message = overdueTasks.length === 1 
                ? `You have 1 overdue task: "${overdueTasks[0].title}"`
                : `You have ${overdueTasks.length} overdue tasks`;
                
            this.showNotification(message, 'error');
            
            // Browser notification
            if (window.Notification && Notification.permission === 'granted') {
                new Notification('Overdue Tasks', {
                    body: message,
                    icon: '/favicon.ico'
                });
            }
            
            // Play notification sound
            this.playNotificationSound();
        }
    }

    // End of class
}

// Request browser notification permission on load (must be outside class)
if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const planner = new StudyPlanner();
    planner.setupKeyboardShortcuts();
    setInterval(() => { planner.checkReminders(); }, 30 * 60 * 1000);
    setTimeout(() => { planner.checkReminders(); }, 2000);
    planner.initCalendarNavigation();
    window.studyPlanner = planner;

    // Keyboard navigation for tabs
    const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
    tabBtns.forEach((btn, idx) => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                tabBtns[(idx + 1) % tabBtns.length].focus();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                tabBtns[(idx - 1 + tabBtns.length) % tabBtns.length].focus();
            }
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tabBtns[idx].click();
            }
        });
    });

    // Trap focus in modal
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll('input, select, textarea, button');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // CSV Export
    const exportCSVBtn = document.getElementById('exportCSVBtn');
    if (exportCSVBtn) {
        exportCSVBtn.onclick = function() {
            const tasks = planner.tasks;
            if (!tasks.length) return alert('No tasks to export!');
            const header = ['Title','Description','Due Date','Priority','Subject','Estimated Time','Tags','Status'];
            const rows = tasks.map(t => [
                '"'+(t.title||'').replace(/"/g,'""')+'"',
                '"'+(t.description||'').replace(/"/g,'""')+'"',
                t.dueDate instanceof Date ? t.dueDate.toISOString() : t.dueDate,
                t.priority,
                '"'+(t.subject||'').replace(/"/g,'""')+'"',
                t.estimatedTime,
                '"'+(t.tags||[]).join(';').replace(/"/g,'""')+'"',
                t.status
            ]);
            const csv = [header.join(',') , ...rows.map(r=>r.join(','))].join('\r\n');
            const blob = new Blob([csv], {type:'text/csv'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'study-tasks.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
    }

    // CSV Import
    const importCSVInput = document.getElementById('importCSVInput');
    if (importCSVInput) {
        importCSVInput.onchange = function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(ev) {
                const text = ev.target.result;
                const lines = text.split(/\r?\n/).filter(Boolean);
                if (!lines.length) return alert('CSV is empty!');
                const [header, ...rows] = lines;
                const cols = header.split(',');
                const tasks = rows.map(row => {
                    const vals = row.match(/("[^"]*"|[^,]+)/g).map(v=>v.replace(/^"|"$/g,''));
                    return {
                        id: Date.now().toString() + Math.random(),
                        title: vals[0],
                        description: vals[1],
                        dueDate: new Date(vals[2]),
                        priority: vals[3],
                        subject: vals[4],
                        estimatedTime: parseFloat(vals[5])||1,
                        tags: vals[6] ? vals[6].split(';').map(t=>t.trim()) : [],
                        status: vals[7]||'pending',
                        createdAt: new Date(),
                        completedAt: null
                    };
                });
                planner.tasks = planner.tasks.concat(tasks);
                planner.saveTasks();
                planner.updateAll();
                alert('Tasks imported from CSV!');
            };
            reader.readAsText(file);
        };
    }

    // Window resize handler for touch optimization
    window.addEventListener('resize', () => {
        planner.optimizeTouchTargets();
    });
});

// Add missing method to StudyPlanner class
StudyPlanner.prototype.setupKeyboardShortcuts = function() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + N for new task
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            this.openTaskModal();
        }
        
        // Ctrl/Cmd + F for search focus (when in tasks tab)
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab && activeTab.dataset.tab === 'tasks') {
                e.preventDefault();
                const searchInput = document.getElementById('searchTasks');
                if (searchInput) searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeTaskModal();
            const goalModal = document.getElementById('goalModal');
            if (goalModal) goalModal.style.display = 'none';
            const colorModal = document.querySelector('.color-picker-modal');
            if (colorModal) colorModal.remove();
        }
    });
};

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        border-left: 4px solid #5a67d8;
    }
    
    .notification.success {
        border-left-color: #48bb78;
        color: #2f855a;
    }
    
    .notification.error {
        border-left-color: #f56565;
        color: #c53030;
    }
    
    .notification.info {
        border-left-color: #4299e1;
        color: #2b6cb0;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .today {
        background: linear-gradient(135deg, #5a67d8, #667eea) !important;
        color: white !important;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);