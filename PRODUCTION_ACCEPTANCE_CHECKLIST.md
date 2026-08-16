# ClubRoster — Production Acceptance Checklist

This checklist defines the minimum exit gate for the production application. The GitHub Pages site is the signed-off interactive concept; production is not accepted until every applicable item below has evidence and a passing test.

## A. Application foundation

- [ ] Production environment uses real authentication; no role/persona selector can bypass authentication.
- [ ] Organisation/tenant isolation is enforced server-side and tested.
- [ ] Every supported role has explicit server-side permissions.
- [ ] Restricted safeguarding data is never returned to unauthorised clients.
- [ ] All writes store authenticated actor ID, timestamp and organisation ID.
- [ ] Database migrations, seed strategy and rollback procedure are documented.
- [ ] Production, staging and development environments are isolated.
- [ ] Secrets are stored outside source control.
- [ ] Monitoring, error tracking and audit logging are enabled.

## B. Navigation and usability

- [ ] Every visible navigation item opens its dedicated page without console/runtime errors.
- [ ] Every visible button/link/form control in `INTERACTION_MATRIX.md` has a tested outcome.
- [ ] No action falls through to a generic success message without doing the requested work.
- [ ] Normal weekly admin workflows use plain netball language.
- [ ] Primary actions are visually obvious and dangerous actions require confirmation.
- [ ] Error messages state what happened and what the user should do next.
- [ ] Loading, empty, success and failure states exist for every network-backed screen.
- [ ] Keyboard navigation, focus states and screen-reader labels pass accessibility review.
- [ ] Mobile tap targets and responsive layouts pass supported-device testing.
- [ ] The application remains usable by a low-confidence administrator without developer terminology.

## C. Organisation, season and netball setup

- [ ] Association / club / season / competition / grade / venue / court configuration persists.
- [ ] Netball requirement matrix supports grade-specific Umpire 1, Umpire 2, coach and pairing rules.
- [ ] Coach capacity and coaching-intensity rules persist and feed rostering validation.
- [ ] Club/team umpire duty rules persist and create obligations by fixture/round.
- [ ] Match-fee rules persist with effective dates and audit history.
- [ ] Rule changes are versioned and cannot silently alter historical completed assignments/payments.

## D. People, guardians, accreditation and compliance

- [ ] Person records distinguish umpire, coach, mentor, assessor, coordinator and other authorised roles.
- [ ] Junior/guardian relationships are explicit and effective-dated.
- [ ] Umpire levels/accreditations include effective/expiry dates and verification source.
- [ ] Blue Card / WWCC records capture role assessment, paid/volunteer basis, exemptions, verification, organisation linking and expiry/review.
- [ ] A required invalid/expired/unverified compliance record blocks applicable child-related appointment paths.
- [ ] Exemptions are recorded with reason, verifier and review date.
- [ ] Credential changes create immutable audit events.
- [ ] Expiry reminders/tasks are generated automatically.

## E. Compliance & safeguarding registers

- [ ] Blue Cards / WWCC register supports create, view, edit, review, expiry and evidence.
- [ ] Child Safe Standards evidence register covers all 10 Queensland standards plus the Universal Principle.
- [ ] Safeguarding incidents & complaints register is restricted and supports evidence attachments.
- [ ] Training & induction register persists completion and refresher due dates.
- [ ] Policies & procedures register tracks owner, version, adoption date and review date.
- [ ] Screening & recruitment register tracks role assessment and checks before activation.
- [ ] Guardian & junior consent register tracks guardian link, consent/acknowledgement and review.
- [ ] Accreditation & qualification register tracks level, verification and expiry.
- [ ] Codes of Conduct register tracks applicable code/version and acknowledgement.
- [ ] Risk & game-day safety register tracks risk, rating, controls, owner and review.
- [ ] Compliance actions & expiry register consolidates due/missing/expiring items.
- [ ] Audit & review register evidences scheduled governance reviews.
- [ ] Register attachments are access-controlled, malware-scanned and audit logged.

## F. Fixture import and fixture record

