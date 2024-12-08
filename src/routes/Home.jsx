import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import ServiceCards from "../components/ServiceCards";
import { Helmet } from "react-helmet";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Import React-Leaflet components
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import L from "leaflet"; // For custom marker icons
import axios from "axios"; // For API requests

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
    axios.get("https://equi-sports-server-swart.vercel.app/sports")
      .then((response) => {
        setSportsData(response.data);
        setFilteredSports(response.data);
      })
      .catch((error) => console.error("Error fetching sports data", error));
  }, []);

  // Handle category selection and filter sports products
  const handleCategoryChange = (category) => {
    console.log(category)
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredSports(sportsData);
    } else {
      const filtered = sportsData.filter(
        (product) => product.categoryName === category
      );
      setFilteredSports(filtered);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      {/* Carousel Section */}
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
          {["all", "Cricket", "Football", "Basketball", "Tennis", "Badminton", "Table Tennis", "Other Sports"].map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? "btn-primary" : "btn-secondary"}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Display Filtered Sports Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredSports.length > 0 ? (
            filteredSports.map((item, index) => (
              <div key={index} data-aos="fade-up">
                <ServiceCards item={item} />
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-red-500">No equipment found in this category.</div>
          )}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-8 w-11/12 mx-auto">
        <h2 className="text-center text-3xl mb-4" data-aos="fade-up">
          What Our Clients Say
        </h2>
        <div className="flex justify-center">
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Cards */}
            <div
              className="bg-white p-6 shadow-lg rounded-lg"
              data-aos="fade-right"
            >
              <p className="text-xl italic mb-4">
                "Great service, highly recommend!"
              </p>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-gray-500">CEO, Example Corp</p>
            </div>
            <div
              className="bg-white p-6 shadow-lg rounded-lg"
              data-aos="fade-up"
            >
              <p className="text-xl italic mb-4">
                "The experience was fantastic. Will come again!"
              </p>
              <h3 className="font-semibold text-lg">Jane Smith</h3>
              <p className="text-sm text-gray-500">Manager, Tech Solutions</p>
            </div>
            <div
              className="bg-white p-6 shadow-lg rounded-lg"
              data-aos="fade-left"
            >
              <p className="text-xl italic mb-4">
                "Exceptional quality and amazing support."
              </p>
              <h3 className="font-semibold text-lg">Alice Brown</h3>
              <p className="text-sm text-gray-500">Founder, Startup Inc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="mt-8 w-11/12 mx-auto mb-8">
        <h2 className="text-center text-3xl mb-4" data-aos="fade-up">
          Location
        </h2>
        <div
          className="w-full h-[400px] rounded-lg shadow-lg"
          data-aos="zoom-in"
        >
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[23.685, 90.3563]}>
              <Popup>
                We are located here! <br /> Contact us anytime.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
}
