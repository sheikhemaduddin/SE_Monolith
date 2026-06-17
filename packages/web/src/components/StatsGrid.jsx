import { PackageIcon, ActivityIcon, CodeIcon, ServerIcon } from './Icons'

export default function StatsGrid({ info, products, loading }) {
  const cards = [
    {
      label: 'Total Products',
      value: loading ? null : String(products.length),
      icon: PackageIcon,
      color: 'purple',
    },
    {
      label: 'API Status',
      value: loading ? null : info ? 'Healthy' : 'Offline',
      icon: ActivityIcon,
      color: 'green',
    },
    {
      label: 'Environment',
      value: loading ? null : info?.env || '—',
      icon: ServerIcon,
      color: 'amber',
    },
    {
      label: 'Node Version',
      value: loading ? null : info?.nodeVersion || '—',
      icon: CodeIcon,
      color: 'blue',
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
