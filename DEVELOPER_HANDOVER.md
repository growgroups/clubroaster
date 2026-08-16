# ClubRoster — Final Developer Handover

Status: interactive concept handover baseline
Date: 16 August 2026
Live concept: https://growgroups.github.io/clubroaster/
Repository: `growgroups/clubroaster`

## 1. Product definition

ClubRoster is a netball-only umpire operations and development platform. It is not intended to replace whole-of-competition registration, ladders, scoring or team administration products.

The product owns the operational layer around netball umpiring:

1. fixture intake and game requirements
2. umpire and coach profiles
3. Blue Card / child-safety compliance
4. season and exception availability
5. club/team umpire obligations
6. AutoRoster and manual roster repair
7. umpire pairing and coaching requirements
8. publish, acknowledgement and confirmation
9. Open Games / controlled self-assignment
10. swaps and standby coverage
11. game-day check-in and coordinator checklist
12. fixture comments, feedback and restricted incidents
13. umpire development, coaching and assessment
14. match-fee entitlement
15. two-person finance approval and accounting/bank export
16. audit, reporting and compliance registers

The primary pilot context is community netball at Pizzey Park. All people, Blue Card references, fees and incidents in the repository are synthetic/anonymised concept data.

## 2. End-user design requirement

The normal coordinator/admin user must be able to operate the product with approximately Year 10 education and limited software experience.

Production UI rules:

- use plain netball terminology
- one obvious primary action per task where possible
- show `what needs attention` before analytics
- prevent invalid actions rather than explaining errors after the fact
- do not expose technical architecture language in routine workflows
- use clear confirmation on publish, payment, rollback and safeguarding actions
- make all common mobile controls finger-sized
- provide role-appropriate screens rather than large permission-heavy screens
- never depend on colour alone for status
- show why an umpire is not eligible

## 3. Core roles

- Club Administrator
- Association Administrator
- Umpire Coordinator
- Coach / Mentor / Assessor
- Finance / Payments
- Game-day Supervisor
- Adult Umpire
- Junior Umpire
- Parent / Guardian
- Read-only / Audit

Production permissions must be server-side. Hiding a menu item is not an authorisation control.

## 4. Primary data model

See `PRODUCTION_DATA_PERMISSIONS_SPEC.md` for the locked production direction.

Core entities include:

- organisations
- users
- people
- guardian_links
- credentials
- seasons
- competitions
- grades
- venues
- courts
- fixtures
- game_requirements
- assignments
- roster_versions
- availability_patterns
- availability_exceptions
- conflicts
- swap_requests
- fixture_comments
- incidents
- incident_evidence
- coaching_feedback
- development_plans
- messages / conversations
- tasks
- fee_rules
- payment_lines
- payment_batches
- audit_events
- compliance register records and review evidence

## 5. Required state machines

### Assignment

`Planned -> Offered -> Accepted/Declined -> Arrived -> Completed`

Additional terminal/exception states:

- Cancelled
- No show
- Replaced

### Roster

`Draft -> Planned -> Offered -> Published -> Locked -> Completed`

Every post-publish change must create a new roster version or immutable change event.

### Swap

`Requested -> Awaiting recipient -> Awaiting coordinator approval -> Approved`

Exception states:

- Declined
- Rejected by coordinator
- Expired
- Cancelled due to fixture change

The original assignment remains responsible until final coordinator approval.

### Incident / safeguarding concern

`Reported -> Triaged -> Action assigned -> Follow-up -> Resolved -> Restricted archive`

Serious/urgent matters must support escalation outside the app according to current legal, governing-body and club procedures.

### Payment batch

`Draft -> Awaiting approval 1 -> Awaiting approval 2 -> Approved -> Exported -> Paid -> Reconciled`

Approval 1 and Approval 2 must be different authenticated users in production.

## 6. Critical production workflows

### A. Season setup

1. configure association/club/season/competition/grade/venue/court
2. configure netball requirement matrix
3. configure coach capacity and development levels
4. configure fee rules
5. configure club/team umpire duty rules
6. import fixtures
7. validate duplicates, IDs, dates, times, venues, courts and grade mapping
8. generate required umpire/coach positions

### B. Season rostering

1. collect recurring availability and exception dates
2. forecast shortages
3. run AutoRoster
4. show every rejected candidate reason
5. review umpire pairing quality and coaching demand
6. manual/drag-drop repair with full revalidation
7. create roster version
8. publish selected round/window
9. collect acknowledgements and responses

### C. Open Games

1. find unfilled umpire positions
2. filter to currently eligible umpire
3. rerun availability, level, conflict, overlap, compliance and fatigue checks at click time
4. direct self-assignment only when competition configuration permits
5. otherwise create coordinator approval request
6. update assignment, audit, notifications and task state transactionally

### D. Game day

1. coordinator follows game-day checklist
2. officials check in
3. no-shows/declines create repair tasks
4. replacement shortlist uses standby and eligible on-site officials first
5. fixture comments and issues remain linked to the game
6. coaches record feedback
7. completed attendance becomes fee evidence
8. coordinator signs off only after required controls are complete

### E. Compliance & safeguarding

