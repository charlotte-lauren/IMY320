import { Link } from 'react-router-dom';
import '../styles/SplashPage.css';
import '../styles/global.css';
import AppLayout from "../components/AppLayout";

const SplashPage = () => (
  <AppLayout useCustomNavbar={true}>
    <div className='splash'>

    {/* Header - Hero Section */}
      <header className="container">
        <h1>CurioCrow</h1>
        <h3>Crows know value — so do we.</h3>
        <p>Track, trade, and showcase the richest coins with a vibrant community of collectors!</p>
        <button className="button" type="button">Begin Your Collection</button>
      </header>

      {/* Features Section */}
      <section className="features-section container" aria-label="Feathered Features">
        <h2>Feathered Features</h2>
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

      {/* Purpose Section */}
      <section className="purpose-section container" aria-label="Our Purpose">
        <div className="purpose-text">
          <h2>Our Purpose</h2>
          <p>We stand by the fact that coin collecting is broader than others imagine.</p>
          <p>Our team is working hard to provide a platform centered around collecting coins and connecting within the <strong>coin community</strong>.</p>
        </div>
        <div className="purpose-cta">
          <p>Find out more...</p>
          <button className="btn-secondary" type="button" aria-label="About CurioCrow">About CurioCrow</button>
      
        </div>
      </section>

      {/* Testimonials Section */}
      <div className='testBackground'>
      <section className="testimonials-section" aria-label="Testimonials">
        <div className="testimonials-split">
          <div className="testimonials-header">
            <h2>Testimonials</h2>
            <h3>What <strong>The Flock</strong> Is Saying About Us</h3>
            <p className='whiteText'>Take a first hand glance at how our site has helped fellow collectors!</p>
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
      </div>

      {/* Login Section */}
      <section className="login-register-section container" aria-label="Login or Register">
        <h3>Become <strong>A Crow</strong> • Join <strong>The Roost</strong></h3>
        <p>Ready to start collecting with curiosity? Discover the diverse treasury in store for you and grow your very own caw-llections.</p>
        <Link to="/login" className="btn-login">Login</Link>
        <Link to="/login" className="btn-register">Register</Link>
      </section>

    </div>
  </AppLayout>

);

export default SplashPage;
