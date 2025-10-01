import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import RomanDen from '../assets/coin.png';
import AppLayout from "../components/AppLayout";

const HomePage = () => {
  const featuredRef = useRef(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
  const isAuth = !!token;

  // Fetch featured coins
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/coins?limit=6');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error('Failed to fetch coins:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const scrollAmount = 220 + 16;

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

  const slugify = (text) =>
    text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "";

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true} isAuth={isAuth}>
      <div className='homePage'>
        <section className="hero">
          <div className="hero-content">
            <h1>Discover & Collect Rare Coins From Around the World</h1>
            <p>Your journey to the perfect collection starts here.</p>
            <div className="hero-btns">
              <Link to="/coins" className="btn">Explore Marketplace</Link>
            </div>
          </div>
        </section>

        <main className='mainClass'>
          <section className="featured">
            <div className="featured-header">
              <h2>Featured Coins</h2>
            </div>

            {loading && <p>Loading featured coins...</p>}

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
                    <Link
                      to={`/product/${coin._id || slugify(coin.Name)}`}
                      className="coin-card"
                      key={coin._id || idx}
                    >
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
                    </Link>
                  )
                )}
              </div>

              <button className="nav-btn right" onClick={scrollRight} aria-label="Scroll right">
                &#9654;
              </button>
            </div>
          </section>
        </main>
      </div>
    </AppLayout>
  );
};

export default HomePage;
