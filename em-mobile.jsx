// em-mobile.jsx — Mobile App panel for Expense Manager

const { useState: useEMS, useRef: useEMR, useMemo: useEMM } = React;

/* ——— Add Expense Modal ——— */
function EMAddExpenseModal({ onClose }) {
  const [vehicleOn, setVehicleOn] = useEMS(true);
  return (
    <div style={{ position:'absolute', inset:0, zIndex:30, display:'flex', flexDirection:'column' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)' }} onClick={onClose}></div>
      <div style={{
        position:'relative', marginTop:'auto', background:'#fff', borderRadius:'20px 20px 0 0',
        padding:'20px 18px 30px', maxHeight:'88%', overflowY:'auto', animation:'emSlideUp 0.3s ease',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <span style={{ fontSize:16, fontWeight:800, color:'#1e293b' }}>Add Expense</span>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:'50%', border:'1px solid #e2e8f0', background:'#f8fafc', cursor:'pointer', fontSize:14, display:'grid', placeItems:'center', color:'#64748b', padding:0 }}>✕</button>
        </div>
        {/* Related To Vehicle */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8"><rect x="1" y="6" width="22" height="11" rx="3"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="17" r="2"/><path d="M5 6l2-3h10l2 3"/></svg>
            <span style={{ fontSize:13, fontWeight:600, color:'#1e293b' }}>Related To Vehicle</span>
          </div>
          <div onClick={() => setVehicleOn(!vehicleOn)} style={{
            width:44, height:24, borderRadius:12, cursor:'pointer',
            background: vehicleOn ? '#2563eb' : '#cbd5e1', transition:'background 0.2s',
            position:'relative', padding:2,
          }}>
            <div style={{ width:20, height:20, borderRadius:10, background:'#fff', boxShadow:'0 1px 3px rgba(0,0,0,.2)', transition:'transform 0.2s', transform: vehicleOn ? 'translateX(20px)' : 'translateX(0)' }}></div>
          </div>
        </div>
        {vehicleOn && <EMFormField label="Vehicle" value="Shamnad Support C 19753" />}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'#94a3b8', marginBottom:4 }}>Category</div>
          <div style={{ border:'1px solid #e2e8f0', borderRadius:10, padding:'11px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', color:'#94a3b8', fontSize:13 }}>
            <span>Select category</span>
            <svg width="12" height="7" viewBox="0 0 10 6" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l4 4 4-4"/></svg>
          </div>
        </div>
        <EMFormField label="Amount" placeholder="0.00" />
        <EMFormField label="Odometer" placeholder="Enter reading" />
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'#94a3b8', marginBottom:4 }}>Description</div>
          <textarea placeholder="Add details..." style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:10, padding:'11px 14px', fontSize:13, fontFamily:'inherit', minHeight:70, resize:'vertical', outline:'none', boxSizing:'border-box', color:'#1e293b' }}></textarea>
        </div>
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'#94a3b8', marginBottom:4 }}>Attachment</div>
          <span style={{ fontSize:13, fontWeight:600, color:'#2563eb', cursor:'pointer' }}>Upload Attachment</span>
        </div>
        <button style={{ width:'100%', padding:'13px', background:'#2563eb', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Send</button>
      </div>
    </div>
  );
}

function EMFormField({ label, value, placeholder }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:12, fontWeight:600, color:'#94a3b8', marginBottom:4 }}>{label}</div>
      <input defaultValue={value} placeholder={placeholder} style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:10, padding:'11px 14px', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box', color:'#1e293b' }} />
    </div>
  );
}

