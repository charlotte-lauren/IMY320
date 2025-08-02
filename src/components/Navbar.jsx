import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'; // Optional for styling

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Top Row */}
      <div className="navbar-top">
        <Link to="/" className="logo">🪙 CurioCrow</Link>

        <input type="text" className="search-bar" placeholder="Search..." />

        <Link to="/cart" className="icon-button">🛒</Link>

        {isLoggedIn ? (
          <div className="user-menu">
            <Link to="/profile" className="icon-button">👤</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link">Register</Link>
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="navbar-bottom">
        <Link to="/coins">Coins Directory</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/music">Music</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
