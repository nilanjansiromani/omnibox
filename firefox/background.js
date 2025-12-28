/**
 * Background service worker for SuperOmniBar (Firefox)
 * Handles Firefox API access for tabs, bookmarks, and history
 */

// Use browser API (Firefox) with chrome fallback for compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Inject content script into all existing tabs when extension is installed/updated
browserAPI.runtime.onInstalled.addListener(async () => {
  try {
    const tabs = await browserAPI.tabs.query({});
    const injectionPromises = tabs.map(tab => {
      // Skip about:, moz-extension://, and other internal pages
      if (tab.url && (
        tab.url.startsWith('about:') || 
        tab.url.startsWith('moz-extension://') ||
        tab.url.startsWith('chrome://') ||
        tab.url.startsWith('chrome-extension://')
      )) {
        return Promise.resolve();
      }
      
      // Inject CSS and scripts into the tab
      return Promise.all([
        browserAPI.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ['styles.css']
        }).catch(() => {}),
        browserAPI.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['fuzzy-search.js', 'content.js']
        }).catch(() => {})
      ]).catch(error => {
        // Ignore errors for tabs that can't be injected
        console.log(`Could not inject into tab ${tab.id}:`, error.message);
      });
    });
    
    await Promise.all(injectionPromises);
    console.log('Content scripts injected into existing tabs');
  } catch (error) {
    console.error('Error injecting content scripts:', error);
  }
});

// Also inject when new tabs are created (for tabs opened before extension was installed)
browserAPI.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only inject when tab is complete and is a web page
  if (changeInfo.status === 'complete' && tab.url && 
      !tab.url.startsWith('about:') && 
      !tab.url.startsWith('moz-extension://') &&
      !tab.url.startsWith('chrome://') && 
      !tab.url.startsWith('chrome-extension://')) {
    try {
      // Check if content script is already injected by trying to send a message
      browserAPI.tabs.sendMessage(tabId, { action: 'ping' }).catch(() => {
        // If message fails, content script is not loaded, so inject it
        Promise.all([
          browserAPI.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['styles.css']
          }).catch(() => {}),
          browserAPI.scripting.executeScript({
            target: { tabId: tabId },
            files: ['fuzzy-search.js', 'content.js']
          }).catch(() => {})
        ]).catch(error => {
          console.log(`Could not inject into tab ${tabId}:`, error.message);
        });
      });
    } catch (error) {
      // Ignore errors
    }
  }
});

// Handle keyboard shortcut command
browserAPI.commands.onCommand.addListener((command) => {
  if (command === 'open-omnibar') {
    // Send message to all tabs to ensure it works (some browsers need this)
    browserAPI.tabs.query({}, (allTabs) => {
      // Try active tab first
      const activeTab = allTabs.find(tab => tab.active);
      if (activeTab) {
        browserAPI.tabs.sendMessage(activeTab.id, { action: 'openOmnibar' }).catch(() => {
          // If that fails, try all tabs
          allTabs.forEach(tab => {
            if (tab.url && !tab.url.startsWith('about:') && !tab.url.startsWith('moz-extension://')) {
              browserAPI.tabs.sendMessage(tab.id, { action: 'openOmnibar' }).catch(() => {});
            }
          });
        });
      } else {
        // Fallback: try all tabs
        allTabs.forEach(tab => {
          if (tab.url && !tab.url.startsWith('about:') && !tab.url.startsWith('moz-extension://')) {
            browserAPI.tabs.sendMessage(tab.id, { action: 'openOmnibar' }).catch(() => {});
          }
        });
      }
    });
  }
});

// Message handler for content script requests
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTabs') {
    getTabs().then(sendResponse);
    return true; // Indicates async response
  }
  
  if (request.action === 'getBookmarks') {
    getBookmarks().then(sendResponse);
    return true;
  }
  
  if (request.action === 'getHistory') {
    getHistory().then(sendResponse);
    return true;
  }
  
  if (request.action === 'switchToTab') {
    switchToTab(request.tabId).then(sendResponse);
    return true;
  }
  
  if (request.action === 'navigateToUrl') {
    navigateToUrl(request.url, request.tabId).then(sendResponse);
    return true;
  }
});

