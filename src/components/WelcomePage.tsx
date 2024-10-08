import React from 'react';
import LoginForm from './LoginForm';

interface WelcomePageProps {
  onLogin: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onLogin }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="m-auto w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-white text-center">Welcome Back!</h2>
        <p className="text-xl mb-8 text-gray-300 text-center">
          To keep connected with us, please sign in with your personal info.
        </p>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
};

export default WelcomePage;
