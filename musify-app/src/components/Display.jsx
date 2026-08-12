import React from "react";
import { Routes, Route } from "react-router-dom";

import DisplayHome from "./DisplayHome.jsx";
import Search from "./Search.jsx";
import DisplayAlbum from "./DisplayAlbum.jsx";

const Display = () => {
    return (
        <div className="flex-1 px-6 pb-4 overflow-auto">
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album" element={<DisplayAlbum />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </div>
    );
};

export default Display;