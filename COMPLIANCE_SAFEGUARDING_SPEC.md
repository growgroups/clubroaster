# ClubRoster Compliance & Safeguarding Specification

Status: IMPLEMENTED IN CONCEPT / PRODUCTION CONTROLS SPECIFIED
Reviewed: 16 August 2026
Jurisdiction focus: Queensland community netball

## Purpose
ClubRoster must treat child safety and Working with Children compliance as core operations, not an optional admin field. The Compliance & Safeguarding centre provides evidence, alerts and allocation controls for netball clubs and associations.

## Current Queensland baseline
The concept is aligned to the current Queensland position reviewed on 16 August 2026:

- Queensland's Child Safe Organisations Act 2024 establishes 10 Child Safe Standards and a Universal Principle requiring cultural safety for Aboriginal and Torres Strait Islander children.
- Sport and recreation organisations in scope commenced compliance with the Child Safe Standards and Universal Principle from 1 April 2026.
- The former child and youth risk management strategy requirements were replaced by the Child Safe Standards from 1 April 2026.
- Blue Card requirements apply to relevant child-related work in churches, clubs and associations, including child-related services/activities and executive decision-making about children.
- A paid sports referee can require a Blue Card, including if under 18. A child volunteering as a referee can be exempt. Parent-volunteer exemptions are role/circumstance dependent and must be recorded rather than assumed.
- Netball Queensland publishes a Blue Card Policy and adopts Netball Australia's Safeguarding Children & Young People and Member Protection policies.

This specification is a compliance-management design. It does not provide legal certification and does not replace regulator or governing-body advice for a particular person's circumstances.

## Compliance centre modules

### 1. Blue Card / Working with Children register
For every person who may perform child-related work, capture:
- person
- actual role and work basis (paid/volunteer)
- child-related position assessment
- requirement: required / exemption claimed / not child-related
- exemption basis and evidence
- Blue Card or exemption reference
- verification source/date
- organisation-linking status/date
- issue/expiry dates where applicable
- status: valid, pending, expires soon, expired, suspended/cancelled, exemption recorded
- compliance owner
- evidence/reference metadata
- next review date

Production allocation rule: where a Blue Card is required, no child-related assignment is permitted unless the verified current status and required organisation linking are satisfied. The check runs at manual allocation, AutoRoster, self-assignment, swap approval and drag/drop reassignment.

### 2. Queensland Child Safe Standards dashboard
Track evidence and improvement actions against:
1. child safety and wellbeing embedded in leadership, governance and culture
2. children informed about rights, participating in decisions and taken seriously
3. families and communities informed and involved
4. equity upheld and diverse needs respected
5. people working with children suitable and supported
6. complaints and concerns handled in a child-focused way
7. staff and volunteers trained and aware
8. physical and online environments safe
9. implementation regularly reviewed and improved
10. policies and procedures document how the organisation is safe for children

Universal Principle: promote and uphold cultural safety for Aboriginal and Torres Strait Islander children.

Each standard needs:
- accountable owner
- evidence
- current status
- gap/action
- due date
- review date
- audit history

### 3. Policies and evidence
Maintain the current adopted/version-controlled record for:
- Safeguarding Children & Young People Policy
- Member Protection Policy
- Blue Card / WWCC procedure
- Code of Conduct
- child-safe recruitment and screening
- complaints / incident / escalation process
- digital communication with juniors
- guardian communication/consent controls
- photography/media policy where relevant
- overnight/camp controls if ever applicable
- emergency/welfare escalation
- privacy/data retention

### 4. Safe recruitment and screening
Before activating a person in a child-related role:
- role is classified
- Blue Card requirement/exemption assessed
- identity checked as required by policy
- qualifications/accreditations verified
- reference checks completed where the role requires them
- safeguarding induction completed
- Code of Conduct acknowledged
- communication/supervision expectations acknowledged
- role activation approved by an authorised administrator

### 5. Training register
Track required training by role, including safeguarding induction, refresher dates, complaint/incident response and any governing-body education requirement. Expiring/due training creates Compliance To Do items and can block role activation where configured.

### 6. Restricted safeguarding and incident register
Support categories including:
- suspected child abuse or harm
- parent/spectator abuse
- bullying/harassment
- sexual misconduct or boundary concern
- discrimination/vilification
- injury/welfare concern
- unsafe environment
- digital/communication concern
- complaint/conflict
- other safeguarding concern

Capture incident ID, fixture/person, reporter, date/time, description, immediate action, severity, witnesses/evidence, owner, status, escalation/reporting actions, guardian contact where appropriate and resolution.

Production controls:
- restricted by default
- least-privilege access
- attachments/evidence protected
- full audit trail
- no deletion by normal users
- legal/policy retention rules configured before real data
- urgent concerns must not wait for software workflow; club reporting/escalation procedures remain operative

### 7. Junior and guardian controls
- verified guardian links
- junior-friendly help/reporting language
- approved communication channels
- guardian acknowledgement where required
- no exposure of restricted compliance notes to junior/guardian accounts
- coaches only see development information necessary for their role
- cultural, accessibility and diverse-needs support flags are handled sensitively and with minimal necessary disclosure

### 8. Compliance To Do and alerts
Generate tasks for:
- missing/pending Blue Card verification
- missing organisation linking
- expiry warnings
- expired/cancelled status
- missing safeguarding training
- unresolved incidents
- Child Safe Standard evidence gaps
- policy review due
- unresolved guardian/supervision requirement
- overdue compliance review

### 9. Governance evidence
The Compliance page also keeps the completed P0-P3 readiness phases visible. Completion evidence remains linked rather than disappearing after a phase is closed.

## Production integration requirement
The production backend must enforce compliance checks server-side. Front-end warnings alone are not acceptable security or compliance controls. Blue Card status should be verified using an approved/regulator-supported process where available, and the organisation must maintain the required linking evidence.

## Sources reviewed for this specification
- Queensland Government — Blue cards for churches, clubs and associations; current page reviewed 16 August 2026.
- Queensland Government — Changes to the blue card system; current page reviewed 16 August 2026.
- Queensland Government / Department of Sport — Child Safe Standards commencement for sport/recreation.
- Child Safe Organisations Act 2024 (Queensland), current in-force version.
- Queensland Family and Child Commission — Child Safe Standards scope.
- Netball Queensland — Policies / Member Protection pages.
- Netball Australia — Integrity Policies.
- Sport Integrity Australia — Safeguarding for sporting associations and clubs / National Integrity Framework.
