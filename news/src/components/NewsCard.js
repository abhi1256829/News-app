import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="card h-100 shadow-sm">
      {article.urlToImage && (
        <img src={article.urlToImage} className="card-img-top" alt="News Thumbnail" />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.description || 'No description available.'}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mt-auto">Read More</a>
      </div>
    </div>
  );
};

export default NewsCard;