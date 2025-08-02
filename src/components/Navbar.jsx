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
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">CurioCrow</span>
        </Link>

        <input type="text" className="search-bar" placeholder="Search..." />

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