- [ ] Real target fixture export is acceptance-tested before production go-live.
- [ ] XLSX/CSV import supports multiple sheets/files where required.
- [ ] Mapping can be saved by source format.
- [ ] Required fields are validated before confirmation.
- [ ] Duplicate Game ID and duplicate fixture detection work.
- [ ] Date/time/venue/court/team/grade validation blocks invalid records.
- [ ] Upsert preserves safe existing assignments and identifies impacted appointments.
- [ ] Import produces a preview/diff before commit.
- [ ] Import is idempotent for the same source file/content.
- [ ] Each fixture has a persistent game record with comments, feedback, issues and assignment history.
- [ ] Fixture comments store author/time and are not silently editable without history.
- [ ] Fixture safeguarding issues link to the restricted incident record and compliance action.

## G. Availability and conflicts

- [ ] Season recurring availability persists by person/day/time window.
- [ ] Availability exceptions override recurring patterns correctly.
- [ ] Maximum games and preferences persist.
- [ ] Team/family conflicts are explicit and restricted appropriately.
- [ ] Availability changes after a roster is planned identify impacted assignments.
- [ ] Junior availability/guardian controls operate according to configured policy.

## H. AutoRoster and roster validation

- [ ] Scheduler enforces no-overlap constraints.
- [ ] Scheduler enforces grade/position accreditation requirements.
- [ ] Scheduler enforces compliance/Blue Card eligibility where applicable.
- [ ] Scheduler enforces known team/family conflicts.
- [ ] Scheduler enforces maximum games, breaks and fatigue rules.
- [ ] Scheduler enforces junior supervision rules.
- [ ] Scheduler enforces coach capacity and coaching target rules.
- [ ] Scheduler scores umpire pairing quality.
- [ ] Scheduler includes fairness and preference objectives.
- [ ] Every proposed/rejected candidate has an understandable explanation.
- [ ] Manual assignment reruns the same hard constraints.
- [ ] Drag/drop assignment reruns the same hard constraints transactionally.
- [ ] Concurrent edits cannot double-allocate a person.

## I. Roster versions, publish and acknowledgements

- [ ] Draft/planned/published/locked/completed states persist.
- [ ] Every material roster change is versioned/audited.
- [ ] Rollback creates a new version rather than deleting history.
- [ ] Publish is blocked while required positions remain invalid/unfilled unless an authorised override process exists.
- [ ] Publish sends the configured appointment communications.
- [ ] Sent/delivered/read/acknowledged state is persisted where required.
- [ ] Fixture changes after publish identify affected appointments and require acknowledgement where configured.

## J. Open Games, standby and swaps

- [ ] Open Games displays only genuinely unfilled umpire positions.
- [ ] Eligibility is recalculated at the moment a person clicks Take/Request.
- [ ] Self-assignment is atomic; two users cannot take the same final position.
- [ ] Controlled grades create coordinator approval rather than direct assignment.
- [ ] Open Game assignment updates roster, task, notification and audit in one transaction.
- [ ] Standby pools are configurable by time window and qualification.
- [ ] Replacement ranking prioritises configured standby/on-site eligible officials.
- [ ] Swap requires recipient acceptance and coordinator approval where configured.
- [ ] Original assignment remains active until final approval.
- [ ] Approved swap updates assignment, notifications, fee rights and audit transactionally.
- [ ] Swap expiry/lock rules are enforced.

## K. Game day

- [ ] Coordinator checklist persists by date/round/venue.
- [ ] Checklist entries record actor/time and optional evidence.
- [ ] Checklist can create/resolve operational To Do items.
- [ ] Sign-off is blocked until mandatory controls are complete unless a documented authorised override is used.
- [ ] Umpire/coach arrival is recorded with authenticated identity.
- [ ] Declines/no-shows create immediate repair actions.
- [ ] Emergency replacement uses the normal eligibility engine.
- [ ] Completion records are immutable evidence for fee calculation subject to authorised correction history.
- [ ] Game-day incident reporting supports immediate safeguarding escalation.

## L. Mobile app

