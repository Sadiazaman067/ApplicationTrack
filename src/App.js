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

  return (
    <div>
      <h1>JobJar</h1>
      <p>Total applications: {applications.length}</p>

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Company name"
      />
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Role"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>
      <button onClick={handleAdd}>Add</button>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{app.date}</td>
              <td>{app.company}</td>
              <td>{app.role}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                  <option>Offer</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;