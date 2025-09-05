# 📚 Smart Study Planner

A comprehensive web-based study planning application with task management, goal tracking, Pomodoro timer, and Google Calendar integration.

## 🚀 Quick Start

### For Basic Use:
1. Open `index.html` in your browser

### For Google Calendar Sync:
1. Double-click `start-server.bat` (Windows)
<div align="center">

# 🚀 Smart Study Planner

<img src="https://img.shields.io/badge/Status-Complete-brightgreen" />
<img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Google_Calendar_API-4285F4?logo=google-calendar&logoColor=white" />
<img src="https://img.shields.io/badge/Web_Audio_API-FF5722?logo=webaudio&logoColor=white" />

</div>

> **A comprehensive, feature-rich study planner with advanced task management, goal tracking, Pomodoro timer, Google Calendar integration, and analytics dashboard.**

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

## 🐛 Troubleshooting

### **Common Issues**

**Tasks not saving?**
- Ensure localStorage is enabled in browser
- Check if you're not in private/incognito mode
- Try clearing browser cache and refreshing

**Google Calendar not connecting?**
- Use the diagnostic tools in Settings → Google Calendar
- Ensure you're accessing via `http://localhost:3000`
- Check your Google Cloud Console OAuth settings
- Verify your API key and client ID are correct

**Layout issues on mobile?**
- Clear browser cache and reload
- Ensure you're using a modern browser
- Check if JavaScript is enabled

**Performance issues with many tasks?**
- The app uses pagination (20 tasks per page)
- Consider archiving completed tasks periodically
- Use search and filters to narrow down displayed tasks

**Notifications not working?**
- Check browser notification permissions
- Ensure notifications are enabled in Settings
- Try refreshing the page to re-request permissions

### **Browser Console Debugging**
- Open Developer Tools (F12)
- Check Console tab for error messages
- Use the built-in diagnostic tools in Settings

---

## 🔐 Privacy & Security

- **Local Storage Only**: All data remains on your device
- **No External Servers**: Complete offline functionality (except Google Calendar)
- **Google OAuth**: Secure authentication, no password storage
- **Data Control**: Full import/export capabilities
- **No Tracking**: No analytics or user tracking implemented

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

## 📜 License

This project is licensed under the MIT License.

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

---

## 👨‍💻 Author & Contact

**Satyam Pandey**
- 🐙 **GitHub**: [@SatyamPandey-07](https://github.com/SatyamPandey-07)
- 💼 **LinkedIn**: [Satyam Pandey](https://www.linkedin.com/in/satyam-pandey-0b246432a/)
- 📧 **Email**: Available on GitHub profile

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

**Built with ❤️ for students who want to excel in their academic journey.**

*Happy Studying! 🎓*# 🚀 Smart Study Planner



---

<div align="center">
   <img src="https://user-images.githubusercontent.com/your-demo-image.png" width="600" alt="Smart Study Planner Screenshot" />
</div>

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

## 🚦 Quick Start

**Basic:**
1. Open `index.html` in your browser

**With Google Calendar:**
1. Double-click `start-server.bat` (Windows) or run `python -m http.server 3000`
2. Open [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```text
frontend-2/
├── index.html           # Main app
├── script.js            # All logic (modularized)
├── styles.css           # Modern, themeable styles
├── oauth2callback.html  # Google OAuth handler
├── start-server.bat     # Local server for OAuth
└── README.md            # This file
```

---

## 💡 Key Features (Deep Dive)

- **Dashboard:**
   - Real-time stats, circular progress, quick add, activity feed
- **Tasks:**
   - CRUD, priorities, tags, overdue, search, filter, drag & drop
- **Goals:**
   - SMART goals, progress bars, link tasks to goals
- **Calendar/Timeline:**
   - Monthly/weekly, color-coded, today highlight, navigation
- **Pomodoro:**
   - 25/5/15 min cycles, sound, notifications, stats
- **Analytics:**
   - Charts, trends, productivity insights
- **Themes:**
   - 5+ built-in, custom color picker, dark mode
- **Notifications:**
   - Overdue, reminders, browser push
- **Google Calendar:**
   - 2-way sync, OAuth2, status diagnostics
- **Data:**
   - Export/import CSV, localStorage backup
- **Mobile:**
   - Touch, swipe, responsive, PWA-ready

---

## 🧑‍� Author & Links

Made with ❤️ by [Satyam Pandey](https://github.com/SatyamPandey-07)

- [GitHub](https://github.com/SatyamPandey-07)
- [LinkedIn](https://www.linkedin.com/in/satyam-pandey-0b246432a/)

---

## � License

© 2025 Smart Study Planner. All rights reserved.
### Installation

1. **Download the files**:
   ```bash
   # Clone or download the repository
   git clone https://github.com/midlaj-muhammed/Smart-Study-Planner-for-AICTE-IBM-Frontend-Internship-Project.git
   cd smart-study-planner
   ```

2. **File Structure**:
   ```
   smart-study-planner/
   ├── index.html
   ├── styles.css
   ├── script.js
   └── README.md
   ```

3. **Launch the application**:
   - Open `index.html` in your web browser
   - That's it! No server setup required

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

### Keyboard Shortcuts
- `Ctrl/Cmd + N`: Create new task
- `Ctrl/Cmd + F`: Focus on search (when in Tasks tab)
- `Escape`: Close modal dialogs

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

## 📊 Data Structure

Tasks are stored with the following structure:
```javascript
{
    id: "unique_timestamp",
    title: "Task Title",
    description: "Optional description",
    dueDate: Date object,
    priority: "high|medium|low",
    subject: "Course/Subject name",
    estimatedTime: 2.5,
    tags: ["exam", "revision"],
    status: "pending|in-progress|completed",
    createdAt: Date object,
    completedAt: Date object or null
}
```

## 🔒 Privacy & Security

- **Local Storage Only**: All data stays on your device
- **No External Servers**: No data transmission to third parties
- **Browser-based**: Complete offline functionality
- **Export Control**: You control your data with export/import features

## 🐛 Troubleshooting

### Common Issues

**Tasks not saving?**
- Check if localStorage is enabled in your browser
- Ensure you're not in private/incognito mode

**Layout issues on mobile?**
- Clear browser cache and reload
- Ensure you're using a modern browser version

**Performance issues?**
- Large numbers of tasks (500+) may slow performance
- Consider archiving completed tasks periodically

## 🤝 Contributing

This is a standalone project, but you can enhance it by:
- Adding new visualization types
- Implementing calendar integration
- Adding notification systems
- Creating themes and customization options

## 📄 License

This project is open source and available under the MIT License.

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

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Review the code documentation in the source files
- Create an issue if you find bugs or have suggestions

---

**Happy Studying! 🎓**

*Built with ❤️ for students who want to excel in their academic journey.*

