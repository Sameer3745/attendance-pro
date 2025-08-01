 import React, { useEffect, useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserCircle2 } from "lucide-react"; // Optional icon lib, or use image

function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [registers, setRegisters] = useState([]);

  // Load registers
  useEffect(() => {
    const fetchRegisters = async () => {
      const teacherId = localStorage.getItem("teacherId");
      if (!teacherId) return;

      try {
        const res = await axios.get(`/api/registers?teacherId=${teacherId}`);
        setRegisters(res.data);
      } catch (err) {
        console.error("Failed to fetch registers", err);
      }
    };

    fetchRegisters();
  }, []);

  // Create new register
  const handleCreateRegister = async () => {
    const teacherId = localStorage.getItem("teacherId");
    if (branch && semester && year && teacherId) {
      const newRegister = { branch, semester, year, teacherId };

      try {
        const res = await axios.post("/api/registers", newRegister);
        alert("Register saved ✅");
        setRegisters([...registers, res.data.register]);
        setBranch("");
        setSemester("");
        setYear("");
      } catch (error) {
        console.error("Error saving register ❌", error);
        alert("Error saving register ❌");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  // Delete register
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this register?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/registers/${id}`);
      alert("Register deleted ✅");
      setRegisters(registers.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete ❌");
      console.error(err);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("teacherId");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 font-[Poppins]">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow px-6 py-4 sticky top-0 z-50">
        <div
          className="text-2xl font-extrabold text-indigo-700 hover:text-purple-600 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          Attendance<span className="text-purple-600">Pro</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-700 font-medium">
            <UserCircle2 className="w-6 h-6 text-indigo-500" />
            <span>{user?.email || "Teacher"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:brightness-110 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Attendance Register
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Branch (e.g., CS)"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-950"
          />
          <input
            type="text"
            placeholder="Semester (e.g., 4th)"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-950"
          />
          <input
            type="text"
            placeholder="Year (e.g., 2nd)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-950"
          />
        </div>

        <button
          onClick={handleCreateRegister}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition font-medium"
        >
          Create Register
        </button>

        {/* List of Registers */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Registers</h3>

          {registers.length === 0 ? (
            <p className="text-gray-600 italic">No registers yet.</p>
          ) : (
            <ul className="space-y-3">
              {registers.map((r) => (
                <li
                  key={r._id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="text-gray-800 font-medium">
                    {r.branch} - {r.semester} Sem - {r.year} Year
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition"
                      onClick={() => navigate(`/register/${r._id}`)}
                    >
                      Open
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition"
                      onClick={() => handleDelete(r._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
