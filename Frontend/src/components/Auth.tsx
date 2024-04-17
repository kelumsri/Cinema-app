import React, { useState } from 'react';
import LoginForm from './Loging';
import SignupForm from './Signup';

const Auth: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSubmit = (values: any) => {
    console.log('Login form submitted with values:', values);
  };

  const handleSignupSubmit = (values: any) => {
    console.log('Signup form submitted with values:', values);
  };

  const switchToSignup = () => {
    setShowLogin(false);
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {showLogin ? (
        <LoginForm onSubmit={handleLoginSubmit} switchToSignUp={switchToSignup} />
      ) : (
        <SignupForm onSubmit={handleSignupSubmit} switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Auth;
