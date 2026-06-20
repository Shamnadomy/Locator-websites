// em-web.jsx — Web Dashboard panel for Expense Manager

const { useState: useEWS, useRef: useEWR, useEffect: useEWE } = React;

/* ——— Dropdown ——— */
function EMDropdown({ label, options }) {
  const [open, setOpen] = useEWS(false);
  const [sel, setSel] = useEWS(label);
  const ref = useEWR(null);
  useEWE(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        display:'flex', alignItems:'center', gap:6, padding:'7px 14px',
        background:'#fff', border:'1px solid #e2e8f0', borderRadius:8,
        fontSize:12, fontWeight:600, color:'#475569', cursor:'pointer',
        fontFamily:'inherit', whiteSpace:'nowrap',
      }}>
        {sel}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l4 4 4-4"/></svg>
      </button>
      {open && (
        <div style={{
          position:'absolute', top:'calc(100% + 4px)', right:0, background:'#fff',
          border:'1px solid #e2e8f0', borderRadius:10, padding:4,
          boxShadow:'0 10px 30px -8px rgba(0,0,0,.16)', zIndex:60, minWidth:150,
        }}>
          {options.map(opt => (
            <button key={opt} onClick={() => { setSel(opt); setOpen(false); }}
              style={{
                display:'block', width:'100%', padding:'7px 11px', borderRadius:7,
                fontSize:12, fontWeight: opt===sel ? 700 : 500, cursor:'pointer',
                border:'none', background:'transparent', fontFamily:'inherit',
                textAlign:'left', color:'#334155',
              }}
              onMouseEnter={e => e.target.style.background='#f1f5f9'}
              onMouseLeave={e => e.target.style.background='transparent'}
            >
              {opt}{opt === sel && <span style={{ marginLeft:8, color:'#1360EF' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ——— Detail Panel ——— */
function EMDetailPanel({ expense, onClose }) {
  if (!expense) return null;
  const cat = EM_CATEGORIES[expense.category] || EM_CATEGORIES['--'];
  const Field = ({label, children}) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:10.5, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13.5, fontWeight:600, color:'#1e293b' }}>{children}</div>
    </div>
  );

  return (
    <div style={{
      width:260, background:'#f8fafc', borderLeft:'1px solid #e2e8f0',
      display:'flex', flexDirection:'column', overflow:'hidden',
      animation:'tmSlideIn 0.25s ease', flexShrink:0,
    }}>
      <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:13, fontWeight:700, color:'#1e293b' }}>Expense #{expense.id}</span>
        <div style={{ display:'flex', gap:5 }}>
          {['✏️','💬'].map((icon,i) => (
            <button key={i} className="tm-detail-action">{icon}</button>
          ))}
          <button className="tm-detail-action" onClick={onClose}>✕</button>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:16 }} className="tm-detail-scroll">
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:`${cat.color}20`, display:'grid', placeItems:'center', fontSize:20 }}>{cat.icon}</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>{expense.description}</div>
            <div style={{ fontSize:11, color:'#94a3b8' }}>{expense.category !== '--' ? expense.category : 'Payment'}</div>
          </div>
        </div>
        <Field label="Date & Time">{expense.date}</Field>
        <Field label="Employee">{expense.employee}</Field>
        <Field label="Category">{expense.category !== '--' ? expense.category : '—'}</Field>
        <Field label="Description">{expense.description}</Field>
        <div style={{ borderTop:'1px solid #e2e8f0', paddingTop:14, marginTop:4 }}>
          <Field label="Bill Amount">{expense.billAmount ? `${expense.billAmount.toFixed(2)} AED` : '—'}</Field>
          <Field label="Paid Amount">{expense.paidAmount ? `${expense.paidAmount.toFixed(2)} AED` : '—'}</Field>
          <Field label="Balance">
            <span style={{ color: expense.balance < 0 ? '#ef4444' : '#1e293b', fontWeight:700 }}>
              {expense.balance.toFixed(2)} AED
            </span>
          </Field>
        </div>
        <div style={{ borderTop:'1px solid #e2e8f0', paddingTop:14, marginTop:4 }}>
          <Field label="Status">
            <span style={{
              display:'inline-flex', alignItems:'center', gap:5,
              padding:'4px 11px', borderRadius:999, fontSize:12, fontWeight:700,
              background: expense.type === 'payment' ? '#e8faf0' : '#fff5e6',
              color: expense.type === 'payment' ? '#16a34a' : '#d97706',
            }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background: expense.type==='payment' ? '#16a34a' : '#d97706' }}></span>
              {expense.type === 'payment' ? 'Approved' : 'Pending Review'}
            </span>
          </Field>
        </div>
      </div>
    </div>
  );
}

