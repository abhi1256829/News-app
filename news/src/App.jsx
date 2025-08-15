import React, { useEffect, useState } from 'react';
import { fetchIndianNews } from './api/news';
import NewsCard from './components/NewsCard';

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const news = await fetchIndianNews();
      console.log("📦 News API response:", news);
      setArticles(news);
    };
    loadNews();
  }, []);

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">📰 News Nuggets</h1>
      </div>
      {articles.length === 0 ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;