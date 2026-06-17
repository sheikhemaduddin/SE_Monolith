import { BoxIcon, AlertIcon } from './Icons'

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="empty-state">
        <AlertIcon />
        <h4>Could not load products</h4>
        <p>{error}</p>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="empty-state">
        <BoxIcon />
        <h4>No products found</h4>
        <p>The API returned an empty product list.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <article key={p.id} className="product-card">
          <div className="product-id">#{String(p.id).padStart(2, '0')}</div>
          <div className="product-name">{p.name}</div>
          <div className="product-price">
            <span>$</span>
            {p.price.toFixed(2)}
          </div>
        </article>
      ))}
    </div>
  )
}
