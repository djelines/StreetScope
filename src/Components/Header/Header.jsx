// Header.js
import React from 'react';

export const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
      {/* Logo à gauche */}
      <div className="flex-shrink-0 flex items-center gap-2">
        
        <span className="text-xl font-extrabold text-blue-700">StreetScope</span>
      </div>

      {/* Barre de recherche au centre */}
      <div className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Rechercher un lieu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
        />
      </div>
    </header>
  );
};

export default Header;
