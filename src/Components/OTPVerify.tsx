import React, { useState } from 'react';
import axios from 'axios';
import otpImage from '../assets/Fines-Photoroom[1].png';
import { useNavigate } from 'react-router-dom';

const OtpVerify: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const email = localStorage.getItem('email') || '';
  const password = localStorage.getItem('password') || '';

  const handleVerify = async () => {
    setError('');
    setMessage('');

    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    if (!email) {
      setError('Email not found. Please sign up again.');
      return;
    }

    setIsLoading(true);
    console.log("📩 Verifying OTP for:", { email, otp: otp.trim() });

    try {
      const response = await axios.post(
        'https://kosh-marketplace-backend.onrender.com/api/v1/users/verify-otp',
        { email, otp: otp.trim() }
      );

      if (
        response.data.message?.toLowerCase().includes('otp verified') ||
        response.data.success
      ) {
        setMessage('OTP Verified! Redirecting to Sign In...');
        
        // ✅ Save for auto sign-in
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
        localStorage.setItem('rememberMe', 'true');

        setTimeout(() => {
          setIsLoading(false);
          navigate('/signin'); // Auto sign-in will happen there
        }, 1500);
      } else {
        setIsLoading(false);
        setError(response.data.message || 'OTP verification failed.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred during verification.');
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setMessage('');

    if (!email) {
      setError('Email not found. Please sign up again.');
      return;
    }

    console.log('🔁 Resending OTP for:', email);

    try {
      const response = await axios.post(
        'https://kosh-marketplace-backend.onrender.com/api/v1/users/resend-otp',
        { email }
      );

      if (
        response.data.message?.toLowerCase().includes('otp resent') ||
        response.data.success
      ) {
        setMessage('OTP resent successfully to your email.');
      } else {
        setError(response.data.message || 'Failed to resend OTP.');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'An error occurred while resending OTP.';
      if (errMsg.toLowerCase().includes('already verified')) {
        setError('Your account is already verified. Please Sign In.');
      } else {
        setError(errMsg);
      }
    }
  };

  return (
    <div style={styles.container}>
      <img src={otpImage} alt="OTP" style={styles.image} />
      <h2 style={styles.title}>OTP Verification</h2>
      <p style={styles.subtitle}>Enter the OTP sent to your email</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={styles.input}
      />

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {message && (
        <div
          style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            fontWeight: 'bold',
          }}
        >
          {message}
        </div>
      )}

      <button onClick={handleVerify} style={styles.button} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" />
            Please wait...
          </>
        ) : (
          'Verify OTP'
        )}
      </button>

      <button
        onClick={handleResendOtp}
        className="btn btn-outline-primary mt-3"
        disabled={isLoading}
        style={{
          width: '100%',
          maxWidth: '300px',
          borderRadius: '30px',
          border: '2px solid #000F5A',
          color: '#000F5A',
        }}
      >
        Resend OTP
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '30px 20px',
    fontFamily: 'Arial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    background: '#fff',
  },
  image: {
    width: '35%',
  },
  title: {
    color: '#000F5A',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#333',
    fontSize: '14px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#000F5A',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '300px',
  },
};

export default OtpVerify;