- [ ] Umpire can see upcoming, next-week, month and season appointments.
- [ ] Umpire can accept/decline, update availability, request swaps and use Open Games.
- [ ] Umpire can arrive/check in, complete a game, chat, see development/payments and report an issue.
- [ ] Coach can manage coaching appointments, attendance, feedback and issue reporting.
- [ ] Coordinator/admin can manage live coverage, checklist, tasks, swaps, people and incidents.
- [ ] Guardian access is limited to linked junior records/functions.
- [ ] Push notification permissions and fallbacks are tested.
- [ ] Offline/poor-connectivity behaviour is explicitly defined and tested for game day.

## M. Development, coaching and assessment

- [ ] Development level/badge and target are persisted.
- [ ] Coaching delivery is linked to fixture/assignment/person.
- [ ] Coach feedback includes author, time, game and structured competencies.
- [ ] Mentor and assessor roles are distinct where required.
- [ ] Assessment records are immutable/versioned and support pathway progression.
- [ ] Coaching percentage/target calculation is tested.
- [ ] Coach capacity constraints are tested.
- [ ] Development reports do not expose restricted safeguarding information.

## N. Tasks and communications

- [ ] System-generated tasks are idempotent and do not create uncontrolled duplicates.
- [ ] Tasks have owner, status, priority, due date, source and linked entity.
- [ ] Resolving source problems resolves/updates related tasks where appropriate.
- [ ] Email/SMS/push/in-app providers have delivery/error handling.
- [ ] Messages requiring acknowledgement remain outstanding until acknowledged.
- [ ] Junior communications comply with configured guardian/safeguarding controls.
- [ ] Communication history is audit logged.

## O. Match fees and finance

- [ ] Fee entitlement is generated from completed eligible assignments and effective fee rules.
- [ ] Coach/assessor/standby/cancellation rules calculate correctly.
- [ ] Attendance/payment exceptions can be held with reason.
- [ ] Approval 1 and Approval 2 must be different authenticated users.
- [ ] Export is blocked until required approvals are complete.
- [ ] Bank format is confirmed against the target banking workflow.
- [ ] Xero mapping is confirmed against the target production accounting workflow.
- [ ] Mark-paid/reconciliation records payment reference/date and immutable audit.
- [ ] Corrections/reversals do not delete original payment history.

## P. Audit, security and privacy

- [ ] Audit events are append-only at application level.
- [ ] Sensitive record access is itself auditable where required.
- [ ] Authentication/authorisation tests cover every role and restricted endpoint.
- [ ] OWASP-aligned security review is complete.
- [ ] File upload controls include type/size validation and malware scanning.
- [ ] Data retention/deletion rules are documented and implemented.
- [ ] Privacy notices/consents are approved for actual deployment context.
- [ ] Backups are encrypted and restore tests are evidenced.
- [ ] Incident response and breach handling processes are documented.

## Q. Quality, performance and reliability

- [ ] Unit tests cover core rule/eligibility/fee calculations.
- [ ] API integration tests cover write transactions and permissions.
- [ ] Browser/mobile E2E tests cover every critical path in `INTERACTION_MATRIX.md`.
- [ ] Real fixture import acceptance test passes.
- [ ] Concurrency tests cover self-assignment, swaps and roster edits.
- [ ] Load/performance targets are defined and met for expected association scale.
- [ ] Supported browsers/devices are documented and tested.
- [ ] No high-severity accessibility defects remain.
- [ ] No critical/high security defects remain.
- [ ] Production observability alerts are tested.

## R. Go-live sign-off

- [ ] Product owner signs off workflow acceptance.
- [ ] Umpire coordinator signs off rostering/game-day acceptance.
- [ ] Safeguarding/compliance owner signs off policy and access implementation.
- [ ] Finance owner signs off payment workflow and export mappings.
- [ ] Developer/technical lead signs off security, backup and release readiness.
- [ ] Pilot data migration/import is reconciled.
- [ ] Support/escalation ownership is documented.
- [ ] Rollback/recovery plan is approved.
- [ ] Production release checklist passes.

**No production release should be represented as complete solely because the static concept or string-based QA passes.**
