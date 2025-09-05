# 📚 Smart Study Planner

A comprehensive web-based study planning application with task management, goal tracking, Pomodoro timer, and Google Calendar integration.

## 🚀 Quick Start

### For Basic Use:
1. Open `index.html` in your browser

### For Google Calendar Sync:
1. Double-click `start-server.bat` (Windows)
<div align="center">
   <img src="https://img.shields.io/badge/Status-Complete-brightgreen" />
   <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" />
   <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" />
   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" />
</div>

# 🚀 Smart Study Planner



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
- **Calendar Integration**: Sync with Google Calendar or other services
- **Study Timer**: Pomodoro technique integration
- **Goal Setting**: Long-term academic goal tracking
- **Collaboration**: Share study plans with classmates
- **Mobile App**: Native mobile application
- **Cloud Sync**: Cross-device synchronization
- **Advanced Analytics**: Detailed productivity insights

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Review the code documentation in the source files
- Create an issue if you find bugs or have suggestions

---

**Happy Studying! 🎓**

*Built with ❤️ for students who want to excel in their academic journey.*

