import React, { useState } from 'react';

type FormData = {
  name: string;
  country: string;
  state: string;
  address: string;
  contactNumber: string;
  size: string;
  colour: string;
  review: string;
};

type Props = {
  onSubmitForm: (data: FormData) => void;
};

const PlaceOrderForm: React.FC<Props> = ({ onSubmitForm }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    country: '',
    state: '',
    address: '',
    contactNumber: '',
    size: '',
    colour: '',
    review: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formStyle = {
    background: '#000F5A',
    color: 'white',
    padding: '20px',
    width: '100%',
    maxWidth: '320px',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    animation: 'fadeInUp 0.8s ease-in-out',
  } as const;

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '5px 0 15px',
    border: 'none',
    borderBottom: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
  } as const;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if ((formData as any)[key].trim() === '') {
        setError('Please fill all the fields before placing the order.');
        setSuccess('');
        return;
      }
    }

    // All fields filled: submit form
    onSubmitForm(formData);
    setError('');
    setSuccess('Order placed successfully!');

    // Clear form
    setFormData({
      name: '',
      country: '',
      state: '',
      address: '',
      contactNumber: '',
      size: '',
      colour: '',
      review: '',
    });

    // Hide form
    setFormSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000F5A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {formSubmitted ? (
        <div style={{ color: 'lightgreen', fontSize: '18px', textAlign: 'center' }}>
          ✅ Order placed successfully!
        </div>
      ) : (
        <form style={formStyle} onSubmit={handleSubmit}>
          <h4>Kindly fill the form below</h4>

          {error && <div style={{ color: 'yellow', marginBottom: '10px' }}>{error}</div>}
          {success && <div style={{ color: 'lightgreen', marginBottom: '10px' }}>{success}</div>}

          <input placeholder="Your name" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
          <input placeholder="Your country" name="country" value={formData.country} onChange={handleChange} style={inputStyle} />
          <input placeholder="Your state" name="state" value={formData.state} onChange={handleChange} style={inputStyle} />
          <input placeholder="Your address" name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
          <input placeholder="Your contact number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} style={inputStyle} />

          <h4 style={{ marginTop: '10px' }}>Kindly fill the shoe information</h4>

          <input placeholder="Your size" name="size" value={formData.size} onChange={handleChange} style={inputStyle} />
          <input placeholder="Your colour" name="colour" value={formData.colour} onChange={handleChange} style={inputStyle} />
          <input placeholder="Review" name="review" value={formData.review} onChange={handleChange} style={inputStyle} />

          <button
            type="submit"
            style={{
              backgroundColor: '#00001a',
              border: '2px solid white',
              padding: '10px',
              borderRadius: '25px',
              marginTop: '20px',
              color: 'white',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PlaceOrderForm;
