# ClubRoster Concept Completion Action Plan

## Purpose

This plan closes the gap between the clickable GitHub Pages concept and a production build decision for the Pizzey Park Netball Club pilot. The concept is deliberately static and synthetic: it demonstrates workflow, navigation, role experience and product behaviour without real authentication, child data, payments or backend services.

## Current concept status

The QA sweep in Issue #5 targets a concept that can be demonstrated end-to-end without explaining around dead buttons or broken navigation. The concept contains 19 screens, role-based navigation for 10 user types, age-aware junior/guardian and senior-friendly mobile views, fixture import, roster generation, exceptions, game-day operations, match fees, reporting, audit, blueprint, playbook and this action plan.

### P0 - Interaction completeness

Status: **complete in the Issue #5 QA branch, subject to live Pages verification after merge.**

Acceptance gates:

- Every visible button performs a concept action: navigation, drawer, state change, export, print, file selection or feedback.
- Every sidebar item targets an existing screen.
- Breadcrumbs are clickable and return to the appropriate dashboard/context.
- Workflow nodes are clickable and open the relevant stage.
- Role switching changes permitted navigation and redirects away from inaccessible screens.
- Import -> fixtures -> availability -> roster -> exceptions -> publish -> game day -> payments -> reports can be demonstrated in sequence.
- Junior, guardian, adult, senior-friendly, coordinator, supervisor, finance, mentor, association and audit journeys can be previewed.
- Static JavaScript passes syntax validation.
- GitHub Pages deployment succeeds after merge.

## P1 - Pilot realism and stakeholder validation

### 1. Fixture data validation

Use anonymised or synthetic copies of the actual competition fixture structures used by Pizzey Park and the associations in which its teams compete.

Required outcomes:

- Confirm all real source columns and common aliases.
- Confirm game IDs, rounds, dates, times, venues, courts, age groups, divisions, teams and association names.
- Confirm how cancellations, forfeits, wet-weather changes, byes and rescheduled games are represented.
- Confirm whether complete-season files or incremental update files are supplied.
- Confirm duplicate/change matching keys.
- Confirm club umpire obligations for home, away and association-supplied appointments.

### 2. Umpire rule catalogue

Document and obtain club/association sign-off for:

- accreditation and competency requirements by competition/grade;
- age or experience limits;
- junior supervision and mentor requirements;
- latest permitted finishing times for young umpires;
- maximum games and required breaks;
- player/team/club/family conflicts;
- availability and preferred-time rules;
- consecutive-game and travel rules;
- association and club umpire-supply rules;
- emergency replacement priority;
- fairness objectives;
- match-fee schedules and payment approval process.

### 3. Five structured stakeholder walkthroughs

Run the same scenarios with:

1. Umpire Coordinator - import fixtures, collect availability, AutoRoster, resolve exceptions and publish.
2. Junior umpire + guardian - receive appointment, understand arrival details, accept/decline, receive a change and request help.
3. Adult/senior umpire - set availability, view appointments, confirm arrival and use large-text/simple mode.
4. Game-day supervisor - check arrivals, identify a no-show and appoint an emergency replacement.
5. Finance/payment user - review completed appointments, approve match fees, export and reconcile exceptions.

For each walkthrough record: task completion, confusion points, missing data, unnecessary steps, terminology changes and required safeguards.

### 4. Mobile and accessibility validation

Test on realistic phone widths and with users at both ends of the target age range.

Minimum gates:

- a 10-year-old can identify the next appointment and the two primary actions without training;
- a guardian can identify exactly what changed and what acknowledgement is required;
- a 65+ user can use large-text mode without layout breakage;
- controls remain usable by keyboard;
- colour is not the only indicator of status;
- important actions have plain-language labels;
- mobile navigation does not hide required actions.

## P2 - Production build readiness

Production development should not begin until the following gates are signed off.

| Workstream | Gate | Required output |
|---|---|---|
| Product scope | Pilot journeys accepted | Signed MVP scope and exclusions |
| Identity | Role matrix accepted | Authentication, MFA and account recovery design |
| Junior accounts | Guardian model accepted | Consent, linkage, communication and escalation design |
| Data model | Fixture/rules schema accepted | Tenant-isolated relational schema and audit events |
| Scheduling | Hard/soft rules signed off | Optimisation specification and deterministic validation rules |
| Safeguarding/privacy | Policy and legal review complete | Data minimisation, permissions, retention and communication controls |
| Payments | Payment process confirmed | Match-fee entitlement, approval and reconciliation design |
| Integrations | Systems confirmed | PlayHQ/competition source, Xero and messaging contracts |
| Operations | Pilot support model agreed | Incident, backup, monitoring, support and recovery procedures |
| Security | Threat model reviewed | Security controls, test plan and environment separation |

