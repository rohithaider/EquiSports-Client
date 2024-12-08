import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      setUser({
        ...user,
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      navigate("/");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          My Profile
        </h2>
        <div className="mb-6 text-center">
          <img
            src={formData.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-lg mt-2">{user?.email}</h3>
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input input-bordered w-full"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="photoURL"
              className="block text-base font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              className="input input-bordered w-full"
              placeholder="Enter photo URL"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
