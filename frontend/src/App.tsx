import AuthPage from "./pages/AuthPage";
import { getPlaces, type Place } from "./services/placeService";
import L from "leaflet";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "./App.css";
import templeImage from "./assets/images/M-Temple.jpeg";
import heritageImage from "./assets/images/Heritage.jpeg";
import natureImage from "./assets/images/Nature.jpg";
import foodImage from "./assets/images/Food.jpg";
import cultureImage from "./assets/images/Culture.jpg";
import meenakshiAmmanTempleImage from "./assets/images/meenakshi-amman-temple.jpeg";
import thirupparankundramImage from "./assets/images/thirupparankundram.jpeg";
import koodalAzhagarTempleImage from "./assets/images/koodal-azhagar-temple.jpeg";
import alagarKovilImage from "./assets/images/alagar-kovil.jpeg";
import goripalayamDargahImage from "./assets/images/goripalayam-dargah.jpeg";
import stMarysCathedralImage from "./assets/images/st-marys-cathedral.jpeg";
import teppakulamImage from "./assets/images/Teppakulam.jpeg";
import samanarPhotoImage from "./assets/images/Samanar-photo.jpeg";
import vaigaiPhotoImage from "./assets/images/vaigai-photo.jpeg";
import vilakkuthoonImage from "./assets/images/Vilakkuthoon.jpeg";
import jigarthandaImage from "./assets/images/Jigarthanda.jpeg";
import kariDosaImage from "./assets/images/Kari Dosa.jpeg";
import snacksImage from "./assets/images/Snacks.jpeg";
import parottaImage from "./assets/images/Parotta.jpeg";
import paruthiPaalImage from "./assets/images/Paruthi-Paal.jpeg";
import mealsImage from "./assets/images/Meals.jpeg";
import ecoParkImage from "./assets/images/ECO Park.jpeg";
import vandiyurParkImage from "./assets/images/Vandiyur-Park.jpeg";
import rajajiParkImage from "./assets/images/Rajaji-Park.jpeg";
import tamukkamImage from "./assets/images/Tamukkam.jpeg";
import thirumalaiNayakImage from "./assets/images/Thirumalai-Nayak.jpeg";
import gandhiMuseumImage from "./assets/images/gandhi-museum.jpeg";
import worldTamilSangamImage from "./assets/images/world-tamil-sangam.jpeg";
import keeladiSiteImage from "./assets/images/Keeladi-Site.jpeg";
import keeladiMuseumImage from "./assets/images/Keeladi-Museum.jpeg";
import rockCutTempleImage from "./assets/images/Rock-Cut.jpeg";
import nandiStatueImage from "./assets/images/Nandi-Statue.jpeg";
import mandapamImage from "./assets/images/Mandapam.jpeg";
import pathuThoonImage from "./assets/images/Pathu-Thoon.jpeg";
import pazhamudircholaiImage from "./assets/images/Pazhamudircholai-Nature.jpeg";
import thirupparankundramHillsImage from "./assets/images/Thirupparankundram-Hills.jpeg";
import vandiyurLakeImage from "./assets/images/vandiyur-lake.jpeg";
import yanaiHillsImage from "./assets/images/Yanai-Hills.jpeg";
import puthuMandapamImage from "./assets/images/Puthu-Mandapam.jpeg";
import flowerMarketImage from "./assets/images/Flower-Market.jpeg";
import annaNagarImage from "./assets/images/Anna-nagar.jpeg";
import townHallImage from "./assets/images/Town-Hall.jpeg";
import templeStreetsImage from "./assets/images/temple-streets.jpeg";
import maduraiJunctionImage from "./assets/images/Madurai-Junction.jpeg";
import mattuthavaniImage from "./assets/images/Mattuthavani.jpeg";
import periyarBusImage from "./assets/images/Periyar-Bus.jpeg";
import arappalayamImage from "./assets/images/Arappalayam.jpeg";
import maduraiAirportImage from "./assets/images/Madurai-Airport.jpeg";
const peacefulMapPlaces = [
  {
    name: "Meenakshi Amman Temple",
    position: [9.9195, 78.1193] as [number, number],
    image: meenakshiAmmanTempleImage,
    description: "Historic temple in the heart of Madurai.",
  },
  {
    name: "Thirupparankundram",
   position: [9.8807974, 78.0715637] as [number, number],
    image: thirupparankundramImage,
    description: "Historic hill temple area in Madurai.",
  },
  {
    name: "Koodal Azhagar Temple",
    position: [9.9165, 78.1140] as [number, number],
    image: koodalAzhagarTempleImage,
    description: "Historic Vishnu temple near Madurai's centre.",
  },
  {
    name: "Alagar Kovil",
    position: [10.0730, 78.2050] as [number, number],
    image: alagarKovilImage,
    description: "Temple surrounded by scenic hills.",
  },
  {
    name: "Goripalayam Dargah",
    position: [9.9310, 78.1230] as [number, number],
    image: goripalayamDargahImage,
    description: "Important historic dargah in Madurai.",
  },
  {
    name: "St. Mary's Cathedral Shrine Church",
    position: [9.9250, 78.1190] as [number, number],
    image: stMarysCathedralImage,
    description: "Historic Catholic cathedral in Madurai.",
  },
  {
    name: "Teppakulam",
    position: [9.9087, 78.1433] as [number, number],
    image: teppakulamImage,
    description: "A scenic temple tank ideal for photography.",
  },
  {
    name: "Samanar Hills",
    position: [9.8960, 78.0270] as [number, number],
    image: samanarPhotoImage,
    description: "Ancient Jain heritage with rocky hill views.",
  },
  {
    name: "Vaigai River",
    position: [9.9250, 78.1250] as [number, number],
    image: vaigaiPhotoImage,
    description: "The famous river flowing through Madurai.",
  },
  {
    name: "Vilakkuthoon",
    position: [9.9165, 78.1230] as [number, number],
    image: vilakkuthoonImage,
    description: "A well-known historic landmark in Madurai.",
  },
  // FOOD LOCATIONS
  {
    name: "Madurai Famous Jigarthanda - West Masi Street",
    position: [9.9190, 78.1160] as [number, number],
    image: jigarthandaImage,
    description: "Popular Madurai-style Jigarthanda shop near West Masi Street.",
  },
  {
    name: "Konar Mess - Kari Dosa",
    position: [9.9250, 78.1280] as [number, number],
    image: kariDosaImage,
    description: "Madurai-style mutton Kari Dosa at the famous Konar Mess.",
  },
  {
    name: "Sri Meenakshi Paniyaram Shop",
    position: [9.9190, 78.1180] as [number, number],
    image: snacksImage,
    description: "Traditional Madurai snack stop for paniyaram and local treats.",
  },
  {
    name: "Madurai Bun Parotta Kadai",
    position: [9.9230, 78.1450] as [number, number],
    image: parottaImage,
    description: "Popular local stop for soft bun parotta.",
  },
  {
    name: "Sri Thirumalai Madai Karuppasamy Paruthi Paal",
    position: [9.9160, 78.1370] as [number, number],
    image: paruthiPaalImage,
    description: "Local favourite for traditional paruthi paal.",
  },
  {
    name: "Sree Sabarees - Traditional Meals",
     position: [9.9180341, 78.1127156] as [number, number],
         image: mealsImage,
    description: "Vegetarian South Indian meals and traditional dishes.",
  },
  {
  name: "Thiruparankundram ECO Park",
  position: [9.8810, 78.0710] as [number, number],
  image: ecoParkImage,
  description: "A family-friendly green space near Thiruparankundram.",
},
{
  name: "Vandiyur Park",
  position: [9.9090, 78.1430] as [number, number],
  image: vandiyurParkImage,
  description: "A local outdoor spot for family time and relaxation.",
},
{
  name: "Rajaji Park",
  position: [9.9300, 78.1200] as [number, number],
  image: rajajiParkImage,
  description: "A green space for a relaxing family outing.",
},
{
  name: "Tamukkam Ground Exhibition",
  position: [9.9340, 78.1310] as [number, number],
  image: tamukkamImage,
  description: "A well-known Madurai venue for exhibitions and public events.",
},
{
  name: "Thirumalai Nayak Palace",
  position: [9.9173, 78.1193] as [number, number],
  image: thirumalaiNayakImage,
  description: "A historic palace in Madurai known for its grand pillars and architecture.",
},
{
  name: "Gandhi Museum",
  position: [9.9300, 78.1380] as [number, number],
  image: gandhiMuseumImage,
  description: "A museum preserving memories and exhibits related to Mahatma Gandhi.",
},
{
  name: "World Tamil Sangam",
  position: [9.9390, 78.1400] as [number, number],
  image: worldTamilSangamImage,
  description: "A cultural centre celebrating Tamil language, literature, and heritage.",
},
{
  name: "Keeladi Archaeological Site",
  position: [9.8650, 78.1840] as [number, number],
  image: keeladiSiteImage,
  description: "An archaeological site associated with ancient Tamil civilisation.",
},
{
  name: "Keeladi Museum",
   position: [9.86361, 78.18492] as [number, number],
  image: keeladiMuseumImage,
  description: "A museum displaying archaeological discoveries from the Keeladi excavations.",
},
{
  name: "Thirupparankundram Rock-Cut Temple",
 position: [9.87417, 78.07056] as [number, number],
  image: rockCutTempleImage,
  description: "An ancient rock-cut temple associated with Madurai's religious heritage.",
},
{
  name: "Nandi Statue",
  position: [9.920259, 78.121776] as [number, number],
  image: nandiStatueImage,
  description: "A Nandi statue; verify the exact site represented by this image.",
},
{
  name: "Aayiram Kaal Mandapam",
  position: [9.9195, 78.1195] as [number, number],
  image: mandapamImage,
  description: "The celebrated Thousand Pillar Hall inside the Meenakshi Amman Temple complex.",
},
{
  name: "Pathu Thoon",
  position: [9.91702, 78.12368] as [number, number],
  image: pathuThoonImage,
  description: "A historic landmark in Madurai; verify the exact marker location.",
},
{
  name: "Pazhamudircholai",
  position: [10.0740, 78.2120] as [number, number],
  image: pazhamudircholaiImage,
  description: "Murugan temple in a green hillside setting.",
},
{
    name: "Thirupparankundram Hills",
     position: [9.87631, 78.07043] as [number, number],
    image: thirupparankundramHillsImage,
    description: "Rocky hills and natural scenery around Thirupparankundram.",
  },
  {
    name: "Vandiyur Lake",
    position: [9.9110, 78.1460] as [number, number],
    image: vandiyurLakeImage,
    description: "A lakeside area for enjoying the outdoors around Madurai.",
  },
  {
    name: "Yanai Hills",
    position: [9.9500, 78.0800] as [number, number],
    image: yanaiHillsImage,
    description: "Rocky hill scenery in the Madurai region.",
  },
  
  // SHOPPING LOCATIONS
  {
    name: "Puthu Mandapam",
    position: [9.9188, 78.1190] as [number, number],
    image: puthuMandapamImage,
    description: "Traditional shopping area near Meenakshi Amman Temple.",
  },
  {
    name: "Madurai Flower Market",
    position: [9.9190, 78.1160] as [number, number],
    image: flowerMarketImage,
    description: "Explore Madurai's colourful flower market.",
  },
  {
    name: "Anna Nagar",
    position: [9.9150, 78.1450] as [number, number],
    image: annaNagarImage,
    description: "Explore shops and local businesses in Anna Nagar.",
  },
  {
    name: "Town Hall Road Shopping Area",
    position: [9.9175, 78.1190] as [number, number],
    image: townHallImage,
    description: "A busy shopping area in central Madurai.",
  },
  {
    name: "Meenakshi Amman Temple Street",
     position: [9.9182142, 78.1241048] as [number, number],
    image: templeStreetsImage,
    description: "Traditional streets around Meenakshi Amman Temple.",
  },
  
  // TRANSPORT HUB LOCATIONS
  {
    name: "Madurai Junction",
    position: [9.9175, 78.1195] as [number, number],
    image: maduraiJunctionImage,
    description: "Madurai's main railway junction.",
  },
  {
    name: "Mattuthavani Bus Stand",
    position: [9.9395, 78.1405] as [number, number],
    image: mattuthavaniImage,
    description: "Major bus terminal serving Madurai and nearby cities.",
  },
  {
    name: "Periyar Bus Stand",
    position: [9.9170, 78.1190] as [number, number],
    image: periyarBusImage,
    description: "Central bus stand near Madurai's main shopping streets.",
  },
  {
    name: "Arappalayam Bus Stand",
    position: [9.9300, 78.0950] as [number, number],
    image: arappalayamImage,
    description: "Bus terminal serving routes towards western areas.",
  },
  {
    name: "Madurai Airport",
    position: [9.8345, 78.0935] as [number, number],
    image: maduraiAirportImage,
    description: "Madurai's airport for domestic and selected international flights.",
  },

];
const exploreItems = [
  {
    title: "Heritage",
    tamil: "வரலாற்றின் பாதையில்",
    description: "Discover the stories, architecture and timeless heritage of Madurai.",
    icon: "🏛️",
    image: heritageImage,
    className: "heritage",
  },
  {
    title: "Nature",
    tamil: "இயற்கையின் அழகு",
    description: "Explore hills, rivers, peaceful spaces and beautiful landscapes.",
    icon: "🌿",
    image: natureImage,
    className: "nature",
  },
  {
    title: "Food",
    tamil: "மதுரையின் சுவை",
    description: "Experience authentic local flavours, street food and traditions.",
    icon: "🍛",
    image: foodImage,
    className: "food",
  },
  {
    title: "Culture",
    tamil: "வாழும் கலாச்சாரம்",
    description: "Discover festivals, markets, traditions and everyday local life.",
    icon: "🪷",
    image: cultureImage,
    className: "culture",
  },
];
const moods = [
  "😌 Peaceful",
  "📸 Photogenic",
  "🍛 Food",
  "👨‍👩‍👧 Family",
  "🏛️ Historical",
  "🌿 Nature",
  "🛍️ Shopping",
  "🚌 Transport Hubs",
];
const moodRecommendations: Record<
  string,
  (string | { name: string; image: string })[]
