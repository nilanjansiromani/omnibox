# SuperOmniBar - Chrome User Guide

## Welcome to SuperOmniBar!

SuperOmniBar is a powerful browser extension that transforms how you navigate Chrome. With a beautiful, liquid glass-styled interface, you can instantly search through your tabs, bookmarks, and browsing history using a simple keyboard shortcut.

---

## 🚀 Getting Started

### Installation

1. **Download the Extension**
   - Clone or download this repository to your computer
   - Locate the `chrome/` folder

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle **"Developer mode"** ON (located in the top right corner)
   - Click **"Load unpacked"**
   - Navigate to and select the `chrome/` folder
   - The extension is now installed!

3. **Verify Installation**
   - You should see SuperOmniBar in your extensions list
   - The extension icon will appear in your Chrome toolbar

### First Use

1. **Open SuperOmniBar**
   - Press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac)
   - The beautiful overlay will appear at the top of your current page

2. **Try a Search**
   - Start typing to see your tabs appear
   - Type at least 3 characters to search bookmarks and history
   - Use arrow keys to navigate results

---

## ✨ Features Deep Dive

### 🔍 Intelligent Fuzzy Search

**What is Fuzzy Search?**
Fuzzy search means you don't have to type perfectly. The extension finds what you're looking for even if you make typos or only remember part of a word.

**How It Works:**
- **Partial Matches**: Type "gith" and it will find "GitHub"
- **Word Matching**: Searches match complete words first, then partial matches
- **Smart Scoring**: Most relevant results appear at the top
- **Minimum Characters**: Requires 3 characters before searching bookmarks/history (to avoid overwhelming results)

**Example Searches:**
- `gith` → Finds all GitHub-related tabs/bookmarks/history
- `react` → Finds React documentation, tutorials, etc.
- `shopp` → Finds shopping sites even if you misspell "shopping"

**Tips:**
- The search looks at both page titles AND URLs
- Results are sorted by relevance (best matches first)
- Empty search shows your top 5 open tabs

---

### 🎨 Beautiful Liquid Glass Design

**Visual Design:**
SuperOmniBar features an Apple-inspired "liquid glass" aesthetic that's both beautiful and functional.

**Key Visual Elements:**
- **Frosted Glass Effect**: The modal has a translucent, blurred background
- **Smooth Animations**: Everything slides and fades smoothly
- **Fixed Position**: The search box stays at the top (100px from top) - no jumping or shifting
- **Wide Layout**: 60% of viewport width for comfortable reading
- **Compact Design**: Reduced padding and margins for efficiency

**Dark Mode:**
- Automatically adapts to your system theme
- Dark backgrounds with light text in dark mode
- Light backgrounds with dark text in light mode

**Typography:**
- Uses the Lato font family for clean, modern text
- Optimized font sizes for readability
- Smaller fonts (13px titles, 11px URLs) for compact display

---

### 📊 Organized Results Display

**Result Grouping:**
Results are organized into three categories, displayed in this order:

1. **Tabs** (when empty search or matching tabs)
   - Shows your currently open tabs
   - Empty search shows top 5 tabs
   - Search shows matching tabs

2. **Bookmarks** (when searching)
   - All your saved bookmarks
   - Top 5 most relevant matches

3. **History** (when searching)
   - Your browsing history
   - Top 5 most relevant matches

**Visual Indicators:**
- **Favicons**: Each result shows the website's icon
- **🗂️ Emoji**: Default icon when favicon is unavailable
- **Yellow Highlighting**: Matched text is highlighted in yellow
- **Group Headers**: Clear labels for each category

**Empty States:**
- Shows "Type at least 3 characters to search" when you type 1-2 characters
- Shows "No results found" when search has no matches

---

### ⌨️ Keyboard Navigation

**Opening SuperOmniBar:**
- **Windows/Linux**: `Ctrl+K`
- **Mac**: `Cmd+K`
- Works from any webpage

**Navigating Results:**
- **Arrow Down (↓)**: Move to next result
- **Arrow Up (↑)**: Move to previous result
- **Enter**: Open/switch to selected result
- **Escape**: Close the overlay

**Searching:**
- Just start typing - no need to click the search box
- Search box is automatically focused when opened
- Backspace to clear and see tabs again

**Tips:**
- You can navigate with keyboard only - no mouse needed!
- Press Escape anytime to close
- Arrow keys wrap around (at bottom, goes to top)

---

### 🚀 Performance Features

**Cached Data:**
- First search loads all your data (tabs, bookmarks, history)
- Subsequent searches use cached data for instant results
- Data refreshes when you reopen the overlay

