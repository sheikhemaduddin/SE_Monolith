import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import StatsGrid from './components/StatsGrid'
import ProductGrid from './components/ProductGrid'
import ApiPanel from './components/ApiPanel'
import { RefreshIcon } from './components/Icons'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const PAGES = {
  overview: {
    title: 'Overview',
    subtitle: 'Real-time snapshot of your monorepo services',
  },
  products: {
    title: 'Products',
    subtitle: 'Live catalog fetched from the Express API',
  },
  api: {
    title: 'API Status',
    subtitle: 'Backend health and configuration details',
  },
}

export default function App() {
  const [page, setPage] = useState('overview')
  const [info, setInfo] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)

    try {
      const [infoRes, productsRes] = await Promise.all([
        fetch(`${API}/api/info`),
        fetch(`${API}/api/products`),
      ])

      if (!infoRes.ok || !productsRes.ok) throw new Error('API returned an error')

      const [infoData, productsData] = await Promise.all([
        infoRes.json(),
        productsRes.json(),
      ])

      setInfo(infoData)
      setProducts(productsData.data || [])
    } catch {
      setInfo(null)
      setProducts([])
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
            <StatsGrid info={info} products={products} loading={loading} />
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
          )}
        </div>
      </main>
    </div>
  )
}
