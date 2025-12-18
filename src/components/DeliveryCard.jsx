export default function DeliveryCard({ order }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>{order.id}</p>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            order.status === 'Delivered'
              ? 'bg-success/10 text-success'
              : order.status === 'In Transit'
                ? 'bg-warning/10 text-warning'
                : 'bg-brand-100 text-brand-700'
          }`}
        >
          {order.status}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-900">
        {order.pickup} → {order.drop}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
        <p>Package: {order.packageType}</p>
        <p>Weight: {order.weight}kg</p>
        <p>Driver: {order.driverId}</p>
        <p>ETA: {order.eta}</p>
      </div>
      <p className="mt-4 text-lg font-semibold text-brand-600">₹{order.price}</p>
    </div>
  )
}

