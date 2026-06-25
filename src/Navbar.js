import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex items-center gap-8">
      <h1 className="text-xl font-bold text-violet-600">JobJar</h1>
      <Link
        to="/"
        className={`text-sm font-medium transition ${
          location.pathname === '/' ? 'text-violet-600' : 'text-gray-500 hover:text-violet-500'
        }`}
      >
        Dashboard
      </Link>
      <Link
        to="/analytics"
        className={`text-sm font-medium transition ${
          location.pathname === '/analytics' ? 'text-violet-600' : 'text-gray-500 hover:text-violet-500'
        }`}
      >
        Analytics
      </Link>
    </nav>
  );
}

export default Navbar;