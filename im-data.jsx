// im-data.jsx — Shared data + state context for Inspection Module

const { createContext: imCreateCtx, useContext: imUseCtx, useState: imUseState, useMemo: imUseMemo } = React;

const IM_MANDATORY = [
  'Registration Card','Insurance','Fuel','Wiper','Tyre','First Aid','AC','Engine','Service due','Fire Extinguisher Expiry'
];
const IM_OPTIONAL = ['Spare tyre','Fire extinguisher'];

const IM_CHECKLIST_CURRENT = {
  'Registration Card':true,'Insurance':true,'Fuel':true,'Wiper':true,'Tyre':true,
  'First Aid':true,'AC':true,'Engine':true,'Service due':true,'Fire Extinguisher Expiry':true,
  'Spare tyre':true,'Fire extinguisher':true,
};
const IM_CHECKLIST_PREV = {
  'Registration Card':true,'Insurance':true,'Fuel':true,'Wiper':false,'Tyre':true,
  'First Aid':true,'AC':true,'Engine':true,'Service due':true,'Fire Extinguisher Expiry':true,
  'Spare tyre':true,'Fire extinguisher':true,
};

const IM_LOGS = [
  { date:'28/05/2026, 1:48:13 pm', inspector:'FARMAN ALI', score:83, selected:true },
  { date:'26/05/2026, 10:45:58 am', inspector:'FAIZUL HASSAN', score:75 },
  { date:'25/05/2026, 9:16:49 am', inspector:'FAIZUL HASSAN', score:66 },
  { date:'23/05/2026, 6:19:06 pm', inspector:'FARMAN ALI', score:83 },
  { date:'23/05/2026, 9:04:56 am', inspector:'FAIZUL HASSAN', score:75 },
  { date:'21/05/2026, 1:54:21 pm', inspector:'VIJO DEVASSY', score:66 },
  { date:'21/05/2026, 11:29:26 am', inspector:'ABDUL RAHIM', score:83 },
  { date:'20/05/2026, 7:43:07 am', inspector:'ABDUL RAHIM', score:83 },
  { date:'19/05/2026, 5:01:47 pm', inspector:'FARMAN ALI', score:83 },
  { date:'19/05/2026, 3:09:32 pm', inspector:'FAIZUL HASSAN', score:75 },
  { date:'19/05/2026, 1:34:28 pm', inspector:'ABDUL RAHIM', score:83 },
  { date:'17/05/2026, 4:41:58 pm', inspector:'SHAHUL HAMEED', score:66 },
  { date:'15/05/2026, 12:51:54 pm', inspector:'SUHAIL', score:58 },
  { date:'14/05/2026, 7:39:17 pm', inspector:'NOOR GHULAM', score:83 },
];

const IM_MOBILE_RECORDS = [
  { date:"19 Jun '26, 09:58 AM", inspector:'Ijaz', score:83 },
  { date:"18 Jun '26, 09:31 AM", inspector:'Aziz Rehman', score:83 },
  { date:"16 Jun '26, 07:54 AM", inspector:'Aziz Rehman', score:83 },
  { date:"15 Jun '26, 08:22 AM", inspector:'Ijaz', score:83 },
  { date:"14 Jun '26, 09:11 AM", inspector:'Ijaz', score:83 },
  { date:"12 Jun '26, 07:42 AM", inspector:'Aziz Rehman', score:83 },
  { date:"11 Jun '26, 07:32 AM", inspector:'Aziz Rehman', score:83 },
];

const IM_SCRATCHES = [
  { type:'Scratch', desc:'No Description', location:'Front' },
  { type:'Scratch', desc:'No Description', location:'Left' },
];

const IM_CAR_VIEWS = ['top','front','rear','left','right'];
const IM_CAR_LABELS = ['Top','Front','Rear','Left','Right'];

Object.assign(window, {
  IM_MANDATORY, IM_OPTIONAL, IM_CHECKLIST_CURRENT, IM_CHECKLIST_PREV,
  IM_LOGS, IM_MOBILE_RECORDS, IM_SCRATCHES, IM_CAR_VIEWS, IM_CAR_LABELS,
});
