# SuperOmniBar - Arc Browser User Guide

## Welcome to SuperOmniBar for Arc!

SuperOmniBar is specially optimized for Arc browser's unique features. With enhanced support for spaces, pinned tabs, and sidebar tabs, you can search across your entire Arc workspace instantly.

---

## 🚀 Getting Started

### Installation

1. **Download the Extension**
   - Clone or download this repository to your computer
   - Locate the `arc/` folder

2. **Load in Arc**
   - Open Arc and navigate to `arc://extensions/`
   - Toggle **"Developer mode"** ON (located in the top right corner)
   - Click **"Load unpacked"**
   - Navigate to and select the `arc/` directory
   - The extension is now installed!

3. **Verify Installation**
   - You should see SuperOmniBar in your extensions list
   - The extension icon will appear in your Arc toolbar

### First Use

1. **Open SuperOmniBar**
   - Press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac)
   - The beautiful overlay will appear at the top of your current page

2. **Try a Search**
   - Start typing to see your tabs appear
   - Type at least 3 characters to search bookmarks and history
   - Use arrow keys to navigate results

---

## ✨ Arc-Specific Features

### 🌐 Cross-Space Search

**What are Spaces?**
Arc organizes your browsing into "spaces" - separate workspaces for different projects or contexts. Each space can have its own set of tabs.

**How SuperOmniBar Searches Spaces:**
- **All Spaces**: Searches tabs across ALL your Arc spaces simultaneously
- **No Space Switching Needed**: Find tabs from any space without manually switching
- **Unified Results**: All matching tabs appear together, regardless of which space they're in

**Example Use Case:**
- You have a "Work" space with project tabs
- You have a "Personal" space with personal tabs
- Type "github" and see GitHub tabs from BOTH spaces
- Switch to any tab instantly, regardless of space

**How It Works:**
- Uses Arc's window system (each space is a window)
- Queries all windows to discover tabs from all spaces
- Results show tabs from every space you have open

---

### 📌 Pinned Tabs Support

**What are Pinned Tabs?**
Pinned tabs stay at the beginning of your tab bar and persist across sessions. They're your most important tabs.

**How SuperOmniBar Handles Pinned Tabs:**
- **Included in Search**: Pinned tabs appear in search results
- **Visual Indicator**: Pinned tabs are marked with a 📌 icon
- **Easy Identification**: Quickly spot your pinned tabs in results

**Example:**
- You have Gmail pinned in your Work space
- Type "gmail" and see "📌 Gmail" in results
- Instantly recognizable as a pinned tab

**Benefits:**
- Find pinned tabs quickly across all spaces
- See which tabs are pinned at a glance
- Access important tabs without switching spaces

---

### 📑 Sidebar Tabs Search

**What are Sidebar Tabs?**
Arc's sidebar can contain tabs that are always accessible, separate from your main tab bar.

**How SuperOmniBar Searches Sidebar Tabs:**
- **Included Automatically**: Sidebar tabs are included in search results
- **No Special Handling Needed**: They appear alongside regular tabs
- **Full Search Coverage**: Nothing is missed

**Example:**
- You have reference tabs in the sidebar
- Search for "docs" and see both regular tabs AND sidebar tabs
- Access sidebar tabs without opening the sidebar

**Benefits:**
- Search everything in one place
- Don't need to remember where tabs are located
- Unified search experience

---

## 🔍 Intelligent Fuzzy Search

**What is Fuzzy Search?**
Fuzzy search means you don't have to type perfectly. The extension finds what you're looking for even if you make typos or only remember part of a word.

**How It Works:**
- **Partial Matches**: Type "gith" and it will find "GitHub"
- **Word Matching**: Searches match complete words first, then partial matches
- **Smart Scoring**: Most relevant results appear at the top
- **Minimum Characters**: Requires 3 characters before searching bookmarks/history

**Example Searches:**
- `gith` → Finds all GitHub-related tabs/bookmarks/history across all spaces
- `react` → Finds React documentation, tutorials, etc.
- `shopp` → Finds shopping sites even if you misspell "shopping"

