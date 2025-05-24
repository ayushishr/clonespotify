import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokensFromCode } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';

const CallbackPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = localStorage.getItem('spotify_auth_state');
      const error = urlParams.get('error');

      if (error) {
        setError(`Authentication error: ${error}`);
        return;
      }

      if (!code) {
        setError('No authorization code found in the URL');
        return;
      }

      if (state === null || state !== storedState) {
        setError('State mismatch. Possible CSRF attack');
        return;
      }

      try {
        await getTokensFromCode(code);
        navigate('/dashboard');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-4">
        <div className="bg-red-900 bg-opacity-20 border border-red-800 text-red-100 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Authentication Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-black font-medium py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-6">Logging you in...</h2>
        <LoadingSpinner size="large" />
      </div>
    </div>
  );
};

export default CallbackPage;