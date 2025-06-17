import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderReceived: React.FC = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate('/'); 
  };

  return (
    <div
      style={{
        height: '100vh',
        background: 'linear-gradient(to bottom right, #001F66, #000066)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      <div style={{ fontSize: '80px' }}>🛍️</div>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '20px' }}>
        Order Received
      </h2>
      <p style={{ marginBottom: '20px' }}>Get back to you shortly</p>

      <button
        onClick={handleReset}
        style={{
          padding: '10px 20px',
          background: '#fff',
          color: '#000066',
          borderRadius: '20px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Back to Market
      </button>
    </div>
  );
};

export default OrderReceived;
