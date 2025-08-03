import React from 'react';
import { Link } from 'react-router-dom';
import './UnderConstructionPage.css';

const UnderConstructionPage = () => {
  return (
    <div className="under-construction">
      <div className="crow-icon">🐦‍⬛</div>
      <h1 className="const-head">CurioCrow</h1>
      <h2>We're dusting off the shelves...</h2>

      <div className="construction-note">
        Our virtual cabinet of curiosities is still being arranged. <br />
        Soon, you’ll be able to catalogue your collection, track your treasures,
        and swap stories with fellow collectors.
        <br /><br />
        Until then, keep your coins close, and your curiosity closer.
      </div>

      <Link to="/home" className="back-button">← Back to Home</Link>

      <footer>© 2025 CurioCrow | Made by collectors, for collectors</footer>
    </div>
  );
};

export default UnderConstructionPage;
