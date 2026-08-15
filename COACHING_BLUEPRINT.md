# Umpire Coaching Allocation Blueprint

## Purpose

ClubRoster must roster umpire coaches alongside umpires. Coaching demand can be created by either the game being played or the individual development level of an umpire appointed to that game.

## Development levels

Admins can create, edit, activate and deactivate umpire development levels. A level can be a badge, coloured bib or any custom club/association level.

Each level stores:

- Level name and type.
- Coaching coverage percentage from 0% to 100%.
- Coaching method/type.
- Minimum coach qualification.
- Review period used to measure the percentage.
- Optional game/grade suitability limits.
- Whether the coaching requirement is mandatory.

Examples used in the concept:

- Green Bib: 100% coaching.
- Blue Bib: 75% coaching.
- C Badge: 25% coaching.
- B Badge: 10% coaching.

## Percentage calculation

The percentage is cumulative coverage, not a random probability applied to each game.

Required coaching target = eligible games in the review period x coaching percentage, rounded according to the configured business rule.

AutoRoster compares coaching required with coaching already delivered and prioritises under-target umpires.

Example: a C Badge umpire with 12 eligible games and a 25% requirement has a target of 3 coached games. If only 2 have been delivered, the next suitable appointment should be prioritised for coaching.

## Game coaching rules

Admins can separately create rules that require a coach because of the game itself. Rules may use association, competition, age group, division, grade, venue, round or other fixture attributes.

A game rule can require 100% coach coverage even where neither appointed umpire would otherwise require coaching.

Where a game rule and an umpire-level rule both apply, ClubRoster creates one coaching obligation and records every reason that caused it.

## Coach allocation

AutoRoster ranks eligible coaches using:

1. Availability and no time overlap.
2. Coach qualification against the required coaching level.
3. Court/venue proximity.
4. Existing coach workload and fairness.
5. Continuity with the umpire being developed.
6. Junior safeguarding or supervision requirements where applicable.
7. Minimum disruption when repairing an already-published roster.

The roster board displays coach appointments directly beneath umpire appointments.

## Game-day completion

Coaches check in independently. A scheduled coaching appointment does not count as delivered until the game is completed or an authorised user confirms the coaching occurred.

If the coach is absent, the coaching obligation remains outstanding and can be carried forward when calculating the umpire's future target.

## Exceptions

The Exceptions Inbox must include:

- Mandatory game coach missing.
- Umpire below coaching target and no coach allocated.
- Coach double-booked.
- Coach not qualified for the required development level.
- Coach withdrawal after publication.
- Coach did not check in or coaching was not confirmed delivered.

## Reporting

Report coaching required versus delivered by:

- Umpire.
- Development level.
- Umpire coach.
- Round.
- Competition/division.
- Club/association.
- Season.

Key measures include coaching target achieved, outstanding coaching debt, games coached, coach hours, development progression and upcoming forecast demand.

## Production data entities

Recommended entities:

- UmpireDevelopmentLevel
- UmpireDevelopmentAssignment
- UmpireCoachProfile
- CoachingRule
- CoachingRequirement
- CoachingAssignment
- CoachingDelivery
- CoachingAssessment
- CoachingAuditEvent

All production records must be tenant-isolated and auditable. Junior coaching notes must be role-restricted and handled under the safeguarding/privacy design.