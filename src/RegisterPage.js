 import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "./axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const monthsMap = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const RegisterPage = () => {
  const { id } = useParams();
  const [register, setRegister] = useState(null);
  const [month, setMonth] = useState("July");
  const [year, setYear] = useState("2025");
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const daysInMonth = monthsMap[month];
  const attendanceKey = `${month}-${year}`;

  useEffect(() => {
    const fetchRegister = async () => {
      try {
        const res = await axios.get(`/api/registers/${id}`);
        setRegister(res.data);
      } catch (error) {
        console.error("Error loading register:", error);
      }
    };
    fetchRegister();
  }, [id]);

  useEffect(() => {
    if (register?.attendance?.[attendanceKey]) {
      setStudents(register.attendance[attendanceKey]);
    } else {
      setStudents([]);
    }
  }, [register, month, year]);

  useEffect(() => {
    const saveAttendance = async () => {
      setSaving(true);
      try {
        await axios.put(`/api/registers/${id}/attendance`, {
          students,
          month: attendanceKey,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (error) {
        console.error("❌ Error saving attendance", error);
      }
      setSaving(false);
    };

    if (students.length > 0) saveAttendance();
  }, [students, month, year, id]);

  const handleAddStudent = () => {
    if (newStudent.trim()) {
      const updated = [
        ...students,
        {
          name: newStudent,
          attendance: Array(daysInMonth).fill(false),
        },
      ];
      setStudents(updated);
      setNewStudent("");
    }
  };

  const handleDeleteStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  const toggleAttendance = (i, j) => {
    const updated = [...students];
    updated[i].attendance[j] = !updated[i].attendance[j];
    setStudents(updated);
  };

  const generatePDF = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(12);
    doc.text(
      `Attendance - ${register.branch}, ${register.semester} Sem, ${register.year} Year`,
      14,
      15
    );
    doc.text(`Month: ${month} ${year}`, 14, 25);

    const tableHead = [
      "S.No",
      "Name",
      ...Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
      "Total",
    ];

    const tableBody = students.map((s, index) => [
      index + 1,
      s.name,
      ...s.attendance.map((p) => (p ? "✔" : "-")),
      `${s.attendance.filter(Boolean).length}/${daysInMonth}`,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [tableHead],
      body: tableBody,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 40 },
      },
      theme: "grid",
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: 255,
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
    });

    doc.save(`Attendance_${month}_${year}.pdf`);
  };

  if (!register)
    return <div className="text-center mt-10 text-gray-700">Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-screen font-[Poppins] text-gray-800">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Attendance Register - {register.branch} - {register.semester} Sem -{" "}
        {register.year} Year
      </h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded shadow text-gray-800"
        >
          {Object.keys(monthsMap).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded shadow text-gray-800"
        >
          {["2023", "2024", "2025", "2026"].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
        <button
          onClick={generatePDF}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Export PDF
        </button>
      </div>

      {saving && <p className="text-blue-600">Saving...</p>}
      {saved && <p className="text-green-600">Saved ✓</p>}

      <div className="flex mb-4 gap-2">
        <input
          value={newStudent}
          onChange={(e) => setNewStudent(e.target.value)}
          placeholder="Enter student name"
          className="p-2 border rounded w-full text-gray-800 placeholder-gray-500"
        />
        <button
          onClick={handleAddStudent}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <div className="overflow-auto rounded border shadow">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border px-2 py-1 text-left">S.No</th>
              <th className="border px-2 py-1 text-left">Name</th>
              {[...Array(daysInMonth)].map((_, i) => (
                <th
                  key={i}
                  className="border px-1 py-1 text-center"
                >
                  {i + 1}
                </th>
              ))}
              <th className="border px-2 py-1 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr
                key={i}
                className="even:bg-white odd:bg-gray-100"
              >
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1 flex justify-between items-center">
                  <span>{s.name}</span>
                  <button
                    onClick={() => handleDeleteStudent(i)}
                    className="ml-2 text-red-500 text-xs"
                  >
                    ✖
                  </button>
                </td>
                {s.attendance.map((p, j) => (
                  <td
                    key={j}
                    onClick={() => toggleAttendance(i, j)}
                    className={`border text-center cursor-pointer select-none ${
                      p ? "bg-green-200" : "bg-red-100"
                    }`}
                  >
                    {p ? "✓" : "-"}
                  </td>
                ))}
                <td className="border text-center font-semibold">
                  {s.attendance.filter(Boolean).length}/{daysInMonth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterPage;
