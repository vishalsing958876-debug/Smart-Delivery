import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  assignDriver,
  closeAssignModal,
  fetchAdminOverview,
  openAssignModal,
} from '../features/adminSlice'
import Modal from '../components/Modal'

export default function OrdersListPage() {
  const dispatch = useDispatch()
  const { orders, drivers, assignModal } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminOverview())
  }, [dispatch])

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Orders</h2>
      <p className="text-sm text-slate-500">Assign drivers & monitor SLAs</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-400">
              <th className="py-2">Order</th>
              <th className="py-2">Route</th>
              <th className="py-2">Driver</th>
              <th className="py-2">Status</th>
              <th className="py-2">Price</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="py-3 font-medium text-slate-900">{order.id}</td>
                <td className="py-3">
                  {order.pickup} → {order.drop}
                </td>
                <td className="py-3">{order.driverId ?? 'NA'}</td>
                <td className="py-3">{order.status}</td>
                <td className="py-3">₹{order.price}</td>
                <td className="py-3">
                  <button
                    onClick={() => dispatch(openAssignModal(order.id))}
                    className="rounded-full border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={assignModal.open}
        title="Assign driver"
        onClose={() => dispatch(closeAssignModal())}
      >
        <div className="space-y-3">
          {drivers.map((driver) => (
            <button
              key={driver.id}
              onClick={() => dispatch(assignDriver({ orderId: assignModal.orderId, driverId: driver.id }))}
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

