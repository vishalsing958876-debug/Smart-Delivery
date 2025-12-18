import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StatCard from '../components/StatCard'
import Modal from '../components/Modal'
import {
  assignDriver,
  closeAssignModal,
  fetchAdminOverview,
  openAssignModal,
} from '../features/adminSlice'

export default function AdminDashboardPage() {
  const dispatch = useDispatch()
  const { metrics, orders, drivers, assignModal } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminOverview())
  }, [dispatch])

  const liveOrders = orders.filter((order) => order.status !== 'Delivered')

  const handleAssign = (orderId) => {
    dispatch(openAssignModal(orderId))
  }

  const handleDriverAssign = (driverId) => {
    dispatch(assignDriver({ orderId: assignModal.orderId, driverId }))
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Users" value={metrics.totalUsers} icon={<span>👥</span>} />
        <StatCard title="Total Drivers" value={metrics.totalDrivers} icon={<span>🛵</span>} />
        <StatCard title="Active Orders" value={metrics.activeOrders} icon={<span>📦</span>} />
        <StatCard title="GMV (Mock)" value={`₹${metrics.earnings}`} icon={<span>💰</span>} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active orders</p>
              <h3 className="text-xl font-semibold text-slate-900">Dispatch board</h3>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {liveOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {order.pickup} → {order.drop}
                  </p>
                  <p className="text-xs text-slate-500">Driver {order.driverId ?? 'Unassigned'}</p>
                </div>
                <button
                  onClick={() => handleAssign(order.id)}
                  className="rounded-full border border-brand-200 px-4 py-1.5 text-sm font-medium text-brand-700"
                >
                  Assign driver
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Driver leaderboard</p>
          <h3 className="text-xl font-semibold text-slate-900">Top performers</h3>
          <div className="mt-4 space-y-3">
            {drivers.slice(0, 5).map((driver) => (
              <div
                key={driver.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{driver.name}</p>
                  <p className="text-xs text-slate-500">
                    {driver.vehicle} · Rating {driver.rating}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900">₹{driver.earnings}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={assignModal.open}
        title="Assign driver"
        onClose={() => dispatch(closeAssignModal())}
      >
        <div className="space-y-3">
          {drivers.slice(0, 4).map((driver) => (
            <button
              key={driver.id}
              onClick={() => handleDriverAssign(driver.id)}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-brand-200"
            >
              <div>
                <p className="font-semibold text-slate-900">{driver.name}</p>
                <p className="text-sm text-slate-500">{driver.vehicle}</p>
              </div>
              <span className="text-sm text-slate-500">Rating {driver.rating}</span>
            </button>
          ))}
        </div>
      </Modal>
    </section>
  )
}

