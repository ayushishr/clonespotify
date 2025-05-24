import { SpotifyUser, SpotifyPlaylist, AuthTokens } from '../types/spotify';
import { getTokensFromStorage } from '../utils/auth';

const BASE_URL = 'https://api.spotify.com/v1';

// Get the authorization header
const getAuthHeader = (): Headers => {
  const tokens = getTokensFromStorage();
  if (!tokens) {
    throw new Error('No authentication tokens found');
  }

  return new Headers({
    'Authorization': `Bearer ${tokens.access_token}`,
    'Content-Type': 'application/json',
  });
};

// Fetch the current user's profile
export const getCurrentUser = async (): Promise<SpotifyUser> => {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

// Fetch the current user's playlists
export const getUserPlaylists = async (limit = 20, offset = 0): Promise<{
  items: SpotifyPlaylist[];
  total: number;
}> => {
  const response = await fetch(
    `${BASE_URL}/me/playlists?limit=${limit}&offset=${offset}`,
    {
      headers: getAuthHeader(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user playlists');
  }

  return response.json();
};

// Fetch a playlist by ID
export const getPlaylistById = async (playlistId: string): Promise<SpotifyPlaylist> => {
  const response = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlist');
  }

  return response.json();
};