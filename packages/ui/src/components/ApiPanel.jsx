export default function ApiPanel({ info, loading, apiUrl }) {
  if (loading) {
    return (
      <div className="api-panel">
        <div className="api-panel-header">
          <h3>API Configuration</h3>
        </div>
        <div className="api-rows">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="api-row">
              <div className="skeleton skeleton-row" />
              <div className="skeleton skeleton-row" style={{ width: '30%' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!info) {
    return (
      <div className="api-panel">
        <div className="api-panel-header">
          <h3>API Configuration</h3>
        </div>
        <div className="empty-state" style={{ padding: '2rem' }}>
          <h4>API unreachable</h4>
          <p>Could not connect to {apiUrl}</p>
        </div>
      </div>
    )
  }

  const rows = [
    { key: 'Service', value: info.name },
    { key: 'Package', value: info.package },
    { key: 'Node', value: info.nodeVersion },
    { key: 'Environment', value: info.env },
    { key: 'API Secret', value: info.apiSecret, ok: info.apiSecret === 'set ✓' },
    { key: 'Endpoint', value: apiUrl },
  ]

  return (
    <div className="api-panel">
      <div className="api-panel-header">
        <h3>API Configuration</h3>
        <span className="env-tag">{info.env}</span>
      </div>
      <div className="api-rows">
        {rows.map(({ key, value, ok }) => (
          <div key={key} className="api-row">
            <span className="api-row-key">{key}</span>
            <span className={`api-row-value${ok ? ' ok' : ''}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
