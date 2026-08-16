const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const c=fs.readFileSync('compliance-centre.js','utf8');
const e=fs.readFileSync('compliance-enforcement.js','utf8');
const r=fs.readFileSync('compliance-registers.js','utf8');
const spec=fs.readFileSync('COMPLIANCE_SAFEGUARDING_SPEC.md','utf8');
const failures=[];const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
assert(html.includes('<script src="compliance-centre.js"></script>'),'Compliance centre is not loaded');
assert(html.includes('<script src="compliance-enforcement.js"></script>'),'Compliance enforcement is not loaded');
assert(e.includes("s.src='compliance-registers.js'"),'Compliance registers module is not loaded');
try{new Function(c)}catch(err){failures.push('compliance-centre.js syntax error: '+err.message)}
try{new Function(e)}catch(err){failures.push('compliance-enforcement.js syntax error: '+err.message)}
try{new Function(r)}catch(err){failures.push('compliance-registers.js syntax error: '+err.message)}
for(const text of ['Compliance & Safeguarding','Blue Card / Working with Children register','Queensland Child Safe Standards','Universal Principle','Safeguarding policies & evidence','Training & induction','Restricted safeguarding & incident register','Completed readiness phases','Exemption recorded','organisation linking'])assert(c.includes(text),'Compliance capability missing: '+text);
for(let i=1;i<=10;i++)assert(c.includes("['"+i+"'"),'Child Safe Standard '+i+' missing');
assert(c.includes("['UP'"),'Universal Principle record missing');
assert(c.includes('Paid junior umpire')&&c.includes('Required if paid child-related referee'),'Paid junior umpire Blue Card assessment missing');
assert(c.includes('Parent volunteer')&&c.includes('Review exemption'),'Parent volunteer exemption review missing');
assert(c.includes('allocationCompliance'),'Allocation compliance function missing');
assert(e.includes('eligibleForFixture')&&e.includes('allocationCompliance'),'Fixture eligibility is not compliance-gated');
assert(e.includes('mobileOpenGameEligibility')&&e.includes('Compliance: '),'Open Games self-assignment is not compliance-gated');
assert(e.includes('saveAssignments'),'Manual fixture assignment is not compliance-gated');
for(const text of ['Child Safe Organisations Act 2024','1 April 2026','Blue Card','paid sports referee','child volunteering as a referee','Netball Queensland','Netball Australia'])assert(spec.includes(text),'Compliance spec missing legal/policy baseline: '+text);
assert(c.includes("auditEvents.unshift"),'Compliance changes are not audited');
assert(c.includes("data-go=\"actionplan\""),'Completed readiness phases are not linked from Compliance/Home');
for(const text of ['Blue Cards / WWCC','Child Safe Standards','Incidents & complaints','Training & induction','Policies & procedures','Screening & recruitment','Guardian & junior','Accreditation & qualifications','Codes of Conduct','Risk & game-day safety','Compliance actions & expiry','Audit & review'])assert(r.includes(text),'Compliance register missing: '+text);
assert(r.includes('registerDefs')&&r.includes('registersHub'),'Registers hub renderer missing');
assert(r.includes("data-register-action=\"add\"")&&r.includes("data-register-action=\"view\""),'Register add/view actions missing');
assert(r.includes('auditEvents.unshift'),'Register changes are not audited');
if(failures.length){console.error('ClubRoster compliance QA failed:');failures.forEach(f=>console.error('- '+f));process.exit(1)}
console.log('ClubRoster compliance QA passed: visible compliance centre, Blue Card controls, Queensland Child Safe Standards, 12 compliance registers, safeguarding records, readiness visibility and allocation gating.');
