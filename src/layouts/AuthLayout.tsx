export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-zinc-700/50">
        {children}
      </div>
    </div>
  );
}
