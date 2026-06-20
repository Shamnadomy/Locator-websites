// tm-mobile.jsx — Mobile App panel for Task Manager Showcase

const { useState: useMobileState, useRef: useMobileRef, useEffect: useMobileEffect, useMemo: useMobileMemo } = React;

/* ——— Signature Pad ——— */
function TMSignaturePad() {
  const canvasRef = useMobileRef(null);
  const [drawing, setDrawing] = useMobileState(false);
  const [hasSig, setHasSig] = useMobileState(false);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x: x*(canvas.width/rect.width), y: y*(canvas.height/rect.height) };
  };

  const start = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    const p = getPos(e);
    ctx.beginPath(); ctx.moveTo(p.x, p.y);
    setDrawing(true); setHasSig(true);
  };
  const move = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const p = getPos(e);
    ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1e293b';
    ctx.lineTo(p.x, p.y); ctx.stroke();
  };
  const end = () => setDrawing(false);
  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasSig(false);
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
        <span style={{ fontSize:11, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.04em' }}>Signature</span>
        {hasSig && <button onClick={clear} style={{ background:'none', border:'none', color:'#ef4444', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Clear</button>}
      </div>
      <canvas ref={canvasRef} width={300} height={90}
        style={{ border:'1.5px dashed #cbd5e1', borderRadius:10, background:'#fff', cursor:'crosshair', touchAction:'none', width:'100%', height:90, display:'block' }}
        onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
        onTouchStart={start} onTouchMove={move} onTouchEnd={end}
      />
      {!hasSig && <div style={{ fontSize:10, color:'#b0b8c4', textAlign:'center', marginTop:3 }}>Sign above to confirm delivery</div>}
    </div>
  );
}

/* ——— Photo Upload ——— */
function TMPhotoUpload() {
  const [photos, setPhotos] = useMobileState([]);
  const [dragOver, setDragOver] = useMobileState(false);
  const inputRef = useMobileRef(null);

  const addFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => setPhotos(prev => [...prev, { id: Date.now()+Math.random(), url: e.target.result }]);
      reader.readAsDataURL(file);
    });
  };
  const remove = (id) => setPhotos(prev => prev.filter(p => p.id !== id));

  return (
    <div>
      <div style={{ fontSize:11, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:6 }}>Delivery Photos</div>
      <div
        className={`tm-photo-drop${dragOver?' dragover':''}`}
        onClick={() => inputRef.current?.click()}
        onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
      >
        <div style={{ fontSize:22, marginBottom:2 }}>📷</div>
        <div style={{ fontSize:11.5, fontWeight:600, color:'#64748b' }}>Tap or drag photos here</div>
        <div style={{ fontSize:9.5, color:'#94a3b8', marginTop:1 }}>Supports multiple images</div>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={e => addFiles(e.target.files)} />
      </div>
      {photos.length > 0 && (
        <div style={{ display:'flex', gap:7, marginTop:8, flexWrap:'wrap' }}>
          {photos.map(p => (
            <div key={p.id} style={{ width:52, height:52, borderRadius:8, overflow:'hidden', position:'relative', border:'1px solid #e2e8f0' }}>
              <img src={p.url} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="" />
              <button onClick={(e) => { e.stopPropagation(); remove(p.id); }}
                style={{ position:'absolute', top:2, right:2, width:16, height:16, borderRadius:'50%', background:'rgba(0,0,0,0.5)', color:'#fff', border:'none', cursor:'pointer', fontSize:9, display:'grid', placeItems:'center', lineHeight:1 }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ——— Mobile Task Card ——— */
function TMMobileTaskCard({ task, index, onClick }) {
  const c = TM_STATUS_COLORS[task.status];
  return (
    <div className="tm-mobile-card" onClick={onClick}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:10, color:'#94a3b8', fontWeight:600 }}>Job Description</div>
          <div style={{ fontSize:13, fontWeight:700, color:'#1e293b', marginTop:1 }}>{task.desc}</div>
        </div>
        <div style={{ width:26, height:26, borderRadius:6, background:'#1360EF', color:'#fff', display:'grid', placeItems:'center', fontSize:11, fontWeight:700, flexShrink:0, marginLeft:8 }}>{index+1}</div>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <div style={{ fontSize:10, color:'#94a3b8', fontWeight:600 }}>Location</div>
          <div style={{ fontSize:12, fontWeight:700, color:'#1360EF', marginTop:1 }}>{task.loc.toUpperCase()}</div>
          <div style={{ fontSize:10.5, color:'#b0b8c4', marginTop:3 }}>–</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:c.bg, display:'grid', placeItems:'center', marginLeft:'auto', marginBottom:3 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6"/>
              {task.status==='Completed' && <path d="M15 17l2 2 3.5-3.5" strokeWidth="2.5"/>}
            </svg>
          </div>
          <div style={{ fontSize:10.5, fontWeight:700, color:c.text }}>{task.status}</div>
          <div style={{ fontSize:9.5, color:'#b0b8c4' }}>{task.assigned?.split(' ')[0]}</div>
        </div>
      </div>
    </div>
  );
}

/* ——— Mobile Task Detail ——— */
function TMMobileTaskDetail({ task, staffMember, onBack }) {
  const { updateStatus } = useTM();
  const c = TM_STATUS_COLORS[task.status];

  const cycleStatus = () => {
    const order = ['Assigned','In Progress','Completed'];
    const i = order.indexOf(task.status);
    updateStatus(staffMember.id, task.id, order[(i+1) % order.length]);
  };

  const Field = ({label, children}) => (
    <div style={{ marginBottom:12 }}>
      <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13, fontWeight:600, color:'#1e293b' }}>{children}</div>
    </div>
  );

  return (
    <>
      <div style={{ background:'#1360EF', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', fontSize:18, padding:0, lineHeight:1 }}>←</button>
          <span style={{ color:'#fff', fontSize:16, fontWeight:800 }}>Task Details</span>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {['⚙️','🔑','👤'].map((ic,i) => <span key={i} style={{ fontSize:16, cursor:'pointer', filter:'brightness(10)' }}>{ic}</span>)}
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:14, background:'#F0F4F7' }}>
        {/* Status Pill */}
        <div style={{ textAlign:'center', marginBottom:14 }}>
          <button onClick={cycleStatus} style={{
            background:c.bg, color:c.text, border:`1.5px solid ${c.border || c.text}`,
            padding:'7px 22px', borderRadius:999, fontSize:12, fontWeight:700,
            cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s ease',
            display:'inline-flex', alignItems:'center', gap:6,
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:c.text }}></span>
            {task.status}
            <span style={{ fontSize:9, opacity:0.6 }}>▼</span>
          </button>
          <div style={{ fontSize:9, color:'#b0b8c4', marginTop:3 }}>Tap to change status</div>
        </div>

        {/* Info Card */}
        <div style={{ background:'#fff', borderRadius:14, padding:14, marginBottom:10, boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
          <Field label="Assigned By">{task.by}</Field>
          <Field label="Job Description">{task.desc}</Field>
          <Field label="Location">{task.loc}</Field>
          <TMMapPlaceholder small />
        </div>

        {/* Time Card */}
        <div style={{ background:'#fff', borderRadius:14, padding:14, marginBottom:10, boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
          <Field label="Assigned Time">{task.assigned || '–'}</Field>
          <Field label="In Progress Time">{task.started || '–'}</Field>
          <div style={{ marginBottom:0 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:2 }}>Completed Time</div>
            <div style={{ fontSize:13, fontWeight:600, color:'#1e293b' }}>{task.completed || '–'}</div>
          </div>
        </div>

        {/* Delivery Confirmation — only visible when Completed */}
        {task.status === 'Completed' && (
          <div style={{ background:'#fff', borderRadius:14, padding:14, marginBottom:10, boxShadow:'0 1px 3px rgba(0,0,0,0.05)', animation:'tmSlideUp 0.3s ease' }}>
            <div style={{ fontSize:13, fontWeight:800, color:'#1e293b', marginBottom:14, display:'flex', alignItems:'center', gap:7 }}>
              <span style={{ width:24, height:24, borderRadius:7, background:'#e8faf0', display:'grid', placeItems:'center', fontSize:13 }}>✅</span>
              Delivery Confirmation
            </div>
            <div style={{ marginBottom:14 }}><TMSignaturePad /></div>
            <TMPhotoUpload />
          </div>
        )}
      </div>
    </>
  );
}

/* ——— Mobile App ——— */
function TMMobileApp() {
  const { staff, updateStatus } = useTM();
  const [view, setView] = useMobileState('list');
  const [selTask, setSelTask] = useMobileState(null);
  const [selStaffMember, setSelStaffMember] = useMobileState(null);
  const [dateTab, setDateTab] = useMobileState('Today');

  const allTasks = useMobileMemo(() => {
    const out = [];
    staff.forEach(s => s.tasks.forEach(t => out.push({ ...t, _staffName:s.name, _staffId:s.id, _staff:s })));
    return out;
  }, [staff]);

  const openTask = (task) => { setSelTask(task); setSelStaffMember(task._staff); setView('detail'); };
  const goBack = () => { setView('list'); };

  // Live version of selected task
  const liveTask = useMobileMemo(() => {
    if (!selTask || !selStaffMember) return null;
    const s = staff.find(st => st.id === selStaffMember.id);
    return s?.tasks.find(t => t.id === selTask.id) || null;
  }, [staff, selTask, selStaffMember]);

  return (
    <div style={{ display:'flex', justifyContent:'center', padding:'20px 0' }}>
      <div className="tm-phone">
        <div className="tm-phone-screen">

          {/* Status Bar */}
          <div style={{ height:36, padding:'0 24px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', paddingBottom:4, fontSize:11, fontWeight:600, color:'#fff', flexShrink:0, background:'#1360EF' }}>
            <span>9:41</span>
            <span style={{ display:'flex', gap:4, alignItems:'center', fontSize:10 }}>
              <svg width="14" height="10" viewBox="0 0 16 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="0.5"/><rect x="4.5" y="5" width="3" height="7" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3"/></svg>
              <svg width="14" height="10" viewBox="0 0 16 12" fill="#fff"><path d="M8 2C5.2 2 2.7 3.1 1 5l1.4 1.4C3.8 5 5.8 4 8 4s4.2 1 5.6 2.4L15 5c-1.7-1.9-4.2-3-7-3zm0 4c-1.7 0-3.2.7-4.2 1.8L5.2 9.2C5.9 8.5 6.9 8 8 8s2.1.5 2.8 1.2l1.4-1.4C11.2 6.7 9.7 6 8 6zm0 4c-.8 0-1.6.3-2.1.9L8 13l2.1-2.1C9.6 10.3 8.8 10 8 10z"/></svg>
              <svg width="20" height="10" viewBox="0 0 25 12" fill="#fff"><rect x="0" y="1" width="20" height="10" rx="2" fill="none" stroke="#fff" strokeWidth="1"/><rect x="21" y="3.5" width="2" height="5" rx="1" fill="#fff"/><rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="#fff"/></svg>
            </span>
          </div>

          {view === 'list' ? (
            <>
              {/* Header */}
              <div style={{ background:'#1360EF', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ color:'#fff', fontSize:17, fontWeight:800 }}>Task Listing</span>
                  <span style={{ background:'rgba(255,255,255,0.3)', color:'#fff', fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:5 }}>{allTasks.length}</span>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  {['🔑','⚙️','👤'].map((ic,i) => <span key={i} style={{ fontSize:15, cursor:'pointer', filter:'brightness(10)' }}>{ic}</span>)}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex:1, overflowY:'auto', padding:14, background:'#F0F4F7' }}>
                {/* Date Tabs */}
                <div style={{ background:'#fff', borderRadius:12, padding:4, marginBottom:10, display:'flex', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
                  {['Yesterday','Today','Tomorrow','All'].map(d => (
                    <button key={d} onClick={() => setDateTab(d)} style={{
                      flex:1, padding:'7px 2px', border:'none', background:'transparent', fontFamily:'inherit',
                      fontSize:11.5, fontWeight: d===dateTab?700:500, color: d===dateTab?'#1360EF':'#94a3b8',
                      cursor:'pointer', borderRadius:8, transition:'all 0.15s ease',
                    }}>{d}</button>
                  ))}
                  <button style={{ width:28, height:28, border:'none', background:'transparent', cursor:'pointer', fontSize:14, display:'grid', placeItems:'center', color:'#64748b' }}>📅</button>
                </div>
                <div style={{ position:'relative', marginBottom:2 }}>
                  <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:-4, width:8, height:8, borderRadius:'50%', background:'#1360EF' }}></div>
                </div>

                {/* Search */}
                <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                  <div style={{ flex:1, background:'#fff', borderRadius:10, padding:'8px 12px', display:'flex', alignItems:'center', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
                    <input placeholder="Search For" style={{ border:'none', outline:'none', flex:1, fontFamily:'inherit', fontSize:12, color:'#1e293b', background:'transparent' }} />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  </div>
                  <button style={{ width:36, height:36, borderRadius:10, background:'#1360EF', border:'none', color:'#fff', cursor:'pointer', fontSize:15, display:'grid', placeItems:'center' }}>↻</button>
                </div>

                {/* Task Cards */}
                {allTasks.map((task, i) => (
                  <TMMobileTaskCard key={task.id} task={task} index={i} onClick={() => openTask(task)} />
                ))}
              </div>

              {/* Bottom Nav */}
              <div style={{ display:'flex', background:'#fff', borderTop:'1px solid #e2e8f0', padding:'6px 0 18px', flexShrink:0 }}>
                {[{icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20M8 4v16"/></svg>, label:'Tasks', active:true},
                  {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>, label:'Home', active:false},
                  {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, label:'More', active:false},
                ].map((item, i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, fontSize:10, fontWeight:600, color:item.active?'#1360EF':'#94a3b8', cursor:'pointer', padding:4 }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            liveTask && selStaffMember && <TMMobileTaskDetail task={liveTask} staffMember={selStaffMember} onBack={goBack} />
          )}

          {/* Home Indicator */}
          <div style={{ position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', width:120, height:4, borderRadius:2, background:'rgba(0,0,0,0.2)' }}></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TMMobileApp });
