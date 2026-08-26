import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import StatsGrid from './components/StatsGrid'
import ProductGrid from './components/ProductGrid'
import ApiPanel from './components/ApiPanel'
import OrdersPanel from './components/OrdersPanel'
import { RefreshIcon } from './components/Icons'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3002'

const PAGES = {
  overview: {
    title: 'Dashboard',
    subtitle: 'Your monorepo at a glance — products, orders, and service health',
  },
  products: {
    title: 'Products',
    subtitle: 'Live catalog fetched from the Express API',
  },
  api: {
    title: 'API Status',
    subtitle: 'Backend health and configuration details',
  },
  orders: {
    title: 'Orders',
    subtitle: 'Recent orders fetched from GET /api/orders',
  },
}

export default function App() {
  const [page, setPage] = useState('overview')
  const [info, setInfo] = useState(null)
  const [health, setHealth] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)

    try {
      const [infoRes, productsRes, healthRes, ordersRes] = await Promise.all([
        fetch(`${API}/api/info`),
        fetch(`${API}/api/products`),
        fetch(`${API}/health`),
        fetch(`${API}/api/orders`),
      ])

      if (!infoRes.ok || !productsRes.ok || !ordersRes.ok) {
        throw new Error('API returned an error')
      }

      const [infoData, productsData, healthData, ordersData] = await Promise.all([
        infoRes.json(),
        productsRes.json(),
        healthRes.ok ? healthRes.json() : null,
        ordersRes.json(),
      ])

      setInfo(infoData)
      setProducts(productsData.data || [])
      setHealth(healthData)
      setOrders(ordersData.data || [])
    } catch {
      setInfo(null)
      setProducts([])
      setHealth(null)
      setOrders([])
      setError(`Unable to reach API at ${API}`)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const { title, subtitle } = PAGES[page]
  const connected = !loading && !!info

  return (
    <div className="app">
      <div className="bg-glow" />
      <Sidebar
        active={page}
        onNavigate={setPage}
        connected={connected}
        apiUrl={API}
      />

      <main className="main">
        <div className="main-inner">
          <header className="page-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </header>

          {(page === 'overview' || page === 'products') && (
            <StatsGrid info={info} products={products} orders={orders} loading={loading} />
          )}

          {page === 'overview' && (
            <>
              <section className="section">
                <div className="section-header">
                  <div>
                    <h3 className="section-title">Recent Products</h3>
                    <p className="section-subtitle">Showing first 4 from catalog</p>
                  </div>
                  <button
                    className={`refresh-btn${refreshing ? ' spinning' : ''}`}
                    onClick={() => fetchData(true)}
                    disabled={refreshing}
                  >
                    <RefreshIcon />
                    Refresh
                  </button>
                </div>
                <ProductGrid
                  products={products.slice(0, 4)}
                  loading={loading}
                  error={error}
                />
              </section>

              <section className="section">
                <div className="section-header">
                  <div>
                    <h3 className="section-title">API Configuration</h3>
                    <p className="section-subtitle">Backend service details</p>
                  </div>
                </div>
                <ApiPanel info={info} loading={loading} apiUrl={API} />
              </section>
            </>
          )}

          {page === 'products' && (
            <section className="section">
              <div className="section-header">
                <div>
                  <h3 className="section-title">All Products</h3>
                  <p className="section-subtitle">{products.length} items in catalog</p>
                </div>
                <button
                  className={`refresh-btn${refreshing ? ' spinning' : ''}`}
                  onClick={() => fetchData(true)}
                  disabled={refreshing}
                >
                  <RefreshIcon />
                  Refresh
                </button>
              </div>
              <ProductGrid products={products} loading={loading} error={error} />
            </section>
          )}

          {page === 'api' && (
            <>
              <section className="section">
                <div className="section-header">
                  <div>
                    <h3 className="section-title">Service Health</h3>
                    <p className="section-subtitle">Express backend at packages/api</p>
                  </div>
                  <button
                    className={`refresh-btn${refreshing ? ' spinning' : ''}`}
                    onClick={() => fetchData(true)}
                    disabled={refreshing}
                  >
                    <RefreshIcon />
                    Refresh
                  </button>
                </div>
                <ApiPanel info={info} loading={loading} apiUrl={API} />
              </section>

              <section className="section">
                <div className="section-header">
                  <div>
                    <h3 className="section-title">Live Health Check</h3>
                    <p className="section-subtitle">Response from GET /health</p>
                  </div>
                </div>
                <div className="api-panel">
                  <div className="api-panel-header">
                    <h3>Uptime & Status</h3>
                    {health?.status === 'ok' && (
                      <span className="env-tag ok-tag">healthy</span>
                    )}
                  </div>
                  <div className="api-rows">
                    {loading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="api-row">
                          <div className="skeleton skeleton-row" />
                          <div className="skeleton skeleton-row" style={{ width: '30%' }} />
                        </div>
                      ))
                    ) : health ? (
                      <>
                        <div className="api-row">
                          <span className="api-row-key">Status</span>
                          <span className="api-row-value ok">{health.status}</span>
                        </div>
                        <div className="api-row">
                          <span className="api-row-key">Service</span>
                          <span className="api-row-value">{health.service}</span>
                        </div>
                        <div className="api-row">
                          <span className="api-row-key">Uptime</span>
                          <span className="api-row-value">
                            {Math.floor(health.uptime)}s
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="empty-state" style={{ padding: '2rem' }}>
                        <h4>Health check unavailable</h4>
                        <p>Could not reach {API}/health</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}

          {page === 'orders' && (
            <section className="section">
              <div className="section-header">
                <div>
                  <h3 className="section-title">Recent Orders</h3>
                  <p className="section-subtitle">{orders.length} orders from /api/orders</p>
                </div>
                <button
                  className={`refresh-btn${refreshing ? ' spinning' : ''}`}
                  onClick={() => fetchData(true)}
                  disabled={refreshing}
                >
                  <RefreshIcon />
                  Refresh
                </button>
              </div>
              <OrdersPanel orders={orders} loading={loading} error={error} />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
