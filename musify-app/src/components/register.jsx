import React from "react";
import { assets } from "../assets/assets";

const Register = () => {
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

          <form className="space-y-6">

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
                className="block w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-200"
            >
              Create Account
            </button>

          </form>

          {/* Switch to Login Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Sign in here
            </a>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;