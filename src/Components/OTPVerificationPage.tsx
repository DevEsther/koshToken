// src/pages/OtpPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import otpImage from '../assets/Fines-Photoroom[1].png';

const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');

  const handleGetOtp = () => {
 

    if (mobile) {
      localStorage.setItem('mobile', mobile);
      navigate('/otpverify');
    }
  };

  return (
    <div style={styles.container}>
      <img src={otpImage} alt="OTP" style={styles.image} />
      <h2 style={styles.title}>OTP Verification</h2>
      <p style={styles.subtitle}>We will send a one-time password to this mobile number</p>
      <input
        type="text"
        placeholder="Enter email"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleGetOtp} style={styles.button}>Get OTP</button>
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
    marginBottom: '20px',
  },
  title: {
    color: '#000F5A',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#333',
    fontSize: '14px',
    margin: '10px 0 20px',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '14px',
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

export default OtpPage;
