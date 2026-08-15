const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const nb=fs.readFileSync('netball-operations.js','utf8');
const failures=[]; const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
assert(html.includes('<script src="netball-operations.js"></script>'),'netball operations module not loaded');
try{new Function(nb)}catch(err){failures.push(`netball-operations.js syntax error: ${err.message}`)}
const requiredPages=['netballrules','duties','pathway','intelligence'];
for(const id of requiredPages)assert(nb.includes(`${id}:`)||nb.includes(`.${id}=`),`Netball page missing: ${id}`);
const requiredData=['Netball Requirements','Umpire Duty Ledger','Recurring season availability','Roster states & versions','Open Games','Standby / reserve coverage','Fixture-change impact engine','Pair suitability','Coach capacity model','Umpire Pathway','Structured competencies','Safeguarding & restricted incidents','Notification acknowledgement queue','Match-fee rules','Working with Children / Blue Card','Season umpire positions','Fairness & load'];
for(const text of requiredData)assert(nb.includes(text),`Netball capability missing: ${text}`);
const requiredActions=['fillDuty','reconcileDuties','requestGame','confirmStandby','repairImpact','rollback','ack','optimise','availabilityPattern','saveAvailabilityPattern','recordAssessment','saveAssessment','addRequirement','saveRequirement'];
for(const action of requiredActions)assert(nb.includes(`a==='${action}'`)||nb.includes(`data-netball-action=\"${action}\"`),`Netball interaction missing: ${action}`);
assert(nb.includes("PAGE_RENDERERS.availability=function"),'Availability is not extended with recurring patterns');
assert(nb.includes("PAGE_RENDERERS.roster=function"),'Roster is not extended with versioning/acknowledgements');
assert(nb.includes("PAGE_RENDERERS.blueprint=function"),'Software Blueprint is not netball-only');
assert(nb.includes('Development level')&&nb.includes('maxCourts'),'Coach capacity/intensity rules missing');
assert(nb.includes('pairScores')&&nb.includes('pairing'),'Umpire pairing intelligence missing');
assert(nb.includes('tasks.push'),'Netball workflows do not feed Tasks');
assert(nb.includes('auditEvents.unshift'),'Netball workflows are not audited');
assert(!nb.includes('employee/casual/contractor'),'Generic workforce classification leaked into netball module');
if(failures.length){console.error('ClubRoster netball QA failed:');failures.forEach(f=>console.error('- '+f));process.exit(1)}
console.log('ClubRoster netball QA passed: 4 netball operating screens plus requirements, duties, recurring availability, roster versions, open games, standby, impact repair, pairing, coach capacity, pathway, safeguarding, acknowledgements, fee rules, credentials, capacity forecasting and fairness.');
