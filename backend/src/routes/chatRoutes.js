const express = require('express');
const router = express.Router();
const { sendMessage, getConversations, getConversation, deleteConversation } = require('../controllers/chatController');
const { validateInput } = require('../middleware/validation');

router.post('/message', validateInput, sendMessage);
router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversation);
router.delete('/conversations/:id', deleteConversation);

module.exports = router;
