/**
 * Content script for SuperOmniBar overlay
 * Creates and manages the UI overlay on all web pages
 */

(function() {
  'use strict';
  
  let overlay = null;
  let searchInput = null;
  let resultsContainer = null;
  let modal = null;
  let isOpen = false;
  let selectedIndex = -1;
  let currentResults = [];
  let debounceTimer = null;
  let cachedData = { tabs: [], bookmarks: [], history: [] };
  let dataLoaded = false;
  
  // Initialize overlay on page load
  function initOverlay() {
    // Create overlay container
    overlay = document.createElement('div');
    overlay.id = 'super-omnibar-overlay';
    
    // Create modal
    modal = document.createElement('div');
    modal.id = 'super-omnibar-modal';
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.id = 'super-omnibar-search-container';
    
    searchInput = document.createElement('input');
    searchInput.id = 'super-omnibar-search';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search tabs, bookmarks, and history...';
    searchInput.autocomplete = 'off';
    
    // Create results container
    resultsContainer = document.createElement('div');
    resultsContainer.id = 'super-omnibar-results';
    
    // Assemble DOM
    searchContainer.appendChild(searchInput);
    modal.appendChild(searchContainer);
    modal.appendChild(resultsContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keydown', handleKeyDown);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOverlay();
      }
    });
  }
  
  // Handle keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Check for Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      e.stopPropagation();
      if (isOpen) {
        closeOverlay();
      } else {
        openOverlay();
      }
    }
    
    // Close on Escape
    if (e.key === 'Escape' && isOpen) {
      closeOverlay();
    }
  });
  
  async function openOverlay() {
    if (!overlay) {
      initOverlay();
    }
    
    isOpen = true;
    overlay.classList.add('active');
    searchInput.focus();
    searchInput.value = '';
    currentResults = [];
    selectedIndex = -1;
    
    // Load data if not already cached
    if (!dataLoaded) {
      await loadData();
    }
    
    // Show all tabs when empty
    performSearch('');
  }
  
  async function loadData() {
    try {
      const [tabs, bookmarks, history] = await Promise.all([
        chrome.runtime.sendMessage({ action: 'getTabs' }),
        chrome.runtime.sendMessage({ action: 'getBookmarks' }),
        chrome.runtime.sendMessage({ action: 'getHistory' })
      ]);
      
      cachedData.tabs = tabs;
      cachedData.bookmarks = bookmarks;
      cachedData.history = history;
      dataLoaded = true;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  
  function closeOverlay() {
    if (overlay) {
      isOpen = false;
      overlay.classList.remove('active');
      searchInput.value = '';
      currentResults = [];
      selectedIndex = -1;
    }
  }
  
  function handleSearch(e) {
    const query = e.target.value.trim();
    
    // Clear previous debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Expand modal when typing
    if (query && !modal.classList.contains('expanded')) {
      modal.classList.add('expanded');
    } else if (!query) {
      modal.classList.remove('expanded');
    }
    
    // Perform search immediately if empty query, otherwise debounce
    if (!query) {
      performSearch(query);
    } else {
      debounceTimer = setTimeout(() => {
        performSearch(query);
      }, 300);
    }
  }
  
  function performSearch(query) {
    // Use cached data - no need to fetch every time
    const { tabs, bookmarks, history } = cachedData;
    
    // Perform fuzzy search on each category
    let tabResults = [];
    let bookmarkResults = [];
    let historyResults = [];
    
    if (query) {
      tabResults = FuzzySearch.search(tabs, query, (item) => `${item.title} ${item.url}`);
      bookmarkResults = FuzzySearch.search(bookmarks, query, (item) => `${item.title} ${item.url}`);
      historyResults = FuzzySearch.search(history, query, (item) => `${item.title} ${item.url}`);
    } else {
      // Show all tabs when query is empty (no limit)
      tabResults = tabs.map(item => ({ item, score: 1 }));
      bookmarkResults = [];
      historyResults = [];
    }
    
    // Combine and store results with search query for highlighting
    const newResults = [
      ...tabResults.map(r => ({ ...r.item, category: 'tabs', searchQuery: query })),
      ...bookmarkResults.map(r => ({ ...r.item, category: 'bookmarks', searchQuery: query })),
      ...historyResults.map(r => ({ ...r.item, category: 'history', searchQuery: query }))
    ];
    
    // Always update to refresh highlights, but check if we need to rebuild DOM
    const resultsChanged = JSON.stringify(newResults.map(r => r.id)) !== JSON.stringify(currentResults.map(r => r.id));
    const queryChanged = currentResults.length > 0 && currentResults[0].searchQuery !== query;
    
    if (resultsChanged || queryChanged) {
      currentResults = newResults;
      selectedIndex = -1;
      updateResultsDisplay();
    }
  }
  
  function updateResultsDisplay() {
    const results = currentResults;
    
    if (results.length === 0) {
      if (resultsContainer.querySelector('.super-omnibar-empty')) {
        return; // Already showing empty state
      }
      resultsContainer.innerHTML = '<div class="super-omnibar-empty">No results found</div>';
      return;
    }
    
    // Remove empty state if present
    const emptyState = resultsContainer.querySelector('.super-omnibar-empty');
    if (emptyState) {
      emptyState.remove();
    }
    
    // Group results by category
    const tabs = results.filter(r => r.category === 'tabs');
    const bookmarks = results.filter(r => r.category === 'bookmarks');
    const history = results.filter(r => r.category === 'history');
    
    // Get existing groups to reuse DOM when possible
    const existingGroups = Array.from(resultsContainer.querySelectorAll('.super-omnibar-group'));
    const groupsToRender = [];
    
    // Only add groups that have matching results - filter out empty groups
    if (tabs.length > 0) groupsToRender.push({ type: 'tabs', items: tabs, title: 'Tabs' });
    if (bookmarks.length > 0) groupsToRender.push({ type: 'bookmarks', items: bookmarks, title: 'Bookmarks' });
    if (history.length > 0) groupsToRender.push({ type: 'history', items: history, title: 'History' });
    
    // Clear and rebuild for simplicity (but do it efficiently)
    // Using DocumentFragment to minimize reflows
    const fragment = document.createDocumentFragment();
    
    groupsToRender.forEach((group, groupIndex) => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'super-omnibar-group';
      
      const titleDiv = document.createElement('div');
      titleDiv.className = 'super-omnibar-group-title';
      titleDiv.textContent = group.title;
      groupDiv.appendChild(titleDiv);
      
      group.items.forEach((result) => {
        const globalIndex = results.indexOf(result);
        const resultDiv = document.createElement('div');
        resultDiv.className = 'super-omnibar-result';
        resultDiv.setAttribute('data-index', globalIndex);
        resultDiv.innerHTML = getResultItemHTML(result, globalIndex);
        resultDiv.addEventListener('click', () => handleResultClick(result));
        groupDiv.appendChild(resultDiv);
      });
      
      fragment.appendChild(groupDiv);
    });
    
    // Replace content efficiently
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(fragment);
    
    // Update selection highlight
    updateSelection(resultsContainer.querySelectorAll('.super-omnibar-result'));
  }
  
  function getResultItemHTML(result, index) {
    const faviconUrl = result.favIconUrl && result.favIconUrl.startsWith('http') 
      ? result.favIconUrl 
      : `chrome://favicon/${result.url}`;
    const fallbackIcon = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23999\' d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\'/%3E%3C/svg%3E';
    
    const query = result.searchQuery || '';
    const highlightedTitle = highlightMatches(result.title, query);
    const highlightedUrl = highlightMatches(result.url, query);
    
    return `
      <img src="${faviconUrl}" alt="" class="super-omnibar-favicon" onerror="this.src='${fallbackIcon}'">
      <div class="super-omnibar-result-content">
        <div class="super-omnibar-result-title">${highlightedTitle}</div>
        <div class="super-omnibar-result-url">${highlightedUrl}</div>
      </div>
    `;
  }
  
  function highlightMatches(text, query) {
    if (!query || !text) {
      return escapeHtml(text);
    }
    
    const escapedText = escapeHtml(text);
    const escapedQuery = escapeHtml(query);
    
    // Case-insensitive matching
    const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const highlighted = escapedText.replace(regex, '<span class="super-omnibar-highlight">$1</span>');
    
    return highlighted;
  }
  
  
  function handleKeyDown(e) {
    if (!isOpen) return;
    
    const results = resultsContainer.querySelectorAll('.super-omnibar-result');
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
        updateSelection(results);
        scrollToSelected(results);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection(results);
        scrollToSelected(results);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
          handleResultClick(currentResults[selectedIndex]);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        closeOverlay();
        break;
    }
  }
  
  function scrollToSelected(results) {
    if (selectedIndex >= 0 && results.length > 0) {
      const selectedEl = Array.from(results).find(el => {
        return parseInt(el.getAttribute('data-index')) === selectedIndex;
      });
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }
  
  function updateSelection(results) {
    if (!results) return;
    results.forEach((el, index) => {
      const dataIndex = parseInt(el.getAttribute('data-index'));
      if (dataIndex === selectedIndex) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });
  }
  
  function scrollToSelected(results) {
    if (selectedIndex >= 0 && results[selectedIndex]) {
      results[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
  
  async function handleResultClick(result) {
    try {
      if (result.category === 'tabs') {
        // Switch to existing tab
        await chrome.runtime.sendMessage({
          action: 'switchToTab',
          tabId: result.id
        });
      } else {
        // Navigate to URL (will switch to tab if open, or open new tab)
        await chrome.runtime.sendMessage({
          action: 'navigateToUrl',
          url: result.url
        });
      }
      closeOverlay();
    } catch (error) {
      console.error('Error handling result click:', error);
    }
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Initialize when DOM is ready
  function ensureBodyExists() {
    if (document.body) {
      initOverlay();
    } else {
      // Wait for body to be available
      const observer = new MutationObserver((mutations, obs) => {
        if (document.body) {
          obs.disconnect();
          initOverlay();
        }
      });
      observer.observe(document.documentElement, { childList: true });
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureBodyExists);
  } else {
    ensureBodyExists();
  }
  
  // Also listen for extension command and ping
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openOmnibar') {
      openOverlay();
    }
    if (request.action === 'ping') {
      sendResponse({ pong: true });
    }
  });
})();

