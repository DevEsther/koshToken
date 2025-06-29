import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = screenWidth < 768;

  const handleSignUp = async () => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://kosh-marketplace-backend.onrender.com/api/v1/users/signup',
        { email, password }
      );

      console.log('📦 Signup response:', response.data);

      const message = response.data.message || '';
      const userId = response.data.userId || response.data.data?.userId;
      const success =
        response.data.success ||
        message.toLowerCase().includes('signup successful') ||
        message.toLowerCase().includes('otp sent');

      if (success) {
        // ✅ Save email and userId
        if (email) localStorage.setItem('email', email);
        if (userId) localStorage.setItem('userId', userId);

        setSuccessMessage(message || 'Signup successful! OTP sent to your email.');
        setTimeout(() => {
          setIsLoading(false);
          navigate('/otpverify');
        }, 2000);
      } else {
        setError(message || 'Signup failed. OTP was not sent.');
        setIsLoading(false);
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'An error occurred during signup.';
      setError(errMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          background: '#000F5A',
          borderTopLeftRadius: '25%',
          borderBottomRightRadius: '25%',
          paddingTop: isSmallScreen ? '40px' : '80px',
          paddingBottom: isSmallScreen ? '40px' : '80px',
        }}
      >
        <h1 className="fw-bold text-white mb-2" style={{ fontSize: isSmallScreen ? '48px' : '64px' }}>
          KOSH
        </h1>
        <p className="text-white mb-0" style={{ fontSize: isSmallScreen ? '16px' : '20px' }}>
          Create your account
        </p>
      </div>

      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-center p-3"
        style={{ background: '#fff' }}
      >
        <h2
          className="fw-bold mb-4"
          style={{
            fontSize: isSmallScreen ? '24px' : '32px',
            color: '#000F5A',
            marginTop: isSmallScreen ? '20px' : '40px',
          }}
        >
          Sign up
        </h2>

        <div
          className="d-flex flex-column align-items-center text-dark pb-4"
          style={{ width: isSmallScreen ? '280px' : '320px' }}
        >
          <input
            type="email"
            placeholder=" Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
            style={{
              padding: isSmallScreen ? '12px' : '15px',
              border: '2px solid #000F5A',
              borderRadius: '10px',
              fontSize: isSmallScreen ? '14px' : '16px',
              fontWeight: 'bold',
              outline: 'none',
            }}
          />

          <div className="position-relative w-100">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{
                padding: isSmallScreen ? '12px' : '15px',
                paddingRight: '50px',
                border: '2px solid #ccc',
                borderRadius: '10px',
                fontSize: isSmallScreen ? '14px' : '16px',
                outline: 'none',
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute translate-middle-y"
              style={{
                right: '15px',
                top: '50%',
                cursor: 'pointer',
                fontSize: isSmallScreen ? '18px' : '20px',
                color: '#A9A9A9',
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          {error && (
            <div className="fs-6 mt-2 w-100 text-danger fw-bold">
              {error}
            </div>
          )}

          {successMessage && (
            <div
              className="fs-6 mt-2 w-100"
              style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                fontWeight: 'bold',
                border: '1px solid #c3e6cb',
                borderRadius: '5px',
                padding: '10px',
              }}
            >
              {successMessage}
            </div>
          )}

          <button
            onClick={handleSignUp}
            className="btn btn-primary d-flex justify-content-center align-items-center gap-2 mt-3 w-100"
            disabled={isLoading}
            style={{
              background: '#000F5A',
              color: '#fff',
              padding: isSmallScreen ? '12px' : '15px',
              border: 'none',
              borderRadius: '25px',
              fontSize: isSmallScreen ? '14px' : '16px',
              fontWeight: 500,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                <span> Please wait...</span>
              </>
            ) : (
              <>
                Sign up <span style={{ fontSize: isSmallScreen ? '18px' : '20px' }}>→</span>
              </>
            )}
          </button>

          <div
            className="text-center mt-3"
            style={{ fontSize: isSmallScreen ? '14px' : '16px', color: '#000F5A' }}
          >
            Already have an account?{' '}
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#000F5A', fontWeight: 'bold' }}
              onClick={() => navigate('/signin')}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersSignUp;
