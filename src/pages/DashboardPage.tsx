import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpotifyUser, SpotifyPlaylist } from '../types/spotify';
import { getCurrentUser, getUserPlaylists } from '../api/spotify';
import { isTokenValid } from '../utils/auth';
import Header from '../components/Header';
import PlaylistGrid from '../components/PlaylistGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!isTokenValid()) {
        navigate('/');
        return false;
      }
      return true;
    };

    const fetchUserData = async () => {
      if (!checkAuth()) return;
      
      try {
        setIsLoadingUser(true);
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      } finally {
        setIsLoadingUser(false);
      }
    };

    const fetchPlaylists = async () => {
      if (!checkAuth()) return;
      
      try {
        setIsLoadingPlaylists(true);
        const playlistData = await getUserPlaylists(50);
        setPlaylists(playlistData.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch playlists');
      } finally {
        setIsLoadingPlaylists(false);
      }
    };

    fetchUserData();
    fetchPlaylists();
  }, [navigate]);

  if (isLoadingUser && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-6">Loading your profile...</h2>
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header user={user} isLoading={isLoadingUser} />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
          <PlaylistGrid 
            playlists={playlists} 
            isLoading={isLoadingPlaylists} 
            error={error} 
          />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;