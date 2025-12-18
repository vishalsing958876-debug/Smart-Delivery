import { NavLink, Outlet, Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/create-delivery', label: 'Create Delivery' },
  { to: '/tracking', label: 'Tracking' },
  { to: '/orders', label: 'History' },
  { to: '/chat', label: 'Chat' },
]

const ctaLinks = [
  { to: '/driver', label: 'Driver App' },
  { to: '/admin', label: 'Admin Panel' },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
          <Link to="/" className="text-xl font-display font-semibold text-brand-600">
            Smart Deliver
          </Link>
          <nav className="hidden gap-4 text-sm md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-medium transition hover:bg-brand-50 ${
                    isActive ? 'bg-brand-100 text-brand-800' : 'text-slate-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex gap-2">
            {ctaLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full border border-brand-200 px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