> = {
 "😌 Peaceful": [
  {
    name: "Meenakshi Amman Temple",
    image: meenakshiAmmanTempleImage,
  },
  {
    name: "Thirupparankundram",
    image: thirupparankundramImage,
  },
  {
    name: "Koodal Azhagar Temple",
    image: koodalAzhagarTempleImage,
  },
  {
    name: "Alagar Kovil",
    image: alagarKovilImage,
  },
  {
    name: "Goripalayam Dargah",
    image: goripalayamDargahImage,
  },
  {
    name: "St. Mary's Cathedral Shrine Church",
    image: stMarysCathedralImage,
  },
],
"📸 Photogenic": [
  {
    name: "Teppakulam",
    image: teppakulamImage,
  },
  {
    name: "Samanar Hills",
    image: samanarPhotoImage,
  },
  {
    name: "Vaigai River",
    image: vaigaiPhotoImage,
  },
  {
    name: "Vilakkuthoon",
    image: vilakkuthoonImage,
  },
],
"🍛 Food": [
  {
    name: "Jigarthanda Spots",
    image: jigarthandaImage,
  },
  {
    name: "Kari Dosa Spots",
    image: kariDosaImage,
  },
  {
    name: "Snacks Spots",
    image: snacksImage,
  },
  {
    name: "Parotta Spots",
    image: parottaImage,
  },
  {
    name: "Paruthi Paal",
    image: paruthiPaalImage,
  },
  {
    name: "Traditional Meals",
    image: mealsImage,
  },
],
"👨‍👩‍👧 Family": [
  { name: "Thiruparankundram ECO Park", image: ecoParkImage },
  { name: "Vandiyur Park", image: vandiyurParkImage },
  { name: "Rajaji Park", image: rajajiParkImage },
  { name: "Tamukkam Ground Exhibition", image: tamukkamImage },
],
"🏛️ Historical": [
  { name: "Thirumalai Nayak Palace", image: thirumalaiNayakImage },
  { name: "Gandhi Museum", image: gandhiMuseumImage },
  { name: "World Tamil Sangam", image: worldTamilSangamImage },
  { name: "Keeladi Archaeological Site", image: keeladiSiteImage },
  { name: "Keeladi Museum", image: keeladiMuseumImage },
  { name: "Thirupparankundram Rock-Cut Temple", image: rockCutTempleImage },
  { name: "Nandi Statue", image: nandiStatueImage },
  { name: "Aayiram Kaal Mandapam", image: mandapamImage },
  { name: "Pathu Thoon", image: pathuThoonImage },
],
"🌿 Nature": [
  {
     name: "Pazhamudircholai",
  image: pazhamudircholaiImage,
  },
  {
    name: "Thirupparankundram Hills",
    image: thirupparankundramHillsImage,
  },
  { name: "Vandiyur Lake", image: vandiyurLakeImage },
  { name: "Yanai Hills", image: yanaiHillsImage },
],
"🛍️ Shopping": [
  {
    name: "Puthu Mandapam",
    image: puthuMandapamImage,
  },
  {
    name: "Madurai Flower Market",
    image: flowerMarketImage,
  },
  {
    name: "Anna Nagar",
    image: annaNagarImage,
  },
  {
    name: "Town Hall Road Shopping Area",
    image: townHallImage,
  },
  {
    name: "Meenakshi Amman Temple Street",
    image: templeStreetsImage,
  },
],
"🚌 Transport Hubs": [
  {
    name: "Madurai Junction",
    image: maduraiJunctionImage,
  },
  {
    name: "Mattuthavani Bus Stand",
    image: mattuthavaniImage,
  },
  {
    name: "Periyar Bus Stand",
    image: periyarBusImage,
  },
  {
    name: "Arappalayam Bus Stand",
    image: arappalayamImage,
  },
  {
    name: "Madurai Airport",
    image: maduraiAirportImage,
  },
],
};
function MapFocus({
  position,
}: {
  position: [number, number] | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [position, map]);

  return null;
}
function App() {
const [menuOpen, setMenuOpen] = useState(false);
const [isAuthOpen, setIsAuthOpen] = useState(false);
type AuthUser = {
  user_id: number;
  full_name: string;
  email: string;
};
const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
const [apiPlaces, setApiPlaces] = useState<Place[]>([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/me`, {
  method: "GET",
  credentials: "include",
  cache: "no-store",
})
    .then(async (response) => {
      if (!response.ok) {
        setCurrentUser(null);
        return;
      }

      const data = await response.json();
      setCurrentUser(data.user ?? null);
    })
    .catch((error) => {
      console.error("Session check failed:", error);
      setCurrentUser(null);
    });
}, []);
useEffect(() => {
  getPlaces()
    .then(setApiPlaces)
    .catch((error: Error) => {
      console.error("Failed to load places:", error.message);
    });
}, []);
useEffect(() => {
  console.log("Places loaded from API:", apiPlaces);
}, [apiPlaces]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<
    { name: string; image: string } | null
  >(null);
const [activeMapPlace, setActiveMapPlace] = useState<string | null>(null);
const [mapFocusPosition, setMapFocusPosition] =
  useState<[number, number] | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showVaigaiInfo, setShowVaigaiInfo] = useState(false);
  const [chatInput, setChatInput] = useState("");
const [tripDuration, setTripDuration] = useState("1");
const [tripBudget, setTripBudget] = useState("2000plus");
const [tripStyle, setTripStyle] = useState("all");
const [tripTransport, setTripTransport] = useState("public");
const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: "Vanakkam! I'm Vaigai, your local guide to Madurai. What would you like to explore?",
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
    // REVIEW FORM STATE
  const [reviewName, setReviewName] = useState("");
  const [reviewPlace, setReviewPlace] = useState(
    "Meenakshi Amman Temple"
  );
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
type Review = {
  name: string;
  place: string;
  rating: number;
  comment: string;
};

const [reviews, setReviews] = useState<Review[]>(() => {
  try {
    const savedReviews = localStorage.getItem("maduraiyal-reviews");
    return savedReviews ? JSON.parse(savedReviews) as Review[] : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("maduraiyal-reviews", JSON.stringify(reviews));
}, [reviews]);

  const sendChatMessage = async () => {
    const message = chatInput.trim();

    if (!message || isChatLoading) return;

    setChatMessages((previous) => [
      ...previous,
      { role: "user", text: message },
    ]);
    setChatInput("");
    setIsChatLoading(true);

    try {
const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: chatMessages.slice(-10).map((item) => ({
            role: item.role,
            content: item.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to contact Vaigai.");
      }

      setChatMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply || "Sorry, I couldn't generate a reply.",
        },
      ]);
    } catch (error) {
      setChatMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error instanceof Error
              ? error.message
              : "Vaigai is temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };
  const itineraryPlaces =
    tripStyle === "all"
      ? peacefulMapPlaces
      : peacefulMapPlaces.filter((place) =>
          (moodRecommendations[tripStyle] ?? []).some(
            (recommendation) =>
              typeof recommendation === "string"
                ? recommendation === place.name
                : recommendation.image === place.image ||
                  recommendation.name === place.name
          )
        );

  const itineraryDays = Array.from(
    { length: Number(tripDuration) },
    (_, dayIndex) => {
      const placesPerDay = Math.ceil(
        itineraryPlaces.length / Number(tripDuration)
      );
      const dayPlaces = itineraryPlaces.slice(
        dayIndex * placesPerDay,
        (dayIndex + 1) * placesPerDay
      );
      const slotPlaces = [[], [], []] as typeof dayPlaces[];

      dayPlaces.forEach((place, index) => {
        slotPlaces[index % 3].push(place);
      });

      return {
        day: dayIndex + 1,
        slots: [
          { label: "Morning", places: slotPlaces[0] },
          { label: "Afternoon", places: slotPlaces[1] },
          { label: "Evening", places: slotPlaces[2] },
        ],
      };
    }
  );

  return (
  <div className="app">
  {isChatOpen && (
  <div className="vaigai-chat-overlay">
    <section className="vaigai-chat-panel">
      <header className="vaigai-chat-header">
        <div>
          <strong>🌊 Vaigai AI</strong>
          <small>Your Madurai Local Guide</small>
        </div>
        <button
          type="button"
          onClick={() => setIsChatOpen(false)}
          aria-label="Close Vaigai chat"
        >
          <X size={20} />
        </button>
      </header>

      <div className="vaigai-chat-messages">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`vaigai-chat-message ${message.role}`}
          >
            {message.text}
          </div>
        ))}
        {isChatLoading && (
          <div className="vaigai-chat-message assistant">
            Vaigai is flowing...
          </div>
        )}
      </div>

      <form
        className="vaigai-chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          void sendChatMessage();
        }}
      >
        <input
          value={chatInput}
          onChange={(event) => setChatInput(event.target.value)}
          placeholder="Ask anything about Madurai..."
          maxLength={2000}
          disabled={isChatLoading}
        />
        <button
          type="submit"
          disabled={!chatInput.trim() || isChatLoading}
        >
          Send
        </button>
      </form>
    </section>
  </div>
)}
  {/* SELECTED PLACE MODAL */}
  {selectedPlace && (
    <div className="place-modal">
      <div className="place-modal-card">
        <button
          type="button"
          className="place-modal-close"
          onClick={() => setSelectedPlace(null)}
          aria-label="Close place details"
        >
          <X size={20} />
        </button>

        <img
          src={selectedPlace.image}
          alt={selectedPlace.name}
          className="place-modal-image"
        />

        <div className="place-modal-content">
          <h2>{selectedPlace.name}</h2>

          <p>
            Discover this beautiful Madurai experience like a local.
          </p>

          <div className="place-modal-info">
            <div
              className="place-location-card"
              role="button"
              tabIndex={0}
              onClick={() => {
                const placeName = selectedPlace.name;

                
const normalizePlaceName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const normalizedName = normalizePlaceName(placeName);

const place = peacefulMapPlaces.find((item) => {
  const mapName = normalizePlaceName(item.name);

  return (
    mapName === normalizedName ||
    mapName.includes(normalizedName) ||
    normalizedName.includes(mapName)
  );
});

const apiPlace = apiPlaces.find(
  (item) =>
    normalizePlaceName(item.name) === normalizedName
);

                setSelectedPlace(null);

                setTimeout(() => {
                  document.getElementById("map")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });

                 if (place) {
  const description =
    apiPlace?.description || place.description;

  console.log("Place description:", description);

  setActiveMapPlace(place.name);
  setMapFocusPosition(place.position);
                    setTimeout(() => {
                      setActiveMapPlace((current) =>
                        current === place.name ? null : current
                      );
                    }, 3000);
                  }
                }, 200);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.currentTarget.click();
                }
              }}
            >
              <strong>📍 Location</strong>
              <span>Madurai, Tamil Nadu</span>
            </div>

            <div>
              <strong>✨ Experience</strong>
              <span>Peaceful &amp; Scenic</span>
            </div>

            <div>
              <strong>🌅 Best Time</strong>
              <span>Morning &amp; Evening</span>
            </div>
          </div>
        </div>
          </div>
    </div>
  )}
    {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <a href="#" className="brand">
            <span className="brand-symbol">〰</span>
            <span>
              <strong>MADURAI IYAL</strong>
              <small>Discover • Experience • Belong</small>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#explore">Explore</a>
            <a href="#experiences">Experiences</a>
            <a href="#map">Map</a>
            <a href="#vaigai">Vaigai AI</a>
            <a href="#plan">Plan My Madurai</a>
            <a href="#reviews">Reviews</a>

            <button
              className="mobile-close"
              onClick={() => setMenuOpen(false)}
            >
              <X size={22} />
            </button>
          </nav>

    
<div className="nav-actions">
  {currentUser ? (
    <>
      <span className="auth-nav-button">
        Welcome, {currentUser.full_name}
      </span>
      
<button
  type="button"
  className="auth-nav-button"
  onClick={async () => {
    try {
   const response = await fetch(
  `${import.meta.env.VITE_API_BASE_URL}/api/logout`,
  {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  }
      );
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }}
>
  Logout
</button>
    </>
  ) : (
    <button
      type="button"
      className="auth-nav-button"
      onClick={() => setIsAuthOpen(true)}
    >
      Login / Register
    </button>
  )}
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero-section">
     <div
  className="hero-background"
  style={{
    backgroundImage: `url(${templeImage})`,
  }}
>
  <div className="hero-glow hero-glow-one" />
  <div className="hero-glow hero-glow-two" />
  <div className="hero-pattern" />
</div>
          <div className="hero-content">
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow-line" />
              THE SOUL OF MADURAI
              <span className="eyebrow-line" />
            </motion.div>

            <motion.p
              className="hero-tamil"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              மதுரையின் கதையை அனுபவியுங்கள்
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              Discover
              <span>Madurai</span>
              <em>like a local.</em>
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ancient streets. Living traditions. Hidden stories.
              <br />
              Your journey through the heart of Madurai starts here.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
<button
  type="button"
  className="primary-button"
  onClick={() => setIsChatOpen(true)}
>
  <Sparkles size={17} />
  Talk to Vaigai
</button>
            </motion.div>

            <div className="hero-stats">
              <div>
                <strong>100+</strong>
                <span>Places to explore</span>
              </div>

              <div className="stat-divider" />

              <div>
                <strong>AI</strong>
                <span>Local companion</span>
              </div>

              <div className="stat-divider" />

              <div>
                <strong>∞</strong>
                <span>Stories to discover</span>
              </div>
            </div>
          </div>

          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
          </motion.div>
        </section>

        {/* QUICK EXPLORE */}
        <section className="section explore-section" id="explore">
          <div className="section-heading">
            <div>
              <span className="section-kicker">EXPLORE MADURAI</span>
              <h2>Find your way into the city.</h2>
            </div>

            <p>
              From ancient heritage to local flavours, discover Madurai
              through experiences that feel personal.
            </p>
          </div>

          <div className="explore-grid">
            {exploreItems.map((item, index) => (
  <motion.article
  className={`explore-card ${item.className}`}
  key={item.title}
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.65)), url(${item.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
onClick={() => {
  const sectionMap: Record<string, string> = {
    Heritage: "heritage-places",
    Nature: "nature-places",
    Food: "food-places",
    Culture: "culture-places",
  };

  const targetId = sectionMap[item.title];

  if (targetId) {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}}
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.25,
    delay: index * 0.05,
  }}
   whileHover={{ y: -4 }}
>
                <div className="card-top">
                  <span className="card-icon">{item.icon}</span>
                  <ArrowRight size={20} />
                </div>

                <div>
                  <span className="card-tamil">{item.tamil}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <span className="card-number">
                  0{index + 1}
                </span>
              </motion.article>
            ))}
          </div>
        </section>

{/* CATEGORY PLACES */}
<section className="section category-places-section" id="category-places">
  <div className="section-heading">
    <div>
      <span className="section-kicker">DISCOVER MADURAI</span>
      <h2>Explore by Category</h2>
    </div>
    <p>
      Discover Madurai's heritage, nature, food and culture in one place.
    </p>
  </div>

  <div className="category-places-grid">
    <article className="category-place-card" id="heritage-places">
      <span>🏛️</span>
      <h3>Heritage</h3>
      <ul>
        <li>Meenakshi Amman Temple</li>
        <li>Thirumalai Nayak Palace</li>
        <li>Keeladi Museum</li>
        <li>Samanar Hills</li>
      </ul>
    </article>

    <article className="category-place-card" id="nature-places">
      <span>🌿</span>
      <h3>Nature</h3>
      <ul>
        <li>Azhagar Hills</li>
        <li>Vaigai River</li>
        <li>Vandiyur Teppakulam</li>
      </ul>
    </article>

    <article className="category-place-card" id="food-places">
      <span>🍛</span>
      <h3>Food</h3>
      <ul>
        <li>Kari Dosa</li>
        <li>Jigarthanda</li>
        <li>Parotta</li>
        <li>Bun Parotta</li>
      </ul>
    </article>

    <article className="category-place-card" id="culture-places">
      <span>🪷</span>
      <h3>Culture</h3>
      <ul>
        <li>Chithirai Festival</li>
        <li>Traditional Markets</li>
        <li>Local Handicrafts</li>
      </ul>
    </article>
  </div>
</section>
       {/* MOODS */}
<section className="mood-section" id="experiences">
  <div className="mood-inner">
    <div className="section-heading centered">
      <span className="section-kicker">
        YOUR MOOD. YOUR MADURAI.
      </span>

      <h2>How do you want to experience the city?</h2>

      <p>
        Tell us what you feel like doing. MADURAI IYAL will help you
        discover places that match your mood.
      </p>
    </div>

            <div className="mood-grid">
  {moods.map((mood, index) => (
    <motion.button
  key={mood}
  onClick={() => setSelectedMood(mood)}
  className={`mood-card ${selectedMood === mood ? "selected" : ""}`}
  style={{
    background:
      selectedMood === mood
        ? "linear-gradient(135deg, #5a1725 0%, #7b2639 55%, #963d50 100%)"
        : undefined,
    color: selectedMood === mood ? "#ffffff" : undefined,
    borderColor: selectedMood === mood ? "#b04a60" : undefined,
    boxShadow:
      selectedMood === mood
        ? "0 18px 40px rgba(90, 23, 37, 0.30)"
        : undefined,
  }}
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.05 }}
  whileHover={{ scale: 1.03 }}
>
      {mood}
    </motion.button>
  ))}
</div>
{selectedMood && (
  <motion.div
    className="mood-recommendations"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="recommendation-heading">
      <span>✨ SELECTED FOR YOU</span>

      <h3>
        Places for{" "}
        <strong>{selectedMood}</strong>
      </h3>

      <p>
        Explore Madurai places that match the way you want
        to experience the city.
      </p>
    </div>
    <div className="recommendation-grid">
{moodRecommendations[selectedMood]?.map((place, index) => (
    <motion.div
  key={typeof place === "string" ? place : place.name}
  className="recommendation-card"

onClick={() => {
  if (typeof place !== "string") {
    const foodPlaceNames: Record<string, string> = {
      "Jigarthanda Spots":
        "Madurai Famous Jigarthanda - West Masi Street",
      "Kari Dosa Spots": "Konar Mess - Kari Dosa",
      "Snacks Spots": "Sri Meenakshi Paniyaram Shop",
      "Parotta Spots": "Madurai Bun Parotta Kadai",
      "Paruthi Paal":
        "Sri Thirumalai Madai Karuppasamy Paruthi Paal",
      "Traditional Meals": "Sree Sabarees - Traditional Meals",
    };
    const familyPlaceNames: Record<string, string> = {
      "Thiruparankundram ECO Park":
        "Thiruparankundram ECO Park",
      "Vandiyur Park": "Vandiyur Park",
      "Rajaji Park": "Rajaji Park",
      "Tamukkam Ground Exhibition":
        "Tamukkam Ground Exhibition",
    };
    const historicalPlaceNames: Record<string, string> = {
      "Thirumalai Nayak Palace": "Thirumalai Nayak Palace",
      "Gandhi Museum": "Gandhi Museum",
      "World Tamil Sangam": "World Tamil Sangam",
      "Keeladi Archaeological Site": "Keeladi Archaeological Site",
      "Keeladi Museum": "Keeladi Museum",
      "Thirupparankundram Rock-Cut Temple":
        "Thirupparankundram Rock-Cut Temple",
      "Nandi Statue": "Nandi Statue",
      "Aayiram Kaal Mandapam": "Aayiram Kaal Mandapam",
      "Pathu Thoon": "Pathu Thoon",
    };
    const naturePlaceNames: Record<string, string> = {
      "Pazhamudircholai": "Pazhamudircholai",
      "Thirupparankundram Hills": "Thirupparankundram Hills",
      "Vandiyur Lake": "Vandiyur Lake",
      "Yanai Hills": "Yanai Hills",
    };
const shoppingPlaceNames: Record<string, string> = {
  "Puthu Mandapam": "Puthu Mandapam",
  "Madurai Flower Market": "Madurai Flower Market",
  "Anna Nagar": "Anna Nagar",
  "Town Hall Road Shopping Area": "Town Hall Road Shopping Area",
  "Meenakshi Amman Temple Street": "Meenakshi Amman Temple Street",
};
    const actualPlaceName =
      foodPlaceNames[place.name] ??
      familyPlaceNames[place.name] ??
      historicalPlaceNames[place.name] ??
      naturePlaceNames[place.name] ??  shoppingPlaceNames[place.name] ??
      place.name;

    const mapPlace = peacefulMapPlaces.find(
      (item) => item.name === actualPlaceName
    );

    if (mapPlace) {
      setSelectedPlace(mapPlace);
    } else {
      setSelectedPlace(place);
    }
  }
}}
>
<span className="recommendation-number">
  {String(index + 1).padStart(2, "0")}
</span>
{typeof place !== "string" && (
  <>
    <img
      src={place.image}
      alt={place.name}
      className="recommendation-image"
    />
  </>
)}
<div className="recommendation-content">
  <h4>{typeof place === "string" ? place : place.name}</h4>
  <p>Explore this Madurai experience</p>
</div>
<ArrowRight size={18} />
</motion.div>
))}
    </div>
  </motion.div>
)}
</div>
</section>
{/* MAP PREVIEW */}
        <section className="section map-section" id="map">
          <div className="map-card">
            <div className="map-content">
              <span className="section-kicker">DISCOVER ON THE MAP</span>
              <h2>
                Madurai is not just
                <span> a destination.</span>
              </h2>
              <p>
                Find heritage, food, nature, culture and hidden local
                experiences around you.
              </p>
            </div>
<div className="map-visual">
  <div className="real-map-layer">
<MapContainer
  center={[9.9252, 78.1198]}
  zoom={13}
  className="leaflet-map"
  scrollWheelZoom={true}
>
  <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <MapFocus position={mapFocusPosition} />
{peacefulMapPlaces.map((place) => (
  <Marker
    key={place.name}
    position={place.position}
    icon={L.divIcon({
      className:
        activeMapPlace === place.name
          ? "peaceful-marker active"
          : "peaceful-marker",
 html: `<div style="font-size:28px; cursor:pointer;">${
  [
    "Teppakulam",
    "Samanar Hills",
    "Vaigai River",
    "Vilakkuthoon",
  ].includes(place.name)
    ? "📸"
    : [
        "Madurai Famous Jigarthanda - West Masi Street",
        "Konar Mess - Kari Dosa",
        "Sri Meenakshi Paniyaram Shop",
        "Madurai Bun Parotta Kadai",
        "Sri Thirumalai Madai Karuppasamy Paruthi Paal",
        "Sree Sabarees - Traditional Meals",
      ].includes(place.name)
    ? "🍛"
    : [
        "Thiruparankundram ECO Park",
        "Vandiyur Park",
        "Rajaji Park",
        "Tamukkam Ground Exhibition",
      ].includes(place.name)
    ? "👨‍👩‍👧"
    : [
        "Thirumalai Nayak Palace",
        "Gandhi Museum",
        "World Tamil Sangam",
        "Keeladi Archaeological Site",
        "Keeladi Museum",
        "Thirupparankundram Rock-Cut Temple",
        "Nandi Statue",
        "Aayiram Kaal Mandapam",
        "Pathu Thoon",
      ].includes(place.name)
    ? "🏛️"
    : [
        "Pazhamudircholai",
        "Thirupparankundram Hills",
        "Vandiyur Lake",
        "Yanai Hills",
      ].includes(place.name)
    ? "🌿"
        : [
        "Puthu Mandapam",
        "Madurai Flower Market",
        "Anna Nagar",
        "Town Hall Road Shopping Area",
        "Meenakshi Amman Temple Street",
      ].includes(place.name)
    ? "🛍️"
    : [
        "Madurai Junction",
        "Mattuthavani Bus Stand",
        "Periyar Bus Stand",
        "Arappalayam Bus Stand",
        "Madurai Airport",
      ].includes(place.name)
    ? "🚌"
    : "😌"
}</div>`,
      iconSize: [35, 35],
      iconAnchor: [17, 17],
    })}
eventHandlers={{
  click: (event) => {
    setActiveMapPlace(place.name);
    setMapFocusPosition(place.position);
    event.target.openPopup();

    setTimeout(() => {
      setActiveMapPlace((current) =>
        current === place.name ? null : current
      );
    }, 3000);
  },
}}
  >
    <Popup>
      <div style={{ textAlign: "center" }}>
        <img
          src={place.image}
          alt={place.name}
          style={{
            width: "180px",
            height: "110px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <h3>{place.name}</h3>
     <p>
  {apiPlaces.find(
    (item) =>
      item.name.trim().toLowerCase() ===
      place.name.trim().toLowerCase()
  )?.description || place.description}
</p>
      </div>
    </Popup>
  </Marker>
))}
</MapContainer>
  </div>
  <div className="map-grid-lines" />
  <div className="map-road road-one" />
  <div className="map-road road-two" />
  <div className="map-road road-three" />
  <div className="map-center">
    <span>🌊</span>
    <strong>Madurai</strong>
  </div>
</div>
  </div>
</section>
{/* VAIGAI */}
     <section className="vaigai-section" id="vaigai">
          <div className="vaigai-decoration">〰</div>
          <div className="vaigai-content">
            <span className="section-kicker">MEET YOUR LOCAL COMPANION</span>
            <h2>
              Say hello to
              <span> Vaigai.</span>
            </h2>
            <p>
              Your intelligent local guide for discovering Madurai.
              Ask about food, places, hidden gems, routes, culture or
              build your own personalized itinerary.
            </p>
<div className="vaigai-actions">
<button
  type="button"
  className="primary-button"
  onClick={() => setIsChatOpen(true)}
>
  <Sparkles size={17} />
  Talk to Vaigai
</button>
<button
  type="button"
  className="text-button"
  onClick={() => setShowVaigaiInfo((previous) => !previous)}
>
  Learn about Vaigai
  <ArrowRight size={17} />
</button>
</div>
{showVaigaiInfo && (
  <div className="vaigai-info">
    <h3>Meet Vaigai — Your Madurai Guide</h3>
    <p>
      Vaigai helps you discover Madurai's famous temples, historical
      places, local food, festivals, shopping streets and travel routes.
      Ask questions to explore the city and plan your visit.
    </p>
  </div>
)}
          </div>
          <div className="vaigai-orb">
            <div className="orb-ring ring-one" />
            <div className="orb-ring ring-two" />
            <div className="orb-core">
              <span>🌊</span>
              <small>VAIGAI</small>
            </div>
          </div>
        </section>
        
{/* PLAN MY MADURAI */}
<section className="plan-section" id="plan">
  <div className="plan-container">
    <span className="section-kicker">YOUR JOURNEY, YOUR WAY</span>

    <h2>
      Plan your <span>Madurai.</span>
    </h2>

    <p className="plan-description">
      Explore Madurai your way. Discover temples, heritage,
      nature, local food, shopping and transport locations.
    </p>

    <div className="plan-form">
      <label>
        Trip duration
        <select
          value={tripDuration}
          onChange={(e) => {
            setTripDuration(e.target.value);
            setItineraryGenerated(false);
          }}
        >
          <option value="1">1 day</option>
          <option value="2">2 days</option>
          <option value="3">3 days</option>
        </select>
      </label>

      <label>
        Budget per person
        <select
          value={tripBudget}
          onChange={(e) => {
            setTripBudget(e.target.value);
            setItineraryGenerated(false);
          }}
        >
          <option value="under500">Under ₹500</option>
          <option value="500-1000">₹500–₹1,000</option>
          <option value="1000-2000">₹1,000–₹2,000</option>
          <option value="2000plus">₹2,000+</option>
        </select>
      </label>
<label>
  Travel interests
  <select
    value={tripStyle}
    onChange={(e) => {
      setTripStyle(e.target.value);
      setItineraryGenerated(false);
    }}
  >
    <option value="all">All categories</option>
    <option value="😌 Peaceful">😌 Peaceful</option>
    <option value="📸 Photogenic">📸 Photogenic</option>
    <option value="🍛 Food">🍛 Food</option>
    <option value="👨‍👩‍👧 Family">👨‍👩‍👧 Family</option>
    <option value="🏛️ Historical">🏛️ Historical</option>
    <option value="🌿 Nature">🌿 Nature</option>
    <option value="🛍️ Shopping">🛍️ Shopping</option>
    <option value="🚌 Transport Hubs">🚌 Transport Hubs</option>
  </select>
</label>
      <label>
        Transport
        <select
          value={tripTransport}
          onChange={(e) => setTripTransport(e.target.value)}
        >
          <option value="public">Bus and public transport</option>
          <option value="auto">Auto / taxi</option>
          <option value="own">Own vehicle</option>
        </select>
      </label>

      <button
        type="button"
        className="primary-button"
        onClick={() => setItineraryGenerated(true)}
      >
        <Sparkles size={17} />
        Generate My Itinerary
      </button>
    </div>

    {itineraryGenerated && (
      <div className="itinerary-results" aria-live="polite">
        <div className="itinerary-heading">
          <div>
            <span className="section-kicker">YOUR MADURAI PLAN</span>
            <h3>{tripDuration}-Day Journey</h3>
          </div>

          <span className="itinerary-budget">
            {tripBudget === "under500"
              ? "Under ₹500"
              : tripBudget === "500-1000"
              ? "₹500–₹1,000"
              : tripBudget === "1000-2000"
              ? "₹1,000–₹2,000"
              : "₹2,000+"}
          </span>
        </div>

        <p>
          Transport:{" "}
          {tripTransport === "public"
            ? "Bus and public transport"
            : tripTransport === "auto"
            ? "Auto / taxi"
            : "Own vehicle"}
        </p>
<p>
  {tripStyle === "all"
    ? `Planning with all ${itineraryPlaces.length} places in your existing database.`
    : `Planning with places matching ${tripStyle}.`}
</p>

{itineraryDays.map((day) => (
  <section className="itinerary-day" key={day.day}>
    <h4>Day {day.day}</h4>

    {day.slots.map((slot) => (
      <div className="itinerary-time-slot" key={slot.label}>
        <h5>{slot.label}</h5>

        {slot.places.length === 0 ? (
          <p>No places assigned to this time slot.</p>
        ) : (
          <div className="itinerary-place-grid">
            {slot.places.map((place, index) => (
              <article
                className="itinerary-place-card"
                key={`${place.name}-${day.day}-${slot.label}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveMapPlace(place.name);
                  setMapFocusPosition(place.position);

                  document.getElementById("map")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                onKeyDown={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    setActiveMapPlace(place.name);
                    setMapFocusPosition(place.position);

                    document.getElementById("map")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                <img src={place.image} alt={place.name} />

                <div className="itinerary-place-info">
                  <span>{index + 1}. {slot.label}</span>
                  <h4>{place.name}</h4>
                  <p>{place.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    ))}
  </section>
))}

        <p className="itinerary-note">
          This list includes every entry in your existing places array.
          Please check opening hours, public transport availability,
          entry fees and travel time before visiting. The list is not
          a verified time-by-time route.
        </p>
      </div>
    )}
  </div>
