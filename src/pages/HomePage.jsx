import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import RomanDen from '../assets/coin.png';
import AppLayout from "../components/AppLayout";

const HomePage = () => {
  console.log("Loading")
  const featuredRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      console.log("Loading coins")
      try {
        const res = await fetch('/api/coins?limit=6');
        const data = await res.json();
        console.log("Fetched coins: ", data)
        setCoins(data);
      } catch (err) {
        console.error('Failed to fetch coins:', err);
      }
    };
    fetchCoins();
  }, []);

  // Scroll amount per click (match .coin-card width + margin-right)
  const scrollAmount = 220 + 16; // 220px width + 16px margin-right approx

  const scrollLeft = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSellClick = () => {
    alert('Redirect to Sell Coins page');
  };

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
    <div className='homePage'>
      <section className="hero">
        <div className="hero-content">
          <h1>Discover & Collect Rare Coins From Around the World</h1>
          <p>Your journey to the perfect collection starts here.</p>
          <div className="hero-btns">
            {/* <button className="btn">Explore Marketplace</button>
            <button className="btn tertiary">Start Collecting</button> */}
            <Link to="/coins" className="btn">Explore Marketplace</Link>
          </div>
        </div>
      </section>

      <main className='mainClass'>
        <section className="featured">
          <div className="featured-header">
            <h2>Featured Coins</h2>
            {/* <button onClick={() => setIsPaused(!isPaused)} className="pause-btn">
              {isPaused ? '▶' : '⏸'}
            </button> */}
          </div>

          <div className="carousel-wrapper">
            <button className="nav-btn left" onClick={scrollLeft} aria-label="Scroll left">
              &#9664;
            </button>

            <div className="carousel" ref={featuredRef}>
              {[...coins, { shop: true }].map((coin, idx) =>
                coin.shop ? (
                  <Link to="/shop" className="coin-card shop-card" key="shop-link">
                    <div className="coin-info">
                      <h3>View All Coins</h3>
                      <p>Explore our full catalog</p>
                      <div className="coin-price">Shop &rarr;</div>
                    </div>
                  </Link>
                ) : (
                  <div className="coin-card" key={coin._id || idx}>
                    <img
                      className="coin-img"
                      src={coin.img || RomanDen}
                      alt={coin.Name || 'Coin'}
                    />
                    <div className="coin-info">
                      <h3>{coin.Name}</h3>
                      <p>
                        {coin.Country} {coin["Issued on"] ? `(${coin["Issued on"]})` : ''}
                      </p>
                      <div className="coin-price">
                        {coin.FaceValue ? `${coin.FaceValue} ${coin.Currency}` : 'N/A'}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <button className="nav-btn right" onClick={scrollRight} aria-label="Scroll right">
              &#9654;
            </button>
          </div>
        </section>

        <section className="categories">
          <h2>Browse by Category</h2>
          <div className="category-grid">
            {[
              { label: 'By Country', icon: 'globe' },
              { label: 'By Era', icon: 'hourglass' },
              { label: 'By Metal', icon: 'coins' },
              { label: 'By Theme', icon: 'medal' },
            ].map((cat, i) => (
              <div className="category-card" key={i} title={cat.label}>
                <img
                  src={`https://img.icons8.com/ios-filled/50/000000/${cat.icon}.png`}
                  alt={cat.label}
                />
                <p>{cat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="community">
          <h2>Community Highlights</h2>
          <div className="community-content">
            <p><strong>Forum:</strong> Discuss the latest coin finds and market trends.</p>
            <p><strong>Spotlight Collector:</strong> Meet Jane, who has a collection of over 500 rare coins.</p>
            <p><strong>Tips & Guides:</strong> How to spot counterfeit coins and preserve your collection.</p>
          </div>
        </section>

        <section className="sell-cta">
          <h2>Have Coins to Sell?</h2>
          <Link to="/sell" className="btn">Sell Coins</Link>
        </section>
      </main>

    </div>
    </AppLayout>
  );
};

export default HomePage;
