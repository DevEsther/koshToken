import React, { useState } from 'react';
import axios from 'axios';
import otpImage from '../assets/Fines-Photoroom[1].png';
import { useNavigate } from 'react-router-dom';

const OtpVerify: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || '';
  const [otp, setOtp] = useState('');
  const [resendText, setResendText] = useState('Resend OTP');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    setError('');
    if (!otp) {
      setError('Please enter OTP.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/verify-otp', { userId, otp });
      if (response.data.success) {
        alert('OTP Verified Successfully!');
        navigate('/admin-dashboard');
      } else {
        setError(response.data.message || 'OTP Verification failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred during verification.');
    }
  };

  const handleResend = async () => {
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/resend-otp', { userId });
      if (response.data.success) {
        setResendText('OTP Sent!');
        setMessage('A new OTP has been sent to your email.');
      } else {
        setError(response.data.message || 'Failed to resend OTP.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while resending OTP.');
    }
  };

  return (
    <div style={styles.container}>
      <img src={otpImage} alt="OTP" style={styles.image} />
      <h2 style={styles.title}>OTP Verification</h2>
      <p style={styles.subtitle}>Enter the OTP sent to your email</p>
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={styles.input} />
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      <p style={styles.resend}>
        Didn’t Receive the OTP? <span onClick={handleResend} style={styles.resendLink}>{resendText}</span>
      </p>
      <button onClick={handleVerify} style={styles.button}>Verify OTP</button>
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
  resend: {
    fontSize: '13px',
    color: '#333',
    marginBottom: '20px',
  },
  resendLink: {
    color: '#000F5A',
    fontWeight: 'bold',
    cursor: 'pointer',
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
  },
};

export default OtpVerify;
