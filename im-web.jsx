// im-web.jsx — Web Dashboard panel for Inspection Module

const { useState: useIWS, useRef: useIWR, useEffect: useIWE } = React;

/* ——— Car View Selector Icons (small thumbnails) ——— */
function IMCarViewIcon({ view, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      width:42, height:42, borderRadius:'50%', border: active ? '2px solid #1e293b' : '2px solid #e2e8f0',
      background: active ? '#f1f5f9' : '#fff', cursor:'pointer', display:'grid', placeItems:'center',
      transition:'all 0.15s ease', overflow:'hidden', padding:4,
    }}>
      <img src={`images/car-${view}.svg`} alt={view} style={{ width:'100%', height:'100%', objectFit:'contain', opacity: active ? 1 : 0.5 }} />
    </div>
  );
}

/* ——— Check Icon ——— */
function IMCheck({ checked, color }) {
  if (checked) return (
    <div style={{ width:24, height:24, borderRadius:'50%', background: color || '#22c55e', display:'grid', placeItems:'center', flexShrink:0 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
    </div>
  );
  return (
    <div style={{ width:24, height:24, borderRadius:'50%', background:'#94a3b8', display:'grid', placeItems:'center', flexShrink:0 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </div>
  );
}

/* ——— Photo Placeholder ——— */
function IMPhotoPlaceholder({ size }) {
  const s = size || 100;
  return (
    <div style={{ width:s, height:s, borderRadius:8, background:'#e2e8f0', display:'grid', placeItems:'center', flexShrink:0 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8.5" cy="11" r="2.5"/><path d="M14 10l3.5 3.5L22 9v11H2V17l4-4 4 4"/>
      </svg>
    </div>
  );
}

/* ——— Web Dashboard ——— */
function IMWebDashboard() {
  const [carView, setCarView] = useIWS('front');
  const [selLogIdx, setSelLogIdx] = useIWS(0);

  return (
    <div style={{
      border:'1px solid #dce1e8', borderRadius:16, overflow:'hidden',
      background:'#fff', boxShadow:'0 6px 32px -8px rgba(30,41,59,.1),0 1px 2px rgba(0,0,0,.04)',
      display:'flex', flexDirection:'column', height:680,
    }}>
      {/* Browser Chrome */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', borderBottom:'1px solid #e2e8f0', background:'#f8fafc' }}>
        <div style={{ display:'flex', gap:6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width:11, height:11, borderRadius:'50%', background:'#e0e0e3' }}></span>)}
        </div>
        <span style={{ fontSize:12.5, fontWeight:700, color:'#94a3b8', marginLeft:6 }}>Inspection — Vehicle Detail</span>
      </div>

      {/* Header Bar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', borderBottom:'1px solid #f0f0f0', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5"><path d="M5 17h14M3 12h1m16 0h1M5.6 5.6l.7.7m12.1-.7l-.7.7"/><rect x="4" y="12" width="16" height="6" rx="2"/><circle cx="7.5" cy="18" r="2"/><circle cx="16.5" cy="18" r="2"/><path d="M6 12l2-5h8l2 5"/></svg>
          <span style={{ fontSize:15, fontWeight:800, color:'#1e293b' }}>SKMC Camry 26635</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button style={{ background:'#dc2626', color:'#fff', border:'none', padding:'7px 14px', borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:5 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
            MOVE TO SERVICING
          </button>
          <button style={{ width:34, height:34, borderRadius:8, background:'#2563eb', border:'none', color:'#fff', cursor:'pointer', display:'grid', placeItems:'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        {/* LEFT PANEL */}
        <div style={{ width:'45%', display:'flex', flexDirection:'column', borderRight:'1px solid #e2e8f0', overflow:'hidden' }}>

          {/* Car Diagram Viewer */}
          <div style={{ padding:16, display:'flex', flexDirection:'column', alignItems:'center', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
            <div style={{ position:'relative', width:'100%', height:200, display:'flex', alignItems:'center', justifyContent:'center', background:'#fafbfc', borderRadius:12, marginBottom:12 }}>
              {/* Navigation arrows */}
              <button onClick={() => { const idx = IM_CAR_VIEWS.indexOf(carView); setCarView(IM_CAR_VIEWS[(idx - 1 + 5) % 5]); }}
                style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', width:32, height:32, borderRadius:'50%', border:'2px solid #cbd5e1', background:'#fff', cursor:'pointer', display:'grid', placeItems:'center', zIndex:5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              <img src={`images/car-${carView}.png`} alt={carView} style={{ maxWidth:'80%', maxHeight:'85%', objectFit:'contain' }} />

              {/* Red damage circles for front view */}
              {carView === 'front' && (
                <>
                  <div style={{ position:'absolute', left:'18%', top:'30%', width:70, height:70, borderRadius:'50%', border:'2px solid #ef4444', opacity:0.5 }}></div>
                  <div style={{ position:'absolute', right:'22%', top:'35%', width:60, height:60, borderRadius:'50%', border:'2px solid #ef4444', opacity:0.5 }}></div>
                </>
              )}

              <button onClick={() => { const idx = IM_CAR_VIEWS.indexOf(carView); setCarView(IM_CAR_VIEWS[(idx + 1) % 5]); }}
                style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', width:32, height:32, borderRadius:'50%', border:'2px solid #cbd5e1', background:'#fff', cursor:'pointer', display:'grid', placeItems:'center', zIndex:5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* View Selector Icons */}
            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              {IM_CAR_VIEWS.map(v => (
                <IMCarViewIcon key={v} view={v} active={carView === v} onClick={() => setCarView(v)} />
              ))}
            </div>
          </div>

          {/* Inspection Logs Table */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderBottom:'1px solid #f0f0f0', flexShrink:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#1e293b' }}>Inspection Logs</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <div style={{ flex:1, overflowY:'auto' }}>
              {IM_LOGS.map((log, i) => (
                <div key={i} onClick={() => setSelLogIdx(i)} style={{
                  display:'flex', alignItems:'center', padding:'9px 14px', cursor:'pointer',
                  background: selLogIdx === i ? '#dbeafe' : i % 2 === 0 ? '#fff' : '#fafbfc',
                  borderBottom:'1px solid #f5f5f5', transition:'background 0.12s',
                  borderLeft: selLogIdx === i ? '3px solid #2563eb' : '3px solid transparent',
                }}>
                  <span style={{ fontSize:11.5, color:'#475569', width:'52%', whiteSpace:'nowrap' }}>{log.date}</span>
                  <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:11.5, fontWeight:600, color:'#1e293b', width:'35%' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>
                    {log.inspector}
                  </span>
                  <span style={{ fontSize:12, fontWeight:700, color:'#1e293b', width:'13%', textAlign:'right' }}>{log.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width:'55%', overflowY:'auto', padding:16 }}>

          {/* Inspection Report Header */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <span style={{ fontSize:15, fontWeight:800, color:'#1360EF' }}>Inspection Report</span>
            <button style={{ width:30, height:30, borderRadius:6, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', display:'grid', placeItems:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </button>
          </div>

          {/* Mandatory Checklist */}
          <div style={{ marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', marginBottom:8 }}>
              <span style={{ fontSize:13, fontWeight:800, color:'#1e293b', flex:1 }}>Mandatory</span>
              <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', width:60, textAlign:'center' }}>Prev</span>
              <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', width:60, textAlign:'center' }}>Current</span>
            </div>
            {IM_MANDATORY.map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #f5f5f5' }}>
                <span style={{ fontSize:12.5, color:'#475569', flex:1 }}>{item}</span>
                <div style={{ width:60, display:'flex', justifyContent:'center' }}>
                  <IMCheck checked={IM_CHECKLIST_PREV[item]} color="#94a3b8" />
                </div>
                <div style={{ width:60, display:'flex', justifyContent:'center' }}>
                  <IMCheck checked={IM_CHECKLIST_CURRENT[item]} color="#22c55e" />
                </div>
              </div>
            ))}
            {/* Two empty rows */}
            {[0,1].map(i => (
              <div key={'empty'+i} style={{ display:'flex', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #f5f5f5' }}>
                <span style={{ flex:1 }}></span>
                <div style={{ width:60, textAlign:'center', fontSize:12, color:'#cbd5e1', fontWeight:600 }}>— —</div>
                <div style={{ width:60, textAlign:'center', fontSize:12, color:'#cbd5e1', fontWeight:600 }}>— —</div>
              </div>
            ))}
          </div>

          {/* Optional Checklist */}
          <div style={{ marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', marginBottom:8 }}>
              <span style={{ fontSize:13, fontWeight:800, color:'#1e293b', flex:1 }}>Optional</span>
              <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', width:60, textAlign:'center' }}>Prev</span>
              <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', width:60, textAlign:'center' }}>Current</span>
            </div>
            {IM_OPTIONAL.map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #f5f5f5' }}>
                <span style={{ fontSize:12.5, color:'#475569', flex:1 }}>{item}</span>
                <div style={{ width:60, display:'flex', justifyContent:'center' }}>
                  <IMCheck checked={IM_CHECKLIST_PREV[item]} color="#94a3b8" />
                </div>
                <div style={{ width:60, display:'flex', justifyContent:'center' }}>
                  <IMCheck checked={IM_CHECKLIST_CURRENT[item]} color="#22c55e" />
                </div>
              </div>
            ))}
          </div>

          {/* Scratches/Dents */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:800, color:'#1e293b', marginBottom:8 }}>Scratches/Dents</div>
            {IM_SCRATCHES.map((s, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'#f8fafc', borderRadius:10, marginBottom:6, border:'1px solid #f0f0f0' }}>
                <div style={{ width:36, height:36, borderRadius:8, background:'#e2e8f0', display:'grid', placeItems:'center', flexShrink:0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5"><path d="M5 17h14M3 12h1m16 0h1"/><rect x="4" y="12" width="16" height="6" rx="2"/><circle cx="7.5" cy="18" r="1.5"/><circle cx="16.5" cy="18" r="1.5"/><path d="M6 12l2-5h8l2 5"/></svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#1e293b' }}>{s.type}</div>
                  <div style={{ fontSize:11, color:'#94a3b8' }}>{s.desc}</div>
                </div>
                <span style={{ padding:'4px 12px', borderRadius:6, background:'#2563eb', color:'#fff', fontSize:11, fontWeight:700 }}>{s.location}</span>
              </div>
            ))}
          </div>

          {/* Photos */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:800, color:'#1e293b', marginBottom:8 }}>Photos</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
              {[0,1,2,3,4,5].map(i => <IMPhotoPlaceholder key={i} size={'100%'} />)}
            </div>
          </div>

          {/* Driver Details */}
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:'#1e293b', marginBottom:8 }}>Driver Details</div>
            <div style={{ padding:14, background:'#f8fafc', borderRadius:10, border:'1px solid #f0f0f0' }}>
              <svg width="140" height="50" viewBox="0 0 140 50" style={{ display:'block', margin:'0 auto 6px' }}>
                <path d="M15 40 Q25 15 40 30 Q55 45 70 20 Q85 5 100 25 Q110 35 125 15" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <div style={{ textAlign:'center', fontSize:13, fontWeight:700, color:'#1e293b' }}>FEROZ KHEL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { IMWebDashboard, IMCheck, IMPhotoPlaceholder, IMCarViewIcon });
