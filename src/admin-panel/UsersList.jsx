import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminOverview } from '../features/adminSlice'

export default function UsersListPage() {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminOverview())
  }, [dispatch])

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">All customers</h2>
      <p className="text-sm text-slate-500">Mock data from /src/mock/users.json</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-400">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-3 font-medium text-slate-900">{user.name}</td>
                <td className="py-3">{user.email}</td>
                <td className="py-3">{user.phone}</td>
                <td className="py-3 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

