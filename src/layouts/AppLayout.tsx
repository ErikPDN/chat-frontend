import NavLayout from "./NavLayout";
import SidebarLayout from "./SidebarLayout";

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900">
      <NavLayout />
      <div className="ml-20 flex-1 flex">
        <SidebarLayout />
      </div>
    </div>
  )

}
