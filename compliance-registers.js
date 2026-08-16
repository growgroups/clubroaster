const complianceRegisterState={active:'bluecards'};
const screeningRegister=[
['SCR-001','Karen W','Umpire Coach','Blue Card verified; role screening complete','Complete','1 Aug 2026','Compliance Lead'],
['SCR-002','Donna R','Umpire Coach','Blue Card verified; safeguarding refresher due','Review due','1 Sep 2026','Compliance Lead'],
['SCR-003','Alex C','Umpire Coordinator','Blue Card verified; coordinator induction complete','Complete','5 Aug 2026','Club Secretary'],
['SCR-004','Sam J','Parent Volunteer','Exemption basis recorded; role limited to own-child activity','Complete','12 Aug 2026','Club Secretary']
];
const guardianRegister=[
['GAR-001','Ella J','Sam J','Guardian linked','Acknowledged','10 Aug 2026','Coordinator'],
['GAR-002','Ruby S','Taylor S','Guardian linked','Acknowledged','8 Aug 2026','Coordinator'],
['GAR-003','Mia P','Chris P','Guardian linked','Needs annual acknowledgement','31 Aug 2026','Coordinator']
];
const accreditationRegister=[
['ACC-001','Ella J','Green Bib','Current','31 Mar 2027','Umpire Coordinator'],
['ACC-002','Ruby S','Blue Bib','Current','31 Mar 2027','Umpire Coordinator'],
['ACC-003','Mia P','C Badge','Current','31 Mar 2027','Umpire Coordinator'],
['ACC-004','Karen W','Senior Umpire Coach','Current','31 Mar 2027','Umpire Coordinator'],
['ACC-005','Donna R','Senior Umpire Coach','Review due','30 Sep 2026','Umpire Coordinator']
];
const conductRegister=[
['COC-001','Ella J','Umpire Code of Conduct','Acknowledged','10 Aug 2026','Guardian co-acknowledged'],
['COC-002','Ruby S','Umpire Code of Conduct','Acknowledged','8 Aug 2026','Guardian co-acknowledged'],
['COC-003','Karen W','Coach Code of Conduct','Acknowledged','1 Aug 2026','Annual renewal'],
['COC-004','Alex C','Coordinator Code of Conduct','Acknowledged','5 Aug 2026','Annual renewal']
];
const riskRegister=[
['RSK-001','Court surface / trip hazards','Game day','Medium','Controlled','Pre-game inspection each round','Game-day Supervisor','22 Aug 2026'],
['RSK-002','Spectator abuse toward junior umpire','Safeguarding','High','Open control','Escalation + coordinator presence + incident procedure','Compliance Lead','22 Aug 2026'],
['RSK-003','Heat / hydration','Game day','Medium','Controlled','Breaks, water access, weather review','Game-day Supervisor','22 Aug 2026'],
['RSK-004','Junior direct messaging','Online safety','High','Controlled','Approved channels and guardian-aware communication','Club Administrator','1 Sep 2026']
];
const reviewRegister=[
['REV-001','Quarterly safeguarding review','Compliance & Safeguarding','Complete','1 Jul 2026','1 Oct 2026','Committee'],
['REV-002','Blue Card register review','Blue Cards','Complete','10 Aug 2026','10 Sep 2026','Compliance Lead'],
['REV-003','Child Safe Standards evidence review','Child Safe Standards','In progress','16 Aug 2026','31 Aug 2026','Committee'],
['REV-004','Incident pattern review','Restricted incidents','Due','—','31 Aug 2026','Compliance Lead']
];
function registerStatus(v){return /Complete|Current|Acknowledged|Controlled|Valid|Implemented|Closed/.test(v)?tag(v,'green'):/Due|Review|Needs|Open|Pending|In progress/.test(v)?tag(v,'amber'):tag(v,'blue')}
function genericRegister(title,subtitle,headers,rows){return `<div class="card"><div class="toolbar" style="justify-content:space-between"><div><h2>${title}</h2><p class="sub">${subtitle}</p></div><button class="btn primary" data-register-action="add" data-register="${title}">Add record</button></div><div class="tablewrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}<th>Action</th></tr></thead><tbody>${rows.map((r,i)=>`<tr>${r.map((v,j)=>`<td>${j===0?'<b>'+esc(v)+'</b>':(String(v).match(/Complete|Current|Acknowledged|Controlled|Valid|Implemented|Closed|Due|Review|Needs|Open|Pending|In progress/)?registerStatus(v):esc(v))}</td>`).join('')}<td><button class="btn" data-register-action="view" data-register="${title}" data-row="${i}">Open</button></td></tr>`).join('')}</tbody></table></div></div>`}
const registerDefs={
bluecards:{label:'Blue Cards / WWCC',desc:'Card, exemption, verification, linking and expiry.',render:()=>`<div class="card"><div class="toolbar" style="justify-content:space-between"><div><h2>Blue Card / Working with Children register</h2><p class="sub">The master register for people whose club role may require a Blue Card.</p></div><button class="btn primary" data-compliance-action="newBlueCard">Add / update</button></div>${blueCardTable()}</div>`},
standards:{label:'Child Safe Standards',desc:'Evidence against the 10 standards and Universal Principle.',render:()=>`<div class="card"><h2>Child Safe Standards evidence register</h2><p class="sub">Keep evidence, status and next action for every standard.</p>${standardsTable()}</div>`},
incidents:{label:'Incidents & complaints',desc:'Restricted safeguarding and complaint records.',render:()=>genericRegister('Safeguarding incidents & complaints','Restricted records. Full details should only be visible to authorised compliance users.',['ID','Date','Game','Category','Person','Status','Owner','Access'],complianceIncidents)},
training:{label:'Training & induction',desc:'Safeguarding induction and refresher records.',render:()=>genericRegister('Training & induction register','Track who has completed required safeguarding and role induction.',['Person','Role','Training','Status','Date / due'],safeguardingTraining)},
policies:{label:'Policies & procedures',desc:'Policy adoption, ownership and review dates.',render:()=>genericRegister('Policy & procedure register','Keep the club policy set current and evidence regular review.',['Policy / control','Source / owner','Status','Review'],safeguardingPolicies)},
screening:{label:'Screening & recruitment',desc:'Role assessment, screening and approval before child-related work.',render:()=>genericRegister('Volunteer / staff screening register','Record child-safe recruitment and screening checks before activation.',['ID','Person','Role','Checks','Status','Review / due','Owner'],screeningRegister)},
guardians:{label:'Guardian & junior',desc:'Guardian links, consent and acknowledgements.',render:()=>genericRegister('Guardian / junior consent register','Record guardian link, acknowledgement and review status for junior umpires.',['ID','Junior','Guardian','Link status','Acknowledgement','Review / due','Owner'],guardianRegister)},
accreditation:{label:'Accreditation & qualifications',desc:'Umpire, coach and assessor credentials.',render:()=>genericRegister('Accreditation & qualification register','Track umpire and coach qualifications separately from Blue Card compliance.',['ID','Person','Qualification','Status','Review / expiry','Owner'],accreditationRegister)},
conduct:{label:'Codes of Conduct',desc:'Signed acknowledgements for officials and adults.',render:()=>genericRegister('Code of Conduct acknowledgement register','Record who has acknowledged the relevant code and when.',['ID','Person','Code','Status','Date','Notes'],conductRegister)},
risk:{label:'Risk & game-day safety',desc:'Hazards, controls, owners and review dates.',render:()=>genericRegister('Risk / hazard & game-day safety register','Keep operational and safeguarding risks visible, assigned and reviewed.',['ID','Risk','Area','Rating','Status','Control','Owner','Review'],riskRegister)},
actions:{label:'Compliance actions & expiry',desc:'Outstanding actions, renewals and evidence gaps.',render:()=>genericRegister('Compliance actions / expiry register','This is the working list of compliance items that still need attention.',['Priority','Action','Due'],complianceTasks.map(x=>[x.priority,x.title,x.due]))},
audits:{label:'Audit & review',desc:'Scheduled governance reviews and completed checks.',render:()=>genericRegister('Audit / review register','Evidence regular review of compliance registers, incidents and child-safe controls.',['ID','Review','Area','Status','Last review','Next review','Owner'],reviewRegister)}
};
function registersHub(){const cards=Object.entries(registerDefs).map(([k,d])=>`<button class="card registerTile" data-register-action="open" data-register="${k}" style="text-align:left;border:0;cursor:pointer"><span class="tag ${k==='incidents'?'red':'blue'}">REGISTER</span><h3 style="margin-top:9px">${esc(d.label)}</h3><p class="sub">${esc(d.desc)}</p><b>Open register →</b></button>`).join('');return `<div class="grid three">${cards}</div>`}
const priorComplianceRegisters=PAGE_RENDERERS.compliance;
PAGE_RENDERERS.compliance=function(){return head('Compliance & Safeguarding','Blue Cards, child safety and every compliance register in one place.')+`<div class="notice"><b>Start here:</b> use the registers below as the club's compliance record set. Anything due, missing or expired should flow to Compliance To Do.</div>`+complianceKpis()+`<div class="card" style="margin-top:12px"><h2>Compliance registers</h2><p class="sub">Choose the register you need. Each one has its own records, owner and review status.</p>${registersHub()}</div><div style="margin-top:12px">${registerDefs[complianceRegisterState.active].render()}</div><div class="card" style="margin-top:12px"><h2>Completed readiness phases</h2><p class="sub">Governance evidence for the completed pilot-readiness phases.</p>${typeof readinessTable==='function'?readinessTable(readinessRows):''}</div>`};
document.addEventListener('click',e=>{const el=e.target.closest('[data-register-action]');if(!el)return;const a=el.dataset.registerAction;if(a==='open'){complianceRegisterState.active=el.dataset.register;render();return}if(a==='add'){openDrawer('Add compliance record',`<h3>${esc(el.dataset.register||'Compliance register')}</h3><div class="field"><label>Record / person</label><input id="regName" placeholder="Enter record name"></div><div class="field"><label>Status / notes</label><textarea id="regNotes" rows="5" placeholder="Enter clear factual details"></textarea></div><button class="btn primary" data-register-action="saveGeneric">Save record</button>`);return}if(a==='saveGeneric'){auditEvents.unshift(['16 Aug 10:24am','Compliance','Register record added','Compliance register record saved']);closeDrawer();toast('Register record saved to the concept audit trail.');return}if(a==='view'){openDrawer('Register record',`<div class="appCard"><b>${esc(el.dataset.register)}</b><div class="appMeta">Record ${Number(el.dataset.row)+1}</div></div><div class="notice">Production will store full record history, attachments/evidence, owner, review date and immutable audit changes.</div>`);return}});
const regStyle=document.createElement('style');regStyle.textContent='.registerTile:hover{outline:2px solid #DCE7FB}.registerTile:focus{outline:3px solid #2855A655}';document.head.appendChild(regStyle);render();