/**
 * Get all open tabs
 */
async function getTabs() {
  try {
    const tabs = await browserAPI.tabs.query({});
    return tabs.map(tab => ({
      id: tab.id,
      title: tab.title || tab.url,
      url: tab.url,
      favIconUrl: tab.favIconUrl || getFaviconUrl(tab.url),
      type: 'tab'
    }));
  } catch (error) {
    console.error('Error getting tabs:', error);
    return [];
  }
}

/**
 * Get favicon URL (Firefox-compatible)
 */
function getFaviconUrl(url) {
  if (!url || url.startsWith('about:') || url.startsWith('moz-extension://')) {
    return 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23999\' d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\'/%3E%3C/svg%3E';
  }
  // Firefox doesn't have chrome://favicon/, so use the page's favicon or a default
  return `chrome://favicon/${url}`;
}

/**
 * Get all bookmarks recursively
 */
async function getBookmarks() {
  try {
    const bookmarks = [];
    
    function traverseBookmarks(nodes) {
      for (const node of nodes) {
        if (node.url) {
          bookmarks.push({
            id: node.id,
            title: node.title,
            url: node.url,
            favIconUrl: getFaviconUrl(node.url),
            type: 'bookmark'
          });
        }
        if (node.children) {
          traverseBookmarks(node.children);
        }
      }
    }
    
    const tree = await browserAPI.bookmarks.getTree();
    traverseBookmarks(tree);
    
    return bookmarks;
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
}

/**
 * Get recent history (last 1000 items)
 */
async function getHistory() {
  try {
    const historyItems = await browserAPI.history.search({
      text: '',
      maxResults: 1000,
      startTime: 0
    });
    
    return historyItems.map(item => ({
      id: item.id,
      title: item.title || item.url,
      url: item.url,
      favIconUrl: getFaviconUrl(item.url),
      type: 'history',
      visitCount: item.visitCount || 0,
      lastVisitTime: item.lastVisitTime || 0
    }));
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

/**
 * Switch to an existing tab
 */
async function switchToTab(tabId) {
  try {
    await browserAPI.tabs.update(tabId, { active: true });
    const tab = await browserAPI.tabs.get(tabId);
    await browserAPI.windows.update(tab.windowId, { focused: true });
    return { success: true };
  } catch (error) {
    console.error('Error switching to tab:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Navigate to a URL (switch to tab if open, otherwise open new tab)
 */
async function navigateToUrl(url, currentTabId) {
  try {
    // Normalize URL for comparison (remove trailing slashes, etc.)
    const normalizeUrl = (u) => {
      try {
        const urlObj = new URL(u);
        urlObj.hash = '';
        let normalized = urlObj.toString();
        if (normalized.endsWith('/')) {
          normalized = normalized.slice(0, -1);
        }
        return normalized;
      } catch {
        return u;
      }
    };
    
    const normalizedTarget = normalizeUrl(url);
    
    // Check if URL is already open in a tab
    const allTabs = await browserAPI.tabs.query({});
    const matchingTab = allTabs.find(tab => {
      if (!tab.url) return false;
      const normalizedTab = normalizeUrl(tab.url);
      return normalizedTab === normalizedTarget;
    });
    
    if (matchingTab) {
      // Switch to existing tab
      await browserAPI.tabs.update(matchingTab.id, { active: true });
      const tab = await browserAPI.tabs.get(matchingTab.id);
      await browserAPI.windows.update(tab.windowId, { focused: true });
      return { success: true, action: 'switched' };
    } else {
      // Open in new tab
      await browserAPI.tabs.create({ url: url, active: true });
      return { success: true, action: 'opened' };
    }
  } catch (error) {
    console.error('Error navigating to URL:', error);
    return { success: false, error: error.message };
  }
}
