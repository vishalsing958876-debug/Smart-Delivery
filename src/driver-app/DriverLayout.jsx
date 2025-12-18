import { NavLink, Outlet, Link } from 'react-router-dom'

const driverLinks = [
  { to: '/driver', label: 'Login' },
  { to: '/driver/requests', label: 'Incoming' },
  { to: '/driver/status', label: 'Status' },
  { to: '/driver/map', label: 'Map View' },
  { to: '/driver/earnings', label: 'Earnings' },
]

export default function DriverLayout() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-white/90">
            Smart Deliver · Driver
          </Link>
          <Link to="/" className="rounded-full border border-white/30 px-4 py-2 text-sm text-white/80">
            Back to Customer
          </Link>
        </div>
        <nav className="mx-auto flex max-w-5xl flex-wrap gap-2 px-4 pb-4 text-sm">
          {driverLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/driver'}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 transition ${
                  isActive ? 'bg-white text-slate-900' : 'text-white/70 hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

