import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      background: '#000F5A',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '0 20px',
      textAlign: 'center',
      position: 'relative',
      borderTopLeftRadius: '25%',
      borderBottomRightRadius: '25%'
    }}>
      <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>KOSH</h1>
      
      <p style={{
        fontSize: '14px',
        maxWidth: '320px',
        marginBottom: '40px',
        lineHeight: '1.5'
      }}>
        Kosh is a next-gen marketplace designed to allow you to earn passive income while you sleep. Buy and
        sell NFTs, digital assets, and participate in fair drops, all from one easy to use platform.
      </p>

      <button
        style={buttonStyle}
        onClick={() => navigate('/signin')}
      >
        Sign In
      </button>

      <button
        style={{
          ...buttonStyle,
          marginTop: '20px',
          backgroundColor: 'white',
          color: '#000F5A'
        }}
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </button>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#000F5A',
  color: 'white',
  padding: '12px 30px',
  margin: '10px',
  borderRadius: '30px',
  border: '1px solid white',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Welcome;
