import React, { useState } from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, onSelectPlace }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const ITEMS_PER_PAGE = 10;

  const namedPlaces = places.filter(
    place => place.properties.name && place.properties.name.trim() !== ''
  );

  const sortedPlaces = [...namedPlaces].sort((a, b) => {
    const nameA = a.properties.name;
    const nameB = b.properties.name;
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const totalPages = Math.ceil(sortedPlaces.length / ITEMS_PER_PAGE);
  const paginatedPlaces = sortedPlaces.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleExpand = (index, place) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    onSelectPlace(place);
  };

  return (
    <div className="space-y-3">
      {namedPlaces.length === 0 ? (
        <p className="text-gray-400 text-center py-4">Aucun lieu trouvé autour de vous.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Tri par nom :</span>
            <div className="space-x-2">
              <button
                onClick={() => setSortOrder('asc')}
                className={`px-3 py-1 rounded-lg font-semibold ${
                  sortOrder === 'asc'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                }`}
              >
                A → Z
              </button>
              <button
                onClick={() => setSortOrder('desc')}
                className={`px-3 py-1 rounded-lg font-semibold ${
                  sortOrder === 'desc'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                }`}
              >
                Z → A
              </button>
            </div>
          </div>

          {paginatedPlaces.map((place, i) => (
            <div
              key={i}
              className="border border-sky-200 rounded-xl p-3 bg-gradient-to-b from-white to-sky-50 shadow hover:shadow-lg transition"
            >
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => toggleExpand(i, place)}
              >
                <h3 className="font-bold text-sky-700">{place.properties.name}</h3>
                <span className="text-sky-500">{expandedIndex === i ? '▲' : '▼'}</span>
              </div>

              {expandedIndex === i && (
                <div className="mt-3">
                  <PlaceDetails place={place} />
                </div>
              )}
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center space-x-3 mt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-sky-100 text-sky-700 disabled:opacity-50 hover:bg-sky-200"
              >
                Précédent
              </button>
              <span className="px-3 py-1 font-medium text-sky-700">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-sky-100 text-sky-700 disabled:opacity-50 hover:bg-sky-200"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
