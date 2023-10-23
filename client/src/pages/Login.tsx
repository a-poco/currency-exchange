import React, { useState } from 'react';
import * as api from '../api';

interface LoginProps {
  onAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.loginUser(email, password);
      onAuthenticated(true);
    } catch (error) {
      alert('Not authorised!');
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-customGray rounded-md shadow-md p-12 w-96">
        <h1 className="text-center">Login</h1>
        <form
          onSubmit={handleLoginSubmit}
          className="flex flex-col space-y-4 mt-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="p-3 border border-customGray rounded-md shadow-sm focus:outline-none focus:border-blue bg-customWhite text-blue"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="p-3 border border-customGray rounded-md shadow-sm focus:outline-none focus:border-blue bg-customWhite text-blue"
          />

          <button
            type="submit"
            className="bg-highlightCustomBlue text-background py-2 px-4 rounded-md hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-customLightGray"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
