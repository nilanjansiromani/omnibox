# SuperOmniBar - Arc Browser Version

Arc-optimized version of SuperOmniBar extension with enhanced support for Arc's unique features.

## Arc-Specific Features

- **Cross-Space Search**: Searches tabs across all Arc spaces
- **Pinned Tabs**: Includes pinned tabs in search results (marked with 📌)
- **Sidebar Tabs**: Searches tabs in Arc's sidebar
- **History Search**: Full history search support
- **Bookmarks**: Complete bookmark search

## Installation

1. Open Arc browser and navigate to `arc://extensions/`
2. Enable **"Developer mode"** (toggle in the top right corner)
3. Click **"Load unpacked"**
4. Select the `arc/` directory from this repository
5. The extension is now installed and ready to use!

## Usage

- Press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac) on any webpage to open the omnibar
- Search across all your Arc spaces, pinned tabs, sidebar tabs, bookmarks, and history
- Pinned tabs are marked with a 📌 icon in the results

## Differences from Chrome Version

- Enhanced tab discovery across all Arc windows (spaces)
- Includes pinned tabs with visual indicator
- Searches sidebar tabs
- Optimized for Arc's multi-space workflow

## Technical Details

The Arc version uses `chrome.windows.getAll({ populate: true })` to get tabs from all windows, which in Arc corresponds to different spaces. This ensures comprehensive tab discovery across your entire Arc workspace.

