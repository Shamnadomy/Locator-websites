// em-data.jsx — Shared data + state context for Expense Manager

const { createContext, useContext, useState, useMemo } = React;

const EM_CATEGORIES = {
  '--':                   { icon:'💰', color:'#22c55e', label:'Payment' },
  'ACCESSORIES PURCHASE': { icon:'🛒', color:'#7a5ae0', label:'Accessories Purchase' },
  'PARKING':              { icon:'🅿️', color:'#0ea5e9', label:'Parking' },
  'R&M- CARS':            { icon:'🔧', color:'#f59e0b', label:'R&M - Cars' },
};

const INIT_EXPENSES = [
  { id:1, date:'23/05/2026 18:50', employee:'anshad', category:'--', description:'Advance for Pettycash', billAmount:null, paidAmount:340.00, balance:340.00, type:'payment' },
  { id:2, date:'23/05/2026 18:49', employee:'anshad', category:'--', description:'bills reimbursement', billAmount:null, paidAmount:460.00, balance:0.00, type:'payment' },
  { id:3, date:'22/05/2026 17:57', employee:'anshad', category:'ACCESSORIES PURCHASE', description:'Cooling Sticker', billAmount:150.00, paidAmount:null, balance:-460.00, type:'expense' },
  { id:4, date:'20/05/2026 18:07', employee:'anshad', category:'ACCESSORIES PURCHASE', description:'Cycle Puncture', billAmount:20.00, paidAmount:null, balance:-310.00, type:'expense' },
  { id:5, date:'20/05/2026 16:31', employee:'anshad', category:'PARKING', description:'-', billAmount:100.00, paidAmount:null, balance:-290.00, type:'expense' },
  { id:6, date:'20/05/2026 16:26', employee:'anshad', category:'R&M- CARS', description:'Petrol -115', billAmount:115.00, paidAmount:null, balance:-190.00, type:'expense' },
  { id:7, date:'16/05/2026 12:43', employee:'anshad', category:'R&M- CARS', description:'VH No - 84759 - Date : 14-...', billAmount:110.00, paidAmount:null, balance:-75.00, type:'expense' },
  { id:8, date:'12/05/2026 19:34', employee:'anshad', category:'R&M- CARS', description:'Fuel Expenses Date : 10 - ...', billAmount:115.00, paidAmount:null, balance:35.00, type:'expense' },
  { id:9, date:'12/05/2026 19:07', employee:'anshad', category:'PARKING', description:'I got a payment failed m...', billAmount:50.00, paidAmount:null, balance:150.00, type:'expense' },
];

const EM_TOTAL_BALANCE = -1478.00;
const EM_TOTAL_BILL = 760.00;
const EM_TOTAL_PAID = 1100.00;

const EMContext = createContext(null);
const useEM = () => useContext(EMContext);

function EMProvider({ children }) {
  const [expenses] = useState(INIT_EXPENSES);
  const [selectedId, setSelectedId] = useState(null);
  const selectedExpense = useMemo(() => expenses.find(e => e.id === selectedId) || null, [expenses, selectedId]);

  const value = useMemo(() => ({
    expenses, selectedId, setSelectedId, selectedExpense,
    totalBalance: EM_TOTAL_BALANCE, totalBill: EM_TOTAL_BILL, totalPaid: EM_TOTAL_PAID,
  }), [expenses, selectedId, selectedExpense]);

  return <EMContext.Provider value={value}>{children}</EMContext.Provider>;
}

Object.assign(window, { EMProvider, useEM, EM_CATEGORIES, INIT_EXPENSES, EM_TOTAL_BALANCE, EM_TOTAL_BILL, EM_TOTAL_PAID });
