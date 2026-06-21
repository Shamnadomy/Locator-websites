// fm-data.jsx — Data for Fleet Manager Module

const FM_VEHICLE = 'Rahba Camry 98359';
const FM_VEHICLE_ALT = 'SKMC Camry 26635';

const FM_SERVICE_REMINDERS = [
  { name:'Oil Change / Service', prevOdo:'248673.8', periodic:'10000 KM', currentOdo:'286772.59', overdue:true, comments:'Service overdue by 28098.79 KM' },
  { name:'Brake Pad Replacement', prevOdo:'275000.0', periodic:'15000 KM', currentOdo:'286772.59', comments:'' },
  { name:'Tire Rotation', prevOdo:'280000.0', periodic:'8000 KM', currentOdo:'286772.59', comments:'' },
  { name:'Air Filter Change', prevOdo:'278500.0', periodic:'5000 KM', currentOdo:'286772.59', comments:'' },
  { name:'Transmission Fluid', prevOdo:'260000.0', periodic:'20000 KM', currentOdo:'280000.0', comments:'' },
  { name:'Coolant Flush', prevOdo:'265000.0', periodic:'15000 KM', currentOdo:'280000.0', comments:'' },
  { name:'Spark Plug Replacement', prevOdo:'250000.0', periodic:'30000 KM', currentOdo:'280000.0', comments:'' },
  { name:'Battery Replacement', prevOdo:'255000.0', periodic:'25000 KM', currentOdo:'280000.0', comments:'' },
];

const FM_DOC_REMINDERS = [
  { type:'Mulkia', expiry:'28-05-2026', interval:'2 Week', expired:true, comments:'Renewal pending — contact RTA' },
  { type:'Insurance', expiry:'28-06-2026', interval:'2 Week', comments:'Coverage by AXA Gulf' },
  { type:'Registration', expiry:'15-03-2025', interval:'1 Month', comments:'' },
  { type:'Insurance', expiry:'20-12-2025', interval:'2 Week', comments:'' },
  { type:'Mulkia', expiry:'10-06-2024', interval:'2 Week', comments:'' },
  { type:'Insurance', expiry:'05-09-2024', interval:'1 Month', comments:'' },
];

const FM_SERVICE_ENTRIES = [
  { name:'Oil/oil filter changed', date:'09-01-2026', odometer:'239180', cost:0, comments:'Regular maintenance' },
  { name:'Brake Service', date:'15-08-2025', odometer:'235000', cost:450, comments:'' },
  { name:'Tire Replacement', date:'22-05-2025', odometer:'230000', cost:1200, comments:'' },
  { name:'Transmission Repair', date:'10-11-2024', odometer:'220000', cost:2500, comments:'' },
  { name:'AC Service', date:'03-07-2024', odometer:'215000', cost:350, comments:'' },
  { name:'Engine Tune-up', date:'18-03-2023', odometer:'200000', cost:800, comments:'' },
];

const FM_FUEL_ENTRIES = [
  { date:'15-06-2025', odometer:'285000', qty:'45.5', rate:'2.85', cost:129.68 },
  { date:'01-06-2025', odometer:'284500', qty:'42.0', rate:'2.90', cost:121.80 },
  { date:'15-05-2025', odometer:'284000', qty:'38.0', rate:'2.88', cost:109.44 },
  { date:'01-05-2025', odometer:'283500', qty:'40.0', rate:'2.85', cost:114.00 },
  { date:'20-12-2024', odometer:'282000', qty:'50.0', rate:'2.95', cost:147.50 },
  { date:'05-11-2024', odometer:'281500', qty:'35.0', rate:'2.80', cost:98.00 },
];

const FM_OTHER_EXPENSES = [
  { type:'Parking Fees', date:'10-06-2025', amount:'150.00', desc:'Monthly parking permit' },
  { type:'Toll Charges (Salik)', date:'25-05-2025', amount:'85.00', desc:'Highway tolls' },
  { type:'Car Wash', date:'15-12-2024', amount:'45.00', desc:'Interior + exterior cleaning' },
  { type:'Parking Fees', date:'10-11-2024', amount:'150.00', desc:'Monthly parking permit' },
  { type:'Fine Payment', date:'20-08-2023', amount:'500.00', desc:'Speeding violation' },
];

Object.assign(window, {
  FM_VEHICLE, FM_VEHICLE_ALT,
  FM_SERVICE_REMINDERS, FM_DOC_REMINDERS, FM_SERVICE_ENTRIES, FM_FUEL_ENTRIES, FM_OTHER_EXPENSES,
});
