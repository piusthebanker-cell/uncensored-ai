const validator = require('validator');

function validateInput(req, res, next) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (typeof message !== 'string') {
    return res.status(400).json({ error: 'Message must be a string' });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long (max 5000 characters)' });
  }

  // Sanitize input
  req.body.message = validator.escape(message.trim());

  next();
}

module.exports = {
  validateInput,
};
