const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateAIResponse(conversationHistory) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    // Format conversation history for OpenAI
    const messages = conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add system prompt
    const systemMessage = {
      role: 'system',
      content: `You are a helpful and friendly Q&A assistant. 
      - Provide accurate, clear, and helpful answers
      - Be respectful and professional
      - If you don't know something, say so honestly
      - Avoid making up information
      - Keep responses concise but informative`,
    };

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('❌ OpenAI API error:', error.message);
    throw new Error('Failed to generate response from AI');
  }
}

module.exports = {
  generateAIResponse,
};