**Arc-Specific Benefits:**
- Search across spaces simultaneously
- Find tabs you forgot which space they're in
- Unified search for your entire workspace

---

## 🎨 Beautiful Liquid Glass Design

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
- Works with Arc's dark mode
- Dark backgrounds with light text in dark mode
- Light backgrounds with dark text in light mode

**Typography:**
- Uses the Lato font family for clean, modern text
- Optimized font sizes for readability
- Smaller fonts (13px titles, 11px URLs) for compact display

---

## 📊 Organized Results Display

**Result Grouping:**
Results are organized into three categories, displayed in this order:

1. **Tabs** (when empty search or matching tabs)
   - Shows tabs from ALL spaces
   - Includes pinned tabs (marked with 📌)
   - Includes sidebar tabs
   - Empty search shows top 5 tabs
   - Search shows matching tabs from all spaces

2. **Bookmarks** (when searching)
   - All your saved bookmarks
   - Top 5 most relevant matches

3. **History** (when searching)
   - Your browsing history
   - Top 5 most relevant matches

**Visual Indicators:**
- **Favicons**: Each result shows the website's icon
- **🗂️ Emoji**: Default icon when favicon is unavailable
- **📌 Icon**: Pinned tabs are clearly marked
- **Yellow Highlighting**: Matched text is highlighted in yellow
- **Group Headers**: Clear labels for each category

**Empty States:**
- Shows "Type at least 3 characters to search" when you type 1-2 characters
- Shows "No results found" when search has no matches

---

## ⌨️ Keyboard Navigation

**Opening SuperOmniBar:**
- **Windows/Linux**: `Ctrl+K`
- **Mac**: `Cmd+K`
- Works from any webpage in any space

**Navigating Results:**
- **Arrow Down (↓)**: Move to next result
- **Arrow Up (↑)**: Move to previous result
- **Enter**: Open/switch to selected result (switches space if needed)
- **Escape**: Close the overlay

**Searching:**
- Just start typing - no need to click the search box
- Search box is automatically focused when opened
- Backspace to clear and see tabs again

**Tips:**
- You can navigate with keyboard only - no mouse needed!
- Press Escape anytime to close
- Arrow keys wrap around (at bottom, goes to top)
- Works seamlessly across all Arc spaces

---

## 🚀 Performance Features

**Cached Data:**
- First search loads all your data (tabs from all spaces, bookmarks, history)
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

**Cross-Space Optimization:**
- Efficiently queries all Arc windows (spaces)
- Removes duplicates automatically
- Fast tab discovery across entire workspace

---

## 📖 Common Use Cases

### Finding a Tab Across Spaces

**Scenario**: You have tabs open in multiple spaces and need to find a specific one.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. Type part of the page title or URL
3. See results from ALL spaces
4. Use arrow keys to navigate
5. Press Enter to switch to it (and switch space if needed)

**Example**: Type "notion" to find Notion tabs from any space.

---

### Finding Pinned Tabs

**Scenario**: You want to quickly access a pinned tab.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. Type part of the pinned tab's name
3. Look for the 📌 icon
4. Press Enter to switch to it

**Example**: Type "gmail" to find your pinned Gmail tab.

---

### Searching Sidebar Tabs

**Scenario**: You have reference tabs in the sidebar and want to find one quickly.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. Type part of the sidebar tab's name
3. It will appear in results alongside regular tabs
4. Press Enter to open it

**Example**: Type "docs" to find documentation tabs from sidebar.

---

### Quick Tab Switching Across Spaces

**Scenario**: You're working with multiple spaces and need to switch tabs quickly.

**Solution**:
1. Press `Ctrl+K` / `Cmd+K`
2. See your top 5 tabs from all spaces (no typing needed)
3. Use arrow keys to select
4. Press Enter to switch (space switches automatically if needed)

**Tip**: This is faster than manually switching spaces!

---

## 🎯 Advanced Tips & Tricks

