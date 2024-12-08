import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { AuthContext } from "../contexts/AuthProvider";
import swal from 'sweetalert';

const MyEquipment = () => {
  const { user } = useContext(AuthContext); // Access the logged-in user context
  console.log(user.email)
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    // Fetch user's equipment data from the backend based on their email
    if (user) {
      fetch(`https://equi-sports-server-swart.vercel.app/sportsByEmail?userEmail=${user.email}`) // Corrected fetch URL to use the new route
        .then((response) => response.json())
        .then((data) => setEquipments(data))
        .catch((error) => console.error("Error fetching equipment:", error));
    }
  }, [user]); // Only re-run this effect if the user changes

  const handleUpdate = (id) => {
    navigate(`/updateEquipment/${id}`);
  };
  

  function handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        fetch(`https://equi-sports-server-swart.vercel.app/sports/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // Update state to remove the deleted equipment from the UI
              setEquipments((prevEquipments) =>
                prevEquipments.filter((equipment) => equipment._id !== id)
              );
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          })
          .catch((error) => console.error("Error deleting equipment:", error));
      }
    });
  }
  

  return (
    <div>
      <h1 className="text-center mb-5 text-2xl font-bold">My Equipment</h1>
      <div className="w-10/12 mx-auto mb-2">
      <div className="equipment-list grid grid-cols-3 gap-3">
        {equipments.length === 0 ? (
          <p>No equipment found.</p>
        ) : (
          equipments.map((equipment) => (
            <div key={equipment._id} className="equipment-card space-y-2">
              <img src={equipment.image} alt={equipment.itemName} className="rounded-2xl" />
              <h3><span className="font-bold">Name:</span>{equipment.itemName}</h3>
              <p><span className="font-bold">Description:</span>{equipment.description}</p>
              <p><span className="font-bold">Price:</span> {equipment.price}</p>
              <p><span className="font-bold">Rating</span> {equipment.rating}</p>
              <div className="flex gap-2">
              <button className="btn btn-primary" onClick={() => handleUpdate(equipment._id)}>Update</button>
              <button className="btn btn-warning" onClick={() => handleDelete(equipment._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default MyEquipment;
