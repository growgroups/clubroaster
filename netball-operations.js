const netballPages={netballrules:'Netball Requirements',duties:'Umpire Duty Ledger',pathway:'Umpire Pathway',intelligence:'Roster Intelligence'};
Object.assign(pages,netballPages);
sections.splice(2,0,['NETBALL',['netballrules','duties','pathway','intelligence']]);
['clubAdmin','associationAdmin','coordinator'].forEach(r=>access[r].splice(5,0,'netballrules','duties','pathway','intelligence'));
access.mentor.push('pathway','intelligence'); access.audit.push('netballrules','duties','pathway','intelligence');

const requirementMatrix=[
{id:'REQ1',competition:'Junior Saturday',grade:'U10 Development',umpire1:'Green Bib+',umpire2:'Green Bib+',coach:'Dedicated coach',intensity:'Full game',pairing:'At least one experienced partner',junior:'Guardian/supervision rules apply'},
{id:'REQ2',competition:'Junior Saturday',grade:'U11 Development',umpire1:'Blue Bib+',umpire2:'C Badge+',coach:'Accredited coach',intensity:'Shared - max 2 adjacent courts',pairing:'Developing + experienced',junior:'Guardian/supervision rules apply'},
{id:'REQ3',competition:'Junior Saturday',grade:'U13 Div 1',umpire1:'C Badge+',umpire2:'C Badge+',coach:'Development target',intensity:'Selected quarters',pairing:'Avoid two first-season C badges',junior:'Standard junior controls'},
{id:'REQ4',competition:'Junior Saturday',grade:'U15 Div 1',umpire1:'C Badge+',umpire2:'B Badge preferred',coach:'As required',intensity:'Observation',pairing:'At least one strong game manager',junior:'Standard junior controls'},
{id:'REQ5',competition:'Premier',grade:'Premier A',umpire1:'B Badge+',umpire2:'B Badge+',coach:'Assessment only',intensity:'Assessment',pairing:'Senior pairing',junior:'Not applicable'}
];
const dutyLedger=[
{id:'D001',club:'Pizzey Park',team:'U12 Team 1',round:'Round 8',time:'8:00',obligation:'Supply Umpire 1',person:'Ella J',status:'Fulfilled'},
{id:'D002',club:'Pizzey Park',team:'U13 Team 2',round:'Round 8',time:'9:20',obligation:'Supply Umpire 2',person:'Ruby S',status:'Fulfilled'},
{id:'D003',club:'Pizzey Park',team:'U15 Team 2',round:'Round 8',time:'10:40',obligation:'Supply Umpire 1',person:'',status:'Missing'},
{id:'D004',club:'Burleigh',team:'U15 Team 2',round:'Round 8',time:'10:40',obligation:'Supply Umpire 2',person:'Helen A',status:'Fulfilled'},
{id:'D005',club:'Pizzey Park',team:'U14 Team 3',round:'Round 9',time:'9:20',obligation:'Supply Umpire 1',person:'',status:'Due'}
];
const recurringAvailability=[
{person:'Ella J',pattern:'Every Saturday',window:'8:00-12:00',max:2,exceptions:'12 Sep unavailable',status:'Active'},
{person:'Ruby S',pattern:'Every Saturday',window:'8:00-14:00',max:3,exceptions:'None',status:'Active'},
{person:'Mia P',pattern:'Every Saturday',window:'9:20-13:00',max:3,exceptions:'29 Aug after 10:00; 19-26 Sep unavailable',status:'Active'},
{person:'Helen A',pattern:'Every Saturday',window:'9:00-12:00',max:2,exceptions:'No >2 consecutive',status:'Active'}
];
const rosterVersions=[
{id:'RV4',label:'Emergency change v4',state:'Published',when:'22 Aug 9:31am',by:'Alex C',change:'GC-260804 coach replacement',rollback:true},
{id:'RV3',label:'Published v3',state:'Locked',when:'21 Aug 6:00pm',by:'Alex C',change:'Round 8 published',rollback:true},
{id:'RV2',label:'Draft v2',state:'Superseded',when:'20 Aug 8:12pm',by:'Alex C',change:'AutoRoster repair pass',rollback:true},
{id:'RV1',label:'Draft v1',state:'Superseded',when:'19 Aug 7:42pm',by:'System',change:'Initial AutoRoster',rollback:false}
];
const openGames=[
{id:'OG1',date:'29 Aug',time:'8:00',court:'4',grade:'U12 Div 2',required:'Blue Bib+',fee:28,status:'Open',candidate:'Ruby S'},
{id:'OG2',date:'29 Aug',time:'10:40',court:'2',grade:'U15 Div 1',required:'C Badge+',fee:34,status:'Open',candidate:'Mia P'},
{id:'OG3',date:'5 Sep',time:'9:20',court:'6',grade:'U11 Development',required:'Blue Bib+',fee:26,status:'Open',candidate:'Ella J'}
];
const standby=[
{id:'ST1',window:'8:00-10:00',person:'Helen A',level:'B Badge',status:'Confirmed'},
{id:'ST2',window:'10:00-12:00',person:'Ruby S',level:'Blue Bib',status:'Offered'},
{id:'ST3',window:'12:00-14:00',person:'Mia P',level:'C Badge',status:'Open'}
];
const fixtureImpacts=[
{id:'IMP1',fixture:'GC-260804',change:'9:20 Court 1 -> 10:40 Court 6',impacts:['Lucy H availability conflict','Coach Donna R overlap','Junior briefing time changes','2 notifications require acknowledgement'],status:'4 impacts'},
{id:'IMP2',fixture:'GC-260805',change:'Court 2 -> Court 7',impacts:['No umpire conflict','Court transition +3 min','Published appointment update'],status:'1 acknowledgement'}
];
const pairScores=[
{game:'U11 Development',umpires:'Ella J + Helen A',score:96,why:'Green Bib paired with B Badge; no conflicts; strong mentoring fit'},
{game:'U13 Div 1',umpires:'Mia P + Karen W',score:91,why:'C Badge paired with senior game manager; low team repetition'},
{game:'U15 Div 1',umpires:'Mia P + Ruby S',score:62,why:'Available but pairing below preferred experience mix'},
{game:'Premier A',umpires:'Karen W + Helen A',score:88,why:'Senior pairing; both available; balanced workload'}
];
const coachCapacity=[
{level:'Green Bib',mode:'Dedicated coach',coverage:'Full game',maxCourts:1},
{level:'Blue Bib',mode:'Shared adjacent courts',coverage:'Pre-game + selected quarters + post-game',maxCourts:2},
{level:'C Badge',mode:'Targeted observation',coverage:'Selected quarter(s)',maxCourts:3},
{level:'Assessment',mode:'Dedicated assessor',coverage:'Assessment window',maxCourts:1}
];
const pathwayCompetencies=[
{person:'Ella J',current:'Green Bib',target:'Blue Bib',readiness:72,games:14,coached:12,assessment:'Not yet',focus:'Positioning; advantage; centre-pass timing'},
{person:'Ruby S',current:'Blue Bib',target:'C Badge',readiness:81,games:26,coached:18,assessment:'Ready for practice assessment',focus:'Goal-circle movement; game management'},
{person:'Mia P',current:'C Badge',target:'B Badge',readiness:67,games:42,coached:11,assessment:'Review in September',focus:'Contact timing; advantage; consistency'},
{person:'Helen A',current:'B Badge',target:'Senior mentor',readiness:92,games:120,coached:24,assessment:'Mentor pathway',focus:'Developing junior umpires'}
];
const competencyRows=[
{person:'Mia P',positioning:4,whistle:4,advantage:3,communication:4,management:3,trend:'Improving'},
{person:'Ruby S',positioning:4,whistle:4,advantage:3,communication:4,management:3,trend:'Improving'},
{person:'Ella J',positioning:3,whistle:4,advantage:2,communication:3,management:2,trend:'Improving'}
];
const safeguarding=[
{id:'INC-26-014',type:'Parent / spectator abuse',person:'Ella J',fixture:'GC-260700',state:'Guardian contacted',owner:'Coordinator',restricted:true,next:'Association review',pattern:'First recorded event'},
{id:'INC-26-011',type:'Behaviour complaint',person:'Mia P',fixture:'GC-260511',state:'Resolved',owner:'Association Admin',restricted:true,next:'Archived',pattern:'No repeat pattern'}
];
const acknowledgementQueue=[
{id:'ACK1',audience:'Ella J + Guardian',message:'Game moved to Court 6',state:'Read - acknowledgement required'},
{id:'ACK2',audience:'Round 8 officials',message:'Finals briefing update',state:'Sent'},
{id:'ACK3',audience:'Mia P',message:'Swap approved',state:'Acknowledged'}
];
const feeRules=[
{grade:'U10-U12 Development',role:'Umpire',level:'Any eligible',fee:26,extras:'Standby $10'},
{grade:'U13-U14',role:'Umpire',level:'Blue/C+',fee:30,extras:'Cancellation policy'},
{grade:'U15+',role:'Umpire',level:'C+',fee:34,extras:'Late replacement +$5'},
{grade:'All',role:'Umpire Coach',level:'Accredited',fee:45,extras:'Per coaching block'},
{grade:'Assessment',role:'Assessor',level:'Authorised',fee:50,extras:'Per assessment'}
];
const credentials=[
{person:'Karen W',credential:'Working with Children / Blue Card',expiry:'18 Feb 2027',state:'Verified'},
{person:'Donna R',credential:'Working with Children / Blue Card',expiry:'12 Sep 2026',state:'Expiring soon'},
{person:'Helen A',credential:'B Badge accreditation',expiry:'Current',state:'Verified'},
{person:'Mia P',credential:'C Badge accreditation',expiry:'Current',state:'Verified'}
];
const capacityForecast=[
{metric:'Season umpire positions',value:'2,850',signal:'Required'},
{metric:'Consistently available umpires',value:'98',signal:'Available'},
{metric:'Peak shortage',value:'10:40-12:00',signal:'Risk'},
{metric:'Green/Blue coaching blocks',value:'310',signal:'Required'},
{metric:'Additional C Badge-capable officials',value:'7',signal:'Recruit / develop'}
];
const fairness=[
{person:'Ella J',games:14,early:9,late:1,highGrade:0,coached:12,consecutiveMax:2,teamRepeat:3,fairness:78},
{person:'Ruby S',games:19,early:7,late:5,highGrade:4,coached:10,consecutiveMax:3,teamRepeat:2,fairness:86},
{person:'Mia P',games:18,early:3,late:8,highGrade:9,coached:5,consecutiveMax:3,teamRepeat:4,fairness:73},
{person:'Helen A',games:12,early:1,late:4,highGrade:8,coached:6,consecutiveMax:2,teamRepeat:1,fairness:91}
];

