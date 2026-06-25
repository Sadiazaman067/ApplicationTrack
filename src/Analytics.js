import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Analytics({ applications }) {
  const types = ['SWE', 'IT', 'DA', 'DS'];

  const chartData = types.map(t => ({
    type: t,
    Total: applications.filter(a => a.type === t).length,
    Applied: applications.filter(a => a.type === t && a.status === 'Applied').length,
    Interview: applications.filter(a => a.type === t && a.status === 'Interview').length,
    Rejected: applications.filter(a => a.type === t && a.status === 'Rejected').length,
    Offer: applications.filter(a => a.type === t && a.status === 'Offer').length,
  }));

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

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Applications by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" tick={{ fontSize: 13 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="Applied" stackId="a" fill="#93c5fd" />
              <Bar dataKey="Interview" stackId="a" fill="#fde68a" />
              <Bar dataKey="Rejected" stackId="a" fill="#fca5a5" />
              <Bar dataKey="Offer" stackId="a" fill="#6ee7b7" />
            </BarChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex gap-4 mt-4 justify-center text-xs">
            {[
              { label: 'Applied', color: 'bg-blue-200' },
              { label: 'Interview', color: 'bg-yellow-200' },
              { label: 'Rejected', color: 'bg-red-200' },
              { label: 'Offer', color: 'bg-green-200' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                <span className="text-gray-600">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications grouped by type */}
        {types.map(t => {
          const group = applications.filter(a => a.type === t);
          if (group.length === 0) return null;
          return (
            <div key={t} className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${typeColor(t)}`}>{t}</span>
                <span className="text-gray-400 text-sm">{group.length} application{group.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Company</th>
                      <th className="px-6 py-3 text-left">Role</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {group.map((app, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-500">{app.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{app.company}</td>
                        <td className="px-6 py-4 text-gray-600">{app.role}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{app.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {applications.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No applications yet. Add some from the Dashboard!
          </div>
        )}

      </div>
    </div>
  );
}

export default Analytics;