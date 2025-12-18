import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { driverLogin } from '../features/driverSlice'

export default function DriverLoginPage() {
  const dispatch = useDispatch()
  const { status, profile } = useSelector((state) => state.driver)
  const [form, setForm] = useState({ phone: '', otp: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(driverLogin(form))
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
      <h2 className="text-2xl font-semibold">Driver sign-in</h2>
      <p className="text-sm text-white/70">Enter registered phone and OTP (mocked)</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs uppercase tracking-wide text-white/60">Driver ID / Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-300/40"
            placeholder="DRV-17"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-white/60">OTP</label>
          <input
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-300/40"
            placeholder="1234"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Verifying…' : 'Login & Go Online'}
        </button>
      </form>

      {profile && (
        <div className="mt-6 rounded-2xl bg-slate-900/60 p-4 text-sm">
          <p className="font-semibold">{profile.name}</p>
          <p className="text-white/70">{profile.vehicle}</p>
          <p className="text-white/70">Rating {profile.rating}</p>
        </div>
      )}
    </div>
  )
}

