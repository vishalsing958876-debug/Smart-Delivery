import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDriverRequests } from '../features/driverSlice'

export default function DriverOrderStatusPage() {
  const dispatch = useDispatch()
  const { incoming } = useSelector((state) => state.driver)

  useEffect(() => {
    dispatch(fetchDriverRequests())
  }, [dispatch])
  const active = incoming[0]

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <p className="text-sm uppercase tracking-widest text-white/60">Order status</p>
      <h2 className="text-2xl font-semibold">Update riders & customers</h2>

      {active ? (
        <>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-white/60">Pickup</p>
              <p className="font-semibold">{active.pickup}</p>
            </div>
            <div>
              <p className="text-white/60">Drop</p>
              <p className="font-semibold">{active.drop}</p>
            </div>
            <div>
              <p className="text-white/60">Status</p>
              <p className="font-semibold">{active.status}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
            {['Picked', 'In Transit', 'Delivered'].map((stage) => (
              <button
                key={stage}
                className={`rounded-2xl border px-4 py-3 ${
                  stage === active.status
                    ? 'border-success/50 bg-success/20 text-slate-900'
                    : 'border-white/20 bg-white/10 text-white/80'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-6 text-sm text-white/70">No active orders. Accept a task to begin.</p>
      )}
    </section>
  )
}

