import { Link } from 'react-router-dom';
import '../styles/SplashPage.css';
import '../styles/global.css';
import AppLayout from "../components/AppLayout";
import heroImage from '../assets/Hero.png';
import WhiteFeather from "../assets/WhiteFeather.svg";
import BlueFeather from "../assets/BlueFeather.svg";
import DarkFeather from "../assets/DarkFeather.svg";

const SplashPage = () => (
  <AppLayout useCustomNavbar={true}>
    <div className='splash'>

      {/* Header - Hero Section */}
      <div className="hero-section">
        <header className="container-s">
          <div className="hero-text">
            <h1>Welcome to CurioCrow</h1>
            <h2 className='hero-subtitle'>Discover & Collect Rare Coins From Around the World</h2>
            {/* <button className="btn" type="button">Begin Your Collection</button> */}
          </div>
          <img src={heroImage} alt="Hero" className="hero-img" />
        </header>
      </div>

      {/* Features Section */}
      <div className='featBackground'>
        <section className="features-section" aria-label="Feathered Features">
          {/* <h2>Feathered Features</h2> */}
          <div className="features-grid">
            {[
              ['Explore Rarity', 'Browse a growing archive of coins with detailed art, burn mints, dates, and provenance.'],
              ['Track Your Treasures', 'Easily catalog your collection and add custom notes, photos, and videos.'],
              ['Learn & Share', 'Connect with passionate collectors, share insights, and discover hidden gems.'],
              ['Buy, Sell, Trade', 'Use our secure marketplace to grow your hoard or find the crow that got away.']
            ].map(([title, desc], idx) => (
              <article key={idx} className="feature-card" tabIndex="0">
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Purpose Section */}
      <div className='purposeBackground section-with-feathers'>
        {/* Feather Decorations */}
        <div className="feather-layer" aria-hidden="true">
          <img src={WhiteFeather} alt="" className="feather feather-right" />
        </div>

        <section className="purpose-section container" aria-label="Our Purpose">
          <div className="purpose-text">
            <hr/>
            <h2>Our Purpose</h2>
            <p>We stand by the fact that coin collecting is broader than others imagine.</p>
            <p>Our team is working hard to provide a platform centered around collecting coins and connecting within the <strong>coin community</strong>.</p>
          </div>
          <div className="purpose-cta">
            <p>Find out more</p>
            <Link to="/about" className="btn tertiary">About CurioCrow</Link>
        
          </div>
        </section>
      </div>

      {/* Feather Decorations */}
      {/* <div className="feather-layer" aria-hidden="true">
        <img src={BlueFeather} alt="" className="feather feather-bottom-left" />
        <img src={DarkFeather} alt="" className="feather feather-bottom-right" />
      </div> */}

      {/* Testimonials Section */}
      <div className='testBackground section-with-feathers'>
        <section className="testimonials-section container" aria-label="Testimonials">
          <div className="testimonials-split">
            <div className="testimonials-header">
              <h2>Testimonials</h2>
              <h3>What <strong>The Flock</strong> Is Saying About Us</h3>
              <p>Take a first hand glance at how our site has helped fellow collectors!</p>
            </div>

            <div className="testimonial-cards">
              {[
                ['"Found my first Roman coin here!"', '@RavenRaven', '5'],
                ['"The cataloging tool is a dream to use."', '@NumiNerd', '6'],
                ['"Safe trades and real experts."', '@JollyJourneyman', '8'],
                ['"Best place for collectors, hands down."', '@CrowDaddy', '9'],
              ].map(([text, author, img], idx) => (
                <article key={idx} className="testimonial-card" tabIndex="0">
                  <p className="testimonial-text">{text}</p>
                  <div className="testimonial-author">
                    <img src={`https://i.pravatar.cc/24?img=${img}`} alt={`Profile of ${author}`} />
                    <span>{author}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* Feather Decorations */}
        <div className="feather-layer" aria-hidden="true">
          <img src={WhiteFeather} alt="" className="feather feather-left" />
          <img src={WhiteFeather} alt="" className="feather feather-middle-right" />
        </div>
      </div>

      {/* Login Section */}
      <div className='loginBackground'>
        <section className="login-register-section container" aria-label="Login or Register">
          <h2>Become <span><strong>A Crow</strong></span> • Join <span><strong>The Roost</strong></span></h2>
          <p>Ready to start collecting with curiosity? Discover the diverse treasury in store for you and grow your very own caw-llections.</p>
          <div className="login-register-links">
            <Link to="/login" className="btn">Begin Your Collection</Link>
            {/* <Link to="/login" className="btn">Login</Link> */}
            {/* <Link to="/login" className="btn secondary">Register</Link> */}
          </div>
        </section>
      </div>

    </div>
  </AppLayout>

);

export default SplashPage;
