// im-mobile.jsx — Mobile App panel for Inspection Module

const { useState: useIMS, useRef: useIMR, useMemo: useIMM } = React;

/* ——— Signature SVG ——— */
function IMSignatureSVG() {
  return (
    <svg width="160" height="60" viewBox="0 0 160 60" style={{ display:'block', margin:'8px auto' }}>
      <path d="M10 45 Q20 10 35 30 Q50 50 65 20 Q75 5 90 30 Q100 45 115 15 Q125 5 145 25" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
      <path d="M80 35 Q90 50 110 30 Q120 20 135 35" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ——— Mobile Checklist Section ——— */
function IMCollapsible({ title, items, mode, checked, onToggle }) {
  const [open, setOpen] = useIMS(true);
  return (
    <div style={{ background:'#fff', borderRadius:14, marginBottom:12, border:'1px solid #f0f0f0', overflow:'hidden' }}>
      <div onClick={() => setOpen(!open)} style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px', cursor:'pointer' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" style={{ transform: open ? 'rotate(0)' : 'rotate(180deg)', transition:'transform 0.2s' }}><path d="M18 15l-6-6-6 6"/></svg>
        <span style={{ fontSize:15, fontWeight:800, color:'#1e293b' }}>{title}</span>
      </div>
      {open && (
        <div style={{ padding:'0 16px 12px' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderTop: i > 0 ? '1px solid #f5f5f5' : 'none' }}>
              <span style={{ fontSize:13.5, color:'#1e293b' }}>{item}</span>
              {mode === 'view' ? (
                <div style={{ width:28, height:28, borderRadius:'50%', background:'#22c55e', display:'grid', placeItems:'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
              ) : (
                <div onClick={() => onToggle && onToggle(item)} style={{
                  width:26, height:26, borderRadius:6, border: checked && checked[item] ? 'none' : '2px solid #cbd5e1',
                  background: checked && checked[item] ? '#22c55e' : '#fff', cursor:'pointer', display:'grid', placeItems:'center',
                  transition:'all 0.15s ease',
                }}>
                  {checked && checked[item] && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ——— Screen 1: Inspection Detail ——— */
function IMDetailScreen({ onRecords, onNewInspection }) {
  return (
    <div style={{ flex:1, overflowY:'auto', background:'#F0F4F7' }}>
      {/* Car diagram with score */}
      <div style={{ margin:14, background:'#fff', borderRadius:16, padding:16, position:'relative', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
        <img src="images/car-top.png" alt="car top" style={{ width:'100%', maxHeight:160, objectFit:'contain' }} />
        <div style={{ position:'absolute', top:12, right:12, width:52, height:52, borderRadius:'50%', background:'#22c55e', display:'grid', placeItems:'center', color:'#fff', fontSize:20, fontWeight:800, boxShadow:'0 2px 8px rgba(34,197,94,.4)' }}>83</div>
      </div>

      {/* Pagination dots */}
      <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:10 }}>
        {[0,1,2,3,4].map(i => <div key={i} style={{ width:12, height:12, borderRadius:'50%', background: i === 0 ? '#2563eb' : '#c7d2fe' }}></div>)}
      </div>

      {/* Vehicle info */}
      <div style={{ textAlign:'center', marginBottom:14 }}>
        <div style={{ fontSize:17, fontWeight:800, color:'#1e293b' }}>AA WC Van 58542</div>
        <div style={{ fontSize:12, color:'#94a3b8', marginTop:2 }}>Inspected On 19/06/2026</div>
        <div style={{ fontSize:12, color:'#94a3b8' }}>Next Inspection On 19/06/2026</div>
      </div>

      {/* Records + Location */}
      <div style={{ display:'flex', justifyContent:'center', gap:10, marginBottom:16 }}>
        <button onClick={onRecords} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
          Records
        </button>
        <button style={{ width:38, height:38, borderRadius:8, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', display:'grid', placeItems:'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </button>
      </div>

      {/* Checklists */}
      <div style={{ padding:'0 14px 14px' }}>
        <IMCollapsible title="Mandatory" items={IM_MANDATORY} mode="view" />
        <IMCollapsible title="Optional" items={IM_OPTIONAL} mode="view" />
      </div>
    </div>
  );
}

/* ——— Screen 2: Records Modal ——— */
function IMRecordsModal({ onClose }) {
  return (
    <div style={{ position:'absolute', inset:0, zIndex:30, display:'flex', flexDirection:'column' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)' }} onClick={onClose}></div>
      <div style={{
        position:'relative', marginTop:'auto', background:'#fff', borderRadius:'20px 20px 0 0',
        maxHeight:'75%', display:'flex', flexDirection:'column', animation:'emSlideUp 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 18px', background:'#2563eb', borderRadius:'20px 20px 0 0' }}>
          <span style={{ fontSize:16, fontWeight:800, color:'#fff' }}>Inspection Records</span>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:'50%', border:'none', background:'rgba(255,255,255,0.2)', cursor:'pointer', color:'#fff', fontSize:16, display:'grid', placeItems:'center' }}>✕</button>
        </div>
        {/* Table Header */}
        <div style={{ display:'flex', padding:'10px 18px', borderBottom:'1px solid #e2e8f0' }}>
          <span style={{ flex:1, fontSize:12, fontWeight:700, color:'#64748b', fontStyle:'italic' }}>Date</span>
          <span style={{ flex:1, fontSize:12, fontWeight:700, color:'#64748b', fontStyle:'italic' }}>Inspected By</span>
          <span style={{ width:50, fontSize:12, fontWeight:700, color:'#64748b', fontStyle:'italic', textAlign:'center' }}>Score</span>
        </div>
        {/* Rows */}
        <div style={{ overflowY:'auto', flex:1 }}>
          {IM_MOBILE_RECORDS.map((r, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', padding:'12px 18px', borderBottom:'1px solid #f5f5f5' }}>
              <span style={{ flex:1, fontSize:12.5, color:'#475569' }}>{r.date}</span>
              <span style={{ flex:1, fontSize:12.5, fontWeight:600, color:'#1e293b' }}>{r.inspector}</span>
              <span style={{ width:50, fontSize:13, fontWeight:700, color:'#1e293b', textAlign:'center' }}>{r.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ——— Screen 3: New Inspection Form ——— */
function IMNewInspectionForm({ onBack, onSave }) {
  const [formChecked, setFormChecked] = useIMS({});
  const toggleCheck = (item) => setFormChecked(prev => ({ ...prev, [item]: !prev[item] }));

  return (
    <>
      <div style={{ background:'#1360EF', padding:'12px 16px', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', fontSize:18, padding:0, lineHeight:1 }}>←</button>
        <span style={{ color:'#fff', fontSize:16, fontWeight:800 }}>AA WC Van 58542</span>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:14, background:'#F0F4F7' }}>
        <IMCollapsible title="Mandatory" items={IM_MANDATORY} mode="form" checked={formChecked} onToggle={toggleCheck} />
        <IMCollapsible title="Optional" items={IM_OPTIONAL} mode="form" checked={formChecked} onToggle={toggleCheck} />

        {/* Car side view */}
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:12, position:'relative', border:'1px solid #f0f0f0' }}>
          <img src="images/car-left.png" alt="car side" style={{ width:'100%', maxHeight:140, objectFit:'contain' }} />
          <button style={{ position:'absolute', bottom:12, right:12, width:40, height:40, borderRadius:8, background:'#2563eb', border:'none', color:'#fff', cursor:'pointer', display:'grid', placeItems:'center', boxShadow:'0 2px 8px rgba(37,99,235,.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          </button>
        </div>

        {/* Scratches/Dents */}
        <div style={{ background:'#fff', borderRadius:14, padding:'14px 16px', marginBottom:12, display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid #f0f0f0' }}>
          <span style={{ fontSize:14, fontWeight:800, color:'#1e293b' }}>Scratches / Dents</span>
          <span style={{ fontSize:14, fontWeight:600, color:'#64748b' }}>0</span>
        </div>

        {/* Photos */}
        <div style={{ background:'#fff', borderRadius:14, padding:'14px 16px', marginBottom:12, display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid #f0f0f0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:14, fontWeight:800, color:'#1e293b' }}>Photos</span>
            <span style={{ fontSize:14, fontWeight:600, color:'#2563eb' }}>0</span>
          </div>
          <button style={{ width:34, height:34, borderRadius:8, background:'#2563eb', border:'none', color:'#fff', cursor:'pointer', fontSize:18, fontWeight:700, display:'grid', placeItems:'center' }}>+</button>
        </div>

        {/* Remarks */}
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:12, border:'1px solid #f0f0f0' }}>
          <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', marginBottom:8 }}>Remarks</div>
          <textarea placeholder="Add details..." style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:10, padding:'11px 14px', fontSize:13, fontFamily:'inherit', minHeight:80, resize:'vertical', outline:'none', boxSizing:'border-box', color:'#1e293b' }}></textarea>
        </div>

        {/* Inspector Signature */}
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:12, border:'1px solid #f0f0f0' }}>
          <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', marginBottom:8 }}>Inspector Signature</div>
          <input placeholder="Ijaz" style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:10, padding:'11px 14px', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box', color:'#1e293b', marginBottom:8 }} />
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              Sign
            </button>
          </div>
        </div>

        {/* Driver Signature */}
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:12, border:'1px solid #f0f0f0' }}>
          <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', marginBottom:8 }}>Driver Signature</div>
          <input placeholder="Ijaz" style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:10, padding:'11px 14px', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box', color:'#1e293b', marginBottom:8 }} />
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              Sign
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={onSave} style={{ width:'100%', padding:'14px', background:'#2563eb', color:'#fff', border:'none', borderRadius:12, fontSize:16, fontWeight:800, cursor:'pointer', fontFamily:'inherit', marginBottom:12 }}>Save</button>
      </div>
    </>
  );
}

/* ——— Screen 4: Completed Inspection ——— */
function IMCompletedScreen({ onBack }) {
  return (
    <>
      <div style={{ background:'#1360EF', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', fontSize:18, padding:0, lineHeight:1 }}>←</button>
          <span style={{ color:'#fff', fontSize:16, fontWeight:800 }}>Inspection</span>
        </div>
        <button style={{ width:30, height:30, borderRadius:8, border:'1px solid rgba(255,255,255,0.3)', background:'transparent', cursor:'pointer', display:'grid', placeItems:'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
        </button>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:14, background:'#F0F4F7' }}>
        <IMCollapsible title="Optional" items={IM_OPTIONAL} mode="view" />

        {/* Remarks */}
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:12, border:'1px solid #f0f0f0' }}>
          <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', marginBottom:4 }}>Remarks</div>
          <div style={{ fontSize:13, color:'#475569' }}>good</div>
        </div>

        {/* Driver Signature */}
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:12, border:'1px solid #f0f0f0' }}>
          <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', marginBottom:4 }}>Driver Signature</div>
          <IMSignatureSVG />
          <div style={{ fontSize:13, fontWeight:600, color:'#1e293b', marginTop:4 }}>Ijaz</div>
        </div>

        {/* Inspector Signature */}
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:12, border:'1px solid #f0f0f0' }}>
          <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', marginBottom:4 }}>Inspector Signature</div>
          <IMSignatureSVG />
          <div style={{ fontSize:13, fontWeight:600, color:'#1e293b', marginTop:4 }}>Ijaz</div>
        </div>
      </div>
    </>
  );
}

/* ——— Mobile App Container ——— */
function IMMobileApp() {
  const [screen, setScreen] = useIMS('detail'); // detail | form | completed
  const [showRecords, setShowRecords] = useIMS(false);

  return (
    <div style={{ display:'flex', justifyContent:'center', padding:'20px 0' }}>
      <div className="tm-phone">
        <div className="tm-phone-screen">

          {/* Status Bar */}
          <div style={{ height:36, padding:'0 24px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', paddingBottom:4, fontSize:11, fontWeight:600, color:'#fff', flexShrink:0, background:'#1360EF' }}>
            <span>3:41</span>
            <span style={{ display:'flex', gap:4, alignItems:'center', fontSize:10 }}>
              <svg width="14" height="10" viewBox="0 0 16 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="0.5"/><rect x="4.5" y="5" width="3" height="7" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3"/></svg>
              <svg width="14" height="10" viewBox="0 0 16 12" fill="#fff"><path d="M8 2C5.2 2 2.7 3.1 1 5l1.4 1.4C3.8 5 5.8 4 8 4s4.2 1 5.6 2.4L15 5c-1.7-1.9-4.2-3-7-3zm0 4c-1.7 0-3.2.7-4.2 1.8L5.2 9.2C5.9 8.5 6.9 8 8 8s2.1.5 2.8 1.2l1.4-1.4C11.2 6.7 9.7 6 8 6zm0 4c-.8 0-1.6.3-2.1.9L8 13l2.1-2.1C9.6 10.3 8.8 10 8 10z"/></svg>
              <svg width="20" height="10" viewBox="0 0 25 12" fill="#fff"><rect x="0" y="1" width="20" height="10" rx="2" fill="none" stroke="#fff" strokeWidth="1"/><rect x="21" y="3.5" width="2" height="5" rx="1" fill="#fff"/><rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="#fff"/></svg>
            </span>
          </div>

          {screen === 'detail' && (
            <>
              {/* Header */}
              <div style={{ background:'#1360EF', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ color:'#fff', fontSize:17, cursor:'pointer' }}>←</span>
                  <span style={{ color:'#fff', fontSize:17, fontWeight:800 }}>Inspection</span>
                </div>
                <button onClick={() => setScreen('form')} style={{ width:30, height:30, borderRadius:8, border:'1px solid rgba(255,255,255,0.3)', background:'transparent', cursor:'pointer', display:'grid', placeItems:'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
                </button>
              </div>

              <IMDetailScreen onRecords={() => setShowRecords(true)} onNewInspection={() => setScreen('form')} />

              {/* Bottom Nav */}
              <div style={{ display:'flex', background:'#fff', borderTop:'1px solid #e2e8f0', padding:'6px 0 18px', flexShrink:0 }}>
                {[
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20M8 4v16"/></svg>, label:'Tasks', active:false },
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>, label:'Home', active:true },
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17 14v7m-3-3.5h6"/></svg>, label:'More', active:false },
                ].map((item, i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, fontSize:10, fontWeight:600, color:item.active?'#1360EF':'#94a3b8', cursor:'pointer', padding:4 }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Records Modal */}
              {showRecords && <IMRecordsModal onClose={() => setShowRecords(false)} />}
            </>
          )}

          {screen === 'form' && (
            <IMNewInspectionForm onBack={() => setScreen('detail')} onSave={() => setScreen('completed')} />
          )}

          {screen === 'completed' && (
            <>
              <IMCompletedScreen onBack={() => setScreen('detail')} />
              {/* Bottom Nav */}
              <div style={{ display:'flex', background:'#fff', borderTop:'1px solid #e2e8f0', padding:'6px 0 18px', flexShrink:0 }}>
                {[
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20M8 4v16"/></svg>, label:'Tasks', active:false },
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>, label:'Home', active:true },
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17 14v7m-3-3.5h6"/></svg>, label:'More', active:false },
                ].map((item, i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, fontSize:10, fontWeight:600, color:item.active?'#1360EF':'#94a3b8', cursor:'pointer', padding:4 }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Home Indicator */}
          <div style={{ position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', width:120, height:4, borderRadius:2, background:'rgba(0,0,0,0.2)' }}></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { IMMobileApp, IMDetailScreen, IMRecordsModal, IMNewInspectionForm, IMCompletedScreen, IMCollapsible, IMSignatureSVG });
