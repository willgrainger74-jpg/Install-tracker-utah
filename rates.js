// ═══════════════════════════════════════════════════════════════
// ACTION INSTALL TRACKER — SHARED PIECE-RATE SHEET
// Single source of truth for tiers, hourly scale, and piece rates.
// Every page loads this file; edit rates HERE (or in the Manager
// tab, which overrides these defaults via Firebase).
// ═══════════════════════════════════════════════════════════════
const TIERS=[['helper1','Helper 1'],['helper2','Helper 2'],['helper3','Helper 3'],['lead1','Lead 1'],['lead2','Lead 2'],['lead3','Lead 3']];
const TIER_LABEL={helper1:'Helper 1',helper2:'Helper 2',helper3:'Helper 3',lead1:'Lead 1',lead2:'Lead 2',lead3:'Lead 3'};
const HOURLY_TIERS={helper1:20,helper2:24,helper3:28,lead1:30,lead2:35,lead3:40};
const RATE_SHEET={
    hvac:[
        {name:'Swap',helper1:120,helper2:160,helper3:200,lead1:220,lead2:240,lead3:280},
        {name:'Full / Add',helper1:220,helper2:240,helper3:280,lead1:300,lead2:360,lead3:400},
        {name:'Water Heater / Water Softener',helper1:100,helper2:100,helper3:180,lead1:180,lead2:180,lead3:180}
    ],
    plumbing:[
        {name:'Water Heater / Water Softener',helper1:100,helper2:100,helper3:180,lead1:180,lead2:180,lead3:180},
        {name:'Water/Drain Repipe > 800 sq ft',helper1:80,helper2:120,helper3:160,lead1:180,lead2:220,lead3:260},
        {name:'Water/Drain Repipe — 2 bath or less',helper1:280,helper2:320,helper3:360,lead1:400,lead2:440,lead3:480},
        {name:'Water/Drain Repipe — 2 bath or more',helper1:480,helper2:520,helper3:560,lead1:600,lead2:640,lead3:680},
        {name:"Basement Breakup to 20' (incl. backfill)",helper1:240,helper2:280,helper3:320,lead1:360,lead2:400,lead3:440},
        {name:'Floor Drain / Sump Pump Swap',helper1:60,helper2:80,helper3:100,lead1:120,lead2:140,lead3:160},
        {name:'Stack Replacement',helper1:120,helper2:160,helper3:200,lead1:240,lead2:280,lead3:320},
        {name:'Shower Valve / Toilet Flange',helper1:60,helper2:70,helper3:80,lead1:90,lead2:100,lead3:110},
        {name:'Sump Pump System / Sewage Ejection Pump System',helper1:180,helper2:220,helper3:260,lead1:300,lead2:340,lead3:380},
        {name:'Sewage Ejection Pump Swap',helper1:90,helper2:105,helper3:120,lead1:150,lead2:190,lead3:230},
        {name:'Main Valve & PRV / Toilet / Angle Stop / Faucet / Disposal / Halo Ion / Hose Bib',helper1:20,helper2:24,helper3:28,lead1:30,lead2:35,lead3:40}
    ],
    electrical:[
        {name:'SER Pull over 40 ft',helper1:90,helper2:90,helper3:90,lead1:150,lead2:150,lead3:150},
        {name:'Circuit Restore',helper1:50,helper2:50,helper3:50,lead1:75,lead2:75,lead3:75},
        {name:'Basement Rough In',helper1:312,helper2:372,helper3:420,lead1:520,lead2:620,lead3:700},
        {name:'Meter / Panel Combo',helper1:252,helper2:294,helper3:336,lead1:420,lead2:490,lead3:560},
        {name:'Panel',helper1:150,helper2:168,helper3:192,lead1:250,lead2:280,lead3:320},
        {name:'Sub-panel',helper1:130,helper2:145,helper3:168,lead1:215,lead2:245,lead3:280},
        {name:'Meter',helper1:150,helper2:168,helper3:192,lead1:250,lead2:280,lead3:320},
        {name:'Whole House Re-wire — up to 2500 sq ft',helper1:840,helper2:978,helper3:1104,lead1:1400,lead2:1630,lead3:1840},
        {name:'Whole House Re-wire — 2500–3500 sq ft',helper1:1700,helper2:1780,helper3:1830,lead1:2650,lead2:2850,lead3:3050},
        {name:'Home Run',helper1:50,helper2:50,helper3:50,lead1:75,lead2:75,lead3:75},
        {name:'Generator',helper1:210,helper2:210,helper3:210,lead1:320,lead2:320,lead3:320}
    ],
    underground:[
        {name:'Dig',helper1:100,helper2:120,helper3:140,lead1:160,lead2:180,lead3:210},
        {name:'Non-typical Dig',helper1:160,helper2:170,helper3:180,lead1:200,lead2:220,lead3:240},
        {name:'Liner / ft',helper1:2,helper2:2.5,helper3:3,lead1:3.5,lead2:4,lead3:4.5},
        {name:'Backfill',helper1:100,helper2:130,helper3:150,lead1:160,lead2:180,lead3:210},
        {name:'Non-typical Backfill',helper1:160,helper2:170,helper3:180,lead1:200,lead2:220,lead3:240},
        {name:'Hand Dig',helper1:140,helper2:160,helper3:180,lead1:220,lead2:250,lead3:275}
    ]
};
const TRADE_ITEMS={underground:[],plumbing:[],hvac:[],electrical:[]};
Object.keys(RATE_SHEET).forEach(k=>{TRADE_ITEMS[k]=RATE_SHEET[k].map(x=>x.name);});
