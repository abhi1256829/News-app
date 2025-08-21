import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // <-- set in your .env

const fetchIndianNews = async () => {
  try {
    const url = `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&pageSize=28&apiKey=${API_KEY}`;
    const res = await axios.get(url);
    return res.data.articles || [];
  } catch (err) {
    console.log('Error fetching news:', err);
    return [];
  }
};

// Component for showing/hiding scroll to top button
function ScrollToTopScript() {
  useEffect(() => {
    const scrollBtn = document.getElementById("scrollTopBtn");
    const onScroll = () => {
      if (scrollBtn)
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

// Main application component
const App = () => {
  const [articles, setArticles] = useState([]);

  const [menu, setMenu] = useState("home");

  useEffect(() => {
    fetchIndianNews().then(setArticles);
  }, []);

  return (
    <>
      {/* Navigation Bar */}
    
        <div className="container">
          {/* Left-aligned Brand */}
          <div className="navbar-brand" href="#" onClick={() => setMenu("home")}>
            <span >
              📰 News Nuggets
            </span>
          </div>
          {/* Navigation links aligned right */}
            <ul className="navbar-nav">
                <a onClick={()=>setMenu("home")} className='nav-link'  href="#">
                  Home
                </a>
                <a onClick={()=> setMenu("about")} className='nav-link' href="#">
                  About
                </a>
                <a onClick={()=> setMenu("contact")} className='nav-link' href="#">
                  Contact
                </a>
            </ul>
        </div>
      

      {/* Main React Content (news etc.) */}
      <div className="container-py-4">
        <h2 className="mb-4">Welcome to News Nuggets!</h2>
        <div className="news-section my-4">
  {articles.length === 0 ? (
    <p className="loading text-center py-5">Loading news...</p>
  ) : (
    <div className="row news-list">
      {articles.map((article, idx) => (
        <div className="col-md-6 col-lg-4 mb-4" key={idx}>
          <div className="card h-100 shadow-sm news-card">
            {article.urlToImage && (
              <img
                className="card-img-top news-img"
                src={article.urlToImage}
                alt={article.title}
              />
            )}
            <div className="card-body d-flex flex-column">
              <h5 className="card-title news-title">{article.title || 'No Title'}</h5>
              <p className="card-text news-desc">{article.description || 'No description available.'}</p>
            </div>
            <div className="card-footer bg-white border-0 news-footer d-flex justify-content-between align-items-center">
              <span className="news-date">
                {article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ""}
              </span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary news-link"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
</div>

      {/* Footer */}
      <footer className="footer py-4 mt-5 text-center">
        <div className="container-footer">
          <a className="mb-1">
            © 2025 <strong>News Nuggets</strong> | All rights reserved.
          </a>
          {/* <div>
            <a href="https://www.facebook.com/">Facebook</a> ·
            <a href="https://x.com/">Twitter</a> ·
            <a href="https://www.linkedin.com/">LinkedIn</a>
          </div> */}
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        className="top-btn"
        style={{ position: "fixed", bottom: 20, right: 20, display: "none", zIndex: 1000 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        id="scrollTopBtn"
      >
        ↑ Top
      </button>

      {/* Scroll-to-top logic */}
      <ScrollToTopScript />
    </>
  );
};

export default App;
