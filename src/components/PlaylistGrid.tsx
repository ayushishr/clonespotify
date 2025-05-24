import React from 'react';
import { SpotifyPlaylist } from '../types/spotify';
import PlaylistCard from './PlaylistCard';
import LoadingSpinner from './LoadingSpinner';

interface PlaylistGridProps {
  playlists: SpotifyPlaylist[];
  isLoading: boolean;
  error: string | null;
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-800 text-red-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Error loading playlists</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg text-center">
        <h3 className="text-white text-lg mb-2">No playlists found</h3>
        <p className="text-gray-400">Create some playlists in Spotify to see them here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistGrid;