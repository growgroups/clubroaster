const coordinatorChecklist={
  date:'22 Aug 2026',round:'Round 8',owner:'Umpire Coordinator',signedOff:false,
  sections:[
    {id:'pre',title:'Before first games',items:[
      {id:'venue',label:'Confirm venue/courts open and safe',done:true,critical:true},
      {id:'roster',label:'Confirm every game has required umpires and coaches',done:false,critical:true},
      {id:'contacts',label:'Confirm coordinator/admin emergency contacts are available',done:true,critical:true},
      {id:'juniors',label:'Confirm junior umpire guardian/supervision requirements',done:true,critical:true},
      {id:'briefing',label:'Send/confirm umpire and coach briefing message',done:false,critical:false},
      {id:'equipment',label:'Check bibs, whistles, score/control desk equipment and incident forms',done:true,critical:false},
      {id:'fees',label:'Confirm current match-fee rates and eligible payment roles',done:true,critical:false}
    ]},
    {id:'arrival',title:'Arrival & first whistle',items:[
      {id:'checkins',label:'Check all first-round umpires and coaches have arrived',done:false,critical:true},
      {id:'late',label:'Review late/no-show list and start replacements where needed',done:false,critical:true},
      {id:'coachbrief',label:'Confirm coaches know which umpires require coaching and target %',done:true,critical:false},
      {id:'juniorcheck',label:'Check junior umpires know where to report concerns or ask for help',done:true,critical:false}
    ]},
    {id:'during',title:'During play',items:[
      {id:'coverage',label:'Monitor court coverage, breaks, withdrawals and replacement Tasks',done:false,critical:true},
      {id:'chat',label:'Monitor game-group/direct chat for requests requiring coordinator response',done:false,critical:false},
      {id:'incidents',label:'Review and triage any incident, abuse, safety or behavioural reports',done:false,critical:true},
      {id:'coaching',label:'Confirm required coaching is being delivered and coach attendance is recorded',done:false,critical:false},
      {id:'welfare',label:'Check junior/welfare issues are escalated and guardians contacted where required',done:true,critical:true}
    ]},
    {id:'close',title:'End of day',items:[
      {id:'completed',label:'Confirm all umpire assignments are marked completed',done:false,critical:true},
      {id:'coachcomplete',label:'Confirm coaching delivered/completed and feedback is entered',done:false,critical:true},
      {id:'openincidents',label:'Confirm all incidents have an owner, status and follow-up Task',done:false,critical:true},
      {id:'payments',label:'Reconcile completed assignments to match-fee/payment lines',done:false,critical:true},
      {id:'communications',label:'Close or assign outstanding game-day communications/requests',done:false,critical:false},
      {id:'handover',label:'Record handover notes for the next round',done:false,critical:false}
    ]}
  ]
};
function checklistItems(){return coordinatorChecklist.sections.flatMap(s=>s.items)}
function checklistOutstanding(){return checklistItems().filter(i=>!i.done)}
function checklistCriticalOutstanding(){return checklistItems().filter(i=>i.critical&&!i.done)}
function checklistPct(){const all=checklistItems();return Math.round(all.filter(i=>i.done).length/all.length*100)}
function coordinatorChecklistHtml(){return `<div class="appHero"><small>${coordinatorChecklist.round} · ${coordinatorChecklist.date}</small><strong>Game Day Checklist</strong><small>${checklistPct()}% complete · ${checklistCriticalOutstanding().length} critical outstanding</small></div><div class="appCard"><div class="toolbar" style="justify-content:space-between"><div><h3>Coordinator control checklist</h3><div class="appMeta">Live checklist for coverage, safety, coaching, communications and close-of-day.</div></div>${tag(checklistCriticalOutstanding().length+' critical',checklistCriticalOutstanding().length?'red':'green')}</div>${progress(checklistPct())}</div>${coordinatorChecklist.sections.map(s=>`<div class="appCard"><h3>${esc(s.title)}</h3>${s.items.map(i=>`<label class="checkrow"><input type="checkbox" data-checklist-id="${i.id}" ${i.done?'checked':''}><div><b>${esc(i.label)}</b><p class="sub">${i.critical?'Critical control':'Operational control'} · ${i.done?'Completed':'Outstanding'}</p></div></label>`).join('')}</div>`).join('')}<div class="appCard"><h3>Close-day sign-off</h3><div class="appMeta">Sign-off is available only when all critical controls are completed.</div><div class="appActions"><button class="btn primary" data-checklist-action="signoff" ${checklistCriticalOutstanding().length?'disabled':''}>${coordinatorChecklist.signedOff?'Day signed off':'Sign off game day'}</button><button class="btn" data-checklist-action="tasks">Create Tasks for outstanding</button></div>${coordinatorChecklist.signedOff?'<div class="success" style="margin-top:10px">Game day signed off by Umpire Coordinator · 22 Aug 2026.</div>':''}</div>`}
function openCoordinatorChecklist(){openDrawer('Game Day Coordinator Checklist',coordinatorChecklistHtml())}
function syncChecklistTask(item){const title='Checklist: '+item.label;let t=tasks.find(x=>x.title===title);if(!item.done){if(!t)tasks.push({id:tasks.length+1,type:'Game Day',priority:item.critical?'High':'Medium',title,detail:'Outstanding coordinator game-day checklist control.',from:'Coordinator Checklist',status:'Open',action:'gameday',due:'Today'})}else if(t)t.status='Resolved'}
document.addEventListener('change',e=>{const box=e.target.closest('[data-checklist-id]');if(!box)return;const item=checklistItems().find(i=>i.id===box.dataset.checklistId);if(!item)return;item.done=box.checked;syncChecklistTask(item);auditEvents.unshift(['16 Aug 9:21am','Game Day','Checklist updated',item.label+' -> '+(item.done?'Complete':'Outstanding')]);openDrawer('Game Day Coordinator Checklist',coordinatorChecklistHtml())});
document.addEventListener('click',e=>{const a=e.target.closest('[data-checklist-action]');if(!a)return;if(a.dataset.checklistAction==='tasks'){checklistOutstanding().forEach(syncChecklistTask);toast('Outstanding checklist controls added to Tasks.');return}if(a.dataset.checklistAction==='signoff'){if(checklistCriticalOutstanding().length){toast('Complete all critical controls before sign-off.');return}coordinatorChecklist.signedOff=true;auditEvents.unshift(['16 Aug 5:05pm','Game Day','Coordinator day sign-off','Game-day checklist completed and signed off']);openDrawer('Game Day Coordinator Checklist',coordinatorChecklistHtml());toast('Game day signed off.')}});
const originalCoordinatorHome=coordinatorHome;
coordinatorHome=function(){return originalCoordinatorHome()+`<div class="appCard" style="margin-top:10px"><div class="toolbar" style="justify-content:space-between"><div><h3>Game Day Checklist</h3><div class="appMeta">${checklistPct()}% complete · ${checklistOutstanding().length} outstanding · ${checklistCriticalOutstanding().length} critical</div></div>${tag(checklistCriticalOutstanding().length+' critical',checklistCriticalOutstanding().length?'red':'green')}</div>${progress(checklistPct())}<div class="appActions"><button class="btn primary" data-mobile-action="coordinatorChecklist">Open checklist</button></div></div>`};
const previousMobileAction=handleMobileAction;
handleMobileAction=function(a,el){if(a==='coordinatorChecklist'){openCoordinatorChecklist();return}return previousMobileAction(a,el)};
function loadMobileOpenGames(){if(typeof openGames==='undefined'){setTimeout(loadMobileOpenGames,20);return}const openGamesScript=document.createElement('script');openGamesScript.src='mobile-open-games.js';document.body.appendChild(openGamesScript)}
const seasonPlanningScript=document.createElement('script');seasonPlanningScript.src='season-planning.js';seasonPlanningScript.onload=loadMobileOpenGames;document.body.appendChild(seasonPlanningScript);
