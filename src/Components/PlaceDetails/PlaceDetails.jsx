import React from 'react';

const translateKinds = {
  historic_architecture: "Architecture historique",
  architecture: "Architecture",
  interesting_places: "Lieux intéressants",
  other_buildings_and_structures: "Autres bâtiments",
  natural: "Nature",
  cultural: "Culture",
  monuments: "Monuments",
};

const PlaceDetails = ({ place }) => {
  if (!place || !place.properties) return null;

  const { name, kinds, rate, dist, wikipedia } = place.properties;
  const noteSur10 = rate ? Math.round((rate / 7) * 10 * 10) / 10 : "N/A";

  const translatedKinds = kinds
    ? kinds.split(',').map(k => translateKinds[k] || k)
    : [];

  return (
    <div className="p-4 rounded-xl  mb-3">

      <div className="flex flex-wrap gap-2 mb-2">
        {translatedKinds.map((kind, idx) => (
          <span key={idx} className="bg-cyan-700 text-cyan-100 px-2 py-1 rounded-lg text-sm">
            {kind}
          </span>
        ))}
      </div>

      <p className="text-gray-700 mb-1">Distance : {dist ? `${Math.round(dist)} m` : "N/A"}</p>
      <p className="text-gray-700 mb-2">Note : {noteSur10} / 10 ⭐</p>

      {wikipedia && (
        <p>
          <a
            href={`https://${wikipedia}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Wikipedia
          </a>
        </p>
      )}
    </div>
  );
};

export default PlaceDetails;
