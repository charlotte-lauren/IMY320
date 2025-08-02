import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/SplashPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Navbar from './components/Navbar';

// A layout wrapper with optional navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
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
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
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

        {/* Catch-all redirects to splash */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
