
export interface Place {
  id: number;
  name: string;
  category: string;
  description: string;

  // Map and place details from the backend
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  opening_hours: string | null;
  entry_fee: number | null;
  best_time_to_visit: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://madurai-iyal.onrender.com";

export async function getPlaces(
  category?: string
): Promise<Place[]> {
  const url = new URL(`${API_BASE_URL}/api/places`);

  if (category) {
    url.searchParams.set("category", category);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Madurai places");
  }

  const data: { count: number; places: Place[] } =
    await response.json();

  return data.places;
}
