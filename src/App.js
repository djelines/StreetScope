import React, { useState } from "react";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import { Map } from "./Components/Map/Map";

function App() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les lieux selon la recherche
  const filteredPlaces = places.filter(place => 
    place.properties.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50/80">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Liste des lieux autour de vous</h2>
          <List places={filteredPlaces} onSelectPlace={setSelectedPlace} />
        </div>

        <div className="md:col-span-8 bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Carte</h2>
          <Map 
            places={filteredPlaces} 
            setPlaces={setPlaces} 
            selectedPlace={selectedPlace} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