</section>
        {/* REVIEWS SECTION */}
        <section className="reviews-section" id="reviews">
          <div className="reviews-heading">
            <span className="section-kicker">
              YOUR EXPERIENCE MATTERS
            </span>
            <h2>Share Your Madurai Story</h2>
            <p>
              Share your experience and help others explore Madurai.
            </p>
          </div>

          <form
            className="review-form"
            onSubmit={(e) => {
              e.preventDefault();

              setReviews((previous) => [
                ...previous,
                {
                  name: reviewName.trim(),
                  place: reviewPlace,
                  rating: reviewRating,
                  comment: reviewText.trim(),
                },
              ]);

              setReviewName("");
              setReviewText("");
              setReviewRating(5);
            }}
          >
            <label htmlFor="review-name">Your Name</label>
            <input
              id="review-name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="review-place">Choose a Place</label>
            <select
              id="review-place"
              value={reviewPlace}
              onChange={(e) => setReviewPlace(e.target.value)}
            >
              <option>Meenakshi Amman Temple</option>
              <option>Thirumalai Nayak Palace</option>
              <option>Keeladi Museum</option>
              <option>Samanar Hills</option>
              <option>Vandiyur Teppakulam</option>
              <option>Other Madurai Experience</option>
            </select>

            <label>Your Rating</label>
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= reviewRating ? "star active" : "star"
                  }
                  onClick={() => setReviewRating(star)}
                  aria-label={`${star} star rating`}
                >
                  ★
                </button>
              ))}
            </div>

            <label htmlFor="review-comment">Your Review</label>
            <textarea
              id="review-comment"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={4}
              required
            />

            <button type="submit" className="primary-button">
              Submit Review
            </button>
          </form>

          <div className="reviews-list">
            <h3>Visitor Reviews ({reviews.length})</h3>

            {reviews.length === 0 ? (
              <p className="no-reviews">
                No reviews yet. Be the first to share your experience!
              </p>
            ) : (
              reviews.map((review, index) => (
                <article
                  className="review-card"
                  key={`${review.name}-${index}`}
                >
                  <div className="review-card-top">
                    <strong>{review.name}</strong>
                    <span className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="review-place">{review.place}</p>
                  <p>{review.comment}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div>
            <div className="brand footer-brand">
              <span className="brand-symbol">〰</span>
              <span>
                <strong>MADURAI IYAL</strong>
                <small>Discover • Experience • Belong</small>
              </span>
            </div>
            <p>
              A modern local guide built to help everyone
              experience the soul of Madurai.
            </p>
          </div>
          <div className="footer-links">
            <a href="#explore">Explore</a>
            <a href="#map">Map</a>
            <a href="#experiences">Experiences</a>
            <a href="#vaigai">Vaigai AI</a>
            <a href="#plan">Plan My Madurai</a>
            <a href="#reviews">Reviews</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MADURAI IYAL</span>
          <span>Created by Thiviya Shree Lakshmi</span>
        </div>
      </footer>
           {/* FLOATING VAIGAI */}
      <motion.button
        className="floating-vaigai"     onClick={() => setIsChatOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="floating-wave">🌊</span>
        <span>
          <small>Ask</small>
          Vaigai
        </span>
            </motion.button>
      {isAuthOpen && (
        <div className="auth-overlay">
      <AuthPage
  onClose={() => setIsAuthOpen(false)}
  onLogin={(user) => setCurrentUser(user)}
/>
        </div>
      )}
    </div>
  );
}
export default App;
