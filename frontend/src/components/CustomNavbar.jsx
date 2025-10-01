import { Link } from "react-router-dom";
import "../styles/CustomNavbar.css";
import logo from '../assets/LogoCBG.png'; 

const CustomNavbar = ({loginPage, isAuth }) => {
  return (
    <nav className="c-navbar">
      <div className="c-nav-left">
        <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="c-nav-logo" />
            <span className="c-nav-name">CurioCrow</span>
        </Link>
      </div>
      {loginPage || isAuth ? null : (
      <div className="c-nav-right">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/login" className="btn secondary">Register</Link>
      </div>)}
    </nav>
  );
};

export default CustomNavbar;
