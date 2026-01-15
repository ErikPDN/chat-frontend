import { useNavigate } from "react-router-dom";
import SearchBar from "../shared/components/SearchBar";

export default function SidebarLayout() {
  const navigate = useNavigate();

  return (
    <aside
      className="fixed lg:sticky top-0 left-0 h-screen z-30
      bg-zinc-900 shadow-lg flex flex-col w-64 md:w-72 lg:w-96
      border-r border-zinc-700"
    >
      <div className="h-16 flex items-center justify-start px-6">
        <h1 className="text-2xl text-white font-bold">ChatApp</h1>
      </div>

      <div className="px-2">
        <SearchBar />
      </div>
    </aside >
  )
}
