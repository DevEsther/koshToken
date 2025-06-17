import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KoshMarket: React.FC = () => {
  const navigate = useNavigate();

  const currencies = ['KOSH', 'IPT', 'Algo', 'USDC'];

  const currencyValues: Record<string, number> = {
    KOSH: 120,
    IPT: 80,
    Algo: 300,
    USDC: 50,
  };

  const userRole = 'admin'; 
  const isAdmin = userRole === 'admin';

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [productImage, setProductImage] = useState<string>('');

  // Admin uploads image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
        // You can save this to backend here
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedCurrency) {
      setError('Please select a payment method before placing an order.');
      return;
    }
    setError('');
    navigate('/PlaceOrder');
  };

  return (
    <div
      style={{
        backgroundColor: '#0B0B3B',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '340px',
          boxShadow: '0 0 15px rgba(11, 11, 59, 0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Top Section */}
        <div style={{ backgroundColor: 'white', padding: '15px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              style={{
                backgroundColor: '#0B0B3B',
                color: '#fff',
                borderRadius: '20px',
                padding: '6px 12px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              Connect wallet
            </button>
          </div>

          {/* Product Image */}
          <div
            style={{
              border: '2px solid #0B0B3B',
              borderRadius: '20px',
              height: '180px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {productImage ? (
              <img src={productImage} alt="Product" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
              <span style={{ color: '#0B0B3B', fontSize: '12px' }}>No Product Image</span>
            )}
          </div>

          {/* File input: visible ONLY to admin */}
          {isAdmin && (
            <div style={{ marginBottom: '10px' }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div
          style={{
            backgroundColor: '#0B0B3B',
            padding: '20px',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
        >
          <p
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            Total in Stock <br />
            <span style={{ fontSize: '18px' }}>10</span>
          </p>

          {currencies.map((currency) => (
            <div
              key={currency}
              onClick={() => {
                setSelectedCurrency(currency);
                setError('');
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: selectedCurrency === currency ? '#dff0d8' : 'white',
                borderRadius: '8px',
                padding: '10px 15px',
                margin: '8px 0',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#0B0B3B',
                cursor: 'pointer',
                border: selectedCurrency === currency ? '2px solid green' : 'none',
              }}
            >
              <span>Pay with {currency}</span>
              <span>
                {selectedCurrency === currency ? (
                  <span style={{ color: 'green' }}>✔</span>
                ) : (
                  `#${currencyValues[currency] ?? 0}`
                )}
              </span>
            </div>
          ))}

          {error && (
            <p style={{ color: 'red', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              onClick={handlePlaceOrder}
              style={{
                backgroundColor: 'white',
                color: '#0B0B3B',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Place Order
            </button>
            <button
              style={{
                backgroundColor: 'white',
                color: '#0B0B3B',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Get Coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoshMarket;
