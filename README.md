# Q&A Chatbot Application

A modern, full-stack Q&A chatbot with safety guardrails, conversation history, and a clean web interface.

## Features

- 💬 Real-time chat interface
- 🔒 Safety filters and content moderation
- 💾 Conversation history storage
- ⚡ Rate limiting to prevent abuse
- 🎨 Responsive UI with Tailwind CSS
- 📊 Chat analytics and logs
- 🚀 Production-ready architecture

## Tech Stack

- **Frontend**: React, Axios, Tailwind CSS
- **Backend**: Node.js, Express, OpenAI API
- **Database**: SQLite
- **Environment**: Docker-ready

## Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenAI API key

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/piusthebanker-cell/uncensored-ai.git
cd uncensored-ai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=20
```

### 3. Run the Application

**Backend** (in `backend` folder):
```bash
npm start
```

**Frontend** (in `frontend` folder, new terminal):
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### POST `/api/chat`
Send a message and get a response

**Request:**
```json
{
  "message": "What is machine learning?",
  "conversationId": "optional-conversation-id"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Machine learning is...",
  "conversationId": "conv-123",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### GET `/api/conversations`
Fetch all conversations for the user

### GET `/api/conversations/:id`
Fetch a specific conversation with all messages

### DELETE `/api/conversations/:id`
Delete a conversation

## Safety Features

1. **Content Filtering**: Blocks inappropriate requests
2. **Rate Limiting**: Prevents abuse (20 requests per 15 minutes)
3. **Input Validation**: Sanitizes all user inputs
4. **Output Moderation**: Uses OpenAI's moderation API
5. **Error Handling**: Safe error messages to users

## Project Structure

```
uncensored-ai/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── database.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── docker-compose.yml
```

## Development

### Running Tests

```bash
cd backend
npm test
```

### Building for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Deployment

The app is Docker-ready. Use `docker-compose up` to run both services.

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, create a GitHub issue or contact the maintainer.
