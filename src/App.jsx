import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/Dashboard'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import CreateDeliveryPage from './pages/CreateDelivery'
import TrackingPage from './pages/Tracking'
import OrderHistoryPage from './pages/OrderHistory'
import ChatPage from './pages/Chat'
import DriverLayout from './driver-app/DriverLayout'
import DriverLoginPage from './driver-app/DriverLogin'
import IncomingRequestsPage from './driver-app/IncomingRequests'
import DriverOrderStatusPage from './driver-app/OrderStatus'
import DriverMapPage from './driver-app/DriverMap'
import DriverEarningsPage from './driver-app/DriverEarnings'
import AdminLayout from './admin-panel/AdminLayout'
import AdminDashboardPage from './admin-panel/AdminDashboard'
import UsersListPage from './admin-panel/UsersList'
import DriversListPage from './admin-panel/DriversList'
import OrdersListPage from './admin-panel/OrdersList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="create-delivery" element={<CreateDeliveryPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="orders" element={<OrderHistoryPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>

      <Route path="/driver" element={<DriverLayout />}>
        <Route index element={<DriverLoginPage />} />
        <Route path="requests" element={<IncomingRequestsPage />} />
        <Route path="status" element={<DriverOrderStatusPage />} />
        <Route path="map" element={<DriverMapPage />} />
        <Route path="earnings" element={<DriverEarningsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<UsersListPage />} />
        <Route path="drivers" element={<DriversListPage />} />
        <Route path="orders" element={<OrdersListPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
