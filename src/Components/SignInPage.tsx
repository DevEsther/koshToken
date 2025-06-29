import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersSignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isSmallScreen = screenWidth < 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const stateEmail = location.state?.email;
    const statePassword = location.state?.password;
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const shouldRemember = localStorage.getItem('rememberMe') === 'true';

    if (stateEmail && statePassword) {
      setEmail(stateEmail);
      setPassword(statePassword);
      localStorage.setItem('rememberedEmail', stateEmail);
      localStorage.setItem('rememberedPassword', statePassword);
      localStorage.setItem('rememberMe', 'true');
      setRememberMe(true);

      // Trigger auto-login after redirect from OTP
      setTimeout(() => handleSignIn(stateEmail, statePassword, true), 800);
    } else if (rememberedEmail && rememberedPassword && shouldRemember) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);

      // Auto-login
      setTimeout(() => handleSignIn(rememberedEmail, rememberedPassword, true), 800);
    }
  }, [location]);

  const handleSignIn = async (
    inputEmail?: string,
    inputPassword?: string,
    autoLogin = false
  ) => {
    setError('');
    setIsLoading(true);

    const loginEmail = inputEmail || email;
    const loginPassword = inputPassword || password;

    if (!loginEmail || !loginPassword) {
      setError('Please enter email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://kosh-marketplace-backend.onrender.com/api/v1/users/signin',
        { email: loginEmail, password: loginPassword }
      );

      const data = response.data;

      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('email', loginEmail);

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', loginEmail);
          localStorage.setItem('rememberedPassword', loginPassword);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
          localStorage.removeItem('rememberMe');
        }

        setIsRedirecting(true);
        setTimeout(() => navigate('/koshMarket'), 2000);
      } else {
        setError(data.message || 'Signin failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during signin.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isRedirecting) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 fw-bold text-dark">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="d-flex flex-column justify-content-center align-items-center"
        style={{
          background: '#000F5A',
          borderTopLeftRadius: '25%',
          borderBottomRightRadius: '25%',
          paddingTop: isSmallScreen ? '40px' : '80px',
          paddingBottom: isSmallScreen ? '40px' : '80px',
        }}>
        <h1 className="fw-bold text-white mb-2" style={{ fontSize: isSmallScreen ? '48px' : '64px' }}>
          KOSH
        </h1>
        <p className="text-white mb-0" style={{ fontSize: isSmallScreen ? '16px' : '20px' }}>
          Sign in to your account
        </p>
      </div>

      <div className="flex-grow-1 d-flex flex-column justify-content-start align-items-center p-3" style={{ background: '#fff' }}>
        <h2 className="fw-bold mb-4" style={{ fontSize: isSmallScreen ? '24px' : '32px', color: '#000F5A', marginTop: isSmallScreen ? '20px' : '40px' }}>
          Sign in
        </h2>

        <div className="d-flex flex-column align-items-center text-dark pb-4" style={{ width: isSmallScreen ? '280px' : '320px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
            style={{ padding: '12px', border: '2px solid #000F5A', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold' }}
          />

          <div className="position-relative w-100 mb-2">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{ padding: '12px', paddingRight: '50px', border: '2px solid #ccc', borderRadius: '10px', fontSize: '14px' }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute translate-middle-y"
              style={{ right: '15px', top: '50%', cursor: 'pointer', fontSize: '20px', color: '#A9A9A9' }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          <div className="form-check w-100 text-start mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          {error && <div className="text-danger fs-6 mb-2 w-100">{error}</div>}

          <button
            onClick={() => handleSignIn()}
            className="btn btn-primary d-flex justify-content-center align-items-center gap-2 mt-2 w-100"
            disabled={isLoading}
            style={{
              background: '#000F5A',
              color: '#fff',
              padding: '12px',
              border: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 500,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" />
                <span> Please wait...</span>
              </>
            ) : (
              <>
                Sign in <span style={{ fontSize: '20px' }}>→</span>
              </>
            )}
          </button>

          <div className="text-center mt-3" style={{ fontSize: '16px', color: '#000F5A' }}>
            Don’t have an account?{' '}
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#000F5A', fontWeight: 'bold' }}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersSignIn;
