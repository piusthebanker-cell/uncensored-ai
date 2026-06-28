import React, { useState } from 'react';
import './JokeForm.css';

const CATEGORIES = ['Any', 'General', 'Programming', 'Knock-Knock'];
const TYPES = ['single', 'twopart'];

function JokeForm({ onGetJoke, onFilterChange, loading, filters }) {
  const [category, setCategory] = useState(filters.category || 'Any');
  const [type, setType] = useState(filters.type || 'single');

  function handleCategoryChange(e) {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, type });
  }

  function handleTypeChange(e) {
    const newType = e.target.value;
    setType(newType);
    onFilterChange({ category, type: newType });
  }

  return (
    <div className="joke-form bg-white rounded-lg shadow-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Joke Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            📂 Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Type Selection */}
        <div>
          <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
            📝 Type
          </label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          >
            <option value="single">Single (One-liner)</option>
            <option value="twopart">Two-part (Setup + Delivery)</option>
          </select>
        </div>
      </div>

      {/* Get Joke Button */}
      <button
        onClick={onGetJoke}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block animate-spin">⏳</span>
            Loading...
          </span>
        ) : (
          '🎭 Get Random Joke'
        )}
      </button>
    </div>
  );
}

export default JokeForm;
