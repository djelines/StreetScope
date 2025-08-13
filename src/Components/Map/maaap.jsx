import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

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

export const Map = ({ places, setPlaces }) => {
  const [center, setCenter] = useState(null);
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
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

  if (!center) return <div>Localisation en cours...</div>;

  const allMarkers = [
    ...(userPos ? [userPos] : []),
    ...places.map(p => [p.geometry.coordinates[1], p.geometry.coordinates[0]])
  ];

  return (
    <div className="w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden relative">
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        <FitBounds markers={allMarkers} />

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
            <Popup>{place.properties.name || "Lieu sans nom"}</Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default Map;
