require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;
const API_KEY = process.env.NEWS_API_KEY; // Put your NewsAPI key in a .env file!


app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'india',
        sortBy: 'publishedAt',
        pageSize: 28,
        apiKey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news from NewsAPI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
