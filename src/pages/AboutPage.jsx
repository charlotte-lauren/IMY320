import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";

import crowImg from '../assets/Crow.png';
import feather1 from '../assets/WhiteFeather.png';
import feather2 from '../assets/BlueFeather.png';
import feather3 from '../assets/DarkFeather.png';

const AboutPage = () => (
  <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
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
        <img src={feather1} className="feather feather1" alt="feather" />
        <img src={feather2} className="feather feather2" alt="feather" />
        <img src={feather3} className="feather feather3" alt="feather" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Beliefs</h2>
        <ul className="list-disc ml-6 space-y-3">
          <li>
            <strong>Trust First:</strong> We believe collecting should be safe and secure. That’s why we’re building community-driven tools and
            verified listings you can rely on.
          </li>
          <li>
            <strong>Fueling Curiosity:</strong> Coins are more than metal—they’re pieces of history, culture, and craftsmanship. We want to
            spark curiosity and help people learn through their collections.
          </li>
          <li>
            <strong>Community-Led:</strong> The best part of collecting is sharing it. CurioCrow is made for and by the collecting community.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What To Do</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Buy coins:</strong> From our range of coin collectables and from trusted collectors in our community.
          </li>
          <li>
            <strong>Sell coins:</strong> To expand CurioCrow’s treasury, and help give fellow collectors a mint they’ve been dying for!
          </li>
          <li>
            <strong>Connect:</strong> With other collectors, share stories, and explore the world of numismatics.
          </li>
        </ul>
      </section>

      <section className="text-center mt-14">
        <p className="text-lg font-medium mb-4">
          Whether you're here to build a collection, learn something new, or pass on a prized piece —
          <br />
          <span className="text-indigo-700 font-semibold">CurioCrow is your starting point.</span>
        </p>
        {/* <Link
          to="/collections"
          className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition"
        >
          Explore Our Collections →
        </Link> */}
      </section>
  </div>
);

export default AboutPage;
