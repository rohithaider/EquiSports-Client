import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn, googleLogIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // Get the location from which the user was redirected
  const location = useLocation();
  const from = location.state?.from || "/"; 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the signIn function with email and password
      await signIn(email, password);

      // Show success toast
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Redirect the user to the previous page
      navigate(from, { replace: true });
    } catch (error) {
      // Handle errors 
      toast.error(`Login failed: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleGoogleLogin = () => {
    googleLogIn();
    // Google Login logic
    toast.success("Successfully logged in with Google!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });

    // Redirect to the home page 
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="mt-4 text-center text-sm">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              state={{ email }} 
              className="link link-primary"
            >
              Reset it here
            </Link>
          </p>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Login
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
          Login with Google
        </button>
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="link link-primary">
            Register here
          </Link>
        </p>
      </div>
  
      <ToastContainer />
    </div>
  );
};

export default Login;
