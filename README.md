# Spotify Clone

A simplified Spotify clone built with React that displays a user's playlists after authentication with the Spotify API.

## Features

- Spotify OAuth 2.0 authentication
- User profile display
- Playlist browsing with cover art
- Responsive design for all devices
- Loading states and error handling

## Tech Stack

- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Spotify Web API for data

## Setup Instructions

1. Clone the repository
2. Create a `.env` file based on the `.env.example` template
3. Register a new Spotify application at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
4. Add your Spotify Client ID to the `.env` file
5. Set the Redirect URI in your Spotify app settings to match the one in your `.env` file
6. Install dependencies with `npm install`
7. Run the development server with `npm run dev`

## Development Assumptions

- The application focuses on displaying playlists rather than implementing a full music player
- The authentication flow uses the Authorization Code flow for better security
- Local storage is used for token management
- The design is inspired by Spotify's dark theme for familiarity

## Deployment

The application can be deployed to platforms like Vercel or Netlify with the following build command:

```
npm run build
```

The build output will be in the `dist` directory.