import React from "react";
import CustomNavbar from "./CustomNavbar"; // Navbar for Splash, Login, Register
import Navbar from "./Navbar";             // Navbar for Home, AboutUs, Sell, etc.
import Footer from "./Footer";
import "../styles/AppLayout.css"; // for the grid + layout styles

const AppLayout = ({ children, useCustomNavbar }) => {
  return (
    <div className="app-layout">
      {useCustomNavbar ? <CustomNavbar /> : <Navbar />}

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default AppLayout;
