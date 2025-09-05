#  Smart Study Planner

<img src="https://img.shields.io/badge/Status-Complete-brightgreen" />
<img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Google_Calendar_API-4285F4?logo=google-calendar&logoColor=white" />
<img src="https://img.shields.io/badge/Web_Audio_API-FF5722?logo=webaudio&logoColor=white" />

</div>

> **A comprehensive, feature-rich study planner with advanced task management, goal tracking, Pomodoro timer, Google Calendar integration, and analytics dashboard.**

## 🌐 Live Demo & Links

🔗 **[🚀 Live Application](https://satyampandey-07.github.io/STUDY_PLANNER/)** - Try it now!

📹 **[🎥 Demo Video](https://drive.google.com/file/d/1MLa9_t6QE37IvaJJINQBdp8P5MCems79/view?usp=drive_link)** - See it in action!

---

## ✨ Core Features

### 🎯 **Dashboard & Overview**
- **Real-time Statistics**: Total tasks, completed tasks, progress percentage
- **Quick Task Addition**: Fast task creation with essential details
- **Upcoming Tasks Preview**: Tasks due within the next week
- **Circular Progress Visualization**: Visual completion percentage
- **Recent Activity Feed**: Track all actions and task updates
- **Overdue Task Alerts**: Immediate visual indicators for past-due items

### 📝 **Advanced Task Management**
- **Complete CRUD Operations**: Create, read, update, delete tasks
- **Rich Task Properties**:
  - Title, description, due date & time
  - Priority levels (High, Medium, Low) with color coding
  - Subject/course categorization
  - Estimated time in hours (0.5h increments)
  - Custom tags for organization
  - Status tracking (Pending, In Progress, Completed)
- **Smart Filtering & Search**: Filter by status, priority, or search across all fields
- **Drag & Drop Reordering**: Intuitive task reorganization
- **Pagination Support**: Efficient handling of large task lists (20 per page)
- **CSV Export/Import**: Backup and restore task data
- **Overdue Detection**: Visual alerts and browser notifications

### 🗓️ **Calendar & Timeline Views**
- **Monthly Calendar**: Grid view with task distribution per day
- **Weekly Timeline**: Horizontal timeline with day-by-day task layout
- **Navigation Controls**: Browse between weeks/months
- **Color-coded Priorities**: Immediate visual priority identification
- **Today Highlighting**: Special styling for current day
- **Task Count Indicators**: Shows task overflow ("+2 more" style)
- **Click-to-navigate**: Easy date jumping

### 🏆 **Goal Management System**
- **SMART Goals**: Specific, Measurable, Achievable, Relevant, Time-bound
- **Progress Tracking**: Real-time progress bars and completion percentages
- **Goal Types**: Tasks, hours, or custom point systems
- **Target Dates**: Deadline tracking with overdue detection
- **Visual Status Indicators**: Active, Completed, Overdue states
- **Goal Linking**: Connect tasks to specific goals for automatic progress updates

### ⏱️ **Pomodoro Technique Integration**
- **Configurable Timer Sessions**:
  - Work sessions: 25 minutes
  - Short breaks: 5 minutes
  - Long breaks: 15 minutes
- **Session Management**: Start, pause, reset functionality
- **Auto-progression**: Automatic switching between work and break periods
- **Session Counting**: Track completed work sessions
- **Audio Notifications**: Web Audio API-generated completion sounds
- **Visual Progress**: Circular progress indicator
- **Background Operation**: Timer continues running across tabs

### 📊 **Analytics & Insights**
- **Completion Rate Tracking**: Overall task completion percentage
- **Study Streak Calculation**: Consecutive days with completed tasks
- **Priority Distribution**: Visual breakdown of task priorities
- **Weekly Progress Charts**: Daily completion patterns
- **Productivity Metrics**: Time-based performance analysis
- **Activity History**: Comprehensive log of all user actions

### 🎨 **Theme & Customization Engine**
- **Built-in Themes**:
  - Default (Purple gradient)
  - Ocean (Blue tones)
  - Sunset (Orange/Red)
  - Forest (Green)
  - Midnight (Dark blue)
- **Custom Color Picker**: Full customization of primary, secondary colors
- **CSS Custom Properties**: Dynamic theme switching
- **Gradient Backgrounds**: Modern glassmorphism design
- **Persistent Preferences**: Theme choices saved in localStorage

### 📆 **Google Calendar Integration**
- **OAuth2 Authentication**: Secure Google account integration
- **Two-way Synchronization**: Tasks sync to Google Calendar events
- **API Status Monitoring**: Connection status indicators
- **Diagnostic Tools**: Built-in troubleshooting and testing
- **Retry Mechanisms**: Automatic and manual retry options
- **Error Handling**: User-friendly error messages
- **Offline Fallback**: App continues working without sync

### 🔔 **Notification System**
- **Browser Notifications**: Native notification support with permission handling
- **Overdue Alerts**: Automatic checking every 30 minutes
- **Audio Notifications**: Web Audio API-generated sounds
- **Customizable Settings**: Enable/disable notifications, sounds, alerts
- **Multiple Trigger Points**: Task completion, Pomodoro completion, overdue detection

### 📱 **Mobile & Accessibility**
- **Responsive Design**: Fully functional on all screen sizes
- **Touch Gestures**: Swipe navigation and touch-optimized controls
- **Keyboard Navigation**: Full keyboard accessibility
- **ARIA Labels**: Screen reader support
- **Focus Management**: Proper tab order and focus trapping
- **Touch Target Optimization**: Minimum 44px touch targets on mobile

### 💾 **Data Management**
- **LocalStorage Persistence**: All data stored locally in browser
- **JSON Export/Import**: Complete data backup and restore
- **CSV Export**: Task data in spreadsheet format
- **Automatic Saving**: Real-time data persistence
- **Data Validation**: Input sanitization and error handling
- **Migration Support**: Future-proof data structure

---

## 🛠️ Technical Architecture

### **Frontend Technologies**
- **HTML5**: Semantic markup with ARIA accessibility
- **CSS3**: 
  - Grid and Flexbox layouts
  - Custom properties for theming
  - Advanced animations and transitions
  - Glassmorphism design effects
- **Vanilla JavaScript (ES6+)**:
  - Class-based architecture
  - Module-like organization
  - Async/await for API calls
  - Event delegation and handling

### **APIs & Integrations**
- **Google Calendar API v3**: Task synchronization
- **Web Audio API**: Notification sounds
- **Notification API**: Browser notifications
- **Local Storage API**: Data persistence
- **Drag and Drop API**: Task reordering

### **Design Patterns**
- **MVC Architecture**: Clear separation of concerns
- **Observer Pattern**: Event-driven updates
- **Factory Pattern**: Object creation
- **Singleton Pattern**: Global state management

### **Performance Optimizations**
- **Lazy Loading**: Pagination for large task lists
- **Skeleton Loading**: Improved perceived performance
- **Event Delegation**: Efficient event handling
- **Debouncing**: Search input optimization
- **Memory Management**: Proper cleanup and garbage collection

---

## 📂 File Structure & Organization

```
smart-study-planner/
├── index.html              # Main application entry point
├── script.js               # Core application logic (2,848 lines)
│   ├── StudyPlanner class  # Main application class
│   ├── Task management     # CRUD operations, filtering, search
│   ├── Goal system         # Goal creation, tracking, progress
│   ├── Calendar views      # Monthly/weekly rendering
│   ├── Pomodoro timer      # Timer logic, session management
│   ├── Theme engine        # Color management, theme switching
│   ├── Google Calendar     # OAuth, API integration
│   ├── Notifications       # Browser/audio notifications
│   ├── Data management     # Import/export, persistence
│   └── Utility functions   # Helpers, formatters, validators
├── styles.css              # Comprehensive styling (1,408 lines)
│   ├── CSS custom props    # Theme variables
│   ├── Component styles    # Cards, buttons, forms
│   ├── Layout systems      # Grid, flexbox layouts
│   ├── Responsive design   # Mobile-first approach
│   ├── Animations         # Transitions, loading states
│   └── Theme variations    # Multiple color schemes
├── oauth2callback.html     # Google OAuth callback handler
├── start-server.bat       # Local development server
└── README.md              # This documentation
```

---

## 🚀 Installation & Setup

### **Basic Usage (No Server Required)**
```bash
# Clone the repository
git clone https://github.com/SatyamPandey-07/STUDY_PLANNER.git
cd STUDY_PLANNER

# Open directly in browser
open index.html
# or double-click index.html
```

### **With Google Calendar Integration**
```bash
# Option 1: Using Python
python -m http.server 3000

# Option 2: Using Node.js
npx http-server -p 3000

# Option 3: Using the included batch file (Windows)
start-server.bat

# Then open: http://localhost:3000
```

### **Browser Compatibility**
- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ❌ Internet Explorer (Not supported)

---

## 💡 Usage Guide

### **Getting Started**
1. **Create Your First Task**: Use the Quick Add form on the Dashboard
2. **Set Up Goals**: Navigate to Goals tab and define your study objectives
3. **Choose a Theme**: Go to Settings → Theme to customize appearance
4. **Enable Notifications**: Allow browser notifications for best experience
5. **Connect Google Calendar**: Optional integration for calendar sync

### **Task Management Workflow**
1. **Add Tasks**: Click "Add New Task" for detailed task creation
2. **Organize**: Use priorities, tags, and subjects for categorization
3. **Track Progress**: Mark tasks as "In Progress" then "Completed"
4. **Review**: Use Timeline and Calendar views for planning
5. **Analyze**: Check Analytics tab for productivity insights

### **Pomodoro Study Sessions**
1. **Start Session**: Click Work (25min) and press Start
2. **Focus**: Work without distractions during timer
3. **Take Breaks**: Timer automatically suggests break periods
4. **Track Progress**: Long breaks occur every 4th work session

### **Data Management**
- **Export**: Settings → Export Data (JSON format)
- **Import**: Settings → Import Data (restore from backup)
- **CSV Export**: Tasks tab → Export CSV (spreadsheet format)
- **Clear Data**: Settings → Clear All Data (reset application)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | Create new task |
| `Ctrl+F` | Focus search (in Tasks tab) |
| `Escape` | Close modal dialogs |
| `Arrow Keys` | Navigate between tabs |
| `Enter/Space` | Activate focused element |
| `Tab` | Navigate form fields |

---

## 🔧 Customization Options

### **Theme Customization**
```css
/* Modify CSS custom properties in styles.css */
:root {
    --primary-color: #6C47FF;
    --secondary-color: #3B1E6E;
    --success-color: #48bb78;
    /* Add your custom colors */
}
```

### **Adding New Features**
The modular class structure makes it easy to extend:
- Add methods to the `StudyPlanner` class
- Create new UI components in HTML
- Style components in CSS
- Register event listeners in `bindEvents()`

### **Configuration Constants**
```javascript
// Modify these in script.js
const TASKS_PER_PAGE = 20;        // Pagination size
const GOOGLE_API_KEY = 'your-key'; // Your API key
const GOOGLE_CLIENT_ID = 'your-id'; // Your client ID
```

---
---

## 🤝 Contributing

This project is open for contributions! Here's how you can help:

### **Feature Requests**
- Task templates and recurring tasks
- Team collaboration features
- Advanced analytics and reporting
- Calendar integrations (Outlook, Apple Calendar)
- Mobile app version
- Cloud synchronization

### **Code Contributions**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Development Guidelines**
- Follow existing code style and patterns
- Add comments for complex functionality
- Test on multiple browsers
- Ensure mobile responsiveness
- Update documentation as needed

---

## 🎯 Project Stats

- **Total Lines of Code**: 4,256+ lines
- **JavaScript**: 2,848 lines
- **CSS**: 1,408 lines
- **Features Implemented**: 25+ major features
- **Browser APIs Used**: 6 different APIs
- **Responsive Breakpoints**: 4 device sizes
- **Theme Options**: 5 built-in + custom
- **Accessibility**: WCAG 2.1 compliant

---

## 🙏 Acknowledgments

- **Google Calendar API** for seamless integration
- **Font Awesome** for beautiful icons
- **Modern CSS** techniques for glassmorphism design
- **Web APIs** for rich browser functionality
- **Open Source Community** for inspiration and best practices

---

- **Web APIs** for rich browser functionality
- **Open Source Community** for inspiration and best practices

---

## ✨ Why You'll Love It

- 🎯 **All-in-One Dashboard**: Real-time stats, quick add, and upcoming tasks at a glance
- 📝 **Advanced Task Management**: CRUD, priorities, tags, overdue detection, and search
- 🏆 **Goal Tracking**: Set, monitor, and crush your study goals
- ⏲️ **Pomodoro Timer**: Focused work/break cycles with sound & notifications
- � **Calendar & Timeline**: Monthly/weekly views, color-coded, drag & drop
- � **Analytics**: Visualize your productivity and trends
- 🎨 **Modern UI**: 5+ themes, custom color picker, beautiful gradients
- 🔔 **Smart Notifications**: Overdue alerts, reminders, and browser push
- 📆 **Google Calendar Sync**: 2-way sync for all your tasks
- 💾 **Data Export/Import**: CSV support, localStorage backup
- � **Mobile-First**: Touch gestures, swipe navigation, fully responsive

---

## 🛠️ Tech Stack & Architecture

| Layer         | Details                                                                 |
|-------------- |-------------------------------------------------------------------------|
| **Frontend**  | HTML5, CSS3 (Custom Properties, Grid, Flexbox), Vanilla JavaScript      |
| **APIs**      | Google Calendar API, Web Audio API                                      |
| **Storage**   | LocalStorage, CSV Import/Export                                         |
| **UX/UI**     | Custom modals, skeleton loaders, ripple effects, drag & drop, ARIA      |
| **Other**     | Keyboard shortcuts, dark mode, theme engine, responsive design          |

---

## 🧑‍� Author & Links

Made with ❤️ by [Satyam Pandey](https://github.com/SatyamPandey-07)

- [GitHub](https://github.com/SatyamPandey-07)
- [LinkedIn](https://www.linkedin.com/in/satyam-pandey-0b246432a/)

---

### Quick Start Guide

1. **Add Your First Task**:
   - Use the Quick Add form on the Dashboard
   - Or click "Add New Task" in the Tasks tab for detailed options

2. **Organize Your Tasks**:
   - Set priorities (High, Medium, Low)
   - Add subjects and estimated time
   - Use tags for better categorization

3. **Track Progress**:
   - Mark tasks as completed when finished
   - View your study streak and completion rates
   - Monitor weekly progress patterns

4. **Use the Timeline**:
   - Navigate between weeks to see task distribution
   - Plan your study schedule visually

## 💡 Usage Tips

### Best Practices
- **Set Realistic Due Dates**: Avoid overwhelming yourself with tight deadlines
- **Use Priority Levels**: Focus on high-priority tasks first
- **Add Time Estimates**: Better plan your study sessions
- **Regular Updates**: Check and update your progress daily
- **Use Tags**: Organize tasks by topics, exam types, or study methods

### Data Management
- **Automatic Saving**: All data is saved locally in your browser
- **Export Backup**: Save your data as a JSON file for backup
- **Import Data**: Restore from previously exported backups

## 🎨 Design Philosophy

The Smart Study Planner features a modern **glassmorphism** design with:
- **Translucent cards** with backdrop blur effects
- **Gradient backgrounds** for visual appeal
- **Smooth animations** and hover interactions
- **Responsive layout** that adapts to all screen sizes
- **Accessibility-focused** design with proper contrast and navigation

## 🛠️ Technical Details

### Architecture
- **Frontend Only**: Pure client-side application
- **ES6 Class-based**: Modern JavaScript architecture
- **Component-based Design**: Modular and maintainable code
- **Local Storage**: Browser-based data persistence

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance
- **Lightweight**: No external frameworks or libraries
- **Fast Loading**: Minimal dependencies
- **Efficient Rendering**: Optimized DOM updates
- **Memory Conscious**: Cleanup and garbage collection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with multi-column layouts
- **Tablet**: Adapted grid layouts for medium screens
- **Mobile**: Touch-friendly interface with stacked layouts
- **Small Screens**: Optimized navigation and compact views

## 🔧 Customization

### Modifying Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #5a67d8;
    --secondary-color: #667eea;
    --success-color: #48bb78;
    /* Add your custom colors */
}
```

### Adding New Features
The modular class structure makes it easy to extend functionality:
- Add new methods to the `StudyPlanner` class
- Create additional UI components in HTML
- Style new elements in CSS

## 📊 Application Data Models

### Task Entity Structure
```javascript
const TaskSchema = {
    id: String,                    // Unique timestamp-based identifier
    title: String,                 // Primary task name (required)
    description: String,           // Detailed task information (optional)
    dueDate: ISO8601String,        // Target completion date/time
    priority: Enum,                // "high" | "medium" | "low"
    subject: String,               // Academic subject/course
    estimatedTime: Number,         // Hours (supports 0.5 increments)
    tags: Array<String>,           // Searchable keywords
    status: Enum,                  // "pending" | "in-progress" | "completed"
    createdAt: ISO8601String,      // Task creation timestamp
    completedAt: ISO8601String,    // Completion timestamp (null if incomplete)
    linkedGoalId: String           // Associated goal reference (optional)
}
```

### Goal Entity Structure
```javascript
const GoalSchema = {
    id: String,                    // Unique identifier
    title: String,                 // Goal name
    description: String,           // Goal details
    targetValue: Number,           // Target amount (tasks/hours/points)
    currentValue: Number,          // Current progress
    type: Enum,                    // "tasks" | "hours" | "points"
    targetDate: ISO8601String,     // Goal deadline
    createdAt: ISO8601String,      // Goal creation timestamp
    isArchived: Boolean            // Archive status
}
```

### Settings Configuration
```javascript
const SettingsSchema = {
    theme: String,                 // Selected theme name
    customColors: Object,          // Custom color overrides
    notifications: {
        enabled: Boolean,
        sounds: Boolean,
        overdueAlerts: Boolean
    },
    pomodoro: {
        workDuration: Number,      // Minutes
        shortBreakDuration: Number,
        longBreakDuration: Number,
        sessionsUntilLongBreak: Number
    },
    googleCalendar: {
        connected: Boolean,
        lastSync: ISO8601String
    }
}
```

## �️ Security & Privacy Framework

### Data Protection Principles
- **Zero-Server Architecture**: No backend servers, eliminating data breach risks
- **Client-Side Encryption**: All sensitive data encrypted before localStorage
- **Sandboxed Environment**: Browser security model prevents unauthorized access
- **No Third-Party Analytics**: Zero tracking, cookies, or external data collection
- **GDPR Compliant**: Full user control over personal data

### Google Calendar Integration Security
- **OAuth 2.0 Protocol**: Industry-standard secure authentication
- **Minimal Scope Permissions**: Only calendar read/write access requested
- **Token Management**: Secure token storage and automatic refresh
- **Revokable Access**: Users can disconnect at any time
- **No Password Storage**: Google handles all authentication

### Data Integrity Measures
- **Automatic Backups**: Periodic localStorage snapshots
- **Data Validation**: Input sanitization and type checking
- **Error Recovery**: Graceful degradation on data corruption
- **Version Control**: Data schema versioning for future updates

## � Advanced Troubleshooting Guide

### Performance Optimization Issues

**Slow rendering with 100+ tasks?**
```javascript
// Enable pagination in script.js
const TASKS_PER_PAGE = 10; // Reduce from default 20
```

**Memory usage growing over time?**
- Clear browser cache: `Ctrl+Shift+Delete`
- Restart browser to free memory
- Archive old completed tasks

**Animation lag on mobile devices?**
```css
/* Disable animations in styles.css for low-end devices */
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
}
```

### Google Calendar Sync Issues

**"Origin not allowed" error?**
1. Access via `http://localhost:3000` (not `file://`)
2. Check Google Cloud Console → OAuth consent screen
3. Add `localhost:3000` to authorized origins

**Calendar events not syncing?**
1. Check browser console for API errors
2. Verify API quota limits in Google Cloud Console
3. Test with diagnostic tools in Settings

**Authentication timeout?**
- Clear browser cookies for Google domains
- Try incognito mode to rule out extensions
- Check system clock synchronization

### Browser Compatibility Fixes

**Internet Explorer 11 issues?**
- This app requires modern ES6+ features
- Upgrade to Edge, Chrome, or Firefox
- No IE11 support planned

**Safari private mode limitations?**
- LocalStorage disabled in private mode
- Use regular browsing mode
- Export data before switching modes

### Mobile-Specific Problems

**Touch targets too small?**
```css
/* Increase button sizes in styles.css */
@media (max-width: 768px) {
    button { min-height: 48px; min-width: 48px; }
}
```

**Zoom issues on iOS?**
- Add to `index.html` head:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

## 🤝 Contributing & Development

### Code Contribution Guidelines

**Setting Up Development Environment:**
```bash
# Fork the repository
git clone https://github.com/YourUsername/STUDY_PLANNER.git
cd STUDY_PLANNER

# Start development server
python -m http.server 3000
# or
npx http-server -p 3000
```

**Development Standards:**
- **ES6+ Syntax**: Use modern JavaScript features
- **Semantic HTML**: Proper element usage and ARIA labels
- **Mobile-First CSS**: Design for mobile, enhance for desktop
- **No External Dependencies**: Keep the app framework-free
- **Comprehensive Testing**: Test across multiple browsers
- **Documentation**: Comment complex functions and algorithms

### Feature Request Process

**High-Priority Enhancements:**
1. **Collaborative Features**: Multi-user support with real-time sync
2. **Advanced Analytics**: Machine learning-powered insights
3. **Accessibility Improvements**: Enhanced screen reader support
4. **Performance Optimization**: Web Workers for heavy computations
5. **PWA Features**: Offline support and installability

**Code Review Checklist:**
- [ ] Cross-browser compatibility tested
- [ ] Mobile responsiveness verified
- [ ] Accessibility guidelines followed
- [ ] Performance impact assessed
- [ ] Documentation updated
- [ ] No security vulnerabilities introduced

### Bug Reporting Template
```markdown
**Bug Description:** Clear description of the issue
**Steps to Reproduce:** Numbered steps to recreate
**Expected Behavior:** What should happen
**Actual Behavior:** What actually happens
**Browser/OS:** Chrome 91, Windows 10
**Console Errors:** Any JavaScript errors
**Screenshots:** If applicable
```

## 📞 Community Support Hub

### Getting Help

**Official Channels:**
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/SatyamPandey-07/STUDY_PLANNER/issues)
- 💡 **Feature Requests**: GitHub Discussions
- 📧 **Direct Contact**: Available on GitHub profile
- 💬 **Community**: GitHub Discussions forum

**Self-Help Resources:**
- 📖 **Documentation**: This comprehensive README
- 🔍 **Search Issues**: Check existing GitHub issues first
- 🛠️ **Diagnostic Tools**: Built-in debugging tools in Settings
- 📱 **Browser DevTools**: F12 for console logs and network issues

**Response Time Expectations:**
- 🟢 **Critical Bugs**: 24-48 hours
- 🟡 **Feature Requests**: 1-2 weeks
- 🔵 **General Questions**: 3-5 days
- 🟣 **Documentation Updates**: As needed

### Community Guidelines
- **Be Respectful**: Treat all community members with respect
- **Search First**: Check existing issues before creating new ones
- **Provide Details**: Include browser, OS, and steps to reproduce
- **Stay On Topic**: Keep discussions relevant to the project
- **Help Others**: Share your knowledge and solutions

## 📜 Open Source License

**MIT License - Full Text**

```
MIT License

Copyright (c) 2025 Satyam Pandey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**What This Means:**
- ✅ **Commercial Use**: Use in commercial projects allowed
- ✅ **Modification**: Modify and customize freely
- ✅ **Distribution**: Share original or modified versions
- ✅ **Private Use**: Use for personal projects
- ❌ **Liability**: No warranty or liability from author
- ❌ **Trademark**: License doesn't grant trademark rights

**Attribution Requirements:**
- Include original copyright notice in redistributions
- Include license text in substantial portions
- No need to share modifications (not copyleft)

## 🎯 Future Enhancements

Potential improvements could include:
- **Team Collaboration**: Share study plans and goals with classmates
- **Advanced Calendar Integrations**: Outlook, Apple Calendar, Notion sync
- **Study Statistics**: Detailed time tracking and productivity reports
- **Task Templates**: Pre-defined task templates for common study activities
- **Recurring Tasks**: Automatic task repetition (daily, weekly, monthly)
- **Mobile App**: Native iOS/Android application
- **Cloud Synchronization**: Cross-device data sync with user accounts
- **AI-Powered Suggestions**: Smart task prioritization and scheduling
- **Study Groups**: Collaborative study sessions and group goals
- **Advanced Theming**: More customization options and dark mode improvements

---

**Happy Studying! 🎓**

*Built with ❤️ for students.*

