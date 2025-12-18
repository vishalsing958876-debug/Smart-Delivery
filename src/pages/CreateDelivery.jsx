import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, estimatePrice } from '../features/orderSlice'

const packageTypes = ['Documents', 'Electronics', 'Food Box', 'Medicines', 'Groceries']

export default function CreateDeliveryPage() {
  const dispatch = useDispatch()
  const { estimate } = useSelector((state) => state.orders)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    pickup: '',
    drop: '',
    packageType: 'Documents',
    weight: 1,
    distanceKm: 5,
    notes: '',
  })

  useEffect(() => {
    dispatch(estimatePrice({ distanceKm: form.distanceKm, weight: form.weight }))
  }, [dispatch, form.distanceKm, form.weight])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(
      createOrder({
        ...form,
        weight: Number(form.weight),
        price: estimate ?? 199,
        customerId: 'USR-1',
      }),
    )
    setSubmitted(true)
    setForm({
      pickup: '',
      drop: '',
      packageType: 'Documents',
      weight: 1,
      distanceKm: 5,
      notes: '',
    })
  }

  return (
    <section className="grid gap-8 lg:grid-cols-3">
      <form
        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card lg:col-span-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-slate-900">Create a delivery</h2>
        <p className="text-sm text-slate-500">Add pickup & drop details. A driver will be auto matched.</p>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Pickup location</label>
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Koramangala, Bengaluru"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Drop location</label>
            <input
              type="text"
              name="drop"
              value={form.drop}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Whitefield, Bengaluru"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-600">Package type</label>
              <select
                name="packageType"
                value={form.packageType}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {packageTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Approx weight (kg)</label>
              <input
                type="number"
                min={0.5}
                step={0.5}
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Distance (km)</label>
              <input
                type="number"
                min={1}
                name="distanceKm"
                value={form.distanceKm}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Notes for driver</label>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Fragile parcel, handle with care"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-sm text-slate-500">
            Estimated price:{' '}
            <span className="text-2xl font-semibold text-slate-900">₹{estimate ?? 199}</span>
          </p>
          <button
            type="submit"
            className="rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/40"
          >
            Confirm delivery
          </button>
        </div>
        {submitted && (
          <p className="mt-4 rounded-xl bg-success/10 px-4 py-3 text-sm text-success">
            Delivery created! Track it under the tracking tab.
          </p>
        )}
      </form>

      <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Instant benefits</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>• Live driver tracking</li>
          <li>• Digital proof of delivery</li>
          <li>• Insurance on high-value parcels</li>
          <li>• 24/7 support chat</li>
        </ul>
      </aside>
    </section>
  )
}

