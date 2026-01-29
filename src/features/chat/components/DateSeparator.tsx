interface DateSeparatorProps {
  date: string;
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex items-center justify-center my-4">
      <span className="text-zinc-400 text-sm px-3 py-1 bg-zinc-800 rounded-full">
        {date}
      </span>
    </div>
  );
}
