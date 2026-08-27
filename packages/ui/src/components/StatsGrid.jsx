import { PackageIcon, ActivityIcon, CodeIcon, ServerIcon } from './Icons'

export default function StatsGrid({ info, products, orders, loading }) {
  const cards = [
    {
      label: 'Total Products',
      value: loading ? null : String(products.length),
      icon: PackageIcon,
      color: 'purple',
    },
    {
      label: 'Total Orders',
      value: loading ? null : String(orders.length),
      icon: ActivityIcon,
      color: 'blue',
    },
    {
      label: 'API Status',
      value: loading ? null : info ? 'Healthy' : 'Offline',
      icon: ServerIcon,
      color: 'green',
    },
    {
      label: 'Environment',
      value: loading ? null : info?.env || '—',
      icon: CodeIcon,
      color: 'amber',
      small: true,
    },
  ]

  return (
    <div className="stats-grid">
      {cards.map(({ label, value, icon: Icon, color, small }) => (
        <div key={label} className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">{label}</span>
            <div className={`stat-icon ${color}`}>
              <Icon />
            </div>
          </div>
          {value === null ? (
            <div className="skeleton skeleton-stat" />
          ) : (
            <div className={`stat-value${small ? ' small' : ''}`}>{value}</div>
          )}
        </div>
      ))}
    </div>
  )
}
