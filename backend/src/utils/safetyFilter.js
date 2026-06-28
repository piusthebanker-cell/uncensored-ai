const BLOCKED_KEYWORDS = [
  'illegal',
  'violence',
  'hate',
  'explicit',
  'abuse',
];

const UNSAFE_PATTERNS = [
  /hack|bypass|exploit/i,
  /sql injection|xss/i,
  /terrorism|bomb/i,
];

async function checkContentSafety(message) {
  // Check for blocked keywords
  for (const keyword of BLOCKED_KEYWORDS) {
    if (message.toLowerCase().includes(keyword)) {
      return false;
    }
  }

  // Check for unsafe patterns
  for (const pattern of UNSAFE_PATTERNS) {
    if (pattern.test(message)) {
      return false;
    }
  }

  return true;
}

async function moderateResponse(response) {
  // Check AI response for safety
  if (!response || response.length === 0) {
    return false;
  }

  for (const keyword of BLOCKED_KEYWORDS) {
    if (response.toLowerCase().includes(keyword) && response.toLowerCase().includes('should not')) {
      return false;
    }
  }

  return true;
}

module.exports = {
  checkContentSafety,
  moderateResponse,
};
