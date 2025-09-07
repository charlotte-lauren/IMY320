import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/LogoCBG.png'; 
import UI from '../assets/UserIcon.svg';
import cart from '../assets/Cart.png'; 

function Navbar({ setIsAuth }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    setIsLoggedIn(!!token);
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUserRole(data.role || "user");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setIsAuth(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const encoded = encodeURIComponent(trimmed); 
    console.log("Navigating to search for:", encoded); // debug
    navigate(`/search?query=${encoded}&limit=20`);
    setSearchTerm("");
  };


  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="c-nav-left logo-name">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="c-nav-logo" />
            <span className="c-nav-name">CurioCrow</span>
          </Link>
        </div>

        {/* 🔹 Search Form */}
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">🔍</button>
        </form>

        <Link to="/cart" className="icon-button">
          <img src={cart} alt="Cart" className="cart-icon" />
        </Link>

        {isLoggedIn ? (
          <div className="user-menu">
            <div className="user-dropdown">
              <img
                src={UI}
                alt="Profile"
                className="profile-icon"
                onClick={() => setShowDropdown(prev => !prev)}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button onClick={handleLogout} className="btn dropdown-item">Logout</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/login" className="auth-link">Register</Link>
          </div>
        )}
      </div>

      <div className="navbar-bottom">
        <Link to="/home" className={location.pathname === '/home' ? 'nav-link active' : 'nav-link'}>Home</Link>
        <Link to="/coins" className={location.pathname === '/coins' ? 'nav-link active' : 'nav-link'}>Coins Directory</Link>
        <Link to="/sell" className={location.pathname === '/sell' ? 'nav-link active' : 'nav-link'}>Sell</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>About</Link>
        <Link to="/community" className={location.pathname === '/community' ? 'nav-link active' : 'nav-link'}>Community</Link>
        {userRole === "admin" && (
          <Link to="/manage" className={location.pathname === '/manage' ? 'nav-link active' : 'nav-link'}>Manage</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
