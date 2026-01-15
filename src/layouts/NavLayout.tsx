import { MessageSquare, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../features/auth/hooks/useLogout";

export default function NavLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;
  const handleLogout = useLogout();

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-zinc-800 border-r border-zinc-700 flex flex-col items-center justify-between py-2 shadow-lg">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`p-3 rounded-full transition-all duration-200 relative group ${active
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
                  }`}
                title={item.label}
              >
                <Icon size={24} />

                <span className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-sm rounded whitespace-nowrap 
                  opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleLogout}
        className="p-3 mb-2 rounded-full text-zinc-400 hover:text-red-500 hover:bg-zinc-700/50 transition-all duration-200"
        title="Logout"
      >
        <LogOut size={24} />
      </button>
    </nav>
  );
}
