const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const app=fs.readFileSync('app.js','utf8');
const patch=fs.readFileSync('patch.js','utf8');
const mobile=fs.readFileSync('mobile-app.js','utf8');
const checklist=fs.readFileSync('game-day-checklist.js','utf8');
const season=fs.readFileSync('season-planning.js','utf8');
const failures=[];const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
const requiredPages=['dashboard','fixtures','umpires','availability','roster','tasks','gameday','finance','payments','reports','notifications','import','rules','coaching','roles','junior','mobile','audit','blueprint','playbook','actionplan'];
assert(html.includes('<script src="app.js"></script>'),'index.html does not load app.js');
assert(html.includes('<script src="patch.js"></script>'),'index.html does not load patch.js');
assert(html.includes('<script src="mobile-app.js"></script>'),'index.html does not load mobile-app.js');
assert(html.includes('<script src="game-day-checklist.js"></script>'),'index.html does not load game-day-checklist.js');
assert(checklist.includes("seasonPlanningScript.src='season-planning.js'"),'Season planning module is not loaded');
assert(html.includes('data-action="home"'),'Home breadcrumb is not wired');
assert(html.includes('data-action="current"'),'Current-page breadcrumb is not wired');
assert(html.includes('data-action="season"'),'Season breadcrumb is not wired');
assert(!/href\s*=\s*(['"])#\1/i.test(html),'Placeholder # link found');
try{new Function(app)}catch(err){failures.push(`app.js syntax error: ${err.message}`)}
try{new Function(patch)}catch(err){failures.push(`patch.js syntax error: ${err.message}`)}
try{new Function(mobile)}catch(err){failures.push(`mobile-app.js syntax error: ${err.message}`)}
try{new Function(checklist)}catch(err){failures.push(`game-day-checklist.js syntax error: ${err.message}`)}
try{new Function(season)}catch(err){failures.push(`season-planning.js syntax error: ${err.message}`)}
const pageObject=app.match(/const pages=\{([^;]+)\};/s)?.[1]||'';
const pageIds=new Set([...pageObject.matchAll(/([A-Za-z][A-Za-z0-9]*):'/g)].map(m=>m[1]));
for(const id of requiredPages)assert(pageIds.has(id),`Page missing from pages object: ${id}`);
const rendererObject=app.match(/const PAGE_RENDERERS=\{([^;]+)\};/s)?.[1]||'';
const rendererEntries=rendererObject.split(',').map(x=>x.trim());
for(const id of requiredPages)assert(rendererEntries.includes(id)||rendererEntries.some(x=>x.startsWith(id+':')),`Dedicated renderer missing: ${id}`);
assert(!app.includes('simplePage'),'Generic placeholder renderer still exists');
assert(!app.includes('remains connected to the prototype'),'Placeholder copy still exists');
assert(app.includes('b.dataset.go=id'),'Dynamic sidebar navigation is not wired');
assert(app.includes("document.addEventListener('click'"),'Delegated click handler is missing');
assert(app.includes("['SETTINGS',['import'"),'Season Import is not positioned under Settings');
const requiredFunctions=['dashboard','fixturesPage','umpiresPage','availabilityPage','rosterPage','tasksPage','gameDayPage','financePage','paymentsPage','reportsPage','notificationsPage','importPage','rulesPage','coachingPage','rolesPage','juniorPage','mobilePage','auditPage','blueprintPage','playbookPage','actionPlanPage'];
for(const fn of requiredFunctions)assert(new RegExp(`function ${fn}\\(`).test(app),`Page renderer function missing: ${fn}`);
const requiredData=['Parent / spectator abuse','Club Umpire Registration','Green Bib','Blue Bib','C Badge','Senior Umpire Coach','PAY-R08-001','U11 Development','Gold Coast Netball','Round 8 appointment','Guardian linked','No umpires allocated','Bank CSV','Xero CSV'];
for(const text of requiredData)assert(app.includes(text),`Required dummy data missing: ${text}`);
assert(app.includes('approval1')&&app.includes('approval2'),'Two-person payment approval state is missing');
assert(app.includes('downloadCsv'),'CSV download helper is missing');
assert(app.includes('actionAccess'),'Operational action authorisation is missing');
assert(app.includes('auditEvents'),'Audit trail data is missing');
const mobileRequired=['mobilePersonas','mobileAssignments','mobileChats','developmentPlans','PAGE_RENDERERS.mobile=mobileAppPage','Umpire · Mia P','Umpire Coach · Karen W','Umpire Coordinator · Alex C','Game-day Admin · Jordan A','Guardian · Sam J','Accept','Decline game','I have arrived','Game completed','Coaching completed','Game chat','Report incident / issue','Add umpire feedback','My development','My payments','Live court coverage','Close / verify day'];
for(const text of mobileRequired)assert(mobile.includes(text),`Mobile workflow/data missing: ${text}`);
const checklistRequired=['Before first games','Arrival & first whistle','During play','End of day','Confirm every game has required umpires and coaches','Review late/no-show list','Review and triage any incident','Confirm all umpire assignments are marked completed','Reconcile completed assignments to match-fee/payment lines','Create Tasks for outstanding','Sign off game day','coordinatorChecklist'];
for(const text of checklistRequired)assert(checklist.includes(text),`Coordinator checklist missing: ${text}`);
const seasonRequired=['futureRoster','futureAvailability','swapRequests','Upcoming','Next week','Month','Season','Set future availability','Request swap','Awaiting umpire acceptance','Awaiting coordinator approval','Season roster planner','availability, accreditation/development level, team/family conflict and assignment overlap','approveSwap','rejectSwap','acceptSwap','declineSwap','Future availability changed','Umpire swap approved'];
for(const text of seasonRequired)assert(season.includes(text),`Season planning/swaps missing: ${text}`);
assert(season.includes("data-season-action=\"view\""),'Roster horizon views are not interactive');
assert(season.includes("data-season-action=\"saveAvailability\""),'Future availability save action missing');
assert(season.includes("data-season-action=\"swap\""),'Swap request action missing');
assert(season.includes("result:'Eligible'"),'Swap eligibility ranking missing');
assert(season.includes("s.status='Approved'"),'Coordinator approval does not complete swap');
assert(season.includes("r.person=s.to"),'Approved swap does not update assignment owner');
assert(season.includes("type:'Rostering'"),'Swap request does not create rostering Task');
assert(season.includes("auditEvents.unshift"),'Season planning changes are not audited');
if(failures.length){console.error('ClubRoster static QA failed:');failures.forEach(f=>console.error('- '+f));process.exit(1)}
console.log(`ClubRoster static QA passed: ${requiredPages.length} substantive screens, mobile role lifecycles, coordinator checklist, four forward roster horizons, advance availability and controlled umpire swaps.`);
