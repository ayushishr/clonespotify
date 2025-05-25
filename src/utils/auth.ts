import { AuthTokens } from '../types/spotify';

// Spotify API credentials
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/callback`;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
];

// Generate a random string for the state parameter
export const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values)
    .map((x) => possible[x % possible.length])
    .join('');
};

// Generate the authorization URL
export const getAuthUrl = (): string => {
  const state = generateRandomString(16);
  localStorage.setItem('spotify_auth_state', state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state,
    scope: SCOPES.join(' '),
  });

  return `${AUTH_ENDPOINT}?${params.toString()}`;
};

// Exchange authorization code for tokens
export const getTokensFromCode = async (code: string): Promise<AuthTokens> => {
  const payload = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET, // Add this line
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload,
  });

  if (!response.ok) {
    throw new Error('Failed to get tokens');
  }

  const data = await response.json();

  // Calculate token expiration time
  const expiresAt = Date.now() + data.expires_in * 1000;

  const tokens: AuthTokens = {
    ...data,
    expires_at: expiresAt,
  };

  saveTokensToStorage(tokens);
  return tokens;
};

// Save tokens to localStorage
export const saveTokensToStorage = (tokens: AuthTokens): void => {
  localStorage.setItem('spotify_tokens', JSON.stringify(tokens));
};

// Get tokens from localStorage
export const getTokensFromStorage = (): AuthTokens | null => {
  const tokensStr = localStorage.getItem('spotify_tokens');
  if (!tokensStr) return null;

  return JSON.parse(tokensStr);
};

// Check if the token is valid
export const isTokenValid = (): boolean => {
  const tokens = getTokensFromStorage();
  if (!tokens || !tokens.expires_at) return false;

  return tokens.expires_at > Date.now();
};

// Clear authentication data
export const logout = (): void => {
  localStorage.removeItem('spotify_tokens');
  localStorage.removeItem('spotify_auth_state');
};