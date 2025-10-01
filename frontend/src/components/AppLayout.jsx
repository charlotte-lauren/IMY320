import React from "react";
import CustomNavbar from "./CustomNavbar"; // Navbar for Splash, Login, Register
import Navbar from "./Navbar";             // Navbar for Home, AboutUs, Sell, etc.
import Footer from "./Footer";
import "../styles/AppLayout.css"; // for the grid + layout styles
import '../styles/global.css';

const AppLayout = ({ children, useCustomNavbar, useFooter, loginPage, color, isAuth }) => {
  return (
    <div className="app-layout">
      {useCustomNavbar ? <CustomNavbar loginPage={loginPage} isAuth={isAuth}/> : null}

      <main>{children}</main>

      {useFooter ? <Footer color={color}/> : null}
    </div>
  );
};

export default AppLayout;
