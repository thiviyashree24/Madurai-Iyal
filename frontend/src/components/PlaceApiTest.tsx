
import { useEffect, useState } from "react";
import { getPlaces, type Place } from "../services/placeService";

export default function PlaceApiTest() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getPlaces()
      .then(setPlaces)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <p>API Error: {error}</p>;
  }

  return (
    <div>
      <h2>MADURAI IYAL API Test</h2>
      <p>Total places: {places.length}</p>

      {places.map((place) => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>Category: {place.category}</p>
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
}
