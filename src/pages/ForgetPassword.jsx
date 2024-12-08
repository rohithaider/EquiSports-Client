import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleResetPassword = () => {
    
    window.location.href = `https://myaccount.google.com/intro/signinoptions/password`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <Helmet>
        <title>Reset</title>
      </Helmet>
      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Reset Password
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
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
          <button
            type="button"
            className="btn btn-primary w-full mt-4"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
