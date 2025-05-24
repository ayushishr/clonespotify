import React from 'react';
import { getAuthUrl } from '../utils/auth';
import { Music } from 'lucide-react';

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center bg-spotify-green hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-full transition duration-300 gap-2"
    >
      <Music size={20} />
      Login with Spotify
    </button>
  );
};

export default LoginButton;