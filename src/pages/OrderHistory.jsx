import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryCard from '../components/DeliveryCard'
import { fetchOrders } from '../features/orderSlice'

export default function OrderHistoryPage() {
  const dispatch = useDispatch()
  const { list } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <section>
      <header className="mb-6">
        <p className="text-sm font-medium text-brand-600">Order history</p>
        <h2 className="text-2xl font-semibold text-slate-900">All past deliveries</h2>
        <p className="text-sm text-slate-500">Pulled from mock JSON · sorted by latest first</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((order) => (
          <DeliveryCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  )
}

