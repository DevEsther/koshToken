import React, { useState } from 'react';

interface Props {
  onNext: (mobile: string) => void;
}

const OTPRequest: React.FC<Props> = ({ onNext }) => {
  const [mobile, setMobile] = useState('');

  const handleSubmit = () => {
    if (mobile) {
  
      onNext(mobile);
    }
  };

  return (
    <div style={styles.container}>
      <img src="/otp.png" alt="OTP illustration" style={styles.image} />
      <h2 style={styles.title}>OTP Verification</h2>
      <p style={styles.subtitle}>We will send a one-time password to this mobile number</p>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={styles.input}
      />
      <button style={styles.button} onClick={handleSubmit}>
        Get OTP
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxWidth: 200,
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#000066',
  },
  subtitle: {
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#000066',
    color: '#fff',
    border: 'none',
    borderRadius: 30,
    fontWeight: 'bold',
    boxShadow: '0px 4px 5px rgba(0,0,0,0.2)',
  },
};

export default OTPRequest;
