import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider"; // Import useAuth

const MyEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Now using the custom useAuth 
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        await axios.delete(`/sports/${id}`);
        alert("Deleted successfully!");
        setEquipment((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        alert("Failed to delete the item.");
      }
    }
  };

  useEffect(() => {
    if (!user) return; // Ensure the user is logged in
    
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/sports?userEmail=${user.email}`);
        console.log(response)
        setEquipment(response.data);
      } catch (err) {
        setError("Failed to fetch equipment");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {equipment.map((item) => (
        <div key={item._id} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => window.location.href = `/updateEquipment/${item._id}`}
              >
                Update
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export default MyEquipment;
