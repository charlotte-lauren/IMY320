import React, { useState, useEffect, useRef } from "react";
import AppLayout from "../components/AppLayout";
import { Link } from "react-router-dom";
import RomanDen from "../assets/coin.png"; // fallback image
import "../styles/CoinsDirectory.css";

// Map filter categories to actual coin fields in DB
const filterFieldMap = {
  Metal: "Composition",
  Theme: "Themes",
  Country: "Country",
  Era: "Era"
};

const CoinsDirectory = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12);
  const [filters, setFilters] = useState({
    Metal: null,
    Theme: null,
    Country: null,
    Era: null
  });
  const [showBackToTop, setShowBackToTop] = useState(false);

  const catalogueRef = useRef(null);

  const filterOptions = {
    Metal: ["Gold", "Silver", "Bronze", "Copper"],
    Theme: ["Empire", "Trade", "Currency", "Monarchs", "Revolution", "Nature"],
    Country: ["Rome", "USA", "UK", "Japan", "France", "China", "Canada"],
    Era: ["Ancient", "Victorian", "Edo", "Revolution", "Dynastic", "Modern"]
  };

  const fetchCoins = async (newLimit) => {
    setLoading(true);
    const scrollPosition = window.scrollY; // save current scroll
    try {
      const res = await fetch(`/api/coins?limit=${newLimit}`);
      const data = await res.json();
      setCoins(data);
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: "auto" });
      }, 50);
    } catch (err) {
      console.error("Failed to fetch coins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins(limit);
  }, [limit]);

  // Show back to top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCoins = coins.filter((coin) =>
    Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      const field = filterFieldMap[key];
      const coinValue = coin[field]?.toString().toLowerCase();
      const filterValue = filters[key].toLowerCase();
      return coinValue === filterValue;
    })
  );

  const handleFilterSelect = (category, option) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category] === option ? null : option
    }));
  };

  const resetFilters = () => {
    setFilters({
      Metal: null,
      Theme: null,
      Country: null,
      Era: null
    });
  };

  const slugify = (text) =>
    text
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || "";

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p>Loading coins...</p>;

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
      <div className="catalogue-page" ref={catalogueRef}>
        <div className="catalogue-header">
          <h1>PRODUCT CATALOGUE</h1>
        </div>

        <div className="catalogue-content">
          {/* Sidebar Filters */}
          <aside className="filters">
            <h2>Filter By</h2>
            <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
            <ul className="filter-list">
              {Object.keys(filterOptions).map((category) => (
                <li key={category}>
                  <h3>{category}</h3>
                  <ul className="dropdown">
                    {filterOptions[category].map((option) => (
                      <li key={option}>
                        <button
                          className={`dropdown-item ${filters[category] === option ? "active" : ""}`}
                          onClick={() => handleFilterSelect(category, option)}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </aside>

          {/* Coin List */}
          <div className="catalogue-list-section">
            <div className="coin-list">
              {filteredCoins.map((coin, idx) => (
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
                  <Link to={`/product/${slugify(coin.Name)}`} className="btn btn-product-view">
                    View
                  </Link>
                </div>
              ))}

              {filteredCoins.length === 0 && (
                <p className="no-results">No coins match this filter.</p>
              )}
            </div>

            <div className="load-more-wrapper">
              <button className="load-more" onClick={handleLoadMore}>
                Load more...
              </button>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            className="back-to-top"
            onClick={scrollToTop}
          >
            ↑ Top
          </button>
        )}
      </div>
    </AppLayout>
  );
};

export default CoinsDirectory;
