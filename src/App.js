import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('jobjar');
    return saved ? JSON.parse(saved) : [];
  });
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [date, setDate] = useState('');

  useEffect(() => {
    localStorage.setItem('jobjar', JSON.stringify(applications));
  }, [applications]);

  function handleAdd() {
    if (!company || !role) return;
    setApplications([...applications, { company, role, status, date }]);
    setCompany('');
    setRole('');
    setStatus('Applied');
    setDate('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd();
  }

  function handleDelete(index) {
    setApplications(applications.filter((_, i) => i !== index));
  }

  function handleStatusChange(index, newStatus) {
    const updated = [...applications];
    updated[index].status = newStatus;
    setApplications(updated);
  }

  function statusColor(status) {
    if (status === 'Applied') return 'bg-blue-100 text-blue-700';
    if (status === 'Interview') return 'bg-yellow-100 text-yellow-700';
    if (status === 'Rejected') return 'bg-red-100 text-red-700';
    if (status === 'Offer') return 'bg-green-100 text-green-700';
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">JobJar</h1>
          <p className="text-gray-500 mt-1">Total applications: {applications.length}</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-wrap gap-3">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Company name"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Role"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Add
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-500">{app.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{app.company}</td>
                  <td className="px-6 py-4 text-gray-600">{app.role}</td>
                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className={`rounded-full px-3 py-1 text-xs font-medium border-0 cursor-pointer ${statusColor(app.status)}`}
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Rejected</option>
                      <option>Offer</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-400 hover:text-red-600 font-bold transition"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No applications yet. Add your first one above!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;