**Debounced Search:**
- Waits 300ms after you stop typing before searching
- Prevents excessive searching while you type
- Makes the interface feel responsive

**Efficient Rendering:**
- Only updates what changes - no flickering
- Uses efficient DOM updates
- Smooth scrolling through results

**Works on Existing Tabs:**
- Automatically injects into tabs opened before installation
- No need to reload pages
- Works immediately after installation

---

## 📖 Common Use Cases

### Finding an Open Tab

**Scenario**: You have many tabs open and need to find a specific one.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. Type part of the page title or URL
3. Use arrow keys to navigate to the tab
4. Press Enter to switch to it

**Example**: Type "gmail" to find your Gmail tab among many open tabs.

---

### Opening a Bookmark

**Scenario**: You want to open a bookmark you saved earlier.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. Type at least 3 characters related to the bookmark
3. Navigate to the bookmark in results
4. Press Enter to open it

**Example**: Type "react" to find React documentation bookmarks.

---

### Revisiting History

**Scenario**: You visited a page earlier but closed the tab.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. Type at least 3 characters related to the page
3. Find it in the History section
4. Press Enter to open it

**Example**: Type "tutorial" to find tutorials you visited earlier today.

---

### Quick Tab Switching

**Scenario**: You're working with multiple tabs and need to switch quickly.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. See your top 5 tabs immediately (no typing needed)
3. Use arrow keys to select
4. Press Enter to switch

**Tip**: This is faster than clicking through tabs!

---

## 🎯 Advanced Tips & Tricks

### Efficient Searching

1. **Use Specific Terms**: More specific searches yield better results
   - Good: "react hooks tutorial"
   - Less effective: "tutorial"

2. **Partial URLs Work**: You can search by domain
   - Type "github" to find all GitHub pages
   - Type "docs" to find documentation sites

3. **Title Words**: Search by key words from page titles
   - Page titles are weighted higher than URLs

### Keyboard Shortcuts

- **Quick Close**: Press Escape anytime
- **Quick Open**: `Ctrl+K` / `Cmd+K` from anywhere
- **No Mouse Needed**: Full keyboard navigation

### Performance Tips

- **First Search**: May take a moment to load all data
- **Subsequent Searches**: Instant results from cache
- **Large History**: Extension limits to 1000 most recent items

---

## 🔧 Troubleshooting

### Extension Not Opening

**Problem**: Pressing `Ctrl+K` / `Cmd+K` doesn't open the overlay.

**Solutions**:
1. Check if extension is enabled in `chrome://extensions/`
2. Verify keyboard shortcut: Go to `chrome://extensions/shortcuts`
3. Reload the extension
4. Try reloading the current page

### Search Not Working

**Problem**: Typing doesn't show results.

**Solutions**:
1. Make sure you've typed at least 3 characters (for bookmarks/history)
2. Check browser console (`F12`) for errors
3. Reload the extension
4. Try clearing browser cache

### Results Not Showing

**Problem**: No results appear even when you know they exist.

**Solutions**:
1. Check if you have tabs/bookmarks/history
2. Try a different search term
3. Empty search should show your tabs
4. Reload the extension

### Styling Issues

**Problem**: Overlay looks wrong or doesn't match your theme.

**Solutions**:
1. Check if your browser supports `backdrop-filter` (modern browsers)
2. Verify dark mode settings in your system
3. Reload the page after installing extension
4. Check browser console for CSS errors

---

## 🔒 Privacy & Security

**Local Processing**: All search happens locally in your browser. No data is sent to external servers.

**Permissions Explained**:
- **tabs**: To list and switch between your open tabs
- **bookmarks**: To search through your bookmarks
- **history**: To search through your browsing history
- **activeTab**: To inject the overlay UI
- **scripting**: To inject scripts into existing tabs

**Data Storage**: No data is stored externally. Everything stays in your browser.

---

## 💡 Best Practices

1. **Keep It Open**: Leave the extension enabled for quick access
2. **Learn the Shortcut**: `Ctrl+K` / `Cmd+K` becomes second nature
3. **Use Specific Terms**: Better searches = better results
4. **Keyboard Navigation**: Faster than mouse for power users
5. **Empty Search**: Quick way to see your top tabs

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Check browser console (`F12`) for errors
3. Reload the extension
4. Open an issue on the repository

---

## 🎉 Enjoy SuperOmniBar!

You're now ready to navigate Chrome faster than ever. The more you use it, the more natural it becomes. Happy browsing!