function nbTag(v){const s=String(v);const c=/missing|risk|expiring|open/i.test(s)?'red':/due|offered|acknowledgement|required/i.test(s)?'amber':/verified|fulfilled|active|acknowledged|locked|published/i.test(s)?'green':'blue';return `<span class="tag ${c}">${esc(s)}</span>`}
function nbTable(headers,rows){return `<div class="tablewrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c??''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function nbHead(title,sub,actions=''){return `<div class="pagehead"><div><h1>${title}</h1><p>${sub}</p></div><div class="headactions">${actions}</div></div>`}
function netballRulesPage(){return nbHead('Netball Requirements','Netball-specific appointment, coaching, safeguarding and match-fee rules. These settings drive AutoRoster eligibility.','<button class="btn primary" data-netball-action="addRequirement">Add requirement</button>')+`<div class="grid two"><div class="card"><h3>Grade & competition requirement matrix</h3><p class="sub">The engine evaluates the two-umpire combination, not only each umpire individually.</p>${nbTable(['Competition','Grade','Umpire 1','Umpire 2','Coach','Intensity','Pairing rule','Junior control'],requirementMatrix.map(r=>[r.competition,r.grade,r.umpire1,r.umpire2,r.coach,r.intensity,r.pairing,r.junior]))}</div><div class="card"><h3>Coach capacity model</h3>${nbTable(['Development level','Mode','Coverage','Max courts'],coachCapacity.map(r=>[r.level,r.mode,r.coverage,r.maxCourts]))}<br><h3>Credentials</h3>${nbTable(['Person','Credential','Expiry','State'],credentials.map(r=>[r.person,r.credential,r.expiry,nbTag(r.state)]))}</div></div><div class="card" style="margin-top:12px"><h3>Match-fee rules</h3>${nbTable(['Grade','Role','Level','Fee','Extras'],feeRules.map(r=>[r.grade,r.role,r.level,'$'+r.fee,r.extras]))}</div>`}
function dutiesPage(){return nbHead('Umpire Duty Ledger','Tracks club/team umpire obligations separately from association-appointed positions.','<button class="btn" data-netball-action="reconcileDuties">Reconcile obligations</button>')+`<div class="grid kpis"><div class="card kpi"><span class="sub">Obligations</span><strong>${dutyLedger.length}</strong></div><div class="card kpi"><span class="sub">Fulfilled</span><strong>${dutyLedger.filter(x=>x.status==='Fulfilled').length}</strong></div><div class="card kpi"><span class="sub">Missing / due</span><strong>${dutyLedger.filter(x=>x.status!=='Fulfilled').length}</strong></div><div class="card kpi"><span class="sub">Pizzey completion</span><strong>75%</strong></div></div><div class="card" style="margin-top:12px">${nbTable(['Club','Team','Round','Time','Obligation','Supplied by','Status','Action'],dutyLedger.map(r=>[r.club,r.team,r.round,r.time,r.obligation,r.person||'Unfilled',nbTag(r.status),r.status!=='Fulfilled'?`<button class="btn" data-netball-action="fillDuty" data-id="${r.id}">Fill</button>`:'']))}</div>`}
function pathwayPage(){return nbHead('Umpire Pathway','Every appointment, coaching session and assessment contributes to a measurable netball umpire development pathway.','<button class="btn primary" data-netball-action="recordAssessment">Record assessment</button>')+`<div class="card"><h3>Progression readiness</h3>${nbTable(['Umpire','Current','Target','Readiness','Games','Coached','Assessment','Current focus'],pathwayCompetencies.map(r=>[r.person,r.current,r.target,`${r.readiness}%`,r.games,r.coached,r.assessment,r.focus]))}</div><div class="grid two" style="margin-top:12px"><div class="card"><h3>Structured competencies</h3>${nbTable(['Umpire','Positioning','Whistle','Advantage','Communication','Game mgmt','Trend'],competencyRows.map(r=>[r.person,r.positioning+'/5',r.whistle+'/5',r.advantage+'/5',r.communication+'/5',r.management+'/5',nbTag(r.trend)]))}</div><div class="card"><h3>Safeguarding & restricted incidents</h3><p class="sub">Restricted records are visible only to authorised compliance roles.</p>${nbTable(['Incident','Type','Person','State','Owner','Next step','Pattern'],safeguarding.map(r=>[r.id,r.type,r.person,nbTag(r.state),r.owner,r.next,r.pattern]))}</div></div>`}
function intelligencePage(){return nbHead('Roster Intelligence','Netball-specific planning, pairing, reserve coverage, fixture-change revalidation and season capacity forecasting.','<button class="btn primary" data-netball-action="optimise">Run netball optimisation</button>')+`<div class="grid kpis">${capacityForecast.slice(0,4).map(r=>`<div class="card kpi"><span class="sub">${r.metric}</span><strong>${r.value}</strong>${nbTag(r.signal)}</div>`).join('')}</div><div class="grid two" style="margin-top:12px"><div class="card"><h3>Pair suitability</h3>${nbTable(['Game','Pair','Score','Why'],pairScores.map(r=>[r.game,r.umpires,`${r.score}/100`,r.why]))}</div><div class="card"><h3>Standby / reserve coverage</h3>${nbTable(['Window','Person','Level','Status','Action'],standby.map(r=>[r.window,r.person,r.level,nbTag(r.status),r.status!=='Confirmed'?`<button class="btn" data-netball-action="confirmStandby" data-id="${r.id}">Confirm</button>`:'']))}</div></div><div class="grid two" style="margin-top:12px"><div class="card"><h3>Open Games</h3><p class="sub">Only eligible officials see games they can request. Coordinator approval remains available for controlled grades.</p>${nbTable(['Date','Time','Court','Grade','Requirement','Fee','Status','Action'],openGames.map(r=>[r.date,r.time,r.court,r.grade,r.required,'$'+r.fee,nbTag(r.status),r.status==='Open'?`<button class="btn" data-netball-action="requestGame" data-id="${r.id}">Request</button>`:'']))}</div><div class="card"><h3>Fixture-change impact engine</h3>${nbTable(['Fixture','Change','Impacts','Status','Action'],fixtureImpacts.map(r=>[r.fixture,r.change,r.impacts.join('<br>'),nbTag(r.status),`<button class="btn" data-netball-action="repairImpact" data-id="${r.id}">Repair</button>`]))}</div></div><div class="card" style="margin-top:12px"><h3>Fairness & load</h3>${nbTable(['Umpire','Games','Early','Late','High grade','Coached','Max consecutive','Team repeats','Fairness'],fairness.map(r=>[r.person,r.games,r.early,r.late,r.highGrade,r.coached,r.consecutiveMax,r.teamRepeat,`${r.fairness}/100`]))}</div>`}

const oldAvailabilityPage=PAGE_RENDERERS.availability;
PAGE_RENDERERS.availability=function(){return oldAvailabilityPage()+`<div class="card" style="margin-top:12px"><h3>Recurring season availability</h3><p class="sub">Set a season pattern once, then record exception dates.</p>${nbTable(['Person','Pattern','Window','Max games','Exceptions','Status'],recurringAvailability.map(r=>[r.person,r.pattern,r.window,r.max,r.exceptions,nbTag(r.status)]))}<div class="toolbar" style="margin-top:10px"><button class="btn primary" data-netball-action="availabilityPattern">Add recurring pattern</button></div></div>`};
const oldRosterPage=PAGE_RENDERERS.roster;
PAGE_RENDERERS.roster=function(){return oldRosterPage()+`<div class="grid two" style="margin-top:12px"><div class="card"><h3>Roster states & versions</h3><p class="sub">Draft -> Planned -> Offered -> Accepted -> Published -> Locked -> Completed.</p>${nbTable(['Version','State','When','By','Change','Action'],rosterVersions.map(r=>[r.label,nbTag(r.state),r.when,r.by,r.change,r.rollback?`<button class="btn" data-netball-action="rollback" data-id="${r.id}">Rollback</button>`:'']))}</div><div class="card"><h3>Notification acknowledgement queue</h3>${nbTable(['Audience','Message','State','Action'],acknowledgementQueue.map(r=>[r.audience,r.message,nbTag(r.state),r.state!=='Acknowledged'?`<button class="btn" data-netball-action="ack" data-id="${r.id}">Acknowledge</button>`:'']))}</div></div>`};
const oldBlueprint=PAGE_RENDERERS.blueprint;
PAGE_RENDERERS.blueprint=function(){return nbHead('Software Blueprint','ClubRoster is now deliberately scoped as a netball-only umpire operations and development platform.')+`<div class="notice"><b>Product boundary:</b> ClubRoster does not try to replace registration, ladders, scoring or whole-of-competition systems. It owns umpire availability, allocation, development, coaching, assessment, game-day operations, communications, safeguarding workflows and payments.</div><div class="grid three" style="margin-top:12px"><div class="card"><h3>Netball domain</h3><p class="sub">Association -> Club -> Competition -> Season -> Round -> Grade -> Game -> Venue -> Court -> Umpire positions -> Appointment.</p></div><div class="card"><h3>Development domain</h3><p class="sub">Umpire -> level/badge -> competencies -> coach -> mentor -> assessor -> coaching target -> assessment -> pathway readiness.</p></div><div class="card"><h3>Operations domain</h3><p class="sub">Availability -> requirements -> duty obligations -> AutoRoster -> pairing -> publish -> acknowledge -> game day -> incidents -> fees -> audit.</p></div></div><div class="card" style="margin-top:12px"><h3>Netball-only capabilities now in concept</h3>${nbTable(['Capability','Purpose'],[['Requirement matrix','Grade-specific eligibility, pairing and coaching rules'],['Duty Ledger','Club/team umpire supply obligations'],['Recurring availability','Season pattern plus exception dates'],['Roster versions','Publish, lock, emergency change and rollback'],['Open Games','Controlled eligible self-appointment'],['Standby','Reserve umpire coverage by time block'],['Impact engine','Revalidate assignments after fixture changes'],['Pairing intelligence','Scores the two-umpire combination'],['Coach capacity','Dedicated/shared/selected-quarter coaching'],['Pathway','Competencies and readiness toward next badge'],['Safeguarding','Restricted incident lifecycle and pattern detection'],['Acknowledgements','Sent/read/acknowledged operational notices'],['Fee rules','Grade/role/level-based netball match fees'],['Capacity forecasting','Season supply and development shortage forecast'],['Fairness analytics','Load, time, grade, partner and team repetition']])}</div>`};

PAGE_RENDERERS.netballrules=netballRulesPage; PAGE_RENDERERS.duties=dutiesPage; PAGE_RENDERERS.pathway=pathwayPage; PAGE_RENDERERS.intelligence=intelligencePage;

function netballAudit(event,detail){auditEvents.unshift(['16 Aug 9:45am','Netball Operations',event,detail])}
document.addEventListener('click',e=>{const el=e.target.closest('[data-netball-action]');if(!el)return;const a=el.dataset.netballAction,id=el.dataset.id;
 if(a==='fillDuty'){const d=dutyLedger.find(x=>x.id===id);d.person='Mia P';d.status='Fulfilled';netballAudit('Duty filled',d.id+' '+d.team);toast('Umpire duty filled and ledger reconciled.');render();return}
 if(a==='reconcileDuties'){dutyLedger.filter(x=>x.status!=='Fulfilled').forEach(d=>{if(!tasks.some(t=>t.detail&&t.detail.includes(d.id)))tasks.push({id:tasks.length+1,type:'Rostering',priority:'High',title:'Umpire duty '+d.id+' requires action',detail:d.id+' '+d.club+' '+d.team+' '+d.obligation,status:'Open',from:'Duty Ledger',action:'roster',due:'Before publish'})});netballAudit('Duty reconciliation','Missing obligations converted to Tasks');toast('Duty ledger reconciled; missing obligations added to Tasks.');return}
 if(a==='requestGame'){const g=openGames.find(x=>x.id===id);g.status='Requested - coordinator review';tasks.push({id:tasks.length+1,type:'Rostering',priority:'Medium',title:'Open Game request '+g.id,detail:g.candidate+' requested '+g.date+' '+g.time+' '+g.grade,status:'Open',from:g.candidate,action:'roster',due:'Before publish'});netballAudit('Open Game requested',g.id+' by '+g.candidate);toast('Game request sent to coordinator.');render();return}
 if(a==='confirmStandby'){const s=standby.find(x=>x.id===id);s.status='Confirmed';netballAudit('Standby confirmed',s.window+' '+s.person);toast('Standby coverage confirmed.');render();return}
 if(a==='repairImpact'){const x=fixtureImpacts.find(x=>x.id===id);x.status='Repaired - acknowledgement pending';acknowledgementQueue.unshift({id:'ACK'+(acknowledgementQueue.length+1),audience:'Affected officials',message:x.fixture+' appointment update',state:'Sent - acknowledgement required'});netballAudit('Fixture impact repaired',x.fixture);toast('Affected appointments revalidated; acknowledgements queued.');render();return}
 if(a==='rollback'){const v=rosterVersions.find(x=>x.id===id);rosterVersions.unshift({id:'RV'+(rosterVersions.length+1),label:'Rollback recovery v'+(rosterVersions.length+1),state:'Draft',when:'16 Aug 9:45am',by:'Club Administrator',change:'Restored from '+v.label,rollback:false});netballAudit('Roster rollback',v.label);toast('Roster restored into a new draft version.');render();return}
 if(a==='ack'){const x=acknowledgementQueue.find(x=>x.id===id);x.state='Acknowledged';netballAudit('Notification acknowledged',x.id);toast('Acknowledgement recorded.');render();return}
 if(a==='optimise'){pairScores.forEach(x=>x.score=Math.min(99,x.score+2));netballAudit('Netball optimisation run','Pairing, fairness, coaching and reserve coverage rescored');toast('Netball optimisation completed. Pairing and fairness scores refreshed.');render();return}
 if(a==='availabilityPattern'){openDrawer('Recurring availability',`<div class="field"><label>Pattern</label><select id="nbPattern"><option>Every Saturday</option><option>Every second Saturday</option></select></div><div class="field"><label>Time window</label><input id="nbWindow" value="8:00-12:00"></div><div class="field"><label>Maximum games</label><input id="nbMax" value="2"></div><div class="field"><label>Exception dates</label><input id="nbExceptions" value="None"></div><button class="btn primary" data-netball-action="saveAvailabilityPattern">Save pattern</button>`);return}
 if(a==='saveAvailabilityPattern'){recurringAvailability.push({person:'Mia P',pattern:document.getElementById('nbPattern').value,window:document.getElementById('nbWindow').value,max:document.getElementById('nbMax').value,exceptions:document.getElementById('nbExceptions').value,status:'Active'});netballAudit('Recurring availability saved','Season pattern updated');closeDrawer();toast('Recurring season availability saved.');if(page==='availability')render();return}
 if(a==='recordAssessment'){openDrawer('Record umpire assessment',`<div class="field"><label>Umpire</label><select id="assessPerson"><option>Ruby S</option><option>Mia P</option><option>Ella J</option></select></div><div class="field"><label>Assessment outcome</label><select id="assessOutcome"><option>Ready to progress</option><option>Continue development</option><option>Reassess next month</option></select></div><div class="field"><label>Notes</label><textarea id="assessNotes">Structured assessment recorded against netball competencies.</textarea></div><button class="btn primary" data-netball-action="saveAssessment">Save assessment</button>`);return}
 if(a==='saveAssessment'){const p=pathwayCompetencies.find(x=>x.person===document.getElementById('assessPerson').value);p.assessment=document.getElementById('assessOutcome').value;p.readiness=Math.min(100,p.readiness+5);netballAudit('Assessment recorded',p.person+' '+p.assessment);closeDrawer();toast('Assessment saved to umpire pathway.');if(page==='pathway')render();return}
 if(a==='addRequirement'){openDrawer('Add netball requirement',`<div class="field"><label>Grade</label><input id="reqGrade" value="U16 Div 1"></div><div class="field"><label>Umpire requirement</label><input id="reqLevel" value="C Badge+"></div><div class="field"><label>Pairing rule</label><input id="reqPair" value="At least one experienced C/B Badge"></div><button class="btn primary" data-netball-action="saveRequirement">Save requirement</button>`);return}
 if(a==='saveRequirement'){requirementMatrix.push({id:'REQ'+(requirementMatrix.length+1),competition:'Junior Saturday',grade:document.getElementById('reqGrade').value,umpire1:document.getElementById('reqLevel').value,umpire2:document.getElementById('reqLevel').value,coach:'As required',intensity:'Observation',pairing:document.getElementById('reqPair').value,junior:'Standard junior controls'});netballAudit('Requirement added','Netball requirement matrix updated');closeDrawer();toast('Netball requirement saved.');if(page==='netballrules')render();return}
});
render();