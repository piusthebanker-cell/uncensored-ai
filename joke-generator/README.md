# Random Joke Generator

A fun web application that fetches and displays random jokes from an external API. Built with React and styled with Tailwind CSS.

## Features

- 🎭 Generate random jokes from JokeAPI
- 📂 Filter jokes by category (General, Programming, Knock-Knock)
- ⏱️ Choose joke type (Single or Two-Part)
- 💾 Save favorite jokes
- 🎨 Beautiful, responsive UI
- ⚡ Real-time joke fetching
- 🚫 Blacklist content filters

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **API**: JokeAPI (https://jokeapi.dev)
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## Prerequisites

- Node.js (v14+)
- npm or yarn

## Installation

```bash
cd joke-generator
npm install
```

## Running the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## How to Use

1. **Generate Joke**: Click the "Get Random Joke" button to fetch a new joke
2. **Filter by Category**: Select a category from the dropdown (General, Programming, Knock-Knock)
3. **Choose Type**: Select "Single" for one-liner or "Two-Part" for setup + delivery
4. **Save Favorites**: Click the heart icon to save jokes to your favorites
5. **View Favorites**: Access saved jokes from the "My Favorites" tab
6. **Copy Joke**: Click the copy icon to copy the joke to clipboard

## API Endpoints

**Base URL**: `https://api.api-ninjas.com/v1/jokes`

We also use JokeAPI as an alternative:
**Base URL**: `https://v2.jokeapi.dev/joke/`

### Example Requests

```bash
# Get a random joke
GET https://v2.jokeapi.dev/joke/Any

# Get a programming joke
GET https://v2.jokeapi.dev/joke/Programming

# Get a knock-knock joke
GET https://v2.jokeapi.dev/joke/Knock-Knock
```

## Project Structure

```
joke-generator/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── JokeCard.js
│   │   ├── JokeCard.css
│   │   ├── JokeForm.js
│   │   └── JokeForm.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── services/
│       └── jokeService.js
├── package.json
└── README.md
```

## Available Joke Categories

- **General**: General jokes
- **Programming**: Programming/developer jokes
- **Knock-Knock**: Knock-knock jokes
- **Any**: Random from all categories

## Joke Types

- **Single**: One-liner jokes
- **Twopart**: Setup and delivery jokes

## Features in Detail

### Favorite Jokes
Jokes are saved to browser's local storage, so they persist even after page refresh.

### Copy to Clipboard
Easily copy jokes to share with others.

### Error Handling
Friendly error messages if the API is unavailable or returns an error.

### Loading States
Visual feedback while fetching jokes from the API.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Contributing

Feel free to submit pull requests or open issues.

## License

MIT License - see LICENSE file for details

## Resources

- [JokeAPI Documentation](https://jokeapi.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
