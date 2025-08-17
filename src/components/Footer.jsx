// import "../styles/Footer.css";
import "../styles/AppLayout.css"; // for the grid + layout styles

const Footer = ({color}) => {
  return (
    <footer className={color ? "footer-colored" : "footer"}>
      <div className="footer-content">
        <p>&copy; 2025 CurioCrow</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className="footer-socials">
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
          <a href="https://facebook.com">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
