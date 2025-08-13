import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Marker standard
const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Marker utilisateur bleu clignotant
const userIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  className: 'user-marker', 
});

const API_KEY = "5ae2e3f221c38a28845f05b66eb9d12af98420f071eab59e36cc1f16";

const FitBounds = ({ markers }) => {
  const map = useMap();
  useEffect(() => {
    if (markers.length === 0) return;
    const bounds = L.latLngBounds(markers);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [markers, map]);
  return null;
};

// Marker pour le lieu sélectionné
const SelectedPlaceMarker = ({ place }) => {
  const map = useMap();
  const lat = place.geometry.coordinates[1];
  const lng = place.geometry.coordinates[0];

  useEffect(() => {
    map.setView([lat, lng], 17, { animate: true });
  }, [lat, lng, map]);

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div className="space-y-2">
          <h3 className="font-bold">{place.properties.name}</h3>
          <p>{place.properties.kinds}</p>
          {place.properties.preview?.source && (
            <img src={place.properties.preview.source} alt="preview" className="w-full rounded"/>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export const Map = ({ places, setPlaces, selectedPlace, setSelectedPlace, locked, setLocked }) => {
  const [center, setCenter] = useState(null); // ⚡ on attend la géolocalisation
  const [userPos, setUserPos] = useState(null);

  // Récupérer la position utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setCenter([latitude, longitude]);
          setUserPos([latitude, longitude]);
        },
        () => setCenter([48.8566, 2.3522]) // fallback Paris
      );
    } else {
      setCenter([48.8566, 2.3522]);
    }
  }, []);

  // Charger les lieux autour du centre
  useEffect(() => {
    if (!center) return;
    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=2000&lon=${center[1]}&lat=${center[0]}&apikey=${API_KEY}`
        );
        const data = await res.json();
        setPlaces(data.features || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaces();
  }, [center, setPlaces]);

  if (!center) return <div>Localisation en cours...</div>; // ⚡ on attend ici

  const allMarkers = [
    ...(userPos ? [userPos] : []),
    ...places.map(p => [p.geometry.coordinates[1], p.geometry.coordinates[0]])
  ];

  const handleReset = () => {
    setSelectedPlace(null);
    setLocked(false);
  };

  return (
    <div className="w-full h-[500px] border-2 border-sky-200 rounded-2xl overflow-hidden shadow-lg relative">
  <div className="absolute z-50 top-3 left-3">
    {locked && (
      <button
        onClick={handleReset}
        className="px-3 py-1 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition"
      >
        Retour à la carte normale
      </button>
    )}
  </div>

  <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; OpenStreetMap contributors'
    />

    {!selectedPlace && <FitBounds markers={allMarkers} />}

    {userPos && (
      <Marker position={userPos} icon={userIcon}>
        <Popup>Vous êtes ici</Popup>
      </Marker>
    )}

    {places.map((place, i) => (
      <Marker
        key={i}
        position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
      >
        <Popup>
          <div className="font-semibold text-sky-700">{place.properties.name || "Lieu sans nom"}</div>
        </Popup>
      </Marker>
    ))}

    {selectedPlace && <SelectedPlaceMarker place={selectedPlace} />}
  </MapContainer>
</div>

  );
};

export default Map;
