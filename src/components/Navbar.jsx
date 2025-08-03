import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../assets/LogoCBG.png'; // Adjust the path if needed

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    console.log("Logging out");
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');
      setIsLoggedIn(false);
      console.log("Navigating back to splash");
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      {/* Top Row */}
      <div className="navbar-top">
        <Link to="/home" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">CurioCrow</span>
        </Link>

        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24">
            <path fill="white" d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.14 5.59 12.55 3 9.5 3S3.86 5.59 3.86 8.39c0 2.8 2.59 5.39 5.64 5.39 1.61 0 3.08-.66 4.13-1.73l.27.28v.79l4.25 4.25c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L15.5 14zM9.5 13c-2.48 0-4.5-2.02-4.5-4.5S7.02 4 9.5 4 14 6.02 14 8.5 11.98 13 9.5 13z" />
          </svg>
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>

        <Link to="/cart" className="icon-button">🛒</Link>

        {isLoggedIn ? (
          <div className="user-menu">
            <Link to="/profile" className="icon-button">👤</Link>
            <button onClick={handleLogout} className="auth-link">Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/login" className="auth-link">Register</Link>
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="navbar-bottom">
        <Link to="/coins">Coins Directory</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/about">About</Link>
        <Link to="/community">Community</Link>
      </div>
    </nav>
  );
}

export default Navbar;
