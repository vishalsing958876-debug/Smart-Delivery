import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDriverRequests } from '../features/driverSlice'

export default function DriverEarningsPage() {
  const dispatch = useDispatch()
  const { profile, incoming } = useSelector((state) => state.driver)
  useEffect(() => {
    dispatch(fetchDriverRequests())
  }, [dispatch])
  const completed = incoming.filter((order) => order.status === 'Delivered')
  const earningsTotal = profile?.earnings ?? 42000

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <p className="text-sm uppercase tracking-widest text-white/60">Earnings</p>
      <h2 className="text-2xl font-semibold">Monthly summary</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-white/60">Total Earnings</p>
          <p className="text-2xl font-semibold">₹{earningsTotal.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-white/60">Completed Orders</p>
          <p className="text-2xl font-semibold">{completed.length || 12}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-white/60">Avg Rating</p>
          <p className="text-2xl font-semibold">{profile?.rating ?? 4.8}</p>
        </div>
      </div>
      <table className="mt-6 w-full text-sm text-white/80">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-white/50">
            <th className="py-2">Order</th>
            <th className="py-2">Route</th>
            <th className="py-2">Payout</th>
          </tr>
        </thead>
        <tbody>
          {incoming.slice(0, 5).map((order) => (
            <tr key={order.id} className="border-t border-white/10">
              <td className="py-2">{order.id}</td>
              <td className="py-2">
                {order.pickup} → {order.drop}
              </td>
              <td className="py-2 font-semibold text-white">₹{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

