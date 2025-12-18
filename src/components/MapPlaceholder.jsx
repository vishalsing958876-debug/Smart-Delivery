export default function MapPlaceholder({ driver }) {
  return (
    <div className="h-64 rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4">
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-slate-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          🛵
        </div>
        <p className="text-base font-semibold text-slate-800">
          Tracking {driver?.name ?? 'Driver'}
        </p>
        <p className="text-sm">
          Live location updates coming soon.
          <br />
          Current stop: <span className="font-medium text-slate-900">{driver?.location ?? 'Koramangala'}</span>
        </p>
      </div>
    </div>
  )
}

