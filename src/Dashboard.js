import { useState, useEffect } from 'react';

function Dashboard({ applications, setApplications }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('SWE');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  function handleAdd() {
    if (!company || !role) return;
    setApplications([...applications, { company, role, status, date, notes, type }]);
    setCompany('');
    setRole('');
    setStatus('Applied');
    setDate('');
    setNotes('');
    setType('SWE');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd();
  }

  function handleDelete(index) {
    const app = filtered[index];
    setApplications(applications.filter(a => a !== app));
  }

  function handleStatusChange(index, newStatus) {
    const app = filtered[index];
    setApplications(applications.map(a => a === app ? { ...a, status: newStatus } : a));
  }

  function statusColor(status) {
    if (status === 'Applied') return 'bg-blue-100 text-blue-700';
    if (status === 'Interview') return 'bg-yellow-100 text-yellow-700';
    if (status === 'Rejected') return 'bg-red-100 text-red-700';
    if (status === 'Offer') return 'bg-green-100 text-green-700';
  }

  function typeColor(type) {
    if (type === 'SWE') return 'bg-violet-100 text-violet-700';
    if (type === 'IT') return 'bg-sky-100 text-sky-700';
    if (type === 'DA') return 'bg-orange-100 text-orange-700';
    if (type === 'DS') return 'bg-teal-100 text-teal-700';
  }

  const counts = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'Applied').length,
    interview: applications.filter(a => a.status === 'Interview').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
    offer: applications.filter(a => a.status === 'Offer').length,
  };

  const filtered = applications
    .filter(a => filterStatus === 'All' || a.status === filterStatus)
    .filter(a => filterType === 'All' || a.type === filterType);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: counts.total, color: 'bg-white text-gray-700' },
            { label: 'Applied', value: counts.applied, color: 'bg-blue-50 text-blue-700' },
            { label: 'Interview', value: counts.interview, color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Rejected', value: counts.rejected, color: 'bg-red-50 text-red-700' },
            { label: 'Offer', value: counts.offer, color: 'bg-green-50 text-green-700' },
          ].map((card) => (
            <div key={card.label} className={`${card.color} rounded-xl shadow p-5 text-center`}>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-sm mt-1 font-medium">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-wrap gap-3">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Company name"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Role"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-violet-400"
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
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option>SWE</option>
            <option>IT</option>
            <option>DA</option>
            <option>DS</option>
          </select>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Notes (optional)"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Add
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs text-gray-400 font-medium">Status:</span>
        {['All', 'Applied', 'Interview', 'Rejected', 'Offer'].map((f) => (
            <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filterStatus === f
                ? 'bg-violet-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-violet-400'
            }`}
            >
            {f}
            </button>
        ))}
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <span className="text-xs text-gray-400 font-medium">Type:</span>
        {['All', 'SWE', 'IT', 'DA', 'DS'].map((f) => (
            <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filterType === f
                ? 'bg-violet-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-violet-400'
            }`}
            >
            {f}
            </button>
        ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Notes</th>
                <th className="px-6 py-3 text-left">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-500">{app.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{app.company}</td>
                  <td className="px-6 py-4 text-gray-600">{app.role}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${typeColor(app.type)}`}>
                      {app.type}
                    </span>
                  </td>
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
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{app.notes}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-400 hover:text-red-600 font-bold transition"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No applications found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;