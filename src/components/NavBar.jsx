import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="mb-6 rounded-3xl border border-white/70 bg-white/80 p-3 shadow-xl shadow-blue-950/5 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20">
            T
          </span>
          <span className="text-lg font-bold text-slate-950">Taskflow</span>
        </Link>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          {user && (
            <span className="truncate rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
              {user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
