const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const ux=fs.readFileSync('simple-ux.js','utf8');
const openGames=fs.readFileSync('mobile-open-games.js','utf8');
const checklist=fs.readFileSync('game-day-checklist.js','utf8');
const failures=[]; const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
try{new Function(ux)}catch(err){failures.push(`simple-ux.js syntax error: ${err.message}`)}
for(const text of ['Home','Games & Fixtures','Umpires & Coaches','Roster','To Do','Payments','Messages','Game Rules','Club Umpire Duties','Development Progress','Roster Help','Who Can Do What','Juniors & Parents'])assert(ux.includes(text),`Plain-language label missing: ${text}`);
for(const text of ['START HERE','What should I do now?','Check To Do','Check Roster','Run Game Day','Review Payments'])assert(ux.includes(text),`Start Here guidance missing: ${text}`);
for(const page of ['dashboard','tasks','roster','fixtures','umpires','availability','gameday','finance','payments','notifications','netballrules','duties','pathway','intelligence','coaching','import','rules','junior','roles'])assert(ux.includes(`${page}:`),`Context help missing for ${page}`);
for(const action of ['publish','markPaid','approve1','approve2','rollback','selfAssign','signoff'])assert(ux.includes(`${action}:`),`High-impact confirmation missing: ${action}`);
assert(ux.includes('min-height:44px'),'Mobile touch-target improvement missing');
assert(ux.includes('focus-visible'),'Keyboard/focus accessibility improvement missing');
assert(ux.includes('Need help?')&&ux.includes('Message the Umpire Coordinator'),'Mobile help action missing');
assert(html.includes('Ask for Help'),'Sidebar help language not simplified');
assert(html.includes('Bigger text')&&html.includes('Simple view'),'Accessibility controls not simplified');
assert(openGames.includes('Games I can take')&&openGames.includes('Take this game')&&openGames.includes('Ask coordinator'),'Open Games wording is not simple enough');
assert(openGames.includes('Your umpire level is not high enough for this game'),'Open Games eligibility explanation not plain language');
assert(checklist.includes('Important check')&&checklist.includes('Still to do'),'Checklist language not simplified');
assert(!checklist.includes("createElement('script')"),'Checklist still contains dynamic module loading');
if(failures.length){console.error('ClubRoster UX QA failed:');failures.forEach(f=>console.error('- '+f));process.exit(1)}
console.log('ClubRoster UX QA passed: plain-language navigation, Start Here flow, contextual help, safer confirmations, mobile accessibility and simple Open Games/checklist wording.');
