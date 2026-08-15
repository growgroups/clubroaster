# ClubRoster Netball Action Plan

## Completed in concept sprint #23
- Netball-only product positioning and domain model.
- Netball grade/competition umpire requirement matrix.
- Club/team Umpire Duty Ledger.
- Recurring season availability and exception-date model.
- Formal assignment lifecycle and roster version/rollback concept.
- Controlled Open Games requests.
- Standby/reserve umpire time-block coverage.
- Fixture-change impact and repair workflow.
- Two-umpire pairing intelligence and explainability.
- Coach capacity/intensity rules.
- Separate coach/mentor/assessor blueprint.
- Structured umpire pathway and competency readiness.
- Restricted safeguarding lifecycle concept.
- Read/acknowledge operational messages.
- Netball match-fee rules.
- Credential expiry/verification register.
- Capacity forecast.
- Fairness/load analytics.
- Static deployment QA for all additions.

## Remaining before production
### P1 - Pilot realism
Replace synthetic configuration with the actual pilot association/club setup: competitions, grades, courts, game durations, umpire supply obligations, development levels, coaching ratios, fee schedule, junior rules, credential requirements and fixture files.

### P1 - Browser journey automation
Add Playwright (or equivalent) tests covering every role and the full coordinator, umpire, junior/guardian, coach/assessor, game-day and finance journeys. Static QA remains a deployment gate but does not replace browser execution.

### P1 - Persistent application backend
Move synthetic state to authenticated tenant data. Add organisation/association tenancy, users, roles, seasons, fixtures, requirements, appointments, availability, development, incidents, communications, payments and immutable audit records.

### P1 - Production scheduler
Implement hard constraints first, then weighted soft constraints. Produce explainable eligibility and pair scores. Preserve manual overrides and minimum-change repair after publication.

### P1 - Safeguarding/security review
Confirm data retention, minor/guardian permissions, incident visibility, attachment storage, access logging, breach controls and Queensland/Australian privacy requirements with appropriate legal/privacy review.

### P1 - Competition data integration
Confirm the selected fixture source and available API/export mechanism. Build idempotent import/upsert, aliases, diffing and safe preservation of appointments.

### P1 - Notification services
Connect push/SMS/email providers, delivery status, read state and explicit acknowledgement. Add escalation for unacknowledged critical changes.

### P1 - Payments
Confirm actual fee schedule, bank process, Xero mapping and approval policy. Then implement validated exports/integration and payment reconciliation.

## P2 - High-value enhancements
- Calendar feeds/ICS for all appointments and updates.
- QR/control-desk arrival.
- Weather/heat policy alerts where configured.
- Assessment attachments/video references.
- Voice-to-coach-note capture.
- Advanced season simulation and what-if planning.
- Automated development recommendations from structured history.

## Pilot acceptance criteria
- At least 95% of eligible positions can be proposed automatically before manual repair.
- Zero known double bookings, invalid level assignments or known team/family conflicts in a published roster.
- Every recommendation explains eligibility, pairing and development reason.
- Fixture changes immediately identify affected appointments and required acknowledgements.
- Missing club/team umpire duties are visible before publish.
- Junior/guardian flow is independently usable.
- Coordinator can resolve a withdrawal/no-show from mobile in a small number of steps.
- Coaching requirements and capacity are visible alongside umpire coverage.
- Completed games reconcile to the correct fee rule and approval workflow.
- Full audit history is retained for roster, development, incident and payment changes.
