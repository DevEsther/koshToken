import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import OTPVerificationPage from './Components/OTPVerificationPage';
import OTPVerify from './Components/OTPVerify';
import AdminSignIn from './Components/AdminSignIn';
import SignupAdmin from './Components/SignupAdmin';
import OrderReceived from './Components/OrderReceived';
import KoshMarket from './Components/KoshMarket';
import PlaceOrderForm from './Components/PlaceOrderForm';
// import koshMarketPlace from './Components/KoshMarketplace';
import KoshMarketplace from './Components/KoshMarketplace'; // Correct path to your component


const App: React.FC = () => {
  const handlePlaceOrderSubmit = (data: any) => {
    console.log('Order submitted:', data);
    alert('Order placed successfully!');
  };

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/otp" element={<OTPVerificationPage />} />
      <Route path="/otpverify" element={<OTPVerify />} />
      <Route path="/admin" element={<AdminSignIn />} />
      <Route path="/adminsignup" element={<SignupAdmin />} />
      <Route path="/OrderReceived" element={<OrderReceived />} />
      <Route path="/PlaceOrder" element={<PlaceOrderForm onSubmitForm={handlePlaceOrderSubmit} />} />
      <Route path="/koshMarket" element={<KoshMarket />} />
      {/* <Route path="/KoshMarketPlace" element={<koshMarketPlace />} /> */}
      <Route path="/KoshMarketPlace" element={<KoshMarketplace />} />

    </Routes>
  );
};

export default App;