### Efficient Cross-Space Searching

1. **Use Specific Terms**: More specific searches yield better results
   - Good: "react hooks tutorial"
   - Less effective: "tutorial"

2. **Partial URLs Work**: You can search by domain
   - Type "github" to find all GitHub pages across all spaces
   - Type "docs" to find documentation sites

3. **Title Words**: Search by key words from page titles
   - Page titles are weighted higher than URLs

4. **Space Context**: Results show tabs from all spaces
   - Don't worry about which space a tab is in
   - Just search and find it

### Keyboard Shortcuts

- **Quick Close**: Press Escape anytime
- **Quick Open**: `Ctrl+K` / `Cmd+K` from anywhere
- **No Mouse Needed**: Full keyboard navigation
- **Space Switching**: Automatically switches spaces when selecting a tab

### Performance Tips

- **First Search**: May take a moment to load all data from all spaces
- **Subsequent Searches**: Instant results from cache
- **Large Workspace**: Extension efficiently handles many tabs across spaces
- **Pinned Tabs**: Always included and marked clearly

### Arc-Specific Workflows

1. **Multi-Space Work**: Search across work and personal spaces simultaneously
2. **Quick Access**: Use pinned tab indicator (📌) to find important tabs
3. **Sidebar Integration**: Search sidebar tabs without opening sidebar
4. **Unified Search**: One search interface for your entire Arc workspace

---

## 🔧 Troubleshooting

### Extension Not Opening

**Problem**: Pressing `Ctrl+K` / `Cmd+K` doesn't open the overlay.

**Solutions**:
1. Check if extension is enabled in `arc://extensions/`
2. Verify keyboard shortcut: Go to `arc://extensions/shortcuts`
3. Reload the extension
4. Try reloading the current page
5. Check if Arc's built-in command palette conflicts (may need to disable it)

### Search Not Showing All Spaces

**Problem**: Search only shows tabs from current space.

**Solutions**:
1. Make sure you're using the Arc version (not Chrome version)
2. Reload the extension
3. Check browser console (`F12`) for errors
4. Verify all spaces have tabs open

### Pinned Tabs Not Showing

**Problem**: Pinned tabs don't appear in results.

**Solutions**:
1. Make sure tabs are actually pinned in Arc
2. Try searching for the pinned tab's title
3. Empty search should show pinned tabs
4. Reload the extension

### Sidebar Tabs Not Appearing

**Problem**: Sidebar tabs don't show in search results.

**Solutions**:
1. Verify sidebar tabs exist in Arc
2. Try a search that should match sidebar tabs
3. Reload the extension
4. Check if Arc exposes sidebar tabs via the tabs API

---

## 🔒 Privacy & Security

**Local Processing**: All search happens locally in your browser. No data is sent to external servers.

**Permissions Explained**:
- **tabs**: To list and switch between your open tabs across all spaces
- **bookmarks**: To search through your bookmarks
- **history**: To search through your browsing history
- **activeTab**: To inject the overlay UI
- **scripting**: To inject scripts into existing tabs

**Data Storage**: No data is stored externally. Everything stays in your browser.

**Arc Integration**: The extension uses Arc's standard browser APIs. No special Arc-specific data access beyond normal tab APIs.

---

## 💡 Best Practices

1. **Keep It Open**: Leave the extension enabled for quick access
2. **Learn the Shortcut**: `Ctrl+K` / `Cmd+K` becomes second nature
3. **Use Specific Terms**: Better searches = better results
4. **Keyboard Navigation**: Faster than mouse for power users
5. **Empty Search**: Quick way to see your top tabs from all spaces
6. **Cross-Space Workflow**: Don't worry about which space tabs are in - just search!

---

## 🎉 Enjoy SuperOmniBar for Arc!

You're now ready to navigate your entire Arc workspace faster than ever. The cross-space search, pinned tab support, and sidebar integration make SuperOmniBar the perfect companion for Arc's unique workflow. The more you use it, the more natural it becomes. Happy browsing!

