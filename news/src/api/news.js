import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchIndianNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?q=india&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    return [];
  }
};
