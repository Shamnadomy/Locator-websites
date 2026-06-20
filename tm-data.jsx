// tm-data.jsx — Shared data + state context for Task Manager Showcase

const { createContext, useContext, useState, useCallback, useMemo } = React;

const TM_STATUS = { ASSIGNED:'Assigned', IN_PROGRESS:'In Progress', COMPLETED:'Completed' };
const TM_STATUS_COLORS = {
  Assigned:      { bg:'#EBF0FF', text:'#1360EF', border:'#c7d2fe' },
  'In Progress': { bg:'#FFF5E6', text:'#D97706', border:'#fcd34d' },
  Completed:     { bg:'#E8FAF0', text:'#16A34A', border:'#86efac' },
};

function tmNow() {
  const d = new Date(); const p = n => String(n).padStart(2,'0');
  return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const INIT_STAFF = [
  { id:1, name:"Shilender", vehicle:"MAHBOOB-75626", initials:"SH", color:"#1360EF", shift:"08:00 - 18:00",
    tasks:[
      { id:13, desc:"Store to Richmond warehouse", personnel:"Anjal", window:"11:42-11:52", loc:"Branch A", code:"BRANCH A (0543)", status:"Completed", assigned:"19/06/2026 08:17", started:"19/06/2026 11:42", completed:"19/06/2026 15:19", by:"BERANCH - R", est:"-", type:"Store delivery" },
      { id:14, desc:"R BR to M9 Store delivery", personnel:"Ravi PR", window:"11:43-11:53", loc:"Branch M9 Store", code:"BRANCH M9 Store (0543)", status:"Completed", assigned:"19/06/2026 08:17", started:"19/06/2026 11:43", completed:"19/06/2026 15:19", by:"BERANCH - R", est:"-", type:"Branch transfer" },
      { id:15, desc:"M9 Store to Excel warehouse", personnel:"Ravi PR", window:"11:44-11:54", loc:"Excel warehouse", code:"EXCEL ()", status:"Completed", assigned:"19/06/2026 08:17", started:"19/06/2026 11:44", completed:"19/06/2026 15:19", by:"BERANCH - R", est:"-", type:"Store transfer" },
      { id:16, desc:"M9 Store to Speedex depot", personnel:"Ravi PR", window:"11:52-12:02", loc:"Speedex Auto Workshop", code:"SPEEDEX AUTO WORKSHOP ()", status:"In Progress", assigned:"19/06/2026 08:17", started:"19/06/2026 15:20", completed:null, by:"BERANCH - R", est:"-", type:"Depot delivery" },
      { id:17, desc:"M9 Store to F Branch", personnel:"Ravi PR", window:"15:18-15:28", loc:"F Branch", code:"F BRANCH ()", status:"Assigned", assigned:"19/06/2026 08:17", started:null, completed:null, by:"BERANCH - R", est:"-", type:"Branch delivery" },
    ]},
  { id:2, name:"Ahmed Khan", vehicle:"Toyota-54921", initials:"AK", color:"#1fbf5b", shift:"07:30 - 17:30",
    tasks:[
      { id:21, desc:"Deliver electronics order #E-4821", personnel:"Anjal", window:"09:00-10:30", loc:"Marina Mall, Dubai", code:"MARINA MALL (DXB-042)", status:"Completed", assigned:"19/06/2026 07:45", started:"19/06/2026 09:02", completed:"19/06/2026 10:18", by:"Admin - Fleet Ops", est:"1h 30m", type:"Last-mile delivery" },
      { id:22, desc:"Warehouse pickup — electronics batch", personnel:"Ravi PR", window:"10:45-12:00", loc:"Jebel Ali Free Zone", code:"JAFZA WAREHOUSE (JBL-019)", status:"In Progress", assigned:"19/06/2026 07:50", started:"19/06/2026 10:50", completed:null, by:"Admin - Fleet Ops", est:"1h 15m", type:"Warehouse pickup" },
      { id:23, desc:"Express delivery — fragile items", personnel:"Anjal", window:"12:30-13:30", loc:"Downtown Dubai", code:"DOWNTOWN (DXB-088)", status:"Assigned", assigned:"19/06/2026 08:25", started:null, completed:null, by:"Dispatch - Sarah M.", est:"1h", type:"Express delivery" },
      { id:24, desc:"Customer return pickup", personnel:"Ravi PR", window:"14:00-15:00", loc:"Al Barsha, MOE Area", code:"AL BARSHA (DXB-034)", status:"Completed", assigned:"19/06/2026 08:30", started:"19/06/2026 14:05", completed:"19/06/2026 14:42", by:"Admin - Fleet Ops", est:"1h", type:"Return pickup" },
    ]},
  { id:3, name:"Ravi Patel", vehicle:"Isuzu-49262", initials:"RP", color:"#ff9f0a", shift:"08:00 - 18:00",
    tasks:[
      { id:31, desc:"FMCG restock — supermarket route", personnel:"Priya S.", window:"08:00-10:00", loc:"Carrefour, City Centre", code:"DEIRA CC (DXB-011)", status:"Completed", assigned:"19/06/2026 07:45", started:"19/06/2026 08:02", completed:"19/06/2026 09:48", by:"Admin - Fleet Ops", est:"2h", type:"FMCG restock" },
      { id:32, desc:"Frozen goods — cold chain delivery", personnel:"Priya S.", window:"10:30-12:00", loc:"LuLu Hypermarket", code:"AL BARSHA LULU (DXB-027)", status:"Completed", assigned:"19/06/2026 07:50", started:"19/06/2026 10:35", completed:"19/06/2026 11:42", by:"Dispatch - Sarah M.", est:"1h 30m", type:"Cold chain delivery" },
      { id:33, desc:"Pickup empty crates from outlet", personnel:"Anjal", window:"12:30-13:30", loc:"Spinneys, The Greens", code:"GREENS (DXB-063)", status:"In Progress", assigned:"19/06/2026 08:00", started:"19/06/2026 12:35", completed:null, by:"Admin - Fleet Ops", est:"1h", type:"Crate pickup" },
      { id:34, desc:"Deliver promotional displays", personnel:"Priya S.", window:"14:00-15:30", loc:"Nesto, Al Nahda", code:"AL NAHDA (DXB-071)", status:"Assigned", assigned:"19/06/2026 08:10", started:null, completed:null, by:"Admin - Fleet Ops", est:"1h 30m", type:"Display delivery" },
    ]},
  { id:4, name:"Sami Khalil", vehicle:"Van-75626", initials:"SK", color:"#7a5ae0", shift:"09:00 - 19:00",
    tasks:[
      { id:41, desc:"Courier pickup — Speedex depot", personnel:"Ravi PR", window:"09:30-10:30", loc:"Speedex, Musaffah", code:"SPEEDEX (AUH-015)", status:"Completed", assigned:"19/06/2026 08:45", started:"19/06/2026 09:32", completed:"19/06/2026 10:15", by:"Admin - Fleet Ops", est:"1h", type:"Courier pickup" },
      { id:42, desc:"Last-mile delivery — customer doorstep", personnel:"Ravi PR", window:"11:00-12:00", loc:"Khalifa City, Abu Dhabi", code:"KHALIFA CITY (AUH-033)", status:"Completed", assigned:"19/06/2026 08:50", started:"19/06/2026 11:05", completed:"19/06/2026 11:48", by:"Dispatch - Omar A.", est:"1h", type:"Last-mile delivery" },
      { id:43, desc:"Cash-on-delivery collection", personnel:"Anjal", window:"12:30-13:30", loc:"Musaffah Industrial", code:"MUSAFFAH (AUH-041)", status:"Assigned", assigned:"19/06/2026 09:00", started:null, completed:null, by:"Admin - Fleet Ops", est:"1h", type:"COD collection" },
    ]},
  { id:5, name:"Priya Sharma", vehicle:"Pulsar-67602", initials:"PS", color:"#e85d75", shift:"07:00 - 17:00",
    tasks:[
      { id:51, desc:"Medical supplies delivery — urgent", personnel:"Anjal", window:"07:30-08:30", loc:"Mediclinic, City Walk", code:"CITY WALK (DXB-095)", status:"Completed", assigned:"19/06/2026 07:15", started:"19/06/2026 07:32", completed:"19/06/2026 08:18", by:"Admin - Fleet Ops", est:"1h", type:"Medical delivery" },
      { id:52, desc:"Pharmacy restock — cold chain", personnel:"Ravi PR", window:"09:00-10:30", loc:"Aster Pharmacy, Karama", code:"KARAMA (DXB-044)", status:"In Progress", assigned:"19/06/2026 07:20", started:"19/06/2026 09:05", completed:null, by:"Dispatch - Omar A.", est:"1h 30m", type:"Pharmacy restock" },
      { id:53, desc:"Lab sample pickup", personnel:"Anjal", window:"11:00-12:00", loc:"Al Noor Hospital", code:"AL NOOR (AUH-008)", status:"Assigned", assigned:"19/06/2026 07:25", started:null, completed:null, by:"Admin - Fleet Ops", est:"1h", type:"Sample pickup" },
    ]},
  { id:6, name:"Omar Ali", vehicle:"Corolla-66982", initials:"OA", color:"#00b4d8", shift:"08:30 - 18:30",
    tasks:[
      { id:61, desc:"Client visit — product demo setup", personnel:"Priya S.", window:"09:00-11:00", loc:"DIFC, Gate Village", code:"DIFC GATE (DXB-091)", status:"Assigned", assigned:"19/06/2026 08:30", started:null, completed:null, by:"Admin - Fleet Ops", est:"2h", type:"Client visit" },
      { id:62, desc:"Contract document collection", personnel:"Anjal", window:"11:30-12:30", loc:"JLT, Cluster D", code:"JLT (DXB-078)", status:"Assigned", assigned:"19/06/2026 08:35", started:null, completed:null, by:"Dispatch - Sarah M.", est:"1h", type:"Document collection" },
    ]},
  { id:7, name:"Faruk Driver", vehicle:"Isuzu-49262", initials:"FD", color:"#94a3b8", shift:"08:00 - 18:00", tasks:[] },
  { id:8, name:"Prashanth", vehicle:"Toyota-62387", initials:"PR", color:"#2dd4bf", shift:"07:00 - 17:00",
    tasks:[
      { id:81, desc:"FMCG bulk delivery — 15 outlets", personnel:"Anjal", window:"07:00-12:00", loc:"Multiple locations", code:"ROUTE A (DXB-MULTI)", status:"Completed", assigned:"19/06/2026 06:45", started:"19/06/2026 07:02", completed:"19/06/2026 11:48", by:"Admin - Fleet Ops", est:"5h", type:"Bulk delivery" },
      { id:82, desc:"Empty van return to depot", personnel:"Ravi PR", window:"12:30-13:00", loc:"Central Depot, Al Quoz", code:"DEPOT (DXB-001)", status:"Completed", assigned:"19/06/2026 06:50", started:"19/06/2026 12:32", completed:"19/06/2026 12:55", by:"Admin - Fleet Ops", est:"30m", type:"Van return" },
    ]},
];

const TMContext = createContext(null);

function TMProvider({ children }) {
  const [staff, setStaff] = useState(() => JSON.parse(JSON.stringify(INIT_STAFF)));
  const [selStaffId, setSelStaffId] = useState(1);
  const [selTaskId, setSelTaskId] = useState(13);

  const selStaff = useMemo(() => staff.find(s => s.id === selStaffId), [staff, selStaffId]);
  const selTask = useMemo(() => selStaff?.tasks.find(t => t.id === selTaskId) || null, [selStaff, selTaskId]);

  const stats = useCallback((s) => {
    const t = s.tasks;
    return { total:t.length, assigned:t.filter(x=>x.status==='Assigned').length, inProgress:t.filter(x=>x.status==='In Progress').length, completed:t.filter(x=>x.status==='Completed').length };
  }, []);

  const updateStatus = useCallback((staffId, taskId, newStatus) => {
    setStaff(prev => prev.map(s => {
      if (s.id !== staffId) return s;
      return { ...s, tasks: s.tasks.map(t => {
        if (t.id !== taskId) return t;
        const u = { ...t, status: newStatus };
        const now = tmNow();
        if (newStatus === 'Assigned') { u.started = null; u.completed = null; }
        else if (newStatus === 'In Progress') { if (!t.started) u.started = now; u.completed = null; }
        else if (newStatus === 'Completed') { if (!t.started) u.started = now; u.completed = now; }
        return u;
      })};
    }));
  }, []);

  const pickStaff = useCallback((id) => {
    setSelStaffId(id);
    const s = staff.find(st => st.id === id);
    if (s?.tasks.length) setSelTaskId(s.tasks[0].id); else setSelTaskId(null);
  }, [staff]);

  const val = useMemo(() => ({
    staff, selStaff, selTask, selStaffId, selTaskId,
    setSelTaskId, pickStaff, updateStatus, stats,
  }), [staff, selStaff, selTask, selStaffId, selTaskId, pickStaff, updateStatus, stats]);

  return <TMContext.Provider value={val}>{children}</TMContext.Provider>;
}

function useTM() { return useContext(TMContext); }

Object.assign(window, { TMProvider, useTM, TM_STATUS, TM_STATUS_COLORS, tmNow });
