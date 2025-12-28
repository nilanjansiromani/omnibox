# SuperOmniBar

A beautiful, liquid glass-styled browser extension that provides instant access to your tabs, bookmarks, and browsing history through an elegant overlay interface. Press `Ctrl+K` (or `Cmd+K` on Mac) to open a powerful fuzzy search interface that helps you navigate your browser faster than ever.

![SuperOmniBar](https://img.shields.io/badge/version-1.0.0-blue)
![Chrome](https://img.shields.io/badge/Chrome-supported-green)
![Firefox](https://img.shields.io/badge/Firefox-supported-green)

## ✨ Features

### 🔍 Intelligent Search
- **Fuzzy Search Algorithm**: Find what you're looking for even with typos or partial matches
- **Smart Filtering**: Only shows relevant results - no false positives
- **Yellow Highlighting**: Matched text is highlighted in yellow for quick scanning
- **Real-time Results**: Instant filtering as you type

### 🎨 Beautiful Design
- **Liquid Glass Aesthetic**: Apple-inspired frosted glass design with backdrop blur
- **Lato Font**: Clean, modern typography throughout
- **Smooth Animations**: Polished transitions and interactions
- **Dark Mode Support**: Automatically adapts to your system theme
- **Fixed Position**: Search box stays fixed at the top - no shifting or flickering

### 📊 Organized Results
- **Grouped Display**: Results organized by category (Tabs → Bookmarks → History)
- **Favicon Display**: Visual icons next to each result for quick recognition
- **Empty State Handling**: Only shows groups with matching results
- **Compact Layout**: Efficient use of space with reduced padding

### ⌨️ Keyboard Navigation
- **Quick Access**: `Ctrl+K` / `Cmd+K` to open from anywhere
- **Arrow Keys**: Navigate through results
- **Enter**: Open/switch to selected result
- **Escape**: Close the overlay
- **Tab Switching**: Automatically switches to existing tabs when available

### 🚀 Performance
- **Cached Data**: Data is cached after first load for instant searches
- **Debounced Input**: Optimized search with 300ms debounce
- **Efficient Rendering**: Minimal DOM updates to prevent flickering
- **Works on Existing Tabs**: Automatically injects into tabs opened before installation

## 📦 Installation

### Chrome / Chromium-based Browsers

1. **Download or Clone** this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in the top right corner)
4. Click **"Load unpacked"**
5. Select the `chrome/` directory from this repository
6. The extension is now installed and ready to use!

### Firefox

1. **Download or Clone** this repository
2. Open Firefox and navigate to `about:debugging`
3. Click **"This Firefox"** in the left sidebar
4. Click **"Load Temporary Add-on..."**
5. Navigate to the `firefox/` directory and select `manifest.json`
6. The extension is now installed and ready to use!

**Note**: For Firefox, temporary add-ons are removed when you restart Firefox. To make it permanent, you'll need to sign and publish the extension, or use Firefox Developer Edition with permanent installation options.

## 🎯 Usage

### Opening the OmniBar

- **Keyboard Shortcut**: Press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac) on any webpage
- The overlay will appear at the top center of the page (100px from top)

### Searching

1. **Type your query** in the search box
2. Results appear instantly, filtered by relevance
3. **All tabs** are shown when the search box is empty
4. **Bookmarks and History** appear when you start typing

### Navigating Results

- **Arrow Down** (`↓`): Move to next result
- **Arrow Up** (`↑`): Move to previous result
- **Enter**: Open/switch to the selected result
- **Escape**: Close the overlay
- **Mouse Click**: Click any result to open it

### Result Actions

- **Tabs**: Clicking a tab result switches to that tab
- **Bookmarks/History**: Clicking opens the URL (switches to tab if already open, otherwise opens new tab)

## 🏗️ Architecture

### Technology Stack

- **Manifest V3**: Modern extension architecture
- **Vanilla JavaScript**: No external dependencies
- **CSS3**: Modern styling with backdrop-filter and animations
- **Chrome/Firefox APIs**: Native browser extension APIs

### File Structure

```
SuperOmniBar/
├── chrome/                    # Chrome extension
│   ├── manifest.json          # Extension configuration
│   ├── background.js          # Service worker (API handlers)
│   ├── content.js             # Content script (UI overlay)
│   ├── fuzzy-search.js        # Search algorithm
│   ├── styles.css             # Liquid glass styling
│   ├── icons/                 # Extension icons
│   │   ├── icon-16.png
│   │   ├── icon-48.png
│   │   └── icon-128.png
│   └── generate-icons.js      # Icon generation script
│
├── firefox/                   # Firefox extension
│   ├── manifest.json          # Extension configuration
│   ├── background.js          # Service worker (API handlers)
│   ├── content.js             # Content script (UI overlay)
│   ├── fuzzy-search.js        # Search algorithm
│   ├── styles.css             # Liquid glass styling
│   ├── icons/                 # Extension icons
│   │   ├── icon-16.png
│   │   ├── icon-48.png
│   │   └── icon-128.png
│   └── README.md              # Firefox-specific notes
│
└── README.md                  # This file
```

### Component Overview

#### `manifest.json`
- Defines extension permissions and configuration
- Sets up content scripts, background worker, and keyboard shortcuts
- Chrome and Firefox versions have minor differences

#### `background.js`
- Service worker that handles Chrome/Firefox API access
- Manages tabs, bookmarks, and history queries
- Handles script injection into existing tabs
- Processes keyboard shortcut commands

#### `content.js`
- Creates and manages the overlay UI
- Handles user input and search
- Renders results with highlighting
- Manages keyboard navigation

#### `fuzzy-search.js`
- Implements fuzzy matching algorithm
- Scores results by relevance
- Filters out low-quality matches
- Supports word boundary and substring matching

#### `styles.css`
- Liquid glass design with backdrop blur
- Responsive layout (40vw width)
- Dark mode support
- Smooth animations and transitions

## 🔧 Development

### Prerequisites

- Node.js (for icon generation, optional)
- Chrome or Firefox browser
- Basic knowledge of JavaScript and browser extensions

### Setting Up Development Environment

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SuperOmniBar
   ```

2. **Load the extension**:
   - For Chrome: Load `chrome/` folder as unpacked extension
   - For Firefox: Load `firefox/manifest.json` via `about:debugging`

3. **Make changes**:
   - Edit files in `chrome/` or `firefox/` directories
   - Reload the extension in the browser to see changes

### Generating Icons

Icons are already included, but if you want to regenerate them:

```bash
cd chrome
npm install canvas
node generate-icons.js
```

Then copy the icons to the `firefox/icons/` directory.

### Key Implementation Details

#### Data Caching
- Tabs, bookmarks, and history are fetched once and cached
- Subsequent searches use cached data for instant results
- Data is refreshed when the overlay is opened

#### Search Algorithm
- Uses fuzzy matching with scoring system
- Minimum score threshold (0.5) filters out poor matches
- Word boundary matching prioritizes exact word matches
- Substring matching provides fallback results

#### UI Rendering
- Uses DocumentFragment for efficient DOM updates
- Only updates when results actually change
- Prevents flickering by avoiding unnecessary re-renders

#### Cross-Browser Compatibility
- Chrome version uses `chrome.*` APIs
- Firefox version uses `browser.*` APIs with `chrome` fallback
- Handles browser-specific URL schemes (`chrome://` vs `about:`)

## 🐛 Troubleshooting

### Extension Not Working on Existing Tabs

**Solution**: Reload the extension after installation. The extension automatically injects scripts into existing tabs, but you may need to reload the extension once.

### Keyboard Shortcut Not Working

**Chrome**: 
- Go to `chrome://extensions/shortcuts`
- Find SuperOmniBar and verify the shortcut is set
- Change it if needed

**Firefox**:
- Go to `about:addons`
- Click the gear icon → Manage Extension Shortcuts
- Verify the shortcut is set

### Search Results Not Showing

- Check browser console for errors (`F12`)
- Verify you have tabs, bookmarks, or history
- Try reloading the extension

### Styling Issues

- Ensure your browser supports `backdrop-filter` (modern browsers)
- Check if dark mode is working correctly in your system settings
- Try reloading the page after installing the extension

### Performance Issues

- The extension caches data - first search may be slower
- Large bookmark/history collections may take a moment to load
- Consider limiting history results if needed (edit `background.js`)

## 🔒 Permissions

The extension requires the following permissions:

- **tabs**: To list and switch between open tabs
- **bookmarks**: To search through your bookmarks
- **history**: To search through your browsing history
- **activeTab**: To inject the overlay UI
- **scripting**: To inject scripts into existing tabs
- **host_permissions** (`<all_urls>`): To work on all websites

**Privacy Note**: All data processing happens locally in your browser. No data is sent to external servers. The extension only accesses your local tabs, bookmarks, and history.

## 🌐 Browser Compatibility

### Chrome / Chromium
- **Minimum Version**: Chrome 88+ (Manifest V3 support)
- **Tested On**: Chrome, Edge, Brave, Opera

### Firefox
- **Minimum Version**: Firefox 109+ (Manifest V3 support)
- **Tested On**: Firefox, Firefox Developer Edition

## 📝 Changelog

### Version 1.0.0
- Initial release
- Fuzzy search functionality
- Liquid glass UI design
- Chrome and Firefox support
- Keyboard navigation
- Yellow match highlighting
- Fixed position overlay
- Compact, efficient layout

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Maintain compatibility with both Chrome and Firefox
2. Keep the code clean and well-commented
3. Test changes in both browsers
4. Update documentation as needed

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- Inspired by macOS Spotlight and various command palette interfaces
- Liquid glass design inspired by Apple's design language
- Lato font by Łukasz Dziedzic

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Made with ❤️ for faster browsing**


