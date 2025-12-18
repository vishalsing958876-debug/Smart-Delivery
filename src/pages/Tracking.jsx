import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapPlaceholder from '../components/MapPlaceholder'
import { fetchOrders, trackOrder } from '../features/orderSlice'

export default function TrackingPage() {
  const dispatch = useDispatch()
  const { list, tracking } = useSelector((state) => state.orders)
  const [selectedOrder, setSelectedOrder] = useState('')

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const currentOrderId = useMemo(() => selectedOrder || list[0]?.id || '', [list, selectedOrder])

  useEffect(() => {
    if (currentOrderId) {
      dispatch(trackOrder(currentOrderId))
    }
  }, [dispatch, currentOrderId])

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-600">Live tracking</p>
          <h2 className="text-2xl font-semibold text-slate-900">Track any order in real-time</h2>
        </div>
        {list.length ? (
          <select
            value={currentOrderId}
            onChange={(event) => setSelectedOrder(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700"
          >
            {list.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} · {order.pickup} → {order.drop}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-sm text-slate-500">Loading mock orders…</p>
        )}
      </header>

      <MapPlaceholder driver={tracking?.driver} />

      <div className="grid gap-4 md:grid-cols-3">
        {tracking?.timeline?.map((stage) => (
          <div
            key={stage.label}
            className={`rounded-2xl border px-4 py-3 ${
              stage.completed
                ? 'border-success/40 bg-success/5 text-success'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <p className="text-sm font-semibold">{stage.label}</p>
            <p className="text-xs">{stage.completed ? 'Completed' : 'Pending'}</p>
          </div>
        ))}
      </div>

      {tracking?.order && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">{tracking.order.id}</h3>
          <p className="text-sm text-slate-500">
            Driver {tracking.driver?.name} ({tracking.driver?.vehicle}) is{' '}
            <span className="font-semibold text-brand-600">{tracking.order.status}</span>
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Pickup</p>
              <p className="text-sm font-semibold text-slate-900">{tracking.order.pickup}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Drop</p>
              <p className="text-sm font-semibold text-slate-900">{tracking.order.drop}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">ETA</p>
              <p className="text-sm font-semibold text-slate-900">{tracking.order.eta}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

