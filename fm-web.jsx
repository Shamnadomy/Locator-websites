// fm-web.jsx — Web Dashboard for Fleet Manager Module

const { useState: useFMS, useEffect: useFME } = React;

/* ——— SVG Donut Chart ——— */
function FMDonut({ values, colors }) {
  const r = 17, cx = 22, cy = 22, sw = 7;
  const circ = 2 * Math.PI * r;
  const total = values.reduce((a, b) => a + b, 0) || 1;
  let off = 0;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={sw} />
      {values.map((v, i) => {
        if (!v) return null;
        const d = (v / total) * circ;
        const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={colors[i]}
          strokeWidth={sw} strokeDasharray={`${d} ${circ - d}`} strokeDashoffset={-off}
          transform="rotate(-90 22 22)" />;
        off += d;
        return el;
      })}
    </svg>
  );
}

/* ——— Car outline SVG ——— */
function FMCarSvg() {
  return (
    <svg width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="#64748b" strokeWidth="1" strokeLinejoin="round">
      <rect x="2" y="10" width="32" height="5" rx="2" /><circle cx="9" cy="16" r="2.5" /><circle cx="27" cy="16" r="2.5" />
      <path d="M6 10l3-5h18l3 5" /><path d="M14 5h8" strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}

/* ——— Speed line decoration ——— */
function FMSpeedLine() {
  return (
    <svg width="56" height="14" viewBox="0 0 56 14" style={{ opacity: 0.22, marginTop: 1 }}>
      <path d="M2 10Q9 2 16 7Q23 12 30 4Q37 0 44 6Q49 9 54 4" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ——— Stat icon helpers ——— */
function FMIconCal({ color }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}
function FMIconTimer({ color }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M12 5V3" /></svg>;
}
function FMIconCheck({ color }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>;
}
function FMIconDoc({ color }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" /></svg>;
}

/* ——— Main Dashboard ——— */
function FMWebDashboard() {
  const [topTab, setTopTab] = useFMS('reminder');
  const [subTab, setSubTab] = useFMS('service');
  const [expandedRow, setExpandedRow] = useFMS(null);
  const [selectedRow, setSelectedRow] = useFMS(null);
  const [hoverRow, setHoverRow] = useFMS(null);
  const [hoverStat, setHoverStat] = useFMS(null);
  const [hoverTopTab, setHoverTopTab] = useFMS(null);

  useFME(() => {
    setSubTab(topTab === 'reminder' ? 'service' : 'services');
    setExpandedRow(null);
    setSelectedRow(null);
    setHoverRow(null);
  }, [topTab]);

  /* ——— Sub-tab definitions ——— */
  const subTabDefs = topTab === 'reminder'
    ? [{ key:'service', label:'SERVICE REMINDER', inBg:'#dbeafe', inColor:'#1e40af' },
       { key:'documents', label:'DOCUMENTS REMINDER', inBg:'#dcfce7', inColor:'#166534' }]
    : [{ key:'services', label:'SERVICES', inBg:'#dbeafe', inColor:'#1e40af' },
       { key:'fuel', label:'FUEL', inBg:'#dcfce7', inColor:'#166534' },
       { key:'other', label:'OTHER EXPENSE', inBg:'#fef3c7', inColor:'#92400e' }];

  /* ——— Per-subtab configuration ——— */
  let title, vName, donut, stats, hType, tCost, cols, rows, rActs, pgn;

  const bgM = { red:'#fef2f2', orange:'#fffbeb', green:'#f0fdf4' };
  const txM = { red:'#dc2626', orange:'#f59e0b', green:'#22c55e' };

  if (subTab === 'service') {
    title = 'Service Reminder'; vName = FM_VEHICLE; hType = 'reminder';
    donut = { v:[1,0,0], c:['#dc2626','#f59e0b','#22c55e'] };
    stats = [{ l:'Due', n:1, c:'red', I:FMIconCal }, { l:'0-500 KM', n:0, c:'orange', I:FMIconTimer }, { l:'500-1000 KM', n:0, c:'green', I:FMIconCheck }];
    cols = ['Service Name','Previous Odometer','Periodic Odometer','Current Odometer'];
    rows = FM_SERVICE_REMINDERS.map(r => ({ cells:[r.name, r.prevOdo, r.periodic, r.currentOdo], overdue:r.overdue, hlIdx:r.overdue?2:-1, comments:r.comments }));
    rActs = ['Renew','Edit','History'];
    pgn = `showing 1-${FM_SERVICE_REMINDERS.length} of ${FM_SERVICE_REMINDERS.length} items`;
  } else if (subTab === 'documents') {
    title = 'Documents Reminder'; vName = FM_VEHICLE; hType = 'reminder';
    donut = { v:[1,0,1], c:['#dc2626','#f59e0b','#22c55e'] };
    stats = [{ l:'Expired', n:1, c:'red', I:FMIconCal }, { l:'In 7 Days', n:0, c:'orange', I:FMIconTimer }, { l:'In 30 Days', n:1, c:'green', I:FMIconCheck }];
    cols = ['Document Type','Expiry Date','Reminder Interval'];
    rows = FM_DOC_REMINDERS.map(r => ({ cells:[r.type, r.expiry, r.interval], overdue:r.expired, hlIdx:r.expired?1:-1, comments:r.comments }));
    rActs = ['Edit','Attach','History'];
    pgn = `showing 1-${FM_DOC_REMINDERS.length} of ${FM_DOC_REMINDERS.length} items`;
  } else if (subTab === 'services') {
    title = 'Service Entry'; vName = FM_VEHICLE; hType = 'expenditure'; tCost = 0;
    stats = [{ l:'June', n:0, c:'red', I:FMIconDoc }, { l:'May', n:0, c:'orange', I:FMIconDoc }, { l:'April', n:0, c:'green', I:FMIconDoc }];
    cols = ['Service Name','Date','Odometer','Total cost'];
    rows = FM_SERVICE_ENTRIES.map(r => ({ cells:[r.name, r.date, r.odometer, r.cost], comments:r.comments }));
    rActs = ['Edit','Attach'];
    pgn = `showing 1-${FM_SERVICE_ENTRIES.length} of ${FM_SERVICE_ENTRIES.length} items`;
  } else if (subTab === 'fuel') {
    title = 'Fuel Entry'; vName = FM_VEHICLE; hType = 'expenditure'; tCost = 0;
    stats = [{ l:'June', n:0, c:'red', I:FMIconDoc }, { l:'May', n:0, c:'orange', I:FMIconDoc }, { l:'April', n:0, c:'green', I:FMIconDoc }];
    cols = ['Date','Odometer','Quantity (Ltr)','Rate (AED)','Total Cost'];
    rows = FM_FUEL_ENTRIES.map(r => ({ cells:[r.date, r.odometer, r.qty, r.rate, r.cost] }));
    rActs = ['Edit','Delete'];
    pgn = `showing 1-${FM_FUEL_ENTRIES.length} of ${FM_FUEL_ENTRIES.length} items`;
  } else {
    title = 'Other Expense Entry'; vName = FM_VEHICLE_ALT; hType = 'expenditure'; tCost = 0;
    stats = [{ l:'June', n:0, c:'red', I:FMIconDoc }, { l:'May', n:0, c:'orange', I:FMIconDoc }, { l:'April', n:0, c:'green', I:FMIconDoc }];
    cols = ['Expense Type','Date','Amount (AED)','Description'];
    rows = FM_OTHER_EXPENSES.map(r => ({ cells:[r.type, r.date, r.amount, r.desc] }));
    rActs = ['Edit','Delete'];
    pgn = `showing 1-${FM_OTHER_EXPENSES.length} of ${FM_OTHER_EXPENSES.length} items`;
  }

  /* ——— Action icon map ——— */
  const actIcon = (a) => {
    if (a === 'Renew') return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M20.49 15A9 9 0 115.64 5.64L1 10"/></svg>;
    if (a === 'Edit') return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z"/></svg>;
    if (a === 'History') return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    if (a === 'Attach') return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.49"/></svg>;
    if (a === 'Delete') return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>;
    return null;
  };

  return (
    <div style={{
      border:'1px solid #dce1e8', borderRadius:16, overflow:'hidden',
      background:'#fff', boxShadow:'0 6px 32px -8px rgba(30,41,59,.1),0 1px 2px rgba(0,0,0,.04)',
      display:'flex', flexDirection:'column', height:580,
    }}>
      {/* ——— Browser Chrome ——— */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', borderBottom:'1px solid #e2e8f0', background:'#f8fafc', flexShrink:0 }}>
        <div style={{ display:'flex', gap:6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width:11, height:11, borderRadius:'50%', background:'#e0e0e3' }}></span>)}
        </div>
        <span style={{ fontSize:12.5, fontWeight:700, color:'#94a3b8', marginLeft:6 }}>Fleet Manager — Vehicle Detail</span>
      </div>

      {/* ——— Top-Level Tabs ——— */}
      <div style={{ padding:'6px 16px 4px', flexShrink:0 }}>
        <div style={{ display:'flex', background:'#e8edf2', borderRadius:10, padding:3 }}>
          {[{ k:'reminder', l:'Reminder', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> },
            { k:'expenditure', l:'Fleet Expenditure', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4M8 18h4"/></svg> }
          ].map(t => {
            const act = topTab === t.k;
            return (
              <button key={t.k} onClick={() => setTopTab(t.k)}
                onMouseEnter={() => setHoverTopTab(t.k)} onMouseLeave={() => setHoverTopTab(null)}
                style={{
                flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                padding:'7px 10px', borderRadius:8, border:'none', cursor:'pointer', fontFamily:'inherit',
                background: act ? 'rgba(59,130,246,0.15)' : hoverTopTab === t.k ? 'rgba(59,130,246,0.07)' : 'transparent',
                color: act ? '#2563eb' : hoverTopTab === t.k ? '#3b82f6' : '#6b7280',
                fontSize:12.5, fontWeight:600, position:'relative',
                boxShadow: act ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                transition:'background 0.15s ease, color 0.15s ease',
              }}>
                {t.icon}{t.l}
                {act && <div style={{ position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50)', width:0, height:0, borderLeft:'5px solid transparent', borderRight:'5px solid transparent', borderTop:'5px solid rgba(59,130,246,0.15)' }}></div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ——— Sub-Tabs ——— */}
      <div style={{ display:'flex', gap:4, padding:'4px 16px 6px', flexShrink:0 }}>
        {subTabDefs.map(st => {
          const act = subTab === st.key;
          return (
            <button key={st.key} onClick={() => { setSubTab(st.key); setExpandedRow(null); }} style={{
              flex:1, padding:'7px 6px', borderRadius:6, border:'none', cursor:'pointer', fontFamily:'inherit',
              background: act ? '#2563eb' : st.inBg, color: act ? '#fff' : st.inColor,
              fontSize:10.5, fontWeight:700, letterSpacing:'0.03em', position:'relative',
            }}>
              {st.label}
              {act && <div style={{ position:'absolute', bottom:-4, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'4px solid transparent', borderRight:'4px solid transparent', borderTop:'4px solid #2563eb' }}></div>}
            </button>
          );
        })}
      </div>

      {/* ——— Content Area ——— */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#eef3fb' }}>

        {/* Section Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 16px', flexShrink:0 }}>
          <span style={{ fontSize:14, fontWeight:600, color:'#475569' }}>{title}</span>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            {hType === 'reminder' ? (
              <>
                {[{l:'Reminders', ic:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>},
                  {l:'Add New', ic:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>},
                  {l:'History', ic:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                ].map(b => (
                  <button key={b.l}
                    onMouseEnter={e => { e.currentTarget.style.background='#f0f5ff'; e.currentTarget.style.borderColor='#bfdbfe'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.borderColor='#e2e8f0'; }}
                    style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', borderRadius:6, border:'1px solid #e2e8f0', background:'#fff', color:'#475569', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', transition:'background 0.12s ease, border-color 0.12s ease' }}>
                    {b.ic}{b.l}
                  </button>
                ))}
              </>
            ) : (
              <>
                <span style={{ fontSize:12, fontWeight:700, color:'#2563eb' }}>Total Cost : {tCost}</span>
                <button style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', borderRadius:6, border:'1px solid #e2e8f0', background:'#fff', color:'#475569', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
                  Add New
                </button>
                <button style={{ width:26, height:26, borderRadius:6, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', display:'grid', placeItems:'center', fontSize:14, fontWeight:800, color:'#475569' }}>⋮</button>
              </>
            )}
          </div>
        </div>

        {/* Vehicle Bar */}
        <div style={{ display:'flex', alignItems:'center', padding:'6px 16px 8px', gap:10, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:180 }}>
            <FMCarSvg />
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:'#1e293b' }}>{vName}</div>
              <FMSpeedLine />
            </div>
          </div>
          {donut && (
            <div style={{ display:'flex', alignItems:'center', gap:2, flexShrink:0 }}>
              <div style={{ position:'relative' }}>
                <div style={{ position:'absolute', top:-2, left:0, fontSize:9, fontWeight:700, color:'#64748b' }}>{donut.v[1]}</div>
                <FMDonut values={donut.v} colors={donut.c} />
                <div style={{ position:'absolute', top:-2, right:0, fontSize:9, fontWeight:700, color:'#64748b' }}>{donut.v[0]}</div>
                <div style={{ position:'absolute', bottom:-2, right:6, fontSize:9, fontWeight:700, color:'#64748b' }}>{donut.v[2]}</div>
              </div>
            </div>
          )}
          <div style={{ display:'flex', gap:8, marginLeft:'auto' }}>
            {stats.map((s, i) => (
              <div key={i}
                onMouseEnter={() => setHoverStat(i)} onMouseLeave={() => setHoverStat(null)}
                style={{
                  textAlign:'center', padding:'6px 14px', borderRadius:8, background:bgM[s.c], minWidth:75,
                  cursor:'pointer', transition:'transform 0.15s ease, box-shadow 0.15s ease',
                  transform: hoverStat === i ? 'translateY(-2px)' : 'none',
                  boxShadow: hoverStat === i ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:1 }}><s.I color={txM[s.c]} /></div>
                <div style={{ fontSize:11, fontWeight:600, color:'#475569' }}>{s.l}</div>
                <div style={{ fontSize:16, fontWeight:800, color:txM[s.c] }}>{s.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Area (scrollable) */}
        <div style={{ flex:1, overflowY:'auto', padding:'0 16px 6px' }}>
          {rows.map((row, ri) => {
            const isSel = selectedRow === ri;
            const isHov = hoverRow === ri;
            const rowBg = isSel ? '#EAF1FF' : isHov ? '#f0f5ff' : row.overdue ? '#fef2f2' : '#fff';
            const rowBorder = isSel ? '1px solid #bfdbfe' : row.overdue ? '1px solid #fecaca' : isHov ? '1px solid #c7d2fe' : '1px solid #e8ecf2';
            return (
            <div key={ri}
              onClick={() => setSelectedRow(isSel ? null : ri)}
              onMouseEnter={() => setHoverRow(ri)} onMouseLeave={() => setHoverRow(null)}
              style={{
              background: rowBg,
              borderLeft: row.overdue ? '3px solid #dc2626' : isSel ? '3px solid #2563eb' : '3px solid transparent',
              borderRadius:8, marginBottom:6, padding:'10px 12px',
              border: rowBorder,
              borderLeftWidth:3, borderLeftColor: row.overdue ? '#dc2626' : isSel ? '#2563eb' : 'transparent',
              cursor:'pointer', transition:'background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
              boxShadow: isHov && !isSel ? '0 2px 8px rgba(0,0,0,0.06)' : isSel ? '0 2px 10px rgba(37,99,235,0.1)' : 'none',
            }}>
              {/* Row data */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:6 }}>
                <div style={{ flex:1, display:'grid', gridTemplateColumns:`repeat(${cols.length}, 1fr)`, gap:8 }}>
                  {cols.map((col, ci) => (
                    <div key={ci}>
                      <div style={{ fontSize:9.5, color:'#94a3b8', fontWeight:600, marginBottom:1, fontStyle:'italic' }}>{col}</div>
                      <div style={{ fontSize:12, fontWeight:700, color: row.hlIdx === ci ? '#dc2626' : '#1e293b' }}>
                        {row.cells[ci]}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', gap:6, alignItems:'center', flexShrink:0, paddingTop:10 }}>
                  {rActs.map(a => (
                    <button key={a}
                      onMouseEnter={e => { e.currentTarget.style.background = a === 'Delete' ? '#fef2f2' : '#eff6ff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      style={{
                      display:'flex', alignItems:'center', gap:3, padding:'3px 6px', borderRadius:4,
                      border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit',
                      color: a === 'Delete' ? '#dc2626' : '#2563eb', fontSize:11, fontWeight:600,
                      transition:'background 0.12s ease',
                    }}>
                      {actIcon(a)}{a !== 'Attach' && a}
                    </button>
                  ))}
                </div>
              </div>
              {/* Comments */}
              {(row.comments !== undefined) && (
                <div style={{ marginTop:4, display:'flex', alignItems:'center', gap:6 }}>
                  <span onClick={() => setExpandedRow(expandedRow === ri ? null : ri)}
                    style={{ fontSize:10.5, color:'#2563eb', cursor:'pointer', fontWeight:600 }}>Comments</span>
                  {expandedRow !== ri && <span style={{ fontSize:10.5, color:'#94a3b8' }}>...</span>}
                  {expandedRow === ri && row.comments && (
                    <span style={{ fontSize:11, color:'#475569' }}>{row.comments}</span>
                  )}
                </div>
              )}
            </div>
          );
          })}
          {rows.length === 0 && (
            <div style={{ padding:28, fontSize:14, color:'#2563eb', fontWeight:600, textAlign:'center' }}>
              No entries found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7px 16px', borderTop:'1px solid #e0e4ec', flexShrink:0, background:'#f6f8fc' }}>
          <div style={{ display:'flex', gap:10 }}>
            {['First','Previous','Next','Last'].map(p => (
              <span key={p} style={{ fontSize:11, color:'#94a3b8', cursor:'pointer', fontWeight:500 }}>{p}</span>
            ))}
          </div>
          <span style={{ fontSize:11, color:'#2563eb', fontWeight:600, fontStyle:'italic' }}>{pgn}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FMWebDashboard });
