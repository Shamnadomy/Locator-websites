// tm-web.jsx — Web Dashboard panel for Task Manager Showcase

const { useState, useRef, useEffect } = React;

/* ——— Status Badge with Dropdown ——— */
function TMStatusBadge({ task, staffId, small }) {
  const { updateStatus } = useTM();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  const c = TM_STATUS_COLORS[task.status];
  return (
    <div ref={ref} style={{ position:'relative', zIndex: open ? 50 : 1 }}>
      <div className="tm-status" style={{ background:c.bg, color:c.text, fontSize: small?11:12 }}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:c.text, flexShrink:0 }}></span>
        {task.status}
      </div>
      {open && (
        <div className="tm-status-dropdown" onClick={e => e.stopPropagation()}>
          {['Assigned','In Progress','Completed'].map(s => {
            const sc = TM_STATUS_COLORS[s];
            return (
              <button key={s} className="tm-status-option"
                style={{ color:sc.text, fontWeight: s===task.status?700:500 }}
                onClick={() => { updateStatus(staffId, task.id, s); setOpen(false); }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:sc.text, flexShrink:0 }}></span>
                {s}
                {s===task.status && <span style={{ marginLeft:'auto', fontSize:13 }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ——— Staff Card ——— */
function TMStaffCard({ s, isSelected, onClick }) {
  const { stats: getStats } = useTM();
  const st = getStats(s);
  return (
    <div className={`tm-staff-card${isSelected?' selected':''}`} onClick={onClick}>
      <div className="tm-avatar" style={{ background:s.color }}>{s.initials}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:'#1360EF', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
          {s.name} <span style={{ color:'#22c55e', fontSize:10, fontWeight:600 }}>Active</span>
        </div>
        <div style={{ fontSize:10.5, color:'#94a3b8', fontFamily:'ui-monospace,monospace' }}>[{s.vehicle}]</div>
      </div>
      <div style={{ display:'flex', gap:3 }}>
        {[{v:st.total,bg:'#f1f5f9',c:'#475569'},{v:st.assigned,bg:'#ebf0ff',c:'#1360EF'},{v:st.inProgress,bg:'#fff5e6',c:'#d97706'},{v:st.completed,bg:'#e8faf0',c:'#16a34a'}].map((x,i) => (
          <div key={i} style={{ width:22, height:20, borderRadius:5, background:x.bg, color:x.c, display:'grid', placeItems:'center', fontSize:11, fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{x.v}</div>
        ))}
      </div>
    </div>
  );
}

/* ——— Task Row (wider horizontal layout) ——— */
function TMTaskRow({ task, staffId, isSelected, onClick }) {
  return (
    <div className={`tm-task-row${isSelected?' selected':''}`} onClick={onClick}
      style={ isSelected ? { background:'#EAF1FF', border:'2px dashed #CDD8EC', padding:'10px 12px' } : undefined }>
      <div style={{ display:'flex', flexDirection:'column', gap:6, width:'100%' }}>
        {/* Line 1: Badge + Job Description ... Date + Status */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div className="tm-task-badge">#{task.id}</div>
          <span style={{ fontSize:12, color:'#94a3b8', fontWeight:500 }}>Job Description : </span>
          <span style={{ fontSize:13, fontWeight:700, color:'#1e293b' }}>{task.desc}</span>
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <div style={{ fontSize:10.5, color:'#94a3b8', display:'flex', alignItems:'center', gap:4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              {task.assigned?.split(' ')[0]}
            </div>
            <TMStatusBadge task={task} staffId={staffId} />
          </div>
        </div>
        {/* Line 2: Sales Personal ... Completed Time */}
        <div style={{ display:'flex', alignItems:'center', gap:14, fontSize:11, color:'#94a3b8', paddingLeft:46 }}>
          <span><b style={{color:'#64748b'}}>Sales Personal :</b> {task.personnel}</span>
          {task.completed && (
            <span style={{ marginLeft:'auto' }}><b style={{color:'#64748b'}}>Completed Time :</b> {task.completed}</span>
          )}
        </div>
        {/* Line 3: Time Window ... Location */}
        <div style={{ display:'flex', alignItems:'center', gap:14, fontSize:11, color:'#94a3b8', paddingLeft:46 }}>
          <span><b style={{color:'#64748b'}}>Time Window :</b> {task.window}</span>
          <span style={{ marginLeft:'auto' }}><b style={{color:'#64748b'}}>Location :</b> {task.code}</span>
        </div>
      </div>
    </div>
  );
}

/* ——— Map Placeholder ——— */
function TMMapPlaceholder({ small }) {
  const h = small ? 70 : 90;
  return (
    <div style={{ width:'100%', height:h, borderRadius:10, background:'linear-gradient(135deg,#e8f0fe 0%,#d4e4f7 50%,#e0ecf5 100%)', position:'relative', overflow:'hidden', border:'1px solid #d1dce8' }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(255,255,255,0.35) 1px,transparent 1px),linear-gradient(rgba(255,255,255,0.35) 1px,transparent 1px)', backgroundSize:'28px 28px' }}></div>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(45deg,transparent 30%,rgba(19,96,239,0.06) 50%,transparent 70%)' }}></div>
      <svg viewBox="0 0 24 32" style={{ position:'absolute', top:'42%', left:'52%', transform:'translate(-50%,-100%)', width:24, height:32 }}>
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="#EF4444"/>
        <circle cx="12" cy="11" r="4.5" fill="#fff"/>
      </svg>
      <div style={{ position:'absolute', bottom:6, right:8, fontSize:9, fontWeight:600, color:'#94a3b8', background:'rgba(255,255,255,0.7)', padding:'2px 6px', borderRadius:4 }}>Map</div>
    </div>
  );
}

/* ——— Detail Panel (Right Side) ——— */
function TMDetailPanel() {
  const { selTask: t, selStaff: s, setSelTaskId } = useTM();
  if (!t) return null;

  const Field = ({label, children}) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:10.5, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13.5, fontWeight:600, color:'#1e293b' }}>{children}</div>
    </div>
  );

  return (
    <div className="tm-detail-side">
      <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:13, fontWeight:700, color:'#1e293b' }}>Task #{t.id}</span>
        <div style={{ display:'flex', gap:5 }}>
          {['✏️','🗑️','💬'].map((icon,i) => (
            <button key={i} className="tm-detail-action">{icon}</button>
          ))}
          <button className="tm-detail-action" onClick={() => setSelTaskId(null)}>✕</button>
        </div>
      </div>
      <div className="tm-detail-scroll">
        <Field label="Created by">{t.by}</Field>
        <Field label="Staff">{s.name}</Field>
        <Field label="Estimated Time">{t.est}</Field>
        <Field label="Sales Personal">{t.personnel}</Field>
        <Field label="Job Description">{t.desc}</Field>
        <Field label="Time Window">{t.window}</Field>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>Location</div>
          <div style={{ fontSize:13.5, fontWeight:600, color:'#1e293b', marginBottom:8 }}>{t.loc}</div>
          <TMMapPlaceholder />
        </div>
        <Field label="Job Type">{t.type}</Field>
        <div style={{ borderTop:'1px solid #e2e8f0', paddingTop:14, marginTop:4 }}>
          <Field label="Assigned Time">{t.assigned || '–'}</Field>
          <Field label="In Progress Time">{t.started || '–'}</Field>
          <Field label="Completed Time">{t.completed || '–'}</Field>
        </div>
        <div style={{ borderTop:'1px solid #e2e8f0', paddingTop:14, marginTop:4 }}>
          <Field label="Signature">{t.status==='Completed' ? <span style={{color:'#16a34a'}}>Signed ✓</span> : <span style={{color:'#94a3b8', fontStyle:'italic'}}>Pending</span>}</Field>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>Review</div>
            <TMStatusBadge task={t} staffId={s.id} small />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Web Dashboard ——— */
function TMWebDashboard() {
  const { staff, selStaffId, selTaskId, pickStaff, setSelTaskId, selStaff, stats: getStats } = useTM();
  const st = selStaff ? getStats(selStaff) : { total:0, assigned:0, inProgress:0, completed:0 };

  const hasDetail = !!selTaskId;

  const topBg = '#F3F7FA';
  const accent = '#1360EF';

  return (
    <div className="tm-web" style={{ gridTemplateColumns: hasDetail ? '1fr 220px' : '1fr' }}>
      {/* Main: Task Panel */}
      <div className="tm-task-panel">

        {/* ===== ROW 1: Toolbar ===== */}
        <div style={{ padding:'10px 16px', background:topBg, borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:32, height:18, borderRadius:9, background:'#22c55e', position:'relative', cursor:'pointer' }}>
              <div style={{ width:14, height:14, borderRadius:'50%', background:'#fff', position:'absolute', top:2, right:2, boxShadow:'0 1px 2px rgba(0,0,0,0.2)' }}></div>
            </div>
            <div>
              <span style={{ fontSize:12.5, fontWeight:700, color:'#1e293b' }}>Active Tasks</span>
              <div style={{ fontSize:10, color:'#94a3b8' }}>19/06/2026</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <button className="tm-toolbar-btn">Today</button>
            <button className="tm-toolbar-btn" style={{ padding:'5px 8px' }}>▾</button>
            <button className="tm-toolbar-btn primary">Show Route</button>
            <button className="tm-toolbar-btn" style={{ padding:'5px 8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <button className="tm-toolbar-btn" style={{ fontSize:11 }}>All items are sel… ▾</button>
            <button className="tm-toolbar-btn primary">Create A Task</button>
            <button className="tm-toolbar-btn primary">Locations</button>
            <button className="tm-toolbar-btn" style={{ padding:'5px 8px', fontSize:14, fontWeight:800 }}>⋮</button>
          </div>
        </div>

        {/* ===== ROW 2: Staff + Stats ===== */}
        {selStaff && (
          <div style={{ padding:'12px 16px', background:topBg, borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div className="tm-avatar" style={{ background:selStaff.color, width:44, height:44, fontSize:15 }}>{selStaff.initials}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', textTransform:'uppercase' }}>{selStaff.name} <span style={{ fontSize:11, color:'#64748b', fontWeight:500, textTransform:'none' }}>[{selStaff.shift}]</span></div>
                <div style={{ display:'flex', gap:6, marginTop:3 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" style={{cursor:'pointer'}}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{cursor:'pointer'}}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                </div>
                <div style={{ fontSize:10.5, color:'#94a3b8', fontFamily:'ui-monospace,monospace', marginTop:2 }}>[{selStaff.vehicle}]</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              {[{n:st.total,l:'Total',c:'#1e293b'},{n:st.assigned,l:'Assigned',c:accent},{n:st.inProgress,l:'In progress',c:'#d97706'},{n:st.completed,l:'Completed',c:'#16a34a'}].map(x => (
                <div key={x.l} style={{ textAlign:'center', minWidth:60, padding:'8px 8px', borderRadius:8, background:'#fff', border:'1px solid #e2e8f0' }}>
                  <div style={{ fontSize:20, fontWeight:800, color:x.c, fontVariantNumeric:'tabular-nums', transition:'all 0.3s ease' }}>{x.n}</div>
                  <div style={{ fontSize:10, fontWeight:600, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.02em' }}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Task List ===== */}
        <div className="tm-task-list-scroll">
          {selStaff?.tasks.map(task => (
            <TMTaskRow key={task.id} task={task} staffId={selStaffId} isSelected={task.id===selTaskId} onClick={() => setSelTaskId(task.id)} />
          ))}
          {selStaff?.tasks.length === 0 && (
            <div style={{ textAlign:'center', padding:48, color:'#94a3b8', fontSize:13 }}>
              <div style={{ fontSize:28, marginBottom:8, opacity:0.4 }}>📋</div>
              No tasks assigned today
            </div>
          )}
        </div>

        {/* ===== Footer ===== */}
        {selStaff?.tasks.length > 0 && (
          <div style={{ padding:'8px 16px', borderTop:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:11, color:'#94a3b8' }}>
            <input placeholder="Search..." style={{ border:'1px solid #e2e8f0', borderRadius:6, padding:'5px 10px', fontSize:11, fontFamily:'inherit', outline:'none', width:140 }} />
            <span style={{ color:accent, fontWeight:600 }}>showing 1-{selStaff.tasks.length} of {selStaff.tasks.length} items</span>
          </div>
        )}
      </div>

      {/* Detail Panel — right side */}
      {hasDetail && <TMDetailPanel />}
    </div>
  );
}

Object.assign(window, { TMWebDashboard, TMStatusBadge, TMMapPlaceholder });
