import React, { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const AuthWrapper = ({ children }) => {
    const { isAuthenticated } = useAuth();

    const [showRegister, setShowRegister] = useState(false);

    if (!isAuthenticated()) {
        return showRegister ? (
            <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
            <Login onSwitchToRegister={() => setShowRegister(true)} />
        );
    }

    return children;
};

export default AuthWrapper;