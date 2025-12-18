export default function StatCard({ title, value, trend, icon }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {icon}
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
      {trend && (
        <p className="mt-1 text-xs font-medium text-success">
          ↑ {trend} vs last week
        </p>
      )}
    </div>
  )
}

