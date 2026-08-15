const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const failures = [];
const assert = (ok, msg) => { if (!ok) failures.push(msg); };

const requiredPages = [
  'dashboard','import','fixtures','umpires','availability','roster','exceptions',
  'gameday','payments','reports','notifications','rules','coaching','roles','junior',
  'mobile','audit','blueprint','playbook','actionplan'
];

for (const page of requiredPages) {
  assert(new RegExp(`\\b${page}:'|\\b${page}:\\s*`).test(html), `Missing page definition: ${page}`);
}

assert(html.includes('data-action="home"'), 'Home breadcrumb is not wired');
assert(html.includes('data-action="current"'), 'Current-page breadcrumb is not wired');
assert(html.includes('data-action="season"'), 'Season/context breadcrumb is not wired');
assert(html.includes('data-go="${id}"'), 'Dynamic sidebar navigation is not wired');
assert(html.includes('function openAction(a)'), 'Central action dispatcher is missing');
assert(html.includes("document.addEventListener('click'"), 'Delegated click handler is missing');
assert(!/href\s*=\s*(['"])#\1/i.test(html), 'Placeholder # link found');

for (const match of html.matchAll(/<button\b([^>]*)>/gi)) {
  const attrs = match[1];
  assert(/data-action=|data-go=/.test(attrs), `Literal button without action wiring: <button${attrs}>`);
}

const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/i);
assert(!!scriptMatch, 'Script block missing');
if (scriptMatch) {
  try { new Function(scriptMatch[1]); }
  catch (err) { failures.push(`JavaScript syntax error: ${err.message}`); }
}

const pageObject = html.match(/const pages=\{([^;]+)\};/s)?.[1] || '';
const pageIds = new Set([...pageObject.matchAll(/([A-Za-z][A-Za-z0-9]*):'/g)].map(m => m[1]));
for (const id of requiredPages) assert(pageIds.has(id), `Page missing from pages object: ${id}`);

const accessMatch = html.match(/const access=\{([^;]+)\};/s);
assert(!!accessMatch, 'Access matrix is missing');
if (accessMatch) {
  for (const match of accessMatch[1].matchAll(/'([a-z]+)'/g)) {
    const id = match[1];
    assert(pageIds.has(id), `Access matrix references unknown page: ${id}`);
  }
}

assert(html.includes("coaching:'Coaching & Development'"), 'Coaching & Development page is not defined');
assert(html.includes('addLevel'), 'Development level admin action is missing');
assert(html.includes('addCoachRule'), 'Game coaching rule action is missing');
assert(html.includes('assignCoach'), 'Coach assignment action is missing');
assert(html.includes('coachCheckin'), 'Coach game-day check-in action is missing');
assert(html.includes('actionAccess'), 'Operational action authorisation is missing');
assert(html.includes('closeDrawer();go('), 'Drawer navigation does not explicitly close before page navigation');

if (failures.length) {
  console.error('ClubRoster static QA failed:');
  failures.forEach(f => console.error(`- ${f}`));
  process.exit(1);
}

console.log(`ClubRoster static QA passed: ${requiredPages.length} required screens, coaching workflow, role/action wiring, breadcrumbs and JavaScript syntax.`);