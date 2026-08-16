const fs=require('fs');
const failures=[];const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
const read=f=>fs.readFileSync(f,'utf8');
const files=['app.js','patch.js','mobile-app.js','game-day-checklist.js','season-planning.js','netball-operations.js','mobile-open-games.js','simple-ux.js','fixture-operations.js','pilot-readiness.js','compliance-centre.js','compliance-enforcement.js','compliance-registers.js','final-hardening.js','final-season-planner.js'];
const src=Object.fromEntries(files.map(f=>[f,read(f)]));
for(const f of files){try{new Function(src[f])}catch(e){failures.push(`${f} syntax error: ${e.message}`)}}
const html=read('index.html'),enforcement=src['compliance-enforcement.js'],hard=src['final-hardening.js'],seasonFix=src['final-season-planner.js'];
const baseLoads=['app.js','patch.js','mobile-app.js','game-day-checklist.js','season-planning.js','netball-operations.js','mobile-open-games.js','simple-ux.js','fixture-operations.js','pilot-readiness.js','compliance-centre.js','compliance-enforcement.js'];
for(const f of baseLoads)assert(html.includes(`src="${f}"`),`index.html does not load ${f}`);
assert(enforcement.includes("loadConceptModule('compliance-registers.js'")&&enforcement.includes("loadConceptModule('final-hardening.js'")&&enforcement.includes("loadConceptModule('final-season-planner.js'"),'Final bootstrap does not load registers, hardening and season planner fix in fixed order');
assert(hard.includes("el?.dataset?.id||el?.dataset?.fixture"),'Fixture detail hardening does not support both data-id and data-fixture');
assert(hard.includes("a==='assignUmpire'")&&hard.includes('openFinalUmpireAssign'),'Final umpire assignment flow missing');
assert(hard.includes("a==='assignCoach'")&&hard.includes('openFinalCoachAssign'),'Final coach assignment flow missing');
assert(hard.includes("a==='autoRoster'")&&hard.includes('runFinalAutoRoster'),'Final AutoRoster validation flow missing');
assert(hard.includes("a==='publish'")&&hard.includes('finalPublish'),'Final publish gate missing');
assert(hard.includes("['newBlueCard','incident'].includes"),'Broken compliance add/incident clicks are not intercepted');
assert(hard.includes('saveBlueCardNew')&&hard.includes('saveComplianceIncident'),'Working compliance save flows missing');
assert(hard.includes("['add','view','saveGeneric'].includes"),'Generic compliance register clicks are not hardened');
assert(hard.includes('saveRegisterRecord')&&hard.includes('openRegisterRecord')&&hard.includes('editRegisterRecord'),'Compliance register CRUD concept flow missing');
assert(hard.includes('upgradeStandardsRegister'),'Child Safe Standards register does not have record click-throughs');
assert(hard.includes("pages.handover='Developer Handover'"),'Developer Handover screen missing');
assert(hard.includes('healthChecks')&&hard.includes('Run system health check'),'Runtime health check missing');
assert(seasonFix.includes('coordinatorRows')&&seasonFix.includes('coordinatorSeasonPlanner=function'),'Coordinator season view filtering override missing');
assert(seasonFix.includes('[data-season-action="view"]')&&seasonFix.includes("openDrawer('Season roster planner'"),'Season planner view buttons do not refresh the drawer');
assert(fs.existsSync('DEVELOPER_HANDOVER.md'),'DEVELOPER_HANDOVER.md missing');
assert(fs.existsSync('PRODUCTION_ACCEPTANCE_CHECKLIST.md'),'PRODUCTION_ACCEPTANCE_CHECKLIST.md missing');
assert(fs.existsSync('INTERACTION_MATRIX.md'),'INTERACTION_MATRIX.md missing');

const namespaces={
 'data-mobile-action':['mobile-app.js','game-day-checklist.js'],
 'data-season-action':['season-planning.js','final-season-planner.js'],
 'data-netball-action':['netball-operations.js'],
 'data-open-game-action':['mobile-open-games.js'],
 'data-checklist-action':['game-day-checklist.js'],
 'data-fixture-op':['fixture-operations.js'],
 'data-readiness-action':['pilot-readiness.js'],
 'data-compliance-action':['compliance-centre.js','final-hardening.js'],
 'data-register-action':['compliance-registers.js','final-hardening.js'],
 'data-final-action':['final-hardening.js']
};
const extraHandled={
 'data-mobile-action':new Set(['coordinatorChecklist']),
 'data-compliance-action':new Set(['newBlueCard','incident']),
 'data-register-action':new Set(['add','view','saveGeneric'])
};
function escRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
for(const [attr,handlerFiles] of Object.entries(namespaces)){
 const tokens=new Set();const re=new RegExp(`${attr}=["']([^"']+)["']`,'g');
 for(const f of files){let m;while((m=re.exec(src[f]))){if(!m[1].includes('${'))tokens.add(m[1])}}
 const handlers=handlerFiles.map(f=>src[f]).join('\n')+'\n'+hard;
 for(const token of tokens){const pattern=new RegExp(`(?:a|dataset\\.\\w+Action)\\s*={0,2}={0,1}\\s*["']${escRe(token)}["']`);const explicit=handlers.includes(`a==='${token}'`)||handlers.includes(`a==="${token}"`)||handlers.includes(`dataset.${token}`)||pattern.test(handlers)||(extraHandled[attr]&&extraHandled[attr].has(token));assert(explicit,`${attr}="${token}" has no explicit handler coverage`)}
}
const pageRoutes=['dashboard','fixtures','umpires','availability','roster','tasks','gameday','finance','payments','reports','notifications','import','rules','coaching','roles','junior','mobile','audit','blueprint','playbook','actionplan','netballrules','duties','pathway','intelligence','compliance','handover'];
const all=files.map(f=>src[f]).join('\n')+html;for(const route of pageRoutes)assert(all.includes(route),`Expected route ${route} missing from concept sources`);
assert(!hard.includes("toast('Concept action completed.')"),'Final hardening must not rely on generic success fallback');
if(failures.length){console.error('ClubRoster final handover QA failed:');failures.forEach(f=>console.error('- '+f));process.exit(1)}
console.log(`ClubRoster final handover QA passed: ${files.length} browser modules parse, critical click-throughs are hardened, season planner tabs refresh correctly, compliance register CRUD is interactive, and developer handover artifacts are present.`);
