# ClubRoster Netball-Only Product Blueprint

## Product position
ClubRoster is a purpose-built netball umpire operations and development platform. It is not a generic workforce rostering product and it is not intended to replace full competition-management systems for registration, ladders, scoring or team administration.

ClubRoster owns the difficult umpiring workflow: availability, eligibility, supply obligations, appointments, pairing, coaching, assessment, confirmation, game-day operations, replacements, safeguarding workflows, match fees, audit and development analytics.

## Netball domain model
Association -> Club -> Competition -> Season -> Round -> Grade/Division -> Game -> Venue -> Court -> Umpire Position -> Appointment.

People may hold one or more netball roles: Umpire, Umpire Coach, Mentor, Assessor, Umpire Coordinator, Game-day Supervisor, Finance, Guardian and Read-only/Audit.

## Core operating workflow
Fixtures imported/synchronised -> requirements generated -> club/team duties generated -> availability applied -> eligibility checked -> pair suitability scored -> coach/assessor demand generated -> AutoRoster -> exceptions/tasks -> roster version saved -> offers/acceptance -> publish/lock -> acknowledgements -> game-day check-in -> replacement repair -> completion -> coaching/assessment -> safeguarding follow-up -> match fees -> payment approval/export -> audit/reporting.

## 1. Netball Requirements Matrix
Rules are configurable by competition and grade. Each rule can define:
- minimum level/accreditation for Umpire 1 and Umpire 2;
- preferred stronger-side requirement;
- pair suitability requirement;
- junior supervision requirement;
- coach/mentor/assessor requirement;
- coaching intensity;
- club or association supply source;
- maximum games and break constraints;
- match-fee rule.

The scheduler evaluates both individual eligibility and the combined two-umpire pairing.

## 2. Umpire Duty Ledger
Tracks club/team obligations separately from central appointments:
Club -> Team -> Round -> Time -> Obligation -> Person supplied -> Status.

Statuses: Due, Fulfilled, Missing, Exempted, Replaced. Missing obligations create coordinator Tasks and feed publish readiness.

## 3. Availability
Availability supports both:
- recurring season patterns (for example every Saturday 8am-12pm, max 2 games); and
- exception dates/ranges (unavailable, restricted window, special limits).

Changes after planning create Tasks and trigger impact analysis against affected appointments.

## 4. Roster states and versions
Assignment lifecycle:
Draft -> Planned -> Offered -> Accepted -> Published -> Locked -> Completed.

Round rosters are versioned. Emergency changes create a new version and the audit log records who changed what, why, previous appointment, replacement and notifications. Prior versions can be restored into a new draft rather than silently overwriting history.

## 5. Open Games
Eligible officials can see controlled unfilled games. Visibility is pre-filtered by availability, level, conflicts, overlap, junior restrictions and configured rules. A request can require coordinator approval or, for approved low-risk grades, permit controlled self-appointment in a later production phase.

## 6. Standby / Reserve Umpires
Standby coverage is managed by time block. Emergency replacement ranking prioritises:
1. confirmed standby;
2. eligible umpire already at venue with sufficient break;
3. eligible unallocated umpire;
4. suitable umpire finishing a prior game;
5. controlled broadcast to eligible pool.

## 7. Fixture Change Impact Engine
Any time/court/date/status change revalidates:
- umpire availability;
- coach/assessor availability;
- overlap/double booking;
- breaks and court transition;
- team/family conflicts;
- junior supervision;
- coaching coverage;
- fee implications;
- subsequent appointments;
- required communications and acknowledgement.

## 8. Umpire Pairing Intelligence
AutoRoster scores the pair as well as each individual. Considerations include:
- experience mix;
- developing + experienced pairing;
- game-management strength;
- repeated partner frequency;
- repeated team exposure;
- development goals;
- availability and fatigue;
- known legitimate conflict restrictions.

Every recommendation must be explainable.

## 9. Coach Capacity and Intensity
Coaching is not assumed to be one coach per game. Rules can specify:
- dedicated full-game coach;
- shared adjacent-court coach;
- pre-game/halftime/post-game coaching;
- selected-quarter observation;
- targeted development observation;
- dedicated assessment.

Capacity rules define how many courts a coach can safely cover at once.

## 10. Coach, Mentor and Assessor roles
These are distinct roles with separate permissions and assignment types. Assessments use structured competency records and are not treated as ordinary coaching comments.

## 11. Netball Umpire Pathway
Each umpire profile contains:
- current development level/badge;
- target level/badge;
- games completed;
- coached games;
- assessments;
- structured competencies;
- trend;
- development priorities;
- readiness score;
- recommended next assessment.

Concept pathway: Green Bib -> Blue Bib -> C Badge -> B Badge -> A Badge / senior mentoring as configured by the association.

## 12. Safeguarding and restricted incidents
Restricted incident records support:
Reported -> Triaged -> Guardian contacted -> Club contacted -> Association review -> Action required -> Resolved -> Restricted archive.

Access is role-restricted. Records can include notes, witnesses and attachments in production. Pattern detection may surface repeat team/spectator/venue issues only to authorised administrators.

## 13. Communications and acknowledgement
Operational messages support Sent -> Delivered -> Read -> Acknowledged.

High-impact items such as fixture moves, roster changes, finals instructions and guardian/junior requirements may require explicit acknowledgement.

## 14. Match-fee rules
Configurable by grade, role, level and circumstance. Rules may include umpire fee, coach fee, assessor fee, standby fee, cancellation handling and authorised manual adjustment with reason. Production bank/Xero formats must be confirmed before real payment execution.

## 15. Credentials
Configurable credential register for relevant adult roles and officials. Supports accreditation status, expiry, verification date, evidence reference, reminder and appointment restriction where policy requires it.

## 16. Capacity forecasting
Forecasts season demand before shortages occur. Measures include total umpire positions, consistently available supply, peak-time shortage, coaching blocks required, badge-level shortages and recruitment/development demand.

## 17. Fairness analytics
Per umpire: total games, early/late games, high-grade games, coaching exposure, consecutive games, partner variation, team repetition and workload. Fairness is a soft optimisation objective, never a substitute for eligibility/safety rules.

## 18. Mobile experience
Umpire mobile priorities:
Next game -> My Saturday -> Upcoming -> Availability -> Open Games -> Swaps -> Development -> Payments -> Chat -> Report Issue.

Coach/assessor mobile priorities:
Assignments -> Arrive -> Umpires being observed -> feedback/assessment -> development actions -> issue escalation.

Coordinator mobile priorities:
coverage -> arrivals/no-shows -> replacements -> Tasks -> incidents -> acknowledgements -> close-day sign-off.

## 19. Integration boundary
ClubRoster should import/synchronise fixture and competition context from the selected competition platform where API/data access allows. It should not duplicate registration, ladders, scoring, team selection or broad competition administration.

## 20. Production architecture direction
Keep the scheduling optimiser as a separate service. Production implementation should support a React/Next.js application layer, PostgreSQL-backed tenancy/data, role-based authentication, secure document storage, audit immutability, notification providers, integration adapters and an optimisation service suitable for constraint programming.

## Concept completion definition
An unfamiliar netball coordinator can run: season fixture setup -> requirements/duties -> availability -> AutoRoster -> exceptions -> publish/acknowledge -> game day -> replacement -> completion -> coaching/assessment -> match fees, while a junior/guardian can independently complete appointment, availability, acknowledgement, help and safeguarding flows.
