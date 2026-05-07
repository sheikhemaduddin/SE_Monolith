import { useState, useEffect } from 'react'

export default function App() {
  const [info, setInfo]       = useState(null)
  const [products, setProducts] = useState([])
  const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    fetch(`${API}/api/info`).then(r => r.json()).then(setInfo).catch(() => {})
    fetch(`${API}/api/products`).then(r => r.json()).then(d => setProducts(d.data || [])).catch(() => {})
  }, [])

  return (
    <div style={{fontFamily:'sans-serif',minHeight:'100vh',background:'#f0f4f8',padding:24}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <div style={{background:'#1D3557',color:'white',padding:'20px 28px',borderRadius:12,marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <h1 style={{margin:0,fontSize:20}}>⚡ Cloudways Monorepo</h1>
            <p style={{margin:'4px 0 0',fontSize:12,opacity:.7}}>packages/web — React Frontend</p>
          </div>
          <span style={{background:'#1D9E75',padding:'4px 12px',borderRadius:20,fontSize:12}}>✓ Online</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
          <div style={{background:'white',padding:20,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,.07)'}}>
            <h3 style={{margin:'0 0 12px',fontSize:13,color:'#888',textTransform:'uppercase'}}>API Info</h3>
            {info ? Object.entries(info).map(([k,v]) => (
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #f5f5f5',fontSize:13}}>
                <span style={{color:'#888'}}>{k}</span>
                <strong>{String(v)}</strong>
              </div>
            )) : <p style={{color:'#aaa',fontSize:13}}>Connecting to API at {API}...</p>}
          </div>

          <div style={{background:'white',padding:20,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,.07)'}}>
            <h3 style={{margin:'0 0 12px',fontSize:13,color:'#888',textTransform:'uppercase'}}>Products from API</h3>
            {products.length ? products.map(p => (
              <div key={p.id} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #f5f5f5',fontSize:13}}>
                <span>{p.name}</span>
                <strong style={{color:'#1D9E75'}}>${p.price}</strong>
              </div>
            )) : <p style={{color:'#aaa',fontSize:13}}>No products loaded</p>}
          </div>
        </div>

        <div style={{background:'#1a1a2e',borderRadius:12,padding:20,color:'#93c5fd',fontFamily:'monospace',fontSize:12}}>
          <div style={{marginBottom:8,color:'#888'}}>Monorepo structure:</div>
          <pre style={{margin:0,lineHeight:1.8}}>{`cloudways-monorepo/
├── package.json          ← root workspace
├── packages/
│   ├── api/              ← Express backend (deploy separately)
│   │   ├── src/index.js
│   │   └── package.json  @cloudways-monorepo/api
│   └── web/              ← React frontend (deploy separately)
│       ├── src/App.jsx
│       └── package.json  @cloudways-monorepo/web`}</pre>
        </div>
      </div>
    </div>
  )
}
