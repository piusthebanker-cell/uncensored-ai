const { v4: uuidv4 } = require('uuid');
const { runQuery, getQuery, allQuery } = require('../database');
const { checkContentSafety, moderateResponse } = require('../utils/safetyFilter');
const { generateAIResponse } = require('../utils/openaiHelper');

async function sendMessage(req, res, next) {
  try {
    const { message, conversationId } = req.body;
    const userMessage = message.trim();

    // Check content safety
    const isSafe = await checkContentSafety(userMessage);
    if (!isSafe) {
      return res.status(400).json({
        success: false,
        error: 'Your message contains inappropriate content. Please try again.',
      });
    }

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      convId = uuidv4();
      const title = userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : '');
      await runQuery(
        'INSERT INTO conversations (id, title, user_id) VALUES (?, ?, ?)',
        [convId, title, 'default-user']
      );
    }

    // Save user message
    const userMsgId = uuidv4();
    await runQuery(
      'INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)',
      [userMsgId, convId, 'user', userMessage]
    );

    // Get conversation history
    const history = await allQuery(
      'SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC',
      [convId]
    );

    // Generate AI response
    const aiResponse = await generateAIResponse(history);

    // Moderate AI response
    const isResponseSafe = await moderateResponse(aiResponse);
    if (!isResponseSafe) {
      return res.status(500).json({
        success: false,
        error: 'An error occurred while processing your request. Please try again.',
      });
    }

    // Save AI response
    const aiMsgId = uuidv4();
    await runQuery(
      'INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)',
      [aiMsgId, convId, 'assistant', aiResponse]
    );

    // Update conversation timestamp
    await runQuery(
      'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [convId]
    );

    res.json({
      success: true,
      response: aiResponse,
      conversationId: convId,
      messageId: aiMsgId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}

async function getConversations(req, res, next) {
  try {
    const conversations = await allQuery(
      'SELECT id, title, created_at, updated_at FROM conversations ORDER BY updated_at DESC LIMIT 50'
    );

    res.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
}

async function getConversation(req, res, next) {
  try {
    const { id } = req.params;

    const conversation = await getQuery(
      'SELECT * FROM conversations WHERE id = ?',
      [id]
    );

    if (!conversation) {
      return res.status(404).json({ success: false, error: 'Conversation not found' });
    }

    const messages = await allQuery(
      'SELECT id, role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at ASC',
      [id]
    );

    res.json({
      success: true,
      data: {
        ...conversation,
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteConversation(req, res, next) {
  try {
    const { id } = req.params;

    await runQuery('DELETE FROM messages WHERE conversation_id = ?', [id]);
    await runQuery('DELETE FROM conversations WHERE id = ?', [id]);

    res.json({ success: true, message: 'Conversation deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendMessage,
  getConversations,
  getConversation,
  deleteConversation,
};
