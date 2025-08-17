import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Link } from 'react-router-dom';
import RomanDen from "../assets/RomanDen.jpg";
import SilverDoll from "../assets/SilverDol.jpg";
import GoldSov from "../assets/GoldSov.jpg";
import JapOb from "../assets/JapaneseOb.jpg";
import FrenchFranc from "../assets/FrenchFra.png";
import Sycee from "../assets/ChineseSycee.jpeg";
import CanMaple from "../assets/CanadaMaple.jpg";
import "../styles/CoinsDirectory.css";

const CoinsDirectory = () => {
  const coins = [
    { title: "Ancient Roman Denarius", subtitle: "Circa 50 BC, Rome", description: "A rare Roman silver coin used during the Republic era.", price: "$1,200", img: RomanDen, country: "Rome", era: "Ancient", metal: "Silver", theme: "Empire" },
    { title: "1916 Silver Dollar", subtitle: "USA", description: "A collectible American silver dollar minted in 1916.", price: "$850", img: SilverDoll, country: "USA", era: "Modern", metal: "Silver", theme: "Currency" },
    { title: "Gold Sovereign", subtitle: "UK, 1901", description: "A British gold sovereign from the reign of Queen Victoria.", price: "$2,300", img: GoldSov, country: "UK", era: "Victorian", metal: "Gold", theme: "Monarchs" },
    { title: "Japanese Oban Coin", subtitle: "Japan, Edo Period", description: "An Edo period oval coin used by merchants in Japan.", price: "$3,750", img: JapOb, country: "Japan", era: "Edo", metal: "Gold", theme: "Trade" },
    { title: "French Franc", subtitle: "France, 1795", description: "A French coin minted after the Revolution.", price: "$620", img: FrenchFranc, country: "France", era: "Revolution", metal: "Silver", theme: "Revolution" },
    { title: "Chinese Sycee", subtitle: "Qing Dynasty", description: "A silver ingot currency used during the Qing Dynasty.", price: "$4,100", img: Sycee, country: "China", era: "Dynastic", metal: "Silver", theme: "Trade" },
    { title: "Canadian Maple Leaf", subtitle: "Canada, 1988", description: "A modern Canadian bullion coin featuring the maple leaf.", price: "$950", img: CanMaple, country: "Canada", era: "Modern", metal: "Gold", theme: "Nature" },
  ];

  // Track selected filters
  const [filters, setFilters] = useState({
    Metal: null,
    Theme: null,
    Country: null,
    Era: null,
  });

  const filterOptions = {
    Metal: ["Gold", "Silver", "Bronze", "Copper"],
    Theme: ["Empire", "Trade", "Currency", "Monarchs", "Revolution", "Nature"],
    Country: ["Rome", "USA", "UK", "Japan", "France", "China", "Canada"],
    Era: ["Ancient", "Victorian", "Edo", "Revolution", "Dynastic", "Modern"],
  };

  // Filter coins based on selected filters
  const filteredCoins = coins.filter((coin) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true; // skip if filter not selected
      return coin[key.toLowerCase()] === filters[key];
    });
  });

  const handleFilterSelect = (category, option) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category] === option ? null : option,
    }));
  };

  const resetFilters = () => {
    setFilters({
      Metal: null,
      Theme: null,
      Country: null,
      Era: null,
    });
  };

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
      <div className="catalogue-page">
        {/* Header */}
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
            
            <div className="catalogue-list-section">
                {/* Coin List */}
                <div className="coin-list">
                    {filteredCoins.map((coin, idx) => (
                        <div key={idx} className="coin-row-list">
                            <div className="coin-info-list">
                                <img src={coin.img} alt={coin.title} className="coin-img-list" />
                                <div className="coin-text-list">
                                <h3>{coin.title}</h3>
                                <p>{coin.description}</p>
                                </div>
                            </div>
                        <Link to="/product" className="btn btn-product-view">View</Link>
                        </div>
                    ))}

                    {filteredCoins.length === 0 && (
                        <p className="no-results">No coins match this filter.</p>
                    )}
                </div>

                {/* Load More */}
                <div className="load-more-wrapper">
                    <button className="load-more">Load more...</button>
                </div>
            </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CoinsDirectory;