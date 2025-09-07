import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import RomanDen from "../assets/coin.png"; // fallback image
import "../styles/CoinsDirectory.css"; // reuse the same styles

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = ({ setIsAuth }) => {
  const query = useQuery().get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const catalogueRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/coins/search?query=${encodeURIComponent(query)}&limit=20`
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  // Show "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!query) return <p>Please enter a search term.</p>;

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
      <div className="catalogue-page" ref={catalogueRef}>
        <div className="catalogue-header">
          <h1>Search results for "{query}"</h1>
        </div>

        <div className="catalogue-content">
          <div className="catalogue-list-section">
            <div className="coin-list">
              {loading ? (
                <p>Loading...</p>
              ) : results.length === 0 ? (
                <p>No coins found.</p>
              ) : (
                results.map((coin, idx) => (
                  <div key={coin._id || idx} className="coin-row-list">
                    <div className="coin-info-list">
                      <img
                        src={coin.img || RomanDen}
                        alt={coin.Name || "Coin"}
                        className="coin-img-list"
                      />
                      <div className="coin-text-list">
                        <h3>{coin.Name || "Unnamed Coin"}</h3>
                        <p>{coin.Description || "No description available"}</p>
                      </div>
                    </div>
                    <Link
                      to={`/product/${coin._id}`}
                      className="btn btn-product-view"
                      onClick={() => {
                        sessionStorage.setItem("coinsScrollY", window.scrollY);
                      }}
                    >
                      View
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {showBackToTop && (
          <button className="back-to-top" onClick={scrollToTop}>
            ↑ Top
          </button>
        )}
      </div>
    </AppLayout>
  );
};

export default SearchResults;
