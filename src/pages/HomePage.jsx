import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import RomanDen from '../assets/RomanDen.jpg';
import SilverDoll from '../assets/SilverDol.jpg';
import GoldSov from '../assets/GoldSov.jpg';
import JapOb from '../assets/JapaneseOb.jpg';
import FrenchFranc from '../assets/FrenchFra.png';
import Sycee from '../assets/ChineseSycee.jpeg';
import CanMaple from '../assets/CanadaMaple.jpg';

const HomePage = () => {
  const featuredRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const coins = [
    {
      title: 'Ancient Roman Denarius',
      subtitle: 'Circa 50 BC, Rome',
      price: '$1,200',
      img: RomanDen,
    },
    {
      title: '1916 Silver Dollar',
      subtitle: 'USA',
      price: '$850',
      img: SilverDoll,
    },
    {
      title: 'Gold Sovereign',
      subtitle: 'UK, 1901',
      price: '$2,300',
      img: GoldSov,
    },
    {
      title: 'Japanese Oban Coin',
      subtitle: 'Japan, Edo Period',
      price: '$3,750',
      img: JapOb,
    },
    {
      title: 'French Franc',
      subtitle: 'France, 1795',
      price: '$620',
      img: FrenchFranc,
    },
    {
      title: 'Chinese Sycee',
      subtitle: 'Qing Dynasty',
      price: '$4,100',
      img: Sycee,
    },
    {
      title: 'Canadian Maple Leaf',
      subtitle: 'Canada, 1988',
      price: '$950',
      img: CanMaple,
    },
  ];

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
    <div className='homePage'>
      <section className="hero">
        <div className="hero-content">
          <h1>Discover & Collect Rare Coins From Around the World</h1>
          <p>Your journey to the perfect collection starts here.</p>
          <button className="btn">Explore Marketplace</button>
          <button className="btn secondary">Start Collecting</button>
        </div>
      </section>

      <main className='mainClass'>
        <section className="featured">
          <div className="featured-header">
            <h2>Featured Coins</h2>
            <button onClick={() => setIsPaused(!isPaused)} className="pause-btn">
              {isPaused ? 'Play' : 'Pause'}
            </button>
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
                  <div className="coin-card" key={idx}>
                    <img className="coin-img" src={coin.img} alt={coin.title} />
                    <div className="coin-info">
                      <h3>{coin.title}</h3>
                      <p>{coin.subtitle}</p>
                      <div className="coin-price">{coin.price}</div>
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

        {/* ... rest of your sections unchanged ... */}

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
          <button onClick={handleSellClick}>Start Selling</button>
        </section>
      </main>

      <footer className='homeFooter'>
        &copy; 2025 Curiocrow &nbsp;|&nbsp;
        <a href="#">About</a>&nbsp;|&nbsp;
        <a href="#">Contact</a>&nbsp;|&nbsp;
        <a href="#">FAQ</a>&nbsp;|&nbsp;
        <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default HomePage;
