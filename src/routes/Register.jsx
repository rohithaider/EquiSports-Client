import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContext } from "../contexts/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons
import { Helmet } from "react-helmet";
import { getAuth, updateProfile } from "firebase/auth"; // Import updateProfile

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, logOut, googleLogIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Password does not meet the required criteria.",
      });
      return;
    }

    // Register the user with email and password
    createUser(formData.email, formData.password)
      .then((result) => {
        const user = result.user;

        // Use Firebase Auth to update the profile after user creation
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: formData.name,
          photoURL: formData.photoURL,
        })
          .then(() => {
            setUser({
              ...user,
              displayName: formData.name,
              photoURL: formData.photoURL,
            });
            logOut();
            Swal.fire({
              icon: 'success',
              title: 'Registration successful!',
              text: 'You can now log in.',
            });
            navigate("/login"); // Redirect to login after registration
          })
          .catch((error) => {
            setError("Failed to update user profile: " + error.message);
            Swal.fire({
              icon: 'error',
              title: 'Failed to update user profile',
              text: error.message,
            });
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("This email is already registered. Please log in.");
          Swal.fire({
            icon: 'error',
            title: 'Email already in use',
            text: "This email is already in use. Please log in.",
          });
        } else {
          setError(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      });

    setFormData({
      name: "",
      email: "",
      photoURL: "",
      password: "",
    });
  };

  const handleGoogleLogin = () => {
    googleLogIn();
    Swal.fire({
      icon: 'success',
      title: 'Logged in successfully',
      text: 'Welcome back!',
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister}>
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
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
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
              placeholder="Enter your photo URL"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              id="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <div
              className="absolute top-2/4 right-3 transform -translate-y-2/4 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <hr className="border-t w-1/3" />
          <span className="text-base-content mx-2">or</span>
          <hr className="border-t w-1/3" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-error w-full mt-4"
        >
          Register with Google
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
