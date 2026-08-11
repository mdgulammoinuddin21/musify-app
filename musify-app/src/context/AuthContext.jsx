import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const API_BASE_URL = "http://localhost:8080";

  // Get previously saved authentication data
  const savedToken = localStorage.getItem("userToken");
  const savedUser = localStorage.getItem("user");

  const [user, setUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );

  const [token, setToken] = useState(savedToken || null);

  const [loading, setLoading] = useState(false);

  // =========================
  // REGISTER
  // =========================
  const register = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          email,
          password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        return {
          success: true,
          message: "Registration successful",
        };
      }

      return {
        success: false,
        message:
          response.data?.message || "Registration failed",
      };
    } catch (error) {
      console.error("Registration error:", error);

      const message =
        error.response?.data?.message || "Network error. Please try again later.";

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;

        /*
          Backend AuthResponse:

          {
            "token": "...",
            "email": "...",
            "role": "USER"
          }
        */

        const userData = {
          email: data.email,
          role: data.role,
        };

        // Save authentication data
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update React state
        setToken(data.token);
        setUser(userData);

        return {
          success: true,
          message: "Login successful",
          token: data.token,
          email: data.email,
          role: data.role,
        };
      }

      return {
        success: false,
        message: "Login failed",
      };
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message || "Email/Password is incorrect";

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // =========================
  // CONTEXT VALUE
  // =========================
  const contextValue = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};