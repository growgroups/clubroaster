# ClubRoster usability review

Target user: netball umpire coordinator / club administrator with approximately Year 10 education and limited software experience.

Review principles:
1. Use plain netball language, not software/accounting jargon.
2. Put the next action first and technical settings last.
3. Make mobile the primary operational experience.
4. Prevent mistakes with clear status, confirmation and eligibility checks.
5. Every page must answer: What is this? What needs attention? What do I do next?
6. Use the same words everywhere: Game, Umpire, Coach, Coordinator, Club, Round, Court, Payment, Task.
7. Hide advanced setup from day-to-day users unless needed.
8. Explain unfamiliar concepts inline rather than relying on training manuals.

## Review findings addressed
- Navigation contained technical labels such as Roster Intelligence, Umpire Duty Ledger and Audit Trail.
- Admin home did not provide a simple start-here sequence.
- Some screens assumed the user understood roster states, approval workflows and technical concepts.
- Destructive/high-impact actions needed stronger confirmation language.
- Mobile and desktop used different terminology in places.
- Open Games eligibility language was too technical for junior/low-confidence users.
- Help was available as Ask Roster AI but not contextual to each screen.

## UX changes
- Add plain-language navigation aliases and a clear Advanced section.
- Add a Start Here panel on the admin/coordinator home page.
- Add page-level Help cards with short instructions.
- Add friendly status wording and explanations for common terms.
- Add confirmation prompts for publish, rollback, close-day, payment marking and self-assignment.
- Simplify Open Games eligibility messages.
- Add an always-visible Help button in the mobile experience.
- Add a simple coordinator daily flow: Check Tasks -> Check Roster -> Run Game Day -> Review Payments.
- Add accessibility helpers: larger tap targets, stronger mobile spacing and clearer focus treatment.

This file documents the concept UX baseline. The production app should be tested with real coordinators and junior umpires before release.
