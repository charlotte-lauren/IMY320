import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/LogoNBG.png';
import AppLayout from "../components/AppLayout";
import '../styles/global.css';
// import '../styles/LoginPage.css';

const coinEmoji = '🪙';

const styles = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #F2EFED;
    color: #C8D9E2;
  }

  .container {
    display: flex;
    height: 100%;
    width: 100vw;
    padding-bottom: 30px;
    background-color: #F2EFED;
  }

  .left-panel {
    flex: 1;
    background-color: #F2EFED;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px;
  }

  .right-panel {
    flex: 1;
    background-color: #F2EFED;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    margin-top: 10px;
    padding-bottom: 5px;
  }

  .logo-login {
    display: flex;
    justify-content: center;
    margin-bottom: -40px;
    margin-top: -20px;
  }

  .logo-login img {
    max-width: 120px;
    height: auto;
  }

  /* -------------- Fonts --------------*/
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap'); /* Cinzel */

  .form-box h2 {
    margin-bottom: 5px;
    text-align: center;
    color: #F2EFED;
    font-weight: bold;
    font-size: 3.5rem;
    font-family: 'Cinzel', serif;
  }

  .form-box p.subheading {
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
    color: #F2EFED;
  }

  /* Floating label styles */
  .floating-label {
    position: relative;
    margin-bottom: 20px;
    color: #C8D9E2;
  }

  .feedback {
    margin-bottom: -15px;
    margin-top: 5px;
  }

  .floating-label input {
    width: 100%;
    padding: 14px 12px 12px 12px;
    border: none;
    border-radius: 10px;
    background-color: #1A1F2B50;
    color: #C8D9E2;
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
    color: #C8D9E2;
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
  font-size: 1rem;
}

.forgot-password a {
  color: #C8D9E2;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
  color: #B87332;
}

.signin-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 100%;
}

.stay-signed-in {
  display: flex;
  align-items: center;
  color: #C8D9E2;
  cursor: pointer;
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

  .form-box button.btn-login {
    width: 100%;
    margin-top: 20px;
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

.google-btn {
  background: transparent;
  border: 2px solid #7DA0AE;
  color: #7DA0AE;
  padding: 15px 60px;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.1s ease-out;
  width: 100%;
}
.google-btn:hover {
  background: #7DA0AE;
  color: #F2EFED;
  text-decoration: none;
  border: 2px solid #7DA0AE;
}
.google-btn:active {
  background: #7DA0AE;
  color: #F2EFED;
  text-decoration: none;
  border: 2px solid #7DA0AE;
  transform: scale(0.90); /* Shrinks the button to 90% of its original size */
}

  .google-icon {
    height: 20px;
    width: 20px;
    margin-right: 12px;
    color: #7DA0AE;
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
  const [errors, setErrors] = useState({});
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
    if (/[A-Z]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (password.length > 8) score++;
    return score;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (isRegister) {
      if (!formData.email) {
        newErrors.email = 'Email is required.';
      } else if (!formData.email.includes('@')) {
        newErrors.email = "Email must contain '@'.";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setStaySignedIn(!staySignedIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return;
    if (isRegister && !formData.name) {
      formData.name = 'Anonymous Crow';
    }
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.message?.includes('already')) {
          setMessage(result.message + ' Try logging in instead.');
        } else {
          setMessage(result.message || 'Something went wrong.');
        }
        return;
      }

      setMessage(result.message);

      if (result.success && result.token) {
        // ✅ Save token consistently as 'authToken'
        localStorage.setItem('authToken', result.token);

        // Optionally, if user chooses "stay signed in", store a flag
        if (staySignedIn) {
          localStorage.setItem('staySignedIn', 'true');
        } else {
          localStorage.removeItem('staySignedIn');
        }

        setIsAuth(true);
        navigate('/home');
      }
    } catch {
      setMessage('Network error. Please try again.');
    }
  };


  return (
    <AppLayout useCustomNavbar={true} useFooter={false} loginPage={true} color={true}>
    <div className="container">
      <div className="right-panel">
        <form className="form-box" onSubmit={handleSubmit} noValidate>
          <h2>Welcome</h2>
          <p className="subheading">{isRegister ? 'Register to continue' : 'Log in to continue'}</p>

          {isRegister && (
            <>
              <div className="floating-label">
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={updateForm}
                  placeholder="Email"
                  required
                />
                <label>Email</label>
                {errors.email && <p className="feedback" style={{ color: 'white', fontSize: '0.8em' }}>{errors.email}</p>}
              </div>
            </>
          )}

          <div className="floating-label">
            <input
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={updateForm}
              placeholder="Username"
              required
            />
            <label>Username</label>
            {errors.username && <p className="feedback" style={{ color: 'white', fontSize: '0.8em' }}>{errors.username}</p>}
          </div>

          <div className="floating-label">
            <input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={updateForm}
              placeholder="Password"
              required
            />
            <label>
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
            {errors.password && <p className="feedback" style={{ color: 'white', fontSize: '0.8em' }}>{errors.password}</p>}
          </div>

          {isRegister && (
            <div className="floating-label">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={updateForm}
                placeholder="Confirm Password"
                required
              />
              <label>
                Confirm Password
                <span className="coin-tooltip">
                  <span className="coin-count">{coinEmoji.repeat(confirmScore)}</span>
                  <span className="tooltip-text">
                    Coins shown only if password matches and earns same rewards
                  </span>
                </span>
              </label>
              {errors.confirmPassword && (
                <p className="feedback" style={{ color: 'white', fontSize: '0.8em' }}>{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {!isRegister && (
            <div className="signin-row">
              <label className="stay-signed-in">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={staySignedIn}
                  onChange={handleCheckboxChange}
                />
                Stay signed in
              </label>
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
            </div>
          )}

          <button className='btn btn-login' type="submit">{isRegister ? 'Register' : 'Log In'}</button>

          <div className="or-container">OR</div>

          <button className="google-btn" onClick={() => alert('Google Sign-In not implemented')}>
            <span className="google-icon">G</span> Continue with Google
          </button>

          <div className="register-link">
            <p>
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(false); }}>
                    Login here
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(true); }}>
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
    </AppLayout>
  );
};

export default LoginPage;
