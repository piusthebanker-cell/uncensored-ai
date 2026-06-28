import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatBox from './components/ChatBox';
import ConversationHistory from './components/ConversationHistory';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/conversations`);
      setConversations(response.data.data || []);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  }

  async function loadConversation(conversationId) {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/chat/conversations/${conversationId}`
      );
      setMessages(response.data.data.messages || []);
      setCurrentConversationId(conversationId);
      setError(null);
    } catch (err) {
      setError('Failed to load conversation');
      console.error('Failed to load conversation:', err);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(userMessage) {
    if (!userMessage.trim()) return;

    try {
      setLoading(true);
      setError(null);

      // Add user message to UI
      const userMsg = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Send to API
      const response = await axios.post(`${API_BASE_URL}/chat/message`, {
        message: userMessage,
        conversationId: currentConversationId,
      });

      if (!response.data.success) {
        setError(response.data.error || 'Failed to send message');
        setMessages((prev) => prev.slice(0, -1)); // Remove user message
        return;
      }

      // Add AI response
      const aiMsg = {
        id: response.data.messageId,
        role: 'assistant',
        content: response.data.response,
        created_at: response.data.timestamp,
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Update conversation ID if new
      if (!currentConversationId) {
        setCurrentConversationId(response.data.conversationId);
      }

      // Reload conversations
      loadConversations();
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        'Failed to send message';
      setError(errorMsg);
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteConversation(conversationId) {
    try {
      await axios.delete(`${API_BASE_URL}/chat/conversations/${conversationId}`);
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
        setMessages([]);
      }
      loadConversations();
    } catch (err) {
      setError('Failed to delete conversation');
      console.error('Failed to delete conversation:', err);
    }
  }

  function startNewConversation() {
    setCurrentConversationId(null);
    setMessages([]);
    setError(null);
  }

  return (
    <div className="App">
      <div className="app-container">
        <div className="sidebar">
          <button className="new-chat-btn" onClick={startNewConversation}>
            ➕ New Chat
          </button>
          <ConversationHistory
            conversations={conversations}
            currentId={currentConversationId}
            onSelectConversation={loadConversation}
            onDeleteConversation={deleteConversation}
          />
        </div>
        <div className="main-content">
          <div className="chat-header">
            <h1>Q&A Chatbot</h1>
            <p>Ask me anything!</p>
          </div>
          <div className="messages-container">
            {messages.length === 0 && !error && (
              <div className="empty-state">
                <h2>Welcome to Q&A Chatbot</h2>
                <p>Start a new conversation by typing your question below.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.role}`}>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <ChatBox onSendMessage={sendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