/* ——— Mobile Expense Card ——— */
function EMMobileCard({ exp, onClick }) {
  const cat = EM_CATEGORIES[exp.category] || EM_CATEGORIES['--'];
  const isPay = exp.type === 'payment';
  const amt = isPay ? exp.paidAmount : exp.billAmount;
  const dateParts = exp.date.split(' ');

  return (
    <div onClick={onClick} style={{
      background:'#fff', borderRadius:14, padding:'12px 14px', marginBottom:10,
      boxShadow:'0 1px 3px rgba(0,0,0,.04)', cursor:'pointer',
      transition:'transform 0.15s ease', border:'1px solid #f0f0f0',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:12, background:'#f1f5f9', display:'grid', placeItems:'center', flexShrink:0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/></svg>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:11, color:'#94a3b8', fontWeight:500 }}>{dateParts[0]} {dateParts[1]?.replace(':',':')} PM</div>
          <div style={{ fontSize:13.5, fontWeight:700, color:'#1e293b', marginTop:1 }}>{exp.description === '-' ? cat.label : exp.description}</div>
          <div style={{ fontSize:12, fontWeight:600, color:'#2563eb', marginTop:1 }}>{exp.category !== '--' ? exp.category : 'PAYMENT'}</div>
        </div>
        <div style={{ flexShrink:0, display:'flex', alignItems:'center', gap:8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:13, fontWeight:700, color: isPay ? '#16a34a' : '#dc2626' }}>
              {isPay ? '+' : '−'} AED {amt?.toFixed(1)}
            </div>
            <div style={{ fontSize:10.5, fontWeight:600, color: isPay ? '#16a34a' : '#dc2626' }}>
              {isPay ? 'Approved' : 'Pending'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Mobile Expense Detail ——— */
function EMMobileDetail({ exp, onBack }) {
  const cat = EM_CATEGORIES[exp.category] || EM_CATEGORIES['--'];
  const isPay = exp.type === 'payment';

  const Field = ({label, children}) => (
    <div style={{ marginBottom:12 }}>
      <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13, fontWeight:600, color:'#1e293b' }}>{children}</div>
    </div>
  );

  return (
    <>
      <div style={{ background:'#1360EF', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', fontSize:18, padding:0, lineHeight:1 }}>←</button>
          <span style={{ color:'#fff', fontSize:16, fontWeight:800 }}>Expense Details</span>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:14, background:'#F0F4F7' }}>
        <div style={{ background:'#fff', borderRadius:14, padding:16, marginBottom:10, boxShadow:'0 1px 3px rgba(0,0,0,.05)', textAlign:'center' }}>
          <div style={{ width:50, height:50, borderRadius:14, background:`${cat.color}18`, display:'grid', placeItems:'center', fontSize:26, margin:'0 auto 10px' }}>{cat.icon}</div>
          <div style={{ fontSize:16, fontWeight:800, color:'#1e293b' }}>{exp.description}</div>
          <div style={{ fontSize:12, fontWeight:600, color:'#94a3b8', marginTop:2 }}>{exp.category !== '--' ? exp.category : 'Payment'}</div>
          <div style={{
            fontSize:24, fontWeight:800, marginTop:12,
            color: isPay ? '#16a34a' : '#dc2626',
          }}>
            {isPay ? '+' : '−'} AED {(isPay ? exp.paidAmount : exp.billAmount)?.toFixed(2)}
          </div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:5, marginTop:8,
            padding:'4px 14px', borderRadius:999, fontSize:12, fontWeight:700,
            background: isPay ? '#e8faf0' : '#fff5e6',
            color: isPay ? '#16a34a' : '#d97706',
          }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background: isPay ? '#16a34a' : '#d97706' }}></span>
            {isPay ? 'Approved' : 'Pending'}
          </div>
        </div>
        <div style={{ background:'#fff', borderRadius:14, padding:14, marginBottom:10, boxShadow:'0 1px 3px rgba(0,0,0,.05)' }}>
          <Field label="Date & Time">{exp.date}</Field>
          <Field label="Employee">{exp.employee}</Field>
          <Field label="Category">{exp.category !== '--' ? exp.category : '—'}</Field>
          <Field label="Description">{exp.description}</Field>
        </div>
        <div style={{ background:'#fff', borderRadius:14, padding:14, boxShadow:'0 1px 3px rgba(0,0,0,.05)' }}>
          <Field label="Bill Amount">{exp.billAmount ? `${exp.billAmount.toFixed(2)} AED` : '—'}</Field>
          <Field label="Paid Amount">{exp.paidAmount ? `${exp.paidAmount.toFixed(2)} AED` : '—'}</Field>
          <div style={{ marginBottom:0 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:2 }}>Balance</div>
            <div style={{ fontSize:13, fontWeight:700, color: exp.balance < 0 ? '#ef4444' : '#1e293b' }}>{exp.balance.toFixed(2)} AED</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ——— Mobile App ——— */
