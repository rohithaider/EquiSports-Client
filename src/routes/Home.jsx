import { useEffect, useState } from "react";
import ServiceCards from "../components/ServiceCards";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fade } from "react-awesome-reveal";
import axios from "axios";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light"); // Theme state

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-quart",
      once: true,
    });
  }, []);

  // Fetch sports data
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://equi-sports-server-swart.vercel.app/sports")
      .then((response) => {
        setSportsData(response.data);
        setFilteredSports(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sports data", error);
        setLoading(false);
      });
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setTimeout(() => {
      if (category === "all") {
        setFilteredSports(sportsData);
      } else {
        const filtered = sportsData.filter(
          (product) => product.categoryName === category
        );
        setFilteredSports(filtered);
      }
      setLoading(false);
    }, 500);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className={`theme-${theme}`}>
      <Fade>
        <Helmet>
          <title>Home Page</title>
        </Helmet>

        <section>
          <div className="w-11/12 mx-auto">
            <div className="carousel w-full">
              {/* Slide 1 */}
              <div
                id="slide1"
                className="carousel-item relative w-full transition-all duration-1000"
                data-aos="fade-up"
              >
                <img
                  src="https://www.shutterstock.com/image-vector/set-sport-balls-gaming-items-260nw-599738306.jpg"
                  className="w-full h-[300px] object-cover"
                  alt="Slide 1"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide4" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide2" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>

              {/* Slide 2 */}
              <div
                id="slide2"
                className="carousel-item relative w-full transition-all duration-1000"
                data-aos="fade-up"
              >
                <img
                  src="https://www.shutterstock.com/image-photo/closeup-various-sport-equipment-isolated-260nw-2171553587.jpg"
                  className="w-full h-[300px] object-cover"
                  alt="Slide 2"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide1" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>

              {/* Slide 3 */}
              <div
                id="slide3"
                className="carousel-item relative w-full transition-all duration-1000"
                data-aos="fade-up"
              >
                <img
                  src="https://www.shutterstock.com/image-photo/high-angle-view-different-sports-260nw-1575444292.jpg"
                  className="w-full h-[300px] object-cover"
                  alt="Slide 3"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide2" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide4" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Theme Toggle Button */}
        <div className="flex justify-end w-11/12 mx-auto">
          <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>

        {/* Sports Category Section */}
        <section className="mt-4 w-11/12 mx-auto mb-4">
          <div>
            <h1 className="text-center text-3xl" data-aos="fade-up">
              Sports Categories
            </h1>
            <hr className="w-1/2 mx-auto" />
          </div>

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
