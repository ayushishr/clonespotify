import React from 'react';
import { SpotifyPlaylist } from '../types/spotify';
import { ExternalLink } from 'lucide-react';

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const defaultImage = 'https://placehold.co/300x300/1db954/ffffff?text=Playlist';
  const imageUrl = playlist.images && playlist.images.length > 0 
    ? playlist.images[0].url 
    : defaultImage;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl group">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={playlist.name} 
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <a 
            href={playlist.external_urls.spotify} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-spotify-green text-white p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"
            title="Open in Spotify"
          >
            <ExternalLink size={24} />
          </a>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white truncate text-lg">{playlist.name}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2 h-10">
          {playlist.description || `By ${playlist.owner.display_name}`}
        </p>
        <p className="text-gray-500 text-xs mt-2">{playlist.tracks.total} tracks</p>
      </div>
    </div>
  );
};

export default PlaylistCard;