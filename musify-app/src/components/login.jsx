import React, { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
        const result = await login(email, password);

        if (result.success) {
        toast.success(result.message);

        console.log("Token:", result.token);
        console.log("Email:", result.email);
        console.log("Role:", result.role);

        
        } else {
        toast.error(result.message);
        }
    } catch (e) {
        toast.error(
        "An unexpected error occurred. Please try again later."
        );
        setError(e.message);
    }finally {
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
            Welcome Back
          </h2>

          <p className="text-gray-300">
            Sign in to continue listening
          </p>

        </div>

        {/* Login Form */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50">

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >

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
                className="block w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="block w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm text-center">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-200"
            >
              Sign In
            </button>

          </form>

          {/* Switch to Register */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}

            <a
              href="/register"
              className="text-green-400 hover:text-green-300 font-medium transition"
            >
              Sign up here
            </a>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;