/* ——— Web Dashboard ——— */
function EMWebDashboard() {
  const { expenses, selectedId, setSelectedId, selectedExpense } = useEM();
  const [hoverRow, setHoverRow] = useEWS(null);
  const cols = ['Date','Employee Name','Category','Description','Bill Amount','Paid Amount','Balance'];

  return (
    <div style={{
      border:'1px solid #dce1e8', borderRadius:16, overflow:'hidden',
      background:'#fff', boxShadow:'0 6px 32px -8px rgba(30,41,59,.1),0 1px 2px rgba(0,0,0,.04)',
      display:'flex', flexDirection:'column', height:580,
    }}>
      {/* Browser Chrome */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', borderBottom:'1px solid #e2e8f0', background:'#f8fafc' }}>
        <div style={{ display:'flex', gap:6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width:11, height:11, borderRadius:'50%', background:'#e0e0e3' }}></span>)}
        </div>
        <span style={{ fontSize:12.5, fontWeight:700, color:'#94a3b8', marginLeft:6 }}>Expense Manager — Approvals</span>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {/* Header Bar */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px', borderBottom:'1px solid #f0f0f0', flexShrink:0, flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
              <div style={{ width:34, height:34, borderRadius:'50%', background:'#dbeafe', display:'grid', placeItems:'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6"/></svg>
              </div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700, color:'#1e293b', lineHeight:1.2 }}>anshad</div>
                <div style={{ fontSize:10, color:'#94a3b8' }}>nill</div>
              </div>
            </div>
            <div style={{ marginLeft:'auto', textAlign:'right', marginRight:8, flexShrink:0 }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:'#1e293b' }}>
                Total Balance : <span style={{ color:'#ef4444' }}>-1478.00 AED</span>
              </div>
              <div style={{ fontSize:10, color:'#94a3b8' }}>01-05-2026 To 20-06-2026</div>
            </div>
            <button className="em-pay-btn" style={{
              background:'#2563eb', color:'#fff', border:'none', padding:'6px 14px',
              borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer',
              fontFamily:'inherit', letterSpacing:'0.02em', whiteSpace:'nowrap',
            }}>MAKE A PAYMENT</button>
            <EMDropdown label="Custom Date" options={['Custom Date','Last 7 Days','Last 30 Days','This Month','Last Month']} />
            <EMDropdown label="All Categories" options={['All Categories','PARKING','R&M- CARS','ACCESSORIES PURCHASE']} />
            <EMDropdown label="All" options={['All','Approved','Pending','Rejected']} />
            <button className="em-dots-btn" style={{
              width:30, height:30, borderRadius:8, background:'#2563eb', border:'none',
              color:'#fff', cursor:'pointer', display:'grid', placeItems:'center',
              fontSize:15, fontWeight:700, flexShrink:0,
            }}>⋮</button>
          </div>

          {/* Table */}
          <div style={{ flex:1, overflowY:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12.5 }}>
              <thead>
                <tr style={{ borderBottom:'2px solid #f0f0f0' }}>
                  {cols.map(c => (
                    <th key={c} style={{ padding:'10px 12px', textAlign:'center', fontSize:11.5, fontWeight:700, color:'#64748b', background:'#fafbfc', whiteSpace:'nowrap', position:'sticky', top:0, zIndex:2 }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => {
                  const isPay = exp.type === 'payment';
                  const isSel = selectedId === exp.id;
                  const isHov = hoverRow === exp.id;
                  return (
                    <tr key={exp.id}
                      onClick={() => setSelectedId(isSel ? null : exp.id)}
                      onMouseEnter={() => setHoverRow(exp.id)}
                      onMouseLeave={() => setHoverRow(null)}
                      style={{
                        borderBottom:'1px solid #f5f5f5', cursor:'pointer',
                        background: isSel ? '#EAF1FF' : isHov ? '#f8fafc' : isPay ? '#f0fdf4' : 'transparent',
                        borderLeft: isPay ? '3px solid #22c55e' : '3px solid transparent',
                        transition:'background 0.15s ease',
                      }}>
                      <td style={{ padding:'11px 12px', textAlign:'center', fontSize:12, color:'#475569', whiteSpace:'nowrap' }}>{exp.date}</td>
                      <td style={{ padding:'11px 12px', textAlign:'center', fontSize:12, fontWeight:600, color:'#1e293b' }}>{exp.employee}</td>
                      <td style={{ padding:'11px 12px', textAlign:'center', fontSize:12, color:'#475569' }}>{exp.category}</td>
                      <td style={{ padding:'11px 12px', textAlign:'center', fontSize:12, color:'#475569', maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{exp.description}</td>
                      <td style={{ padding:'11px 12px', textAlign:'center', fontSize:12, fontWeight:600, fontVariantNumeric:'tabular-nums' }}>
                        {exp.billAmount ? `${exp.billAmount.toFixed(2)} AED` : '--'}
                      </td>
                      <td style={{ padding:'11px 12px', textAlign:'center', fontSize:12, fontWeight:600, fontVariantNumeric:'tabular-nums' }}>
                        {exp.paidAmount ? `${exp.paidAmount.toFixed(2)} AED` : '--'}
                      </td>
                      <td style={{
                        padding:'11px 12px', textAlign:'center', fontSize:12,
                        fontWeight:700, fontVariantNumeric:'tabular-nums',
                        color: exp.balance < 0 ? '#ef4444' : '#1e293b',
                      }}>
                        {exp.balance.toFixed(2)} AED
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Summary */}
          <div style={{ display:'flex', justifyContent:'flex-end', gap:10, padding:'10px 16px', borderTop:'1px solid #e2e8f0', flexShrink:0 }}>
            <div style={{ padding:'7px 18px', borderRadius:8, fontSize:12.5, fontWeight:700, background:'#fef2f2', color:'#ef4444', fontVariantNumeric:'tabular-nums' }}>760.00 AED</div>
            <div style={{ padding:'7px 18px', borderRadius:8, fontSize:12.5, fontWeight:700, background:'#f0fdf4', color:'#166534', fontVariantNumeric:'tabular-nums' }}>1100.00 AED</div>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedExpense && <EMDetailPanel expense={selectedExpense} onClose={() => setSelectedId(null)} />}
      </div>
    </div>
  );
}

Object.assign(window, { EMWebDashboard, EMDropdown, EMDetailPanel });
