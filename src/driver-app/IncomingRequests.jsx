import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDriverRequests } from '../features/driverSlice'

export default function IncomingRequestsPage() {
  const dispatch = useDispatch()
  const { incoming } = useSelector((state) => state.driver)

  useEffect(() => {
    dispatch(fetchDriverRequests())
  }, [dispatch])

  return (
    <section className="space-y-4">
      <header>
        <p className="text-sm uppercase tracking-widest text-white/60">Incoming deliveries</p>
        <h2 className="text-2xl font-semibold">Swipe to accept</h2>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {incoming.map((order) => (
          <div key={order.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-xs text-white/60">
              <p>{order.id}</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase">
                {order.packageType}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold">
              {order.pickup} → {order.drop}
            </p>
            <p className="mt-2 text-xs text-white/60">
              Weight {order.weight}kg · Earn ₹{order.price}
            </p>
            <div className="mt-4 flex gap-2 text-sm">
              <button className="flex-1 rounded-full bg-success/80 px-4 py-2 text-slate-900">
                Accept
              </button>
              <button className="flex-1 rounded-full border border-white/30 px-4 py-2">
                Skip
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

