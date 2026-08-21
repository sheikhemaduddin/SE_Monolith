import { AlertIcon, ActivityIcon } from './Icons'

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function OrdersPanel({ orders, loading, error }) {
  if (loading) {
    return (
      <div className="orders-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-order" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="empty-state">
        <AlertIcon />
        <h4>Could not load orders</h4>
        <p>{error}</p>
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div className="empty-state">
        <ActivityIcon />
        <h4>No orders found</h4>
        <p>The API returned an empty order list.</p>
      </div>
    )
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <article key={order.id} className="order-card">
          <div className="order-main">
            <div className="order-id">{order.id}</div>
            <div className="order-customer">{order.customer}</div>
            <div className="order-meta">
              {order.items} item{order.items === 1 ? '' : 's'} · {formatDate(order.createdAt)}
            </div>
          </div>
          <div className="order-side">
            <span className={`order-status status-${order.status}`}>{order.status}</span>
            <div className="order-total">
              <span>$</span>
              {order.total.toFixed(2)}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
