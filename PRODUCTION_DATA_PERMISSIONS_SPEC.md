# ClubRoster Production Data & Permissions Specification

Status: LOCKED FOR BUILD
Date: 16 August 2026
Product: Netball umpire operations and development platform

## Principles
- Netball only; no generic workforce or HR model in the user experience.
- Multi-tenant association/club isolation.
- Server-side authorisation is mandatory. UI hiding is not security.
- Least privilege by default.
- Junior and safeguarding records receive stricter access controls than ordinary roster data.
- Finance approvals require authenticated identity and segregation of duties.
- Every material roster, compliance and payment change produces an immutable audit event.
- Personal data is encrypted in transit and at rest in production.

## Core tables

### organisations
- id
- name
- type (association, club)
- timezone
- active

### users
- id
- organisation_id
- auth_provider_id
- email
- display_name
- active
- last_login_at

### people
- id
- organisation_id
- user_id nullable
- first_name
- last_name
- date_of_birth nullable
- mobile/email
- person_type (umpire, coach, mentor, assessor, coordinator, guardian, admin)
- active

### guardian_links
- id
- junior_person_id
- guardian_person_id
- relationship
- acknowledgement_status
- acknowledgement_at

### credentials
- id
- person_id
- type
- level
- issued_at
- expires_at
- verified_at
- verified_by
- evidence_object_key nullable
- status

### seasons
- id
- organisation_id
- name
- start_date
- end_date
- status

### competitions
- id
- season_id
- name
- competition_day

### grades
- id
- competition_id
- name
- age_group
- division

### venues
- id
- organisation_id
- name
- address

### courts
- id
- venue_id
- name
- active

### fixtures
- id
- external_game_id
- season_id
- competition_id
- grade_id
- venue_id
- court_id
- round
- starts_at
- duration_minutes
- home_team
- away_team
- home_club
- away_club
- status
- source_updated_at

### game_requirements
- id
- grade_id
- umpire_positions
- minimum_umpire_level
- coach_required
- coaching_intensity
- assessor_required
- self_assignment_mode
- effective_from
- effective_to nullable

### assignments
- id
- fixture_id
- role_type (umpire_1, umpire_2, coach, mentor, assessor, standby)
- person_id
- state (draft, planned, offered, accepted, declined, published, arrived, completed, cancelled)
- offered_at
- responded_at
- arrived_at
- completed_at
- assigned_by
- version_id

### roster_versions
- id
- season_id
- round
- version_number
- state
- created_by
- created_at
- published_at nullable
- reason

### availability_patterns
- id
- person_id
- season_id
- weekday
- start_time
- end_time
- max_games
- preference_note
- active

### availability_exceptions
- id
- person_id
- date
- status
- start_time nullable
- end_time nullable
- note

### conflicts
- id
- person_id
- conflict_type
- club/team/person reference nullable
- reason
- active
- restricted

### swap_requests
- id
- assignment_id
- requested_by
- proposed_person_id nullable
- status
- recipient_response_at nullable
- coordinator_decision_by nullable
- coordinator_decision_at nullable
- reason

### fixture_comments
- id
- fixture_id
- author_user_id
- body
- created_at
- visibility (operations, restricted)

### incidents
- id
- fixture_id nullable
- person_id nullable
- category
- severity
- description
- immediate_action
- status
- restricted
- reported_by
- reported_at
- owner_user_id
- resolved_at nullable

### incident_evidence
- id
- incident_id
- object_key
- description
- uploaded_by
- created_at

### coaching_feedback
- id
- fixture_id
- umpire_person_id
- coach_person_id
- competency_scores jsonb
- strengths
- improvement_areas
- next_focus
- created_at

### development_plans
- id
- umpire_person_id
- current_level
- target_level
- coaching_target_percent
- review_date
- goals jsonb
- active

### messages
- id
- organisation_id
- channel_type
- fixture_id nullable
- created_by
- body
- requires_acknowledgement
- created_at

### message_members
- message_or_thread_id
- person_id
- read_at nullable
- acknowledged_at nullable

