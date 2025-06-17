import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignInAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const isSmallScreen = window.innerWidth < 768;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    setError('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    const adminsJSON = localStorage.getItem('admins');
    const admins = adminsJSON ? JSON.parse(adminsJSON) : {};

    if (!admins[email]) {
      setError('Admin account does not exist.');
      return;
    }

    if (admins[email] !== password) {
      setError('Incorrect password.');
      return;
    }

    alert('Admin sign in successful!');
    localStorage.setItem('currentAdmin', email);
    navigate('/admin-dashboard');
  };

  return (
    <div style={{
      height: '106vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden'
    }}>
      <div style={{
        background: '#000F5A',
        borderTopLeftRadius: '25%',
        borderBottomRightRadius: '25%',
        width: '100%',
        height: isSmallScreen ? '40vh' : '50vh',
        minHeight: '200px',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
      }} />
      <div style={{
        height: isSmallScreen ? '40vh' : '50vh',
        minHeight: '200px',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 0
      }} />
      <div style={{
        background: '#fff',
        height: isSmallScreen ? '60vh' : '50vh',
        minHeight: '300px',
        width: '100%',
        position: 'absolute',
        top: isSmallScreen ? '40vh' : '50vh',
        zIndex: 0
      }} />
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          marginTop: isSmallScreen ? '40px' : '50px'
        }}>
          <h1 style={{
            fontSize: isSmallScreen ? '48px' : '64px',
            fontWeight: 'bold',
            color: '#fff',
            margin: '0 0 20px'
          }}>
            KOSH
          </h1>
          <p style={{
            color: 'white',
            fontSize: isSmallScreen ? '16px' : '20px',
            margin: '0 0 20px'
          }}>
            Welcome Admin! 
          </p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginTop: '20vh',
        }}>
          <h2 style={{
            fontSize: isSmallScreen ? '24px' : '32px',
            fontWeight: 'bold',
            margin: '0 0 20px',
            color: '#000F5A',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
          }}>
            Admin 
          </h2>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#1A1A2E',
          marginTop: 'auto',
          paddingBottom: '20px',
          width: isSmallScreen ? '280px' : '320px',
          minWidth: isSmallScreen ? '280px' : '320px'
        }}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: isSmallScreen ? '12px' : '15px',
              margin: '15px 0 5px 0',
              border: '2px solid #000F5A',
              borderRadius: '10px',
              fontSize: isSmallScreen ? '14px' : '16px',
              fontWeight: 'bold',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
          />
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: isSmallScreen ? '12px' : '15px',
                paddingRight: '50px',
                margin: '15px 0 5px 0',
                border: '2px solid #ccc',
                borderRadius: '10px',
                fontSize: isSmallScreen ? '14px' : '16px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: isSmallScreen ? '18px' : '20px',
                color: '#A9A9A9'
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
          {error && (
            <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px', width: '100%' }}>{error}</div>
          )}
          <button
            onClick={handleSignIn}
            style={{
              background: '#000F5A',
              color: '#fff',
              padding: isSmallScreen ? '12px' : '15px',
              border: 'none',
              borderRadius: '25px',
              width: '100%',
              fontSize: isSmallScreen ? '14px' : '16px',
              fontWeight: '500',
              cursor: 'pointer',
              margin: '15px 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              transition: 'background-color 0.3s'
            }}
          >
            Sign in <span style={{ fontSize: isSmallScreen ? '18px' : '20px' }}>→</span>
          </button>

          <Link
            to="/adminsignup"
            style={{
              marginTop: '-10px',
              fontSize: isSmallScreen ? '13px' : '14px',
              color: '#000F5A',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Don’t have an account? <strong>Sign up</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInAdmin;
