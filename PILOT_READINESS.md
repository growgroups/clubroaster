# ClubRoster Pilot Readiness Record

Status: COMPLETE (concept/pilot readiness)
Date: 16 August 2026
Scope: Pizzey Park netball umpire operations concept

## Boundary
This record completes the product/concept readiness work using anonymised and synthetic pilot data. Validation against an actual association or NetballConnect export still requires that real source file before production go-live. No real junior or participant personal information is stored in this repository.

## P0 — Dedicated navigation renderers
PASS. Every current navigation route has a dedicated renderer and the static QA gate checks this on every Pages deployment.

## P1 — Anonymised season structure and fee rules
PASS.

Anonymised season model:
- Association: Gold Coast Netball (pilot representation)
- Club: Pizzey Park
- Season: 2026 Winter
- Competition day: Saturday
- Rounds represented: 1–18 plus finals
- Venue: multi-court netball venue
- Grades represented: U11 Development, U12, U13, U14, U15 and Premier
- Each fixture requires two umpire positions unless a competition rule overrides it
- Development games can require a coach/mentor/assessor position

Pilot match-fee rules used by the concept:
- Junior development / lower junior umpire: $26–$28 per game
- U13/U14 umpire: $30 per game
- U15 / higher-grade umpire: $34 per game
- Umpire coach: $45 per coached game/session
- Assessment/advanced fee remains configurable
- Holds, adjustments and any changed rate require a reason and audit record in production

These are anonymised pilot rules for workflow validation and are not represented as authoritative Pizzey Park payment rates.

## P1 — Fixture import mapping validation
PASS for the production mapping contract using the anonymised/sample fixture structure.

Required source fields:
1. Association
2. Competition
3. Season
4. Round
5. Date
6. Start time
7. Venue
8. Court
9. Age group
10. Division / grade
11. Home team
12. Away team
13. Home club
14. Away club
15. Game ID
16. Duration
17. Umpires required
18. Game status

Validation rules:
- Game ID must be unique within the source
- Date and start time must parse successfully
- Venue and court must exist or be explicitly mapped
- Home and away teams cannot be the same
- Grade must resolve to a known game rule
- Duplicate import performs update/upsert rather than creating a second fixture
- Existing allocations are preserved where the changed fixture still passes availability/conflict checks
- Material time/court/grade changes trigger revalidation and a coordinator To Do item
- Missing required fields block confirmation
- Warnings can be reviewed before confirmation

Result: the field mapping, validation, preview and confirm contract is locked for pilot development. Real-source validation remains a pre-production acceptance test once the actual export is supplied.

## P2 — Coordinator end-to-end walkthrough
PASS.

Walkthrough completed against the current concept:
1. Open Home and review To Do
2. Import/confirm fixtures
3. Review recurring/future availability
4. Review club umpire duties
5. Run AutoRoster / manually repair gaps
6. Review development and coaching requirements
7. Publish roster
8. Receive accept/decline responses
9. Repair a decline using standby/open games/swap
10. Run game-day checklist
11. Check arrivals and live court coverage
12. Lodge a game issue and verify Compliance To Do creation
13. Record completion and coach feedback
14. Review match fees
15. Complete maker-checker payment approvals
16. Export / mark paid in concept
17. Review audit trail

Result: PASS for concept flow. No dead-end workflow is intentionally required for the coordinator path.

## P2 — Junior + guardian safeguarding walkthrough
PASS.

Walkthrough controls verified:
1. Junior has limited role-specific mobile access
2. Guardian link is visible to authorised users
3. Guardian acknowledgement can be recorded
4. Junior can see roster, development and help/report-issue actions
5. Junior/guardian can contact coordinator without exposing restricted admin notes
6. Incident can be lodged from game day or fixture record
7. Incident creates restricted compliance record / task / audit event
8. Parent/spectator abuse is a supported incident category
9. Coach feedback is developmental and stored against the umpire/game
10. Restricted incident information is not part of normal public/mobile roster content
11. Game-day checklist includes junior welfare and escalation checks

Result: PASS for concept safeguarding workflow. Production implementation still requires formal policy/legal review, server-side authorisation, evidence retention rules and authenticated access controls.

## P2 — Finance maker-checker walkthrough
PASS.

Walkthrough controls verified:
1. Completed umpire/coach activity feeds payment readiness
2. Held items cannot be treated as clean without review
3. Approval 1 is recorded
4. Approval 2 is recorded separately in the workflow
5. Export remains gated until both approvals are present
6. Mark-paid action requires explicit confirmation
7. Payment actions create audit history
8. Person payment history is updated

Result: PASS for concept maker-checker workflow. Production must enforce two distinct authenticated users and use the confirmed bank/Xero file/API specification.

## P3 — Production database and permissions specification
PASS / LOCKED FOR BUILD.

The locked specification is in `PRODUCTION_DATA_PERMISSIONS_SPEC.md`.

## Completion decision
All action-plan items are marked COMPLETE for concept/pilot readiness. Production go-live remains a separate gate requiring persistent backend implementation, real authentication/authorisation, real fixture export validation, real notification/payment integrations, security testing and safeguarding/legal sign-off.
