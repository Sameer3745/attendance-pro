 // src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";  // ✅ ADD: Landing Page
import Login from "./Login";
import Dashboard from "./Dashboard";
import RegisterPage from "./RegisterPage"; // ✅ Import karna mat bhoolna

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* ✅ ADD: Landing Page route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register/:id" element={<RegisterPage />} /> {/* ✅ Already Correct */}
      </Routes>
    </Router>
  );
}

export default App;