function EMMobileApp() {
  const { expenses } = useEM();
  const [view, setView] = useEMS('list');
  const [tab, setTab] = useEMS('Payments');
  const [selExp, setSelExp] = useEMS(null);
  const [showAdd, setShowAdd] = useEMS(false);

  const openDetail = (exp) => { setSelExp(exp); setView('detail'); };
  const goBack = () => { setView('list'); };

  return (
    <div style={{ display:'flex', justifyContent:'center', padding:'20px 0' }}>
      <div className="tm-phone">
        <div className="tm-phone-screen">

          {/* Status Bar */}
          <div style={{ height:36, padding:'0 24px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', paddingBottom:4, fontSize:11, fontWeight:600, color:'#fff', flexShrink:0, background:'#1360EF' }}>
            <span>12:51</span>
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
                  <span style={{ color:'#fff', fontSize:17, cursor:'pointer' }}>←</span>
                  <span style={{ color:'#fff', fontSize:17, fontWeight:800 }}>Expense Manager</span>
                </div>
                <div style={{ display:'flex', gap:14 }}>
                  <span onClick={() => setShowAdd(true)} style={{ cursor:'pointer' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
                  </span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="1" fill="#fff"/><circle cx="16" cy="12" r="1" fill="#fff"/><circle cx="10" cy="18" r="1" fill="#fff"/></svg>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                </div>
              </div>

              {/* Content */}
              <div style={{ flex:1, overflowY:'auto', padding:14, background:'#F0F4F7' }}>
                {/* Tabs */}
                <div style={{ background:'#fff', borderRadius:12, padding:4, marginBottom:14, display:'flex', boxShadow:'0 1px 3px rgba(0,0,0,.04)' }}>
                  {['Payments','History'].map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{
                      flex:1, padding:'9px 2px', border:'none', fontFamily:'inherit',
                      fontSize:13, fontWeight: t===tab ? 700 : 500, cursor:'pointer',
                      borderRadius:9, transition:'all 0.15s ease',
                      background: t===tab ? '#2563eb' : 'transparent',
                      color: t===tab ? '#fff' : '#94a3b8',
                    }}>{t}</button>
                  ))}
                </div>

                {/* Balance Card */}
                <div style={{ background:'#f0fdf4', borderRadius:14, padding:'16px 20px', marginBottom:14, textAlign:'center', border:'1px solid #dcfce7' }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#475569' }}>Available Balance</div>
                  <div style={{ fontSize:24, fontWeight:800, color:'#dc2626', marginTop:4 }}>− AED {Math.abs(EM_TOTAL_BALANCE).toFixed(2)}</div>
                </div>

                {/* Expense List */}
                {expenses.map(exp => (
                  <EMMobileCard key={exp.id} exp={exp} onClick={() => openDetail(exp)} />
                ))}
              </div>

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

              {/* Add Expense Modal */}
              {showAdd && <EMAddExpenseModal onClose={() => setShowAdd(false)} />}
            </>
          ) : (
            selExp && <EMMobileDetail exp={selExp} onBack={goBack} />
          )}

          {/* Home Indicator */}
          <div style={{ position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', width:120, height:4, borderRadius:2, background:'rgba(0,0,0,0.2)' }}></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EMMobileApp, EMAddExpenseModal, EMMobileCard, EMMobileDetail });