### Recommended production architecture

- Responsive React/Next.js web application or equivalent production frontend.
- PostgreSQL relational database with organisation/tenant isolation.
- Server-side authentication and role/permission enforcement.
- Separate scheduling/rules service boundary, initially within a modular monolith unless scale proves otherwise.
- Optimisation engine using deterministic hard constraints plus weighted soft objectives; OR-Tools is a strong candidate.
- Immutable audit events for fixture changes, assignments, overrides, publications, guardian acknowledgements and payment approvals.
- Object storage for policy/credential documents where required.
- Notification abstraction for email, SMS and push.
- Integration layer for competition/fixture sources and Xero/payment exports.

## P3 - Integrations and automation

Implement only after the pilot workflow is stable.

Priority order:

1. Competition fixture/API sync, including PlayHQ where technically and contractually available.
2. Email/SMS/push notifications with templates, opt-out and junior/guardian safeguards.
3. Xero or payroll/payment export and reconciliation.
4. Calendar feeds for appointments.
5. Credential/accreditation source integrations where available.
6. Advanced demand forecasting and cross-club/association umpire pools.
7. Multi-organisation white-label capability.

## Concept-to-production backlog

### Epic A - Identity and people

- Organisation, association and club tenancy.
- Adult umpire account.
- Junior umpire account.
- Guardian linkage and consent.
- Mentor/coach profile.
- Accreditation and competency history.
- Emergency contact and accessibility preferences.
- Account invitations, recovery and deactivation.

### Epic B - Fixtures and obligations

- Bulk Excel/CSV import.
- Intelligent saved column mappings.
- Association/club/team aliases.
- Duplicate detection.
- Change detection and versioning.
- Court and venue validation.
- Umpire-supply rules.
- Automatic required-position generation.

### Epic C - Availability and scheduling

- Recurring availability.
- Round overrides.
- Preferences and maximum games.
- Hard eligibility validation.
- Fairness and mentoring objectives.
- AutoRoster generation.
- Explainability for every assignment.
- Manual override with reason.
- Minimum-change roster repair.

### Epic D - Publication and game day

- Publish version.
- Accept/decline.
- Guardian acknowledgement where required.
- Reminder/escalation sequence.
- Check-in.
- No-show handling.
- Emergency replacement offers.
- Incident recording.
- Completion confirmation.

### Epic E - Fees and reporting

- Match-fee rules.
- Completed-assignment entitlement.
- Approval workflow.
- Payment/export reconciliation.
- Coverage and shortage reporting.
- Fairness reporting.
- Mentoring/development reporting.
- Full audit export.

### Epic F - Security, privacy and safeguarding

- Least-privilege permissions.
- Tenant isolation tests.
- MFA for privileged roles.
- Guardian-controlled junior contact channels.
- Age-aware communication rules.
- Sensitive-field restrictions.
- Data retention and deletion policies.
- Privacy-aware logging.
- Exportable audit evidence.

## Pilot exit criteria

The concept is ready to become a production build only when all of the following are true:

- Pizzey Park can load a realistic full-season fixture set without manual restructuring.
- Umpire-supply obligations generated by the system match the club's actual obligations.
- A coordinator can create and publish a round roster with no spreadsheet dependency during the demonstration.
- Junior and guardian users understand appointments, changes and help/escalation flows.
- The system never knowingly permits an invalid hard-rule assignment in the agreed rule catalogue.
- Game-day replacement can be completed from the concept flow without returning to a spreadsheet.
- Match-fee output reconciles to completed appointments in the agreed pilot process.
- Stakeholders sign off the screen terminology, navigation and information hierarchy.
- Safeguarding/privacy requirements for users aged approximately 10 to 17 have been formally reviewed before real personal data is introduced.
- The product owner approves the MVP scope, exclusions and production architecture.

## Recommended next concept sprint

1. Replace synthetic fixture rows with anonymised structures matching real Pizzey Park/association exports.
2. Validate the actual age groups, divisions, competition names, venues and court naming.
3. Build the full import mapping/validation wizard states using realistic error cases.
4. Model the actual umpire accreditation and competency levels used by the club/association.
5. Add explicit accept/decline and guardian-change scenarios across at least three junior age bands.
6. Add a realistic emergency-replacement drill.
7. Add the complete match-fee schedule and a round reconciliation view.
8. Run stakeholder walkthroughs and capture changes as GitHub issues before production development begins.

## Definition of done for the concept

The concept is finished when a new stakeholder can start at Dashboard and complete every pilot journey using only visible controls, with no dead buttons, no broken navigation, no unexplained screen jumps and no reliance on developer narration.
