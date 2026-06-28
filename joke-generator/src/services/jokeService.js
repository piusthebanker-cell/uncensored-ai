import axios from 'axios';

const JOKE_API_BASE = 'https://v2.jokeapi.dev/joke';

/**
 * Fetch a joke from JokeAPI
 * @param {string} category - Joke category (Any, General, Programming, Knock-Knock)
 * @param {string} type - Joke type (single or twopart)
 * @returns {Promise<Object>} Joke object
 */
export async function fetchJoke(category = 'Any', type = 'single') {
  try {
    // Build the URL
    let url = `${JOKE_API_BASE}/${category}`;
    
    // Add type parameter
    const params = new URLSearchParams();
    
    if (type === 'single') {
      params.append('type', 'single');
    } else if (type === 'twopart') {
      params.append('type', 'twopart');
    }
    
    // Add safe mode for content filtering
    params.append('safe-mode', true);

    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await axios.get(fullUrl, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.data.error) {
      throw new Error('Failed to fetch joke from API');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch joke');
    }
  }
}

/**
 * Get multiple jokes
 * @param {number} count - Number of jokes to fetch
 * @param {string} category - Joke category
 * @returns {Promise<Array>} Array of jokes
 */
export async function fetchMultipleJokes(count = 5, category = 'Any') {
  const jokes = [];
  for (let i = 0; i < count; i++) {
    try {
      const joke = await fetchJoke(category);
      jokes.push(joke);
    } catch (error) {
      console.error(`Error fetching joke ${i + 1}:`, error);
    }
  }
  return jokes;
}

/**
 * Format a joke for display
 * @param {Object} joke - Joke object from API
 * @returns {string} Formatted joke text
 */
export function formatJoke(joke) {
  if (joke.type === 'single') {
    return joke.joke;
  } else if (joke.type === 'twopart') {
    return `${joke.setup}\n\n${joke.delivery}`;
  }
  return '';
}
