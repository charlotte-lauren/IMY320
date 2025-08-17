import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/SplashPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Coins from './pages/CoinsDirectory';
import Product from './pages/ProductPage';
import Navbar from './components/Navbar';
import UnderConstructionPage from './pages/UnderConstructionPage';

// A layout wrapper with optional navbar
const Layout = ({ children, setIsAuth }) => (
  <>
    <Navbar setIsAuth={setIsAuth} />
    <div className="page-content">{children}</div>
  </>
);

function App() {
  // Reactive auth state based on localStorage token presence
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('token')));

  useEffect(() => {
    // Listen for changes to localStorage token across tabs/windows
    const handleStorageChange = () => {
      setIsAuth(Boolean(localStorage.getItem('token')));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />

        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/home" replace />
            ) : (
              <Login setIsAuth={setIsAuth} />
            )
          }
        />

        <Route
          path="/home"
          element={
            isAuth ? (
              <Layout setIsAuth={setIsAuth}>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/coins"
          element={
            isAuth ? (
              <Layout setIsAuth={setIsAuth}>
                <Coins />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/product"
          element={
            isAuth ? (
              <Layout setIsAuth={setIsAuth}>
                <Product />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/about"
          element={
            <Layout setIsAuth={setIsAuth}>
              <About />
            </Layout>
          }
        />

        <Route path="*" element={<UnderConstructionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
