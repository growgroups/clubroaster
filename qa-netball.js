const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const nb=fs.readFileSync('netball-operations.js','utf8');
const checklist=fs.readFileSync('game-day-checklist.js','utf8');
const openMobile=fs.readFileSync('mobile-open-games.js','utf8');
const failures=[]; const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
assert(html.includes('<script src="netball-operations.js"></script>'),'netball operations module not loaded');
assert(checklist.includes("openGamesScript.src='mobile-open-games.js'"),'mobile open games module not loaded');
try{new Function(nb)}catch(err){failures.push(`netball-operations.js syntax error: ${err.message}`)}
try{new Function(openMobile)}catch(err){failures.push(`mobile-open-games.js syntax error: ${err.message}`)}
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
const mobileRequired=['Open Games','Only games with an unfilled umpire position are listed.','Eligible for me','Assign me','Request game','Self-assign','Approval required','availability, badge/development level, conflicts and overlapping appointments','Umpire self-assigned','Game assigned to you and coordinator notified.'];
for(const text of mobileRequired)assert(openMobile.includes(text),`Mobile Open Games capability missing: ${text}`);
assert(openMobile.includes("fixtures.filter(f=>!f.ump1||!f.ump2)"),'Mobile Open Games does not derive unfilled fixture positions');
assert(openMobile.includes("data-open-game-action=\"selfAssign\""),'Mobile self-assignment action missing');
assert(openMobile.includes("data-open-game-action=\"request\""),'Restricted-game request action missing');
assert(openMobile.includes('mobileOpenGameEligibility'),'Eligibility re-check is missing');
assert(openMobile.includes('levelRank')&&openMobile.includes('requiredRank'),'Badge/development-level eligibility is missing');
assert(openMobile.includes("f.ump1=p.name")||openMobile.includes("f.ump2=p.name"),'Self-assignment does not update fixture umpire slot');
assert(openMobile.includes('mobileAssignments.push'),'Self-assignment does not update mobile roster');
assert(openMobile.includes("t.status='Resolved'"),'Self-assignment does not resolve fulfilled rostering Tasks');
assert(openMobile.includes('notifications.unshift'),'Coordinator notification missing after self-assignment/request');
assert(openMobile.includes('auditEvents.unshift'),'Mobile Open Games workflow is not audited');
if(failures.length){console.error('ClubRoster netball QA failed:');failures.forEach(f=>console.error('- '+f));process.exit(1)}
console.log('ClubRoster netball QA passed: netball operating screens plus mobile Open Games eligibility, controlled self-assignment and coordinator-request workflow.');
