import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import DeliveryCard from '../components/DeliveryCard'
import { fetchOrders } from '../features/orderSlice'
import { fetchRecentDeliveries } from '../features/userSlice'

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { list } = useSelector((state) => state.orders)
  const { recentDeliveries } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchRecentDeliveries())
  }, [dispatch])

  const heroOrder = list[0]

  return (
    <section className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 p-6 text-white shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/70">Smart Delivery</p>
            <h1 className="mt-2 text-3xl font-semibold">Deliver anything within minutes</h1>
            <p className="mt-2 text-white/80">
              Book pickups, chat with drivers, get live tracking — no backend required.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/create-delivery"
              className="rounded-2xl bg-white px-6 py-3 text-slate-900 shadow-lg shadow-brand-900/30"
            >
              Create Delivery
            </Link>
            <Link
              to="/tracking"
              className="rounded-2xl border border-white/40 px-6 py-3 text-white hover:bg-white/10"
            >
              Track Order
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Active Orders" value="08" trend="18%" icon={<span>📦</span>} />
        <StatCard title="Avg ETA" value="26 mins" trend="6%" icon={<span>⏱️</span>} />
        <StatCard title="Drivers Nearby" value="21" trend="12%" icon={<span>🛵</span>} />
      </section>

      {heroOrder && (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Live order</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {heroOrder.pickup} → {heroOrder.drop}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Driver {heroOrder.driverId} is {heroOrder.status.toLowerCase()} · ETA {heroOrder.eta}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/tracking"
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Track on map
            </Link>
            <Link
              to="/chat"
              className="rounded-full border border-brand-100 px-4 py-2 text-sm font-semibold text-brand-700"
            >
              Message driver
            </Link>
          </div>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent deliveries</h2>
          <Link to="/orders" className="text-sm font-medium text-brand-600">
            View all
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {recentDeliveries.map((order) => (
            <DeliveryCard key={order.id} order={order} />
          ))}
        </div>
      </section>
    </section>
  )
}

