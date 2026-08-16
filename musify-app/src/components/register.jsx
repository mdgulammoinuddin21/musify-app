import React, { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = ({onSwitchToLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {register} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check empty fields
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const result = await register(email, password);

      if (result.success) {
        toast.success(result.message);
        onSwitchToLogin();
      } else {
        toast.error(result.message);
        setError(result.message+"hi");
      }
    } catch (e) {
      toast.error("An unexpected error occurred. Please try again later.");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-green-950 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center">

          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <img
              src={assets.logo}
              alt="Musify Logo"
              className="w-16 h-16 object-contain"
            />

            <h1 className="ml-3 text-3xl font-bold text-white">
              Musify
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Join Musify
          </h2>

          <p className="text-gray-300">
            Create your account to start listening
          </p>

        </div>

        {/* Register Form */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50">

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="block w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="block w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                required
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="block w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-black font-semibold bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
                {loading ? (
                    <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Creating account...
                    </div>
                ) : (
                    "Create Account"
                )}
            </button>

          </form>

          {/* Switch to Login */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}

            <button
              onClick={onSwitchToLogin}
              className="text-green-400 hover:text-green-300 font-medium transition"
            >
              Sign in here
            </button>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;