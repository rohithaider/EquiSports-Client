import { useEffect, useState } from "react";
import ServiceCards from "../components/ServiceCards";
import { Helmet } from "react-helmet";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Import React-Leaflet components
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import L from "leaflet"; // For custom marker icons
import axios from "axios"; // For API requests
import { Fade } from "react-awesome-reveal";

// Fix for Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function Home() {
  const [sportsData, setSportsData] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true); // Loading state

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-quart",
      once: true,
    });
  }, []);

  // Fetch sports data from API
  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get("https://equi-sports-server-swart.vercel.app/sports")
      .then((response) => {
        setSportsData(response.data);
        setFilteredSports(response.data);
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Error fetching sports data", error);
        setLoading(false); // End loading even on error
      });
  }, []);

  // Handle category selection and filter sports products
  const handleCategoryChange = (category) => {
    console.log(category);
    setSelectedCategory(category);
    setLoading(true); // Show loading while filtering
    setTimeout(() => {
      if (category === "all") {
        setFilteredSports(sportsData);
      } else {
        const filtered = sportsData.filter(
          (product) => product.categoryName === category
        );
        setFilteredSports(filtered);
      }
      setLoading(false); // End loading after filtering
    }, 500); // Simulate async behavior
  };

  return (
    <div>
      <Fade>
        <Helmet>
          <title>Home Page</title>
        </Helmet>

        {/* Sports Category Section */}
        <section className="mt-4 w-11/12 mx-auto mb-4">
          <div>
            <h1 className="text-center text-3xl" data-aos="fade-up">
              Sports Categories
            </h1>
            <hr className="w-1/2 mx-auto" />
          </div>

          {/* Category Selection */}
          <div className="flex justify-center mt-4 space-x-4">
            {[
              "all",
              "Cricket",
              "Football",
              "Basketball",
              "Tennis",
              "Badminton",
              "Table Tennis",
              "Other Sports",
            ].map((category) => (
              <button
                key={category}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Display Filtered Sports Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {loading ? (
              <div className="text-center col-span-full">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              </div>
            ) : filteredSports.length > 0 ? (
              filteredSports.map((item, index) => (
                <div key={index} data-aos="fade-up">
                  <ServiceCards item={item} />
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-red-500 col-span-full">
                No equipment found in this category.
              </div>
            )}
          </div>
        </section>
      </Fade>
    </div>
  );
}
