import { useNavigate } from "react-router-dom";

export default function SidebarLayout() {
  const navigate = useNavigate();

  const allMenuItens = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className="fixed lg:sticky top-0 left-0 h-screen z-30
      bg-zinc-700 shadow-lg flex flex-col w-64 md:w-72"
    >
      <div className="h-16 flex items-center justify-start px-6">
        <h1 className="text-xl text-white font-bold">ChatApp</h1>
      </div>
    </aside >
  )
}
