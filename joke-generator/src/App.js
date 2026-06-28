import React, { useState, useEffect } from 'react';
import JokeForm from './components/JokeForm';
import JokeCard from './components/JokeCard';
import { fetchJoke } from './services/jokeService';
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('generator');
  const [filters, setFilters] = useState({
    category: 'Any',
    type: 'single',
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('jokesFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jokesFavorites', JSON.stringify(favorites));
  }, [favorites]);

  async function handleGetJoke() {
    setLoading(true);
    setError(null);
    try {
      const newJoke = await fetchJoke(filters.category, filters.type);
      setJoke(newJoke);
    } catch (err) {
      setError(
        err.message || 'Failed to fetch joke. Please try again later.'
      );
      console.error('Error fetching joke:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
  }

  function handleAddFavorite(jokeToAdd) {
    const isFavorited = favorites.some(
      (fav) =>
        fav.setup === jokeToAdd.setup &&
        fav.delivery === jokeToAdd.delivery &&
        fav.joke === jokeToAdd.joke
    );

    if (isFavorited) {
      setFavorites(favorites.filter(
        (fav) =>
          !(fav.setup === jokeToAdd.setup &&
            fav.delivery === jokeToAdd.delivery &&
            fav.joke === jokeToAdd.joke)
      ));
    } else {
      setFavorites([...favorites, { ...jokeToAdd, id: Date.now() }]);
    }
  }

  function handleDeleteFavorite(id) {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  }

  function isFavorited(jokeToCheck) {
    return favorites.some(
      (fav) =>
        fav.setup === jokeToCheck.setup &&
        fav.delivery === jokeToCheck.delivery &&
        fav.joke === jokeToCheck.joke
    );
  }

  return (
    <div className="App">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-2">😂 Joke Generator</h1>
            <p className="text-white text-opacity-90">Get unlimited laughs with random jokes!</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'generator'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              🎭 Generator
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'favorites'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              ⭐ Favorites ({favorites.length})
            </button>
          </div>

          {/* Generator Tab */}
          {activeTab === 'generator' && (
            <div className="space-y-6">
              <JokeForm
                onGetJoke={handleGetJoke}
                onFilterChange={handleFilterChange}
                loading={loading}
                filters={filters}
              />

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-indigo-600"></div>
                </div>
              )}

              {joke && (
                <JokeCard
                  joke={joke}
                  onAddFavorite={handleAddFavorite}
                  isFavorited={isFavorited(joke)}
                />
              )}

              {!joke && !loading && !error && (
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-8 text-center text-white">
                  <p className="text-lg">Click "Get Joke" to start laughing! 🎉</p>
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {favorites.length === 0 ? (
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-8 text-center text-white">
                  <p className="text-lg">No favorite jokes yet. Start saving! 💝</p>
                </div>
              ) : (
                favorites.map((fav) => (
                  <div key={fav.id} className="space-y-3">
                    <JokeCard
                      joke={fav}
                      onAddFavorite={handleAddFavorite}
                      isFavorited={true}
                      onDelete={() => handleDeleteFavorite(fav.id)}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
