import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ErrorNotification from '../components/ErrorNotification';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const { login, register, error, loading } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } else {
      const success = await register({ firstname, lastname, email, password });
      if (success) {
        navigate('/');
      }
    }
  };

  const handleToggle = (loginState) => {
    setIsLogin(loginState);
    document.querySelector('.auth-form').classList.add('fade-out');
    setTimeout(() => {
      document.querySelector('.auth-form').classList.remove('fade-out');
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${isLogin ? 'login-theme' : 'register-theme'}`}>
        <div className="toggle-container">
          <button
            className={`toggle-button ${isLogin ? 'active' : ''}`}
            onClick={() => handleToggle(true)}
          >
            Login
          </button>
          <button
            className={`toggle-button ${!isLogin ? 'active' : ''}`}
            onClick={() => handleToggle(false)}
          >
            Register
          </button>
        </div>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <ErrorNotification message={error} />}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <div className="auth-instructions">
          {isLogin ? (
            <p>
              Don't have an account? <span onClick={() => handleToggle(false)} className="toggle-link">Register here</span>.
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => handleToggle(true)} className="toggle-link2">Login here</span>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;