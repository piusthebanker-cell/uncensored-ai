import React from 'react';
import './ConversationHistory.css';

function ConversationHistory({
  conversations,
  currentId,
  onSelectConversation,
  onDeleteConversation,
}) {
  return (
    <div className="conversation-history">
      <h3>History</h3>
      <div className="conversation-list">
        {conversations.length === 0 ? (
          <p className="no-conversations">No conversations yet</p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${currentId === conv.id ? 'active' : ''}`}
            >
              <div
                className="conversation-text"
                onClick={() => onSelectConversation(conv.id)}
              >
                <span className="conversation-title">{conv.title}</span>
                <span className="conversation-date">
                  {new Date(conv.created_at).toLocaleDateString()}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Delete this conversation?')) {
                    onDeleteConversation(conv.id);
                  }
                }}
                title="Delete conversation"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConversationHistory;