### tasks
- id
- organisation_id
- fixture_id nullable
- person_id nullable
- type
- priority
- title
- detail
- owner_user_id nullable
- due_at nullable
- status
- created_at
- resolved_at nullable

### fee_rules
- id
- organisation_id
- grade_id nullable
- role_type
- minimum_level nullable
- amount
- effective_from
- effective_to nullable
- rule_note

### payment_lines
- id
- person_id
- fixture_id nullable
- role_type
- fee_rule_id nullable
- amount
- adjustment_amount
- adjustment_reason nullable
- status

### payment_batches
- id
- organisation_id
- period
- total_amount
- status
- approval_1_user_id nullable
- approval_1_at nullable
- approval_2_user_id nullable
- approval_2_at nullable
- exported_at nullable
- paid_at nullable

### audit_events
- id
- organisation_id
- actor_user_id
- entity_type
- entity_id
- action
- before_json nullable
- after_json nullable
- reason nullable
- created_at
- source_ip/device metadata where lawful and appropriate

## Role permissions

### Club Administrator
Full club configuration and operations access except restricted controls reserved by association policy. Can manage people, fixtures, roster, rules, communication and ordinary reports. Finance permission may be granted separately.

### Association Administrator
Association-wide configuration, competition/grade rules, people/credential oversight, reports and audit. Restricted compliance access only where explicitly granted.

### Umpire Coordinator
Roster, availability, assignments, swaps, standby, open games, fixture comments, game-day controls, coach allocation, development views, communications and operational incidents. Can triage compliance incidents but cannot alter immutable audit history.

### Umpire Coach / Mentor / Assessor
Only assigned/relevant umpire profiles and games. Can record coaching/assessment feedback. Cannot see unrelated restricted incidents, finance batches or broad personal data.

### Finance / Payments
Payment lines, batches, holds, exports and payment history. No safeguarding incident access by default. Maker-checker rules enforced.

### Game-day Supervisor
Live fixtures, arrival, replacement support, game-day checklist and incident lodging. No season setup or finance approval.

### Adult Umpire
Own profile, own roster, availability, swaps, open eligible games, chat, own development summary, own payments and issue reporting.

### Junior Umpire
Same operating access as adult umpire but with junior-specific visibility limits, guardian linkage and safeguarding controls. Restricted internal notes never exposed.

### Parent / Guardian
Linked junior appointments, acknowledgements, approved communications, availability assistance where policy allows and report-concern functionality. No coach-only notes or restricted compliance details unless deliberately released through safeguarding process.

### Read-only / Audit
Read access to explicitly authorised operational/financial records with no mutations. Restricted compliance requires separate grant.

## Mandatory server-side rules
- A user can only access rows for organisations they are authorised for.
- A junior can only access their own operational/development records.
- A guardian can only access linked juniors and approved fields.
- Restricted incidents require compliance permission.
- Coaches can only write feedback where they are assigned/authorised for the relevant umpire or fixture.
- Umpires cannot directly self-assign to games configured as coordinator-approval only.
- Self-assignment re-runs availability, credential, conflict, overlap, max-games and game-rule checks transactionally.
- Swap approval updates assignments atomically and preserves prior assignment history.
- Payment approval 1 user must differ from payment approval 2 user.
- A user cannot approve their own maker step again as checker.
- Mark-paid requires both approvals and cannot silently edit the underlying payment amount.
- Audit rows are append-only to application users.

## Data retention and privacy
Retention periods must be configured with Australian privacy, child safeguarding, employment/volunteer and sporting-body requirements before production. Incident evidence and junior data must not be retained merely because storage is available. A documented deletion/archive policy is required.

## Production gates before real data
1. Authenticated user accounts and MFA policy.
2. Server-side row-level or equivalent authorisation tests.
3. Encryption and secrets management.
4. Backup/restore testing.
5. Immutable audit event storage.
6. Safeguarding/legal review of incident collection, access and retention.
7. Real fixture-source import acceptance test.
8. Real bank/Xero mapping acceptance test.
9. Notification provider consent/delivery controls.
10. Security and privacy testing before junior personal data is loaded.
