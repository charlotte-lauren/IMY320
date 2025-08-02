import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'; // Optional for styling

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Initial check for token when component mounts
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  // Add this new useEffect to listen for storage changes (token changes)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    console.log("Logging out")
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');
      setIsLoggedIn(false);
      console.log("Navigating back to splash")
      navigate('/'); // Redirect to splash page
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
            <button onClick={(handleLogout)} className="logout-btn">Logout</button>
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
        <Link to="/music">Music</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
