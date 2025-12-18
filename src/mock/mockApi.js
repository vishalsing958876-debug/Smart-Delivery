import ordersSeed from './orders.json'
import usersSeed from './users.json'
import driversSeed from './drivers.json'
import messagesSeed from './messages.json'

const clone = (value) => JSON.parse(JSON.stringify(value))
const withLatency = (producer, latency = 350 + Math.random() * 400) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(clone(producer())), latency)
  })

let ordersDb = [...ordersSeed]
let messagesDb = [...messagesSeed]
const usersDb = [...usersSeed]
const driversDb = [...driversSeed]

export const mockLogin = async ({ email }) =>
  withLatency(() => {
    const found = usersDb.find((user) => user.email === email)
    if (!found) {
      throw new Error('Invalid credentials')
    }
    return found
  })

export const mockSignup = async ({ name, email, phone }) =>
  withLatency(() => {
    const exists = usersDb.some((user) => user.email === email)
    if (exists) {
      throw new Error('User already exists')
    }
    const newUser = {
      id: `USR-${usersDb.length + 1}`,
      name,
      email,
      phone,
      role: 'customer',
    }
    usersDb.push(newUser)
    return newUser
  })

export const mockFetchRecentOrders = async (customerId = 'USR-1') =>
  withLatency(() =>
    ordersDb.filter((order) => order.customerId === customerId).slice(0, 3),
  )

export const mockFetchOrders = async () => withLatency(() => ordersDb)

export const mockCreateOrder = async (payload) =>
  withLatency(() => {
    const newOrder = {
      ...payload,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Picked',
      eta: `${20 + Math.floor(Math.random() * 20)} mins`,
      createdAt: new Date().toISOString(),
      driverId: driversDb[Math.floor(Math.random() * driversDb.length)].id,
    }
    ordersDb = [newOrder, ...ordersDb]
    return newOrder
  })

export const mockPriceEstimate = async ({ distanceKm = 5, weight = 1 }) =>
  withLatency(() => {
    const baseFare = 49
    const distanceComponent = distanceKm * 12
    const weightComponent = weight * 8
    return Math.round(baseFare + distanceComponent + weightComponent)
  })

export const mockTrackOrder = async (orderId) =>
  withLatency(() => {
    const order = ordersDb.find((item) => item.id === orderId) || ordersDb[0]
    const driver = driversDb.find((d) => d.id === order.driverId)
    return {
      order,
      driver,
      timeline: ['Picked', 'In Transit', 'Delivered'].map((stage) => ({
        label: stage,
        completed:
          stage === 'Picked' ||
          (stage === 'In Transit' && order.status !== 'Picked') ||
          order.status === 'Delivered',
      })),
    }
  })

export const mockFetchChat = async () => withLatency(() => messagesDb)

export const mockSendMessage = async ({ text, sender = 'customer' }) =>
  withLatency(() => {
    const newMessage = {
      id: `MSG-${messagesDb.length + 1}`,
      sender,
      text,
      timestamp: new Date().toISOString(),
    }
    messagesDb = [...messagesDb, newMessage]
    return newMessage
  })

export const mockDriverLogin = async ({ phone }) =>
  withLatency(() => {
    const driver = driversDb.find((item) => item.id === phone || item.phone === phone)
    return driver ?? driversDb[0]
  })

export const mockFetchDriverRequests = async () =>
  withLatency(() =>
    ordersDb.filter((order) => ['Picked', 'In Transit'].includes(order.status)).slice(0, 3),
  )

export const mockFetchDrivers = async () => withLatency(() => driversDb)

export const mockFetchAdminOverview = async () =>
  withLatency(() => ({
    totalUsers: usersDb.length,
    totalDrivers: driversDb.length,
    activeOrders: ordersDb.filter((order) => order.status !== 'Delivered').length,
    earnings: driversDb.reduce((acc, driver) => acc + driver.earnings, 0),
    orders: ordersDb,
    users: usersDb,
    drivers: driversDb,
  }))

export const mockAssignDriver = async ({ orderId, driverId }) =>
  withLatency(() => {
    ordersDb = ordersDb.map((order) =>
      order.id === orderId ? { ...order, driverId, status: 'Picked' } : order,
    )
    return ordersDb.find((order) => order.id === orderId)
  })

