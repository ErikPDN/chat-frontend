import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarLayout() {
  const navigate = useNavigate();

  const allMenuItens = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  // Mudar o width da sidebar para 64 em telas menores
  return (
    <aside
      className="fixed lg:sticky top-0 left-0 h-screen z-30
      bg-zinc-700 shadow-lg flex flex-col w-64"
    >

    </aside>
  )
}
