import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/SplashPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Navbar from './components/Navbar';

// Checks if a token exists in localStorage to confirm logged in status
function isAuthenticated() {
  return Boolean(localStorage.getItem('token'));
}

// A layout wrapper with optional navbar
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="page-content">{children}</div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/home" /> : <Login />}
        />
        {/* Routes that include the navbar */}
        <Route
          path="/home"
          element={
            isAuthenticated() ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
