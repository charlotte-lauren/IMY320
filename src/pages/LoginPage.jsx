import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/LogoNBG.png';

const coinEmoji = '🪙';

const styles = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #1A1F2B;
    color: #1A1F2B;
  }

  .container {
    display: flex;
    height: 100%;
    width: 100vw;
    padding-bottom: 30px;
  }

  .left-panel {
    flex: 1;
    background-color: #305F72;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px;
  }

  .right-panel {
    flex: 1;
    background-color: #1A1F2B;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .form-box {
    width: 80%;
    max-width: 400px;
    background-color: #305F72;
    padding: 40px;
    padding-top: 5px;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .logo-login {
    display: flex;
    justify-content: center;
    margin-bottom: -40px;
  }

  .logo-login img {
    max-width: 120px;
    height: auto;
  }

  .form-box h2 {
    margin-bottom: 5px;
    text-align: center;
    color: black;
    font-weight: bold;
  }

  .form-box p.subheading {
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
    color: black;
  }

  .form-box label {
    display: block;
    margin: 10px 0 4px;
    color: black;
    font-weight: bold;
  }

  .form-box input[type="text"],
  .form-box input[type="password"],
  .form-box input[type="email"] {
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: none;
    border-radius: 10px;
    background-color: #1A1F2B50;
    color: #000;
  }

  .form-box input[type="text"]:focus,
  .form-box input[type="password"]:focus,
  .form-box input[type="email"]:focus {
    background-color: #5C7D8A;
    outline: none;
    color: #C8D9E2;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .password-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .password-row label {
    margin: 0;
  }

  .forgot-password {
    font-size: 0.9em;
  }

  .forgot-password a {
    color: #C8D9E2;
    text-decoration: none;
  }

  .forgot-password a:hover {
    text-decoration: underline;
    color: #B87332;
  }

  .stay-signed-in {
    display: flex;
    align-items: center;
    margin-top: 12px;
    color: #C8D9E2;
  }

  .stay-signed-in label {
    font-weight: 400;
  }

  .custom-checkbox {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid #C8D9E2;
    border-radius: 3px;
    background-color: transparent;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
  }

  .custom-checkbox:checked {
    background-color: #C8D9E2;
  }

  .custom-checkbox:checked::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 0px;
    width: 4px;
    height: 9px;
    border: solid #1A1F2B;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .form-box button {
    width: 100%;
    padding: 12px;
    background-color: #1A1F2B;
    color: #C8D9E2;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }

  .form-box button:hover {
    background-color: #a5622d;
  }

  .register-link {
    margin-top: 20px;
    text-align: center;
    color: #C8D9E2;
  }

  .register-link a {
    color: #7C9FAD;
    text-decoration: none;
    font-size: 1em;
  }

  .register-link a:hover {
    text-decoration: underline;
    color: #a5622d;
  }

  .register-link button:hover{
    text-decoration: underline;
    color: #a5622d;
  }

  input:-webkit-autofill {
    background-color: #5C7D8A !important;
    -webkit-box-shadow: 0 0 0px 1000px #5C7D8A inset;
    color: white !important;
  }

  input:-moz-autofill {
    background-color: #5C7D8A !important;
    color: white !important;
  }

  .coin-tooltip {
  position: relative;
  display: inline-block;
  cursor: help;
}

.coin-tooltip .tooltip-text {
  visibility: hidden;
  width: 220px;
  background-color: #1A1F2B;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* position above */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.8rem;
  line-height: 1.2rem;
}

.coin-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
`;

const LoginPage = ({ setIsAuth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [confirmScore, setConfirmScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!document.getElementById('login-page-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'login-page-styles';
      styleTag.innerHTML = styles;
      document.head.appendChild(styleTag);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRegister(params.get('mode') === 'register');
  }, [location.search]);

  useEffect(() => {
    if (isRegister) {
      const score = getPasswordScore(formData.password || '');
      setPasswordScore(score);
      setConfirmScore(formData.password === formData.confirmPassword ? score : 0);
    }
  }, [formData.password, formData.confirmPassword, isRegister]);

  const getPasswordScore = (password) => {
    let score = 0;
    if (/[A-Z]/.test(password)) score++; // Capital letter
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; // Special char
    if (/[0-9]/.test(password)) score++; // Number
    if (password.length > 8) score++; // Length > 8
    return score;
  };

  const updateForm = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = () => {
    setStaySignedIn(!staySignedIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || 'Something went wrong');
        return;
      }

      const result = await res.json();
      setMessage(result.message);

      if (result.success) {
        if (result.token) {
          localStorage.setItem('token', result.token);
          setIsAuth(true);
        }
        navigate('/home');
      }
    } catch {
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="right-panel">
        <form className="form-box" onSubmit={handleSubmit} noValidate>
          <div className="logo-login">
            <img src={logo} alt="Logo" />
          </div>

          <h2>Welcome</h2>
          <p className="subheading">{isRegister ? 'Register to continue' : 'Log in to continue'}</p>

          {isRegister && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name || ''} onChange={updateForm} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email || ''} onChange={updateForm} required />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username || ''} onChange={updateForm} required />
          </div>

          <div className="form-group">
            <div className="password-row">
              <label htmlFor="password">Password</label>
              {isRegister && (
                <div className="coin-tooltip">
                  <span className="coin-count">{coinEmoji.repeat(passwordScore)}</span>
                  <div className="tooltip-text">
                    Earn coins for: 1 uppercase letter, 1 special character, 1 number, and length &gt; 8
                  </div>
                </div>
              )}
              {!isRegister && (
                <div className="forgot-password">
                  <a href="#">Forgot Password?</a>
                </div>
              )}
            </div>
            <input type="password" id="password" name="password" value={formData.password || ''} onChange={updateForm} required />
          </div>

          {isRegister && (
            <div className="form-group">
              <div className="password-row">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="coin-tooltip">
                  <span className="coin-count">{coinEmoji.repeat(confirmScore)}</span>
                  <div className="tooltip-text">
                    Coins shown only if password matches and earns same rewards
                  </div>
                </div>
              </div>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword || ''} onChange={updateForm} required />
            </div>
          )}

          {!isRegister && (
            <div className="stay-signed-in">
              <input type="checkbox" id="stay-signed-in" className="custom-checkbox" checked={staySignedIn} onChange={handleCheckboxChange} />
              <label htmlFor="stay-signed-in">Stay signed in</label>
            </div>
          )}

          <button type="submit">{isRegister ? 'Register' : 'Log In'}</button>

          <div className="register-link">
            <p>
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(false); }} className="link-toggle">
                    Login here
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(true); }} className="link-toggle">
                    Register here
                  </a>
                </>
              )}
            </p>
          </div>

          {message && <p style={{ color: 'white', marginTop: '10px', textAlign: 'center' }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
