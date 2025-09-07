import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import BuyCoins from '../assets/BuyCoins.png';
import crowImg from '../assets/Crow.png';
import feather1 from '../assets/WhiteFeather.png';
import feather2 from '../assets/BlueFeather.png';
import feather3 from '../assets/DarkFeather.png';
import "../styles/global.css";
import "../styles/AboutPage.css";

// const handleClick = () => {
//   alert('Redirect to Coins Directory page');
// };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    } else {
      entry.target.classList.remove("in-view");
    }
  });
});

document.querySelectorAll(".scale-on-scroll").forEach(icon => {
  observer.observe(icon);
});


const AboutPage = () => (
  <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
    <div className='homePage'>
      <div className="parallax-bg">
        <header className="about-header">
          <div className="overlay" />
          <div className="header-content">
            <h1 className="title">About CurioCrow</h1>
            <p className="subtitle">Crows know value — so do we.</p>
          </div>
        </header>
      </div>

      <section className="about-section">
        <div className="card mission-card">
          <h2>Our Mission</h2>
          <p>
            At CurioCrow, our goal is to create a trusted and engaging space for coin collectors of all experience levels.
          </p>
          <p>
            Whether you're just starting out or have been collecting for years, we’re building a platform where you can buy & sell coins and dive into the community with fellow collectors – all in one place.
          </p>
          <img src={crowImg} alt="Crow" className="crow-img" />
        </div>

        <div className="card crows-card">
          <h2>Who Are The Crows</h2>
          <p>
            We’re a team of three university students who share a passion for collecting shiny things – much like Crows.
          </p>
          <p>
            What started as a personal hobby quickly turned into an idea we wanted to share with others – so we created CurioCrow.
          </p>
          <p>
            Now, we’re turning that passion into a platform that brings the coin-collecting community together.
          </p>
        </div>

        {/* Decorative feathers */}
        <img src={feather1} className="feathers feather1" alt="feather" />
        <img src={feather2} className="feathers feather2" alt="feather" />
        <img src={feather3} className="feathers feather3" alt="feather" />
      </section>

      <section className="about-sections">
        <div className="beliefs-section">
          <h2>Our Beliefs</h2>
          <div className="beliefs-cards">
            <div className="belief-card">
              <div className="belief-icon">
                <div className="b-icon trust scale-on-scroll" />
              </div>
              <h3>Trust First</h3>
              <p>
                We believe collecting should be safe and secure. That’s why
                we’re building community-driven tools and verified listings
                you can rely on.
              </p>
            </div>
            <div className="belief-card">
              <div className="belief-icon">
                <div className="b-icon curiosity scale-on-scroll" />
              </div>
              <h3>Fuelling Curiosity</h3>
              <p>
                Coins are more than metal — they’re pieces of history,
                culture, and craftsmanship. We want to spark curiosity and
                help people learn through their collections.
              </p>
            </div>
            <div className="belief-card">
              <div className="belief-icon">
                <div className="b-icon community scale-on-scroll" />
              </div>
              <h3>Community-Led</h3>
              <p>
                The best part of collecting is sharing it. CurioCrow is made
                for and by the collecting community.
              </p>
            </div>
          </div>
        </div>

        <div className="what-to-do-section">
          <h2>What To Do</h2>
          <div className="what-to-do-content">
            <div className="what-to-do-circle">
              <img src={BuyCoins} alt={'Hands swapping coins'} className="icon-img" />
            </div>
            
            <div className="do-cards">
              <div className="do-card Buy-card">
                <h3>Buy coins</h3>
                <p>
                  From our range of coin collectables and from trusted
                  collectors in our community
                </p>
              </div>
              <div className="do-card Sell-card">
                <h3>Sell coins</h3>
                <p>
                  To expand CurioCrow’s treasury, and help give fellow
                  collectors a mint they have been dying for!
                </p>
              </div>
              <div className="do-card Connect-card">
                <h3>Connect</h3>
                <p>
                  With other collectors, share stories, and explore the
                  world of numismatics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative feathers */}
        <img src={feather2} className="feathers feather2-2-2" alt="feather" />
        <img src={feather3} className="feathers feather3-3-3" alt="feather" />
      </section>

      <section className="Explore-section">
        
        <h2>Start Your Collection</h2>
        <p>
          Whether you're here to build a collection, learn something new, or pass on a prized piece
          <br />
          <span className="text-italic"> - CurioCrow is your starting point.</span>
        </p>
          <div className="explore-links">
            <Link to="/coins" className="btn btn-explore">Explore Our Collections</Link>
          </div>

        {/* Decorative feathers */}
        <img src={feather2} className="feathers feather2-2" alt="feather" />
        <img src={feather3} className="feathers feather3-3" alt="feather" />
      </section>

    </div>
  </AppLayout>
);

export default AboutPage;
