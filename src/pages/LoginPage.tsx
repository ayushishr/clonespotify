import React from 'react';
import LoginButton from '../components/LoginButton';
import { Music } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 text-white">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-spotify-green flex items-center justify-center">
            <Music size={32} className="text-black" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Welcome to Spotify Clone</h1>
        <p className="text-gray-400 mb-8">
          Connect with your Spotify account to see your playlists and favorites
        </p>
        
        <LoginButton />
        
        <div className="mt-8 text-xs text-gray-500">
          <p className="mb-2">
            This is a demo application that uses the Spotify Web API.
          </p>
          <p>
            You'll need a Spotify account to use this application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;