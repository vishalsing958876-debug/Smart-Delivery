import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminOverview } from '../features/adminSlice'

export default function DriversListPage() {
  const dispatch = useDispatch()
  const { drivers } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminOverview())
  }, [dispatch])

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Drivers</h2>
      <p className="text-sm text-slate-500">Monitor availability & earnings</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-400">
              <th className="py-2">Name</th>
              <th className="py-2">Vehicle</th>
              <th className="py-2">Rating</th>
              <th className="py-2">Earnings</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-t">
                <td className="py-3 font-medium text-slate-900">{driver.name}</td>
                <td className="py-3">{driver.vehicle}</td>
                <td className="py-3">{driver.rating}</td>
                <td className="py-3">₹{driver.earnings}</td>
                <td className="py-3">{driver.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

