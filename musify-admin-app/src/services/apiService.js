import axios from "axios";
import { API_BASE_URL } from "../App.jsx";

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors globally
apiClient.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {

            // Token expired or invalid
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default apiClient;