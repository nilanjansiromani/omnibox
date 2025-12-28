# SuperOmniBar - Firefox Extension

Firefox version of SuperOmniBar extension.

## Installation

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file from this directory
5. The extension is now installed!

## Differences from Chrome Version

- Uses `browser` API with `chrome` fallback for compatibility
- Handles Firefox-specific URLs (`about:`, `moz-extension://`)
- Compatible with Firefox 109+ (Manifest V3)

## Features

Same as Chrome version:
- Fuzzy search across tabs, bookmarks, and history
- Liquid glass design
- Keyboard shortcut: `Ctrl+K` (or `Cmd+K` on Mac)
- Grouped results: Tabs → Bookmarks → History
- Yellow highlighting for matches

