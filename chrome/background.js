/**
 * Background service worker for SuperOmniBar
 * Handles Chrome API access for tabs, bookmarks, and history
 */

// Inject content script into all existing tabs when extension is installed/updated
chrome.runtime.onInstalled.addListener(async () => {
  try {
    const tabs = await chrome.tabs.query({});
    const injectionPromises = tabs.map(tab => {
      // Skip chrome:// and chrome-extension:// pages
      if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://'))) {
        return Promise.resolve();
      }
      
      // Inject CSS and scripts into the tab
      return Promise.all([
        chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ['styles.css']
        }).catch(() => {}),
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['fuzzy-search.js', 'content.js']
        }).catch(() => {})
      ]).catch(error => {
        // Ignore errors for tabs that can't be injected (like chrome:// pages)
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
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only inject when tab is complete and is a web page
  if (changeInfo.status === 'complete' && tab.url && 
      !tab.url.startsWith('chrome://') && 
      !tab.url.startsWith('chrome-extension://')) {
    try {
      // Check if content script is already injected by trying to send a message
      chrome.tabs.sendMessage(tabId, { action: 'ping' }).catch(() => {
        // If message fails, content script is not loaded, so inject it
        Promise.all([
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['styles.css']
          }).catch(() => {}),
          chrome.scripting.executeScript({
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
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-omnibar') {
    // Send message to the active tab to open the omnibar
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'openOmnibar' }).catch(() => {
          // Ignore errors for tabs that don't have content script loaded yet
        });
      }
    });
  }
});

// Message handler for content script requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
    const tabs = await chrome.tabs.query({});
    return tabs.map(tab => ({
      id: tab.id,
      title: tab.title || tab.url,
      url: tab.url,
      favIconUrl: tab.favIconUrl || `chrome://favicon/${tab.url}`,
      type: 'tab'
    }));
  } catch (error) {
    console.error('Error getting tabs:', error);
    return [];
  }
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
            favIconUrl: `chrome://favicon/${node.url}`,
            type: 'bookmark'
          });
        }
        if (node.children) {
          traverseBookmarks(node.children);
        }
      }
    }
    
    const tree = await chrome.bookmarks.getTree();
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
    const historyItems = await chrome.history.search({
      text: '',
      maxResults: 1000,
      startTime: 0
    });
    
    return historyItems.map(item => ({
      id: item.id,
      title: item.title || item.url,
      url: item.url,
      favIconUrl: `chrome://favicon/${item.url}`,
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
    await chrome.tabs.update(tabId, { active: true });
    const window = await chrome.tabs.get(tabId);
    await chrome.windows.update(window.windowId, { focused: true });
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
    const allTabs = await chrome.tabs.query({});
    const matchingTab = allTabs.find(tab => {
      if (!tab.url) return false;
      const normalizedTab = normalizeUrl(tab.url);
      return normalizedTab === normalizedTarget;
    });
    
    if (matchingTab) {
      // Switch to existing tab
      await chrome.tabs.update(matchingTab.id, { active: true });
      const window = await chrome.tabs.get(matchingTab.id);
      await chrome.windows.update(window.windowId, { focused: true });
      return { success: true, action: 'switched' };
    } else {
      // Open in new tab
      await chrome.tabs.create({ url: url, active: true });
      return { success: true, action: 'opened' };
    }
  } catch (error) {
    console.error('Error navigating to URL:', error);
    return { success: false, error: error.message };
  }
}

