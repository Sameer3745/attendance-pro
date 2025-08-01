  import React from "react";
import { useNavigate } from "react-router-dom";

// Team members data with just names
const teamMembers = [
  "Sameer Gupta ,",
  "Prianshu Singh ,",
  "Aman Singh yadav,",
  "Dipanshu Tiwari",
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Centered Big Title */}
      <header className="py-10 text-center">
        <h1 className="text-6xl font-extrabold tracking-wide text-white">
          AttendancePro
        </h1>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-8 gap-12">
        {/* Left: Text */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-300">
            Simplify your Attendance Management
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Manage attendance registers online for all branches & semesters.
            No more paper, no more hassle!
          </p>
        </div>

        {/* Right: Image + Buttons Box */}
        <div className="relative flex flex-col items-center">
          {/* Image */}
          <div className="max-w-sm shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80"
              alt="Attendance management"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Buttons beside image */}
          <div className="mt-4 bg-indigo-800/20 p-6 rounded-lg w-full max-w-sm shadow-lg">
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white w-full text-lg px-6 py-4 rounded-md font-bold hover:bg-indigo-700 transition mb-4"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-black w-full text-base px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          </div>
        </div>
      </main>

      {/* Footer with Team section */}
      <footer className="text-center py-6 border-t border-gray-800 mt-auto">
        <p className="text-sm text-gray-500 mb-2">
          © 2025 AttendancePro. All rights reserved.
        </p>
        <div className="text-gray-400 mb-1 font-semibold">Development Team:</div>
        <div className="flex flex-col items-center space-y-1 mt-2">
          {teamMembers.map((name) => (
            <span key={name} className="text-white text-sm">
              {name}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;