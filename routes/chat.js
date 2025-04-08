const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

  
    let aiReply = '';

    if (message.toLowerCase().includes('shoes')) {
      aiReply = "👟 Sure! We have a wide range of shoes available. Would you like formal, casual, or sports shoes?";
    } else if (message.toLowerCase().includes('recommend')) {
      aiReply = "🛍️ I'd recommend checking our best-sellers section! Do you have a specific category in mind?";
    } else if (message.toLowerCase().includes('hello')) {
      aiReply = "🤖 Hello there! How can I assist you with your shopping today?";
    } else {
      aiReply = "🤖 I'm here to help! Could you please tell me more specifically what you're looking for?";
    }

    res.json({ reply: aiReply });
  } catch (err) {
    console.error('❌ Mock AI error:', err);
    res.status(500).json({ error: 'Failed to get response from Mock AI' });
  }
});

module.exports = router;
