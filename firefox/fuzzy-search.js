/**
 * Fuzzy search utility for matching titles and URLs
 */
class FuzzySearch {
  /**
   * Calculate fuzzy match score for a string
   * @param {string} text - The text to search in
   * @param {string} query - The search query
   * @returns {number} - Score between 0 and 1, higher is better match
   */
  static score(text, query) {
    if (!query) return 1;
    
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // Exact match gets highest score
    if (lowerText === lowerQuery) return 1;
    
    // Starts with query gets high score
    if (lowerText.startsWith(lowerQuery)) return 0.9;
    
    // Word boundary match - query appears as a complete word or at word boundaries
    const wordBoundaryRegex = new RegExp(`\\b${lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (wordBoundaryRegex.test(lowerText)) return 0.75;
    
    // Contains query as substring gets medium score (but lower than word boundary)
    if (lowerText.includes(lowerQuery)) return 0.6;
    
    // Check if query appears as consecutive characters (word boundary or within words)
    // This is stricter than pure fuzzy - characters must be close together
    let textIndex = 0;
    let queryIndex = 0;
    let firstMatchIndex = -1;
    let lastMatchIndex = -1;
    
    while (textIndex < lowerText.length && queryIndex < lowerQuery.length) {
      if (lowerText[textIndex] === lowerQuery[queryIndex]) {
        if (firstMatchIndex === -1) {
          firstMatchIndex = textIndex;
        }
        lastMatchIndex = textIndex;
        queryIndex++;
      }
      textIndex++;
    }
    
    // If all query characters were found in order
    if (queryIndex === lowerQuery.length && firstMatchIndex !== -1) {
      // Calculate how spread out the matches are
      const spread = lastMatchIndex - firstMatchIndex;
      const maxSpread = lowerQuery.length * 3; // Allow characters to be up to 3x query length apart
      
      // Only return a score if characters are reasonably close together
      if (spread <= maxSpread) {
        // Score decreases as spread increases
        const ratio = Math.max(0, 1 - (spread / maxSpread));
        // Minimum score of 0.4, maximum of 0.6 for fuzzy matches
        return 0.4 + (ratio * 0.2);
      }
    }
    
    return 0;
  }
  
  /**
   * Search through items with fuzzy matching
   * @param {Array} items - Array of items to search
   * @param {string} query - Search query
   * @param {Function} getText - Function to extract searchable text from item
   * @returns {Array} - Sorted array of items with scores
   */
  static search(items, query, getText = (item) => item.title || item.url || '') {
    if (!query) {
      return items.map(item => ({ item, score: 1 }));
    }
    
    const results = items.map(item => {
      const text = getText(item);
      const titleScore = this.score(item.title || '', query);
      const urlScore = this.score(item.url || '', query);
      const combinedScore = Math.max(titleScore, urlScore * 0.8); // Title matches slightly weighted higher
      
      return { item, score: combinedScore };
    }).filter(result => result.score >= 0.5) // Only show results with good matches (strict threshold)
      .sort((a, b) => b.score - a.score);
    
    return results;
  }
}

