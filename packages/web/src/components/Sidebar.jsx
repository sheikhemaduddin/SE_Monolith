import { LogoIcon, GridIcon, PackageIcon, ServerIcon } from './Icons'

const NAV = [
  { id: 'overview', label: 'Overview', icon: GridIcon },
  { id: 'products', label: 'Products', icon: PackageIcon },
  { id: 'api', label: 'API Status', icon: ServerIcon },
]

export default function Sidebar({ active, onNavigate, connected, apiUrl }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <LogoIcon />
        </div>
        <div className="brand-text">
          <h1>Nexus</h1>
          <span>Monorepo Dashboard</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item${active === id ? ' active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="connection-badge">
          <span className={`status-dot${connected ? '' : ' offline'}`} />
          {connected ? 'API connected' : 'API offline'}
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-faint)', marginTop: '0.35rem', wordBreak: 'break-all' }}>
          {apiUrl}
        </div>
      </div>
    </aside>
  )
}
