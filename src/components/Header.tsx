import React from 'react';
import { LogOut, User } from 'lucide-react';
import { SpotifyUser } from '../types/spotify';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  user: SpotifyUser | null;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, isLoading }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-black bg-opacity-95 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 16.5C16.27 16.5 16.04 16.41 15.87 16.24C14.77 15.14 13.04 14.5 12 14.5C10.96 14.5 9.23 15.14 8.13 16.24C7.96 16.41 7.73 16.5 7.5 16.5C7.27 16.5 7.04 16.41 6.87 16.24C6.52 15.89 6.52 15.35 6.87 15C8.28 13.59 10.5 12.75 12 12.75C13.5 12.75 15.72 13.59 17.13 15C17.48 15.35 17.48 15.89 17.13 16.24C16.96 16.41 16.73 16.5 16.5 16.5ZM7.5 12C7.5 10.62 8.62 9.5 10 9.5C11.38 9.5 12.5 10.62 12.5 12C12.5 13.38 11.38 14.5 10 14.5C8.62 14.5 7.5 13.38 7.5 12ZM17.5 14.5C16.12 14.5 15 13.38 15 12C15 10.62 16.12 9.5 17.5 9.5C18.88 9.5 20 10.62 20 12C20 13.38 18.88 14.5 17.5 14.5Z" fill="#1DB954"/>
            </svg>
            <span className="ml-2">Spotify Clone</span>
          </h1>
        </div>

        {user && !isLoading ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                {user.images && user.images.length > 0 ? (
                  <img src={user.images[0].url} alt={user.display_name} className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-gray-400" />
                )}
              </div>
              <span className="ml-2 text-white font-medium hidden md:inline">
                {user.display_name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white p-2 rounded-full transition duration-300"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;