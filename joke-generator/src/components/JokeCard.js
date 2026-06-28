import React, { useState } from 'react';
import './JokeCard.css';

function JokeCard({ joke, onAddFavorite, isFavorited, onDelete }) {
  const [copied, setCopied] = useState(false);

  function handleCopyJoke() {
    const jokeText = joke.type === 'single' ? joke.joke : `${joke.setup}\n${joke.delivery}`;
    navigator.clipboard.writeText(jokeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleAddFavorite() {
    onAddFavorite(joke);
  }

  return (
    <div className="joke-card bg-white rounded-lg shadow-xl p-8 space-y-4 animate-fadeIn">
      {/* Joke Content */}
      <div className="space-y-3">
        {joke.type === 'single' ? (
          <p className="text-xl font-semibold text-gray-800 leading-relaxed">{joke.joke}</p>
        ) : (
          <>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-indigo-600">Setup:</span> {joke.setup}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-purple-600">Delivery:</span> {joke.delivery}
            </p>
          </>
        )}
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
          📂 {joke.category || 'General'}
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
          📝 {joke.type === 'single' ? 'Single' : 'Two-Part'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={handleCopyJoke}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-semibold"
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>

        <button
          onClick={handleAddFavorite}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
            isFavorited
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {isFavorited ? '❤️ Favorited' : '🤍 Favorite'}
        </button>

        {onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default JokeCard;
