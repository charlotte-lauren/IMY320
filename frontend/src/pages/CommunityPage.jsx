import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import '../styles/CommunityPage.css';

const CommunityPage = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you can integrate with an API to save the email
    console.log("Subscribed:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
      <div className="community-page">
        <div className="parallax-bg">
        <header className="about-header">
          <div className="overlay" />
          <div className="header-content">
            <h1 className="title">Join the Coin Collectors Community</h1>
            <p className="subtitle">Stay updated with the latest coin insights, rare finds, and collector tips!</p>
          </div>
        </header>
      </div>

        {/* Newsletter Section */}
        <section className="newsletter">
          <h2>Subscribe to our Newsletter</h2>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-news">Subscribe</button>
          </form>
          {subscribed && <p className="thank-you">Thank you for subscribing!</p>}

          {/* Sample Newsletter */}
          <div className="newsletter-sample">
            <h3>Newsletter: Introduction to Coin Collecting</h3>
            <p>
              Welcome to the fascinating world of coin collecting! Whether you are
              a beginner or an experienced numismatist, coin collecting opens a
              window into history, culture, and art. Each coin tells a story — from
              ancient civilizations to modern currency. Start your collection today
              by exploring coins from different eras, metals, and countries. Remember,
              the joy is not just in owning coins but in discovering the history behind them.
            </p>
          </div>
        </section>

        {/* Community Section (Optional) */}
        <section className="community-info">
          <h2>Engage with Fellow Collectors</h2>
          <p>
            Share your finds, ask questions, and connect with coin enthusiasts
            worldwide. Our community thrives on knowledge, tips, and shared passion.
          </p>
        </section>
      </div>
    </AppLayout>
  );
};

export default CommunityPage;
