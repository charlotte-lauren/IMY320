import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UnderConstructionPage.css';
import AppLayout from "../components/AppLayout";
import logo from '../assets/LogoNBG.png';

const UnderConstructionPage = () => {
  return (
    <AppLayout useCustomNavbar={true} useFooter={true} loginPage={true} color={true}>
      <div className="under-construction">
          <div className="logo-img">
            <img src={logo} alt="Logo" />
          </div>
        <h1 className="const-head">CurioCrow</h1>
        <h2>We're dusting off the shelves...</h2>

        <div className="construction-note">
          Our virtual cabinet of curiosities is still being arranged. <br />
          Soon, you’ll be able to catalogue your collection, track your treasures,
          and swap stories with fellow collectors.
          <br /><br />
          Until then, keep your coins close, and your curiosity closer.
        </div>

        <Link to="/home" className="btn ">← Back to Home</Link>
        
      </div>
    </AppLayout>
  );
};

export default UnderConstructionPage;