1. maintain Blue Card / WWCC register
2. maintain Queensland Child Safe Standards evidence
3. maintain screening, training, policy, consent, accreditation, code, risk, action and review registers
4. block child-related assignment where a required compliance record is invalid
5. restrict safeguarding details to authorised roles
6. retain immutable audit and evidence attachments

### F. Finance

1. calculate fee entitlement from completed assignments and fee rules
2. place exceptions on hold
3. complete maker/checker approval
4. export approved payment batch
5. import/reconcile payment result
6. post/account to Xero according to confirmed production mappings

## 7. Scheduling engine requirements

Recommended production approach: a separate scheduling/optimisation service using an explainable constraint solver.

Hard constraints include:

- availability
- no overlapping appointment
- required umpire level/accreditation
- current Blue Card/child-safety eligibility where required
- known team/family conflict
- maximum games
- minimum breaks
- junior supervision requirements
- game/grade requirements
- coach capacity
- travel/court transition where applicable

Soft objectives include:

- fairness of total games
- early/late game distribution
- preferred times
- minimise large gaps
- minimise unnecessary consecutive games
- development pairing quality
- coach-development target delivery
- reduce repeated team exposure
- reduce repeated partner combinations
- minimise changes after publication

Every suggested assignment must return an explanation.

## 8. Compliance architecture

See:

- `COMPLIANCE_SAFEGUARDING_SPEC.md`
- `PRODUCTION_DATA_PERMISSIONS_SPEC.md`

Production must use role-based/attribute-based access on the server. Restricted incidents and evidence should not be returned to an unauthorised client at all.

Blue Card/WWCC logic must not be based only on age. The role, paid/volunteer status, exemptions, verification and organisation linking must be recorded and verified using the current approved process.

The concept does not certify legal compliance.

## 9. Mobile requirements

Mobile is the primary workplace for most umpires/coaches and a major game-day interface for coordinators.

Umpire app must support:

- upcoming / next week / month / season roster
- accept / decline
- future availability
- Open Games
- swap request
- arrival
- completion
- chat
- development plan and coach feedback
- payments
- report issue

Coach app must support:

- coaching appointments
- accept / decline
- arrival
- assigned umpire/development target
- feedback
- completion
- chat
- issue reporting

Coordinator app must support:

- live coverage
- checklist
- no-shows and declines
- roster repair
- swaps
- tasks
- chat
- incidents
- people/development
- close-day verification

Production should be implemented as a responsive PWA or native-capable app with push notifications and appropriate offline handling for game-day operations.

## 10. Concept source layout

- `app.js` — base data, pages and core actions
- `patch.js` — legacy guard overrides
- `mobile-app.js` — mobile personas and appointment lifecycle
- `game-day-checklist.js` — coordinator checklist
- `season-planning.js` — forward roster, availability and swaps
- `netball-operations.js` — netball requirements, duties, pathway and intelligence
- `mobile-open-games.js` — umpire self-assignment/request flow
- `simple-ux.js` — plain-language UX
- `fixture-operations.js` — fixture record, comments/issues and roster changes
- `pilot-readiness.js` — readiness evidence
- `compliance-centre.js` — compliance dashboard and Blue Card controls
- `compliance-enforcement.js` — allocation compliance and final bootstrap
- `compliance-registers.js` — compliance register hub
- `final-hardening.js` — final interaction fixes, validated assignment flow, working register CRUD concept and developer handover page

The static layered architecture is deliberately not the recommended production architecture. Developers should consolidate this into normal application modules/components/state/services rather than continuing the global-script override pattern.

## 11. Recommended production stack

A suitable implementation can use:

- React / Next.js frontend
- PostgreSQL database
- server-side API layer
- object storage for evidence and attachments
- queue/event layer for notifications and asynchronous roster jobs
- Python OR-Tools scheduling service or equivalent constraint solver
- mobile PWA first, native wrapper/app only if required

Exact stack choice is secondary to the data, permissions and workflow contracts.

## 12. Mandatory engineering controls

- tenant isolation
- least-privilege authorisation
- authenticated user identity on every write
- row-level access rules for guardians and juniors
- encryption in transit and at rest
- restricted safeguarding storage
- immutable/append-only audit semantics
- attachment malware scanning and secure downloads
- backup and restore testing
- production logging/monitoring
- rate limiting and abuse controls
- idempotent fixture import/upsert
- transactional assignment/swap/payment writes
- concurrency control for self-assignment and swaps
- audit of permission and credential changes
- automated expiry/reminder jobs

## 13. Testing handover

The repository QA suite is a concept regression gate. Production requires additional tests:

- unit tests for eligibility and fee rules
- integration tests for database transactions
- API permission tests per role
- end-to-end browser/mobile tests for every interaction in `INTERACTION_MATRIX.md`
- fixture import acceptance tests using a real source export
- solver constraint tests
- safeguarding access/security tests
- payment maker/checker tests
- accessibility tests
- performance/load tests
- backup/restore test
- penetration/security review

## 14. Definition of production-ready software

The live GitHub Pages site is the signed-off interactive concept, not deployable production software.

The production build is ready only when every item in `PRODUCTION_ACCEPTANCE_CHECKLIST.md` passes with persistent data, real authentication, server-side permissions, real integration mappings and end-to-end automated tests.
