export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 rounded-md bg-slate-100 animate-pulse" />
      <div className="rounded-lg border border-slate-200 p-6 space-y-4">
        <div className="h-5 w-32 rounded bg-slate-100 animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full rounded-md bg-slate-50 border border-slate-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
