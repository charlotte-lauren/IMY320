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

  /* Floating label styles */
  .floating-label {
    position: relative;
    margin-bottom: 20px;
  }

  .floating-label input {
    width: 100%;
    padding: 14px 12px 12px 12px;
    border: none;
    border-radius: 10px;
    background-color: #1A1F2B50;
    color: #000;
    font-size: 1rem;
    text-shadow: 000;
    transition: text-shadow 0.3s ease;
  }

  .floating-label input::placeholder {
    color: transparent;
  }

  .floating-label label {
    position: absolute;
    top: 14px;
    left: 12px;
    color: black;
    font-size: 1rem;
    transition: all 0.2s ease-out;
    padding: 0 4px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
  }

  .floating-label input:focus + label,
  .floating-label input:not(:placeholder-shown) + label {
    top: -8px;
    left: 8px;
    font-size: 0.75rem;
    color: #C8D9E2;
    background-color: #305F72;
    font-weight: bold;
  }

  .floating-label input:focus {
    background-color: #5C7D8A;
    outline: none;
    color: #C8D9E2;
  }

  /* Coin tooltip styles */
  .coin-tooltip {
    position: relative;
    display: inline-block;
    cursor: help;
    margin-left: 6px;
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
    bottom: 125%;
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

  .password-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .forgot-password {
    font-size: 0.9em;
    margin-bottom: 6px;
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
    margin-top: 16px;
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

  /* Google button */
  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #444;
    border: none;
    padding: 10px 0;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-top: 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    transition: background-color 0.3s ease;
    user-select: none;
  }

  .google-btn:hover {
    background-color: #eee;
  }

  .google-icon {
    height: 20px;
    width: 20px;
    margin-right: 12px;
  }

  .or-container {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 16px 0;
    color: white;
    font-size: 0.9rem;
  }

  .or-container::before,
  .or-container::after {
    content: "";
    flex: 1;
    border-bottom: 1.5px solid white; /* solid line */
    margin: 0 10px;
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

  // Google sign-in click handler (placeholder)
  const handleGoogleSignIn = () => {
    alert('Google sign-in not implemented');
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
              <div className="floating-label">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={updateForm}
                  placeholder="Full Name"
                  required
                />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="floating-label">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={updateForm}
                  placeholder="Email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
            </>
          )}

          <div className="floating-label">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username || ''}
              onChange={updateForm}
              placeholder="Username"
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          {/* Forgot Password link above password input on login */}
          {!isRegister && (
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          )}

          {/* Password Field with floating label */}
          <div className="floating-label">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ''}
              onChange={updateForm}
              placeholder="Password"
              required
            />
            <label htmlFor="password">
              Password
              {isRegister && (
                <span className="coin-tooltip">
                  <span className="coin-count">{coinEmoji.repeat(passwordScore)}</span>
                  <span className="tooltip-text">
                    Earn coins for: 1 uppercase letter, 1 special character, 1 number, and length &gt; 8
                  </span>
                </span>
              )}
            </label>
          </div>

          {/* Confirm Password Field with floating label */}
          {isRegister && (
            <div className="floating-label">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={updateForm}
                placeholder="Confirm Password"
                required
              />
              <label htmlFor="confirmPassword">
                Confirm Password
                <span className="coin-tooltip">
                  <span className="coin-count">{coinEmoji.repeat(confirmScore)}</span>
                  <span className="tooltip-text">
                    Coins shown only if password matches and earns same rewards
                  </span>
                </span>
              </label>
            </div>
          )}

          {!isRegister && (
            <div className="stay-signed-in">
              <input
                type="checkbox"
                id="stay-signed-in"
                className="custom-checkbox"
                checked={staySignedIn}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="stay-signed-in">Stay signed in</label>
            </div>
          )}

          <button type="submit">{isRegister ? 'Register' : 'Log In'}</button>
          <div className="or-container">OR</div>
          {/* Google sign-in button */}
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignIn}
            aria-label="Continue with Google"
          >
            <svg
              className="google-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.5-34-4.4-50.2H272v95h146.9c-6.3 34-25 62.7-53.5 82v68h86.4c50.7-46.7 81.7-115.3 81.7-194.8z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.6 0 133.7-23.9 178.3-64.9l-86.4-68c-24 16-54.7 25.5-91.9 25.5-70.7 0-130.7-47.7-152.3-111.4h-90.4v69.9c44.6 87.7 136.4 149 243 149z"
              />
              <path
                fill="#FBBC05"
                d="M119.7 324.1c-10.7-31.5-10.7-65.5 0-97L29.3 157.3c-39.4 77.2-39.4 168.5 0 245.7l90.4-69.9z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.3-.6 76.9 14 105.5 41.2l79-79C408.1 24.1 345.5 0 272 0 165.5 0 73.7 61.3 29.3 157.3l90.4 69.9c21.6-63.7 81.6-111.5 152.3-111.5z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="register-link">
            <p>
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(false);
                    }}
                    className="link-toggle"
                  >
                    Login here
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(true);
                    }}
                    className="link-toggle"
                  >
                    Register here
                  </a>
                </>
              )}
            </p>
          </div>

          {message && (
            <p style={{ color: 'white', marginTop: '10px', textAlign: 'center' }}>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
