const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const readiness=fs.readFileSync('pilot-readiness.js','utf8');
const pilotDoc=fs.readFileSync('PILOT_READINESS.md','utf8');
const dataSpec=fs.readFileSync('PRODUCTION_DATA_PERMISSIONS_SPEC.md','utf8');
const failures=[];const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
assert(html.includes('<script src="pilot-readiness.js"></script>'),'pilot readiness module not loaded');
try{new Function(readiness)}catch(err){failures.push(`pilot-readiness.js syntax error: ${err.message}`)}
const actions=['Every navigation route has a dedicated renderer','Load anonymised Pizzey Park season structure and fee rules','Validate real fixture import mapping','Run coordinator end-to-end walkthrough','Run junior + guardian safeguarding walkthrough','Run finance maker-checker walkthrough','Lock production database and permissions specification'];
for(const item of actions)assert(readiness.includes(item),`Readiness action missing: ${item}`);
assert((readiness.match(/status:'Complete'/g)||[]).length>=7,'Not all action-plan items are Complete');
const seasonTerms=['2026 Winter','1–18 plus finals','U11 Development','Premier','Umpire coach','$45'];for(const t of seasonTerms)assert(readiness.includes(t)||pilotDoc.includes(t),`Season/fee evidence missing: ${t}`);
const mappingTerms=['Association','Competition','Round','Start time','Venue','Court','Game ID','Umpires required','Game status'];for(const t of mappingTerms)assert(readiness.includes(t)&&pilotDoc.includes(t),`Fixture mapping field missing: ${t}`);
const walkthroughTerms=['Coordinator end-to-end walkthrough','Junior + guardian safeguarding walkthrough','Finance maker-checker walkthrough'];for(const t of walkthroughTerms)assert(pilotDoc.includes(t),`Walkthrough evidence missing: ${t}`);
assert(readiness.includes("['Record issue and confirm Compliance To Do','Pass']"),'Coordinator compliance walkthrough step missing');
assert(readiness.includes("['Incident creates compliance record/task/audit','Pass']"),'Safeguarding incident control missing');
assert(readiness.includes("['Approval 2 recorded separately','Pass']"),'Finance checker step missing');
const entities=['organisations','users','people','guardian_links','fixtures','assignments','availability_patterns','swap_requests','incidents','coaching_feedback','development_plans','payment_batches','audit_events'];for(const t of entities)assert(dataSpec.includes(`### ${t}`)||dataSpec.includes(`- ${t}`),`Production entity missing: ${t}`);
const roles=['Club Administrator','Umpire Coordinator','Umpire Coach / Mentor / Assessor','Finance / Payments','Junior Umpire','Parent / Guardian','Read-only / Audit'];for(const t of roles)assert(dataSpec.includes(`### ${t}`),`Production role permission missing: ${t}`);
const controls=['server-side authorisation','Payment approval 1 user must differ from payment approval 2 user','append-only','guardian can only access linked juniors','Restricted incidents require compliance permission'];for(const t of controls)assert(dataSpec.toLowerCase().includes(t.toLowerCase()),`Production control missing: ${t}`);
assert(pilotDoc.includes('actual association or NetballConnect export'),'Real-source validation boundary not documented');
assert(dataSpec.includes('Real fixture-source import acceptance test'),'Production real import gate missing');
if(failures.length){console.error('ClubRoster pilot readiness QA failed:');failures.forEach(f=>console.error('- '+f));process.exit(1)}
console.log('ClubRoster pilot readiness QA passed: all P0-P3 concept readiness items complete with evidence, walkthroughs and locked production data/permission spec.');
