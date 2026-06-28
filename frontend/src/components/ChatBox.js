import React, { useState } from 'react';
import './ChatBox.css';

function ChatBox({ onSendMessage, disabled }) {
  const [input, setInput] = useState('');

  function handleSend() {
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-box">
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          rows="2"
          disabled={disabled}
          className="message-input"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="send-btn"
        >
          {disabled ? '⏳' : '📤'} Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
