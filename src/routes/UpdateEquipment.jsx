import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEquipment = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get the equipment ID from the URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    itemName: "",
    categoryName: "",
    description: "",
    price: "",
    rating: "",
    customization: "",
    processingTime: "",
    stockStatus: "",
    userName: user?.displayName || "",
    userEmail: user?.email || "",
  });

  // Fetch the equipment data based on the ID when the component mounts
  useEffect(() => {
    fetch(`https://equi-sports-server-swart.vercel.app/sports/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching equipment data:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEquipment = { ...formData };
    console.log(updatedEquipment);

    fetch(`https://equi-sports-server-swart.vercel.app/sports/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedEquipment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount>0) {
            toast.success("Equipment updated successfully!")
          }
          
          
        });
  };

  return (
    <div className="p-6 bg-orange-100 rounded-md shadow-md w-8/12 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Equipment</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Image URL */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            placeholder="Enter the image URL"
            required
          />
        </div>

        {/* Item Name */}
        <div>
          <label className="block font-medium">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            required
          />
        </div>

        {/* Category Name (Dropdown) */}
        <div>
          <label className="block font-medium">Category Name</label>
          <select
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Cricket">Cricket</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Badminton">Badminton</option>
            <option value="Table Tennis">Table Tennis</option>
            <option value="Other Sports">Other Sports</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            required
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        {/* Customization */}
        <div>
          <label className="block font-medium">Customization</label>
          <input
            type="text"
            name="customization"
            value={formData.customization}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
          />
        </div>

        {/* Processing Time */}
        <div>
          <label className="block font-medium">Processing Time</label>
          <input
            type="text"
            name="processingTime"
            value={formData.processingTime}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            placeholder="e.g., 3-5 days"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="block font-medium">Stock Status</label>
          <input
            type="number"
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleInputChange}
            className="block w-full mt-1 border p-2 rounded"
            placeholder="Enter available product quantity"
          />
        </div>

        {/* User Email (read-only) */}
        <div>
          <label className="block font-medium">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            readOnly
            className="block w-full mt-1 border p-2 rounded bg-gray-200"
          />
        </div>

        {/* User Name (read-only) */}
        <div>
          <label className="block font-medium">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            readOnly
            className="block w-full mt-1 border p-2 rounded bg-gray-200"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update Equipment
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UpdateEquipment;
