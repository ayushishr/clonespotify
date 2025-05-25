import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokensFromCode } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';

const CallbackPage: React.FC = () => {
   console.log('Full URL:', window.location.href);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleCallback = async () => {
  //    console.log("window.location.search", window.location.search);
  //     const urlParams = new URLSearchParams(window.location.search);
  //     console.log("urlParams", urlParams);
  //     const code = urlParams.get('code');
  //       console.log("code", code);
  //     const state = urlParams.get('state');
  //             console.log("state", state);
  //     const storedState = localStorage.getItem('spotify_auth_state');
  //     const error = urlParams.get('error');
  //  console.log("error", error);
  //     if (error) {
  //       setError(`Authentication error: ${error}`);
  //       return;
  //     }

  //     if (!code) {
  //       setError('No authorization code found in the URL');
  //       return;
  //     }

  //     if (state === null || state !== storedState) {
  //       setError('State mismatch. Possible CSRF attack');
  //       return;
  //     }

  //     try {
  //       await getTokensFromCode(code);
  //       navigate('/dashboard');
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An unknown error occurred');
  //     }
  //   };

  //   handleCallback();
  // }, [navigate]);
useEffect(() => {
    const handleCallback = async () => {
      console.log('Full URL:', window.location.href);
      const urlParams = new URLSearchParams(window.location.search);
      
      console.log('All URL params:', Object.fromEntries(urlParams.entries()));
      
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = localStorage.getItem('spotify_auth_state');
      const error = urlParams.get('error');

      console.log('Auth code:', code);
      console.log('State param:', state);
      console.log('Stored state:', storedState);
      console.log('Error param:', error);

      if (error) {
        console.error('Spotify auth error:', error);
        setError(`Authentication error: ${error}`);
        return;
      }

      if (!code) {
        console.error('Missing authorization code');
        setError('No authorization code found in the URL');
        return;
      }

      // if (state === null || state !== storedState) {
      //   console.error(`State mismatch! Received: ${state}, Expected: ${storedState}`);
      //   setError('State mismatch. Possible CSRF attack');
      //   return;
      // }

      try {
        console.log('Initiating token exchange...');
        const tokens = await getTokensFromCode(code);
        console.log('Token exchange successful:', tokens);
        
        // Clear the state after successful exchange
        localStorage.removeItem('spotify_auth_state');
        
        navigate('/dashboard');
      } catch (err) {
        console.error('Token exchange failed:', err);
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