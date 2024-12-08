import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { AuthContext } from "../contexts/AuthProvider";
import swal from "sweetalert";

const MyEquipment = () => {
  const { user } = useContext(AuthContext); // Access the logged-in user context
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    if (user) {
      fetch(
        `https://equi-sports-server-swart.vercel.app/sportsByEmail?userEmail=${user.email}`
      )
        .then((response) => response.json())
        .then((data) => setEquipments(data))
        .catch((error) => console.error("Error fetching equipment:", error));
    }
  }, [user]); // Re-run if the user changes

  const handleUpdate = (id) => {
    navigate(`/updateEquipment/${id}`);
  };

  function handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
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
              setEquipments((prevEquipments) =>
                prevEquipments.filter((equipment) => equipment._id !== id)
              );
              swal("Deleted!", "The equipment has been removed.", {
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
      <div className="w-11/12 mx-auto">
        {equipments.length === 0 ? (
          <p className="text-center text-gray-600">No equipment found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipments.map((equipment) => (
              <div
                key={equipment._id}
                className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition-shadow space-y-4"
              >
                <img
                  src={equipment.image}
                  alt={equipment.itemName}
                  className="rounded-lg w-full h-48 object-cover"
                />
                <h3 className="font-bold text-lg">
                  Name: <span className="font-normal">{equipment.itemName}</span>
                </h3>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {equipment.description}
                </p>
                <p>
                  <span className="font-bold">Price:</span> ${equipment.price}
                </p>
                <p>
                  <span className="font-bold">Rating:</span> {equipment.rating}
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    className="btn btn-primary "
                    onClick={() => handleUpdate(equipment._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-warning "
                    onClick={() => handleDelete(equipment._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEquipment;
