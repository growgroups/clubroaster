# ClubRoster — Interaction Matrix

This matrix is the browser/mobile E2E handover baseline. Every row must have an automated production test or an explicitly documented manual acceptance step.

| Area | User action | Expected result |
|---|---|---|
| Global | Click Home breadcrumb | Opens Home/Dashboard |
| Global | Click season breadcrumb | Opens season summary/details |
| Global | Change role | Navigation and available actions update to permitted scope |
| Global | Bigger text | Readability increases without layout breakage |
| Global | Simple view | Advanced controls are hidden without losing normal weekly workflow |
| Global | Ask for Help | Opens plain-language help |
| Navigation | Click every visible nav item | Opens its dedicated page; no blank state or runtime error |
| Home | Check To Do | Opens To Do |
| Home | Check Roster | Opens Roster |
| Home | Run Game Day | Opens Game Day |
| Home | Review Payments | Opens Finance/Payments |
| Home | Open Compliance & Safeguarding | Opens Compliance hub |
| Home | View completed phases | Opens Build Plan/readiness evidence |
| Home | Open developer handover | Opens Developer Handover |
| Fixtures | All games / Needs action filter | Fixture table filters correctly |
| Fixtures | Open fixture | Opens persistent game record with comments, issues, feedback and assignment history |
| Fixtures | Add game | Creates a unique fixture and rostering To Do item |
| Fixture record | Add comment | Persists comment in game record and audit |
| Fixture record | Record issue | Creates restricted issue/compliance follow-up linked to fixture |
| Fixture record | Change umpires / coach | Opens editable assignment form |
| Fixture record | Save assignment changes | Revalidates eligibility/overlap/compliance, updates fixture and history |
| Umpires & Coaches | Open profile | Opens person record |
| Person profile | Summary / registrations / coaching / communications / incidents / payments / audit tab | Tab opens correct data |
| Person profile | Add coach comment | Persists linked development feedback |
| Person profile | Record incident | Persists restricted matter and creates compliance follow-up |
| Availability | Edit availability | Opens form with current values |
| Availability | Save availability | Updates availability, audit and affected-roster action where applicable |
| Availability | Send reminder | Creates communication/reminder event |
| Availability | Add recurring pattern | Persists season availability rule |
| Roster | AutoRoster | Fills only positions with eligible candidates; leaves unresolved gaps visible |
| Roster | Publish | Blocked if required coverage invalid/missing; otherwise publishes and requests acknowledgements |
| Roster | Manage game | Opens fixture record |
| Roster | Drag umpire/coach | Revalidates target and changes assignment only if eligible |
| Roster | Rollback version | Creates a new recovery draft/version and audit record |
| Roster | Acknowledge queue item | Marks notice acknowledged |
| To Do | Filter | Shows selected task category |
| To Do | Open item | Opens linked problem/action rather than a dead drawer |
| To Do | Resolve | Updates task state and audit where authorised |
| Game Day | Check in/manage game | Opens current fixture attendance/coverage controls |
| Game Day | Check in all present | Updates attendance |
| Game Day | Emergency replacement | Opens eligible assignment flow |
| Game Day | Open checklist | Opens coordinator checklist |
| Game Day checklist | Tick item | Persists concept state, creates/resolves linked To Do and audit |
| Game Day checklist | Add unfinished items to To Do | Generates missing checklist tasks without uncontrolled duplicates |
| Game Day checklist | Sign off | Blocked while important checks remain; succeeds when clear |
| Finance | Review fee | Opens fee detail / attendance exception |
| Finance | Clear hold | Returns line to approval workflow |
| Finance | Approval 1 | Records first approval |
| Finance | Approval 2 | Requires approval 1 and records second approval |
| Finance | Bank export | Disabled until approvals complete; produces approved export |
| Finance | Xero export | Disabled until approvals complete; produces approved export |
| Finance | Mark paid | Requires approvals and confirmation; updates batch/person payment history |
| Reports | Change period | Refreshes report period |
| Reports | Export | Downloads current report data |
| Messages | Filter | Filters message register |
| Messages | Open message | Opens communication detail |
| Messages | Mark responded/acknowledged | Updates status |
| Messages | New broadcast | Opens audience/channel/message form |
| Messages | Send broadcast | Adds communication and audit record |
| Season Import | Load file/demo source | Moves workflow to mapping/validation stage |
| Season Import | Next | Advances import workflow |
| Season Import | Confirm | Commits validated concept import and audit |
| Basic Roster Rules | Add/edit rule | Opens rule form |
| Basic Roster Rules | Save rule | Persists rule in concept |
| Coaching Setup | Add/edit development level | Opens form |
| Coaching Setup | Save level | Persists coaching target/method |
| Who Can Do What | Preview role | Changes permissions preview |
| Who Can Do What | Add custom role | Opens role form |
| Who Can Do What | Save role | Adds role concept to permission matrix |
| Juniors & Parents | Guardian acknowledgement | Records acknowledgement |
| Juniors & Parents | Message coordinator | Opens working request/message flow |
| History | Filter | Filters audit events |
| History | Export | Downloads audit data |
| Setup Checklist | Tick/reset item | Updates checklist state within authorised roles |
| Build Plan | View evidence | Opens evidence for each completed action |
| Build Plan | Export | Downloads readiness plan |
| Game Rules | Add requirement | Opens grade/level/pairing form |
| Game Rules | Save requirement | Adds requirement matrix entry |
| Club Umpire Duties | Fill duty | Records supplied umpire and status |
| Club Umpire Duties | Reconcile | Converts missing obligations into To Do items |
| Development Progress | Record assessment | Opens assessment form |
| Development Progress | Save assessment | Updates pathway readiness/audit |
| Roster Help | Optimise | Re-scores concept pairing/fairness |
| Roster Help | Confirm standby | Updates standby status |
| Roster Help | Request Open Game | Creates coordinator request/task |
| Roster Help | Repair fixture impact | Updates impact state and acknowledgement queue |
| Mobile app | Switch persona | Loads role-appropriate mobile workflow |
| Mobile umpire | Accept appointment | Updates assignment and audit |
| Mobile umpire | Decline appointment | Captures reason, removes coverage and creates repair task |
| Mobile umpire | I have arrived | Records check-in |
| Mobile umpire | Game completed | Records completion/payment evidence |
| Mobile umpire | Chat coordinator | Opens direct chat |
| Mobile umpire | Send chat | Adds message, notification and audit |
| Mobile umpire | Report issue | Opens restricted issue form |
| Mobile umpire | Save issue | Creates person incident + compliance task + audit |
| Mobile umpire | Development | Opens development plan/feedback |
| Mobile umpire | Payments | Opens own payment history |
| Mobile umpire | Upcoming/Next week/Month/Season | Changes forward roster view |
| Mobile umpire | Set future availability | Opens form and saves future period |
| Mobile umpire | Request swap | Opens eligible candidates |
| Mobile recipient | Accept swap | Moves request to coordinator approval |
| Mobile recipient | Decline swap | Resolves request as declined |
| Coordinator mobile | Season planner | Opens forward coverage/availability/swap approvals |
| Coordinator mobile | Approve swap | Changes future assignment, resolves task and notifies parties |
| Coordinator mobile | Reject swap | Resolves request without assignment change |
| Mobile umpire | Open Games | Shows current unfilled positions and eligibility reason |
| Mobile umpire | Take this game | Rechecks eligibility and atomically assigns if direct self-assignment allowed |
| Mobile umpire | Ask coordinator | Creates approval request rather than changing assignment |
| Compliance | Open register tile | Opens selected compliance register |
| Compliance | Blue Card Open | Opens holder's requirement/verification/linking/expiry record |
| Compliance | Add/update Blue Card | Opens real create/update form |
| Compliance | Save Blue Card | Updates record, audit and allocation eligibility |
| Compliance | Resolve compliance To Do | Removes/resolves action and audits it |
| Compliance | Record safeguarding concern | Opens restricted factual incident form |
| Compliance | Save safeguarding concern | Creates restricted register record, follow-up and linked fixture/person records |
| Compliance | Open Child Safe Standard | Shows selected standard/evidence record |
| Compliance | Add evidence record | Adds evidence row to standards register |
| Compliance registers | Add record | Opens register-specific data form rather than placeholder message |
| Compliance registers | Open record | Shows the actual selected record values |
| Compliance registers | Edit record | Opens populated editable form |
| Compliance registers | Save record | Mutates register data and writes audit event |
| Developer Handover | Run health check | Confirms all required concept modules loaded or identifies missing module |
| Developer Handover | Open system plan | Opens blueprint |
| Developer Handover | Open compliance | Opens compliance hub |
| Drawer | Close button / backdrop / Escape | Closes drawer cleanly |

## Production automation expectation

Critical flows must be automated end-to-end, including at minimum:

1. fixture import → AutoRoster → repair → publish
2. mobile appointment accept/decline/check-in/complete
3. Open Game concurrency and eligibility
4. swap recipient + coordinator approval
5. fixture issue → restricted compliance record → follow-up
6. Blue Card invalid → assignment blocked → verification → assignment allowed
7. game-day checklist → sign-off
8. coaching feedback → development record
9. match fee → two-person approval → export → paid/reconciled
10. guardian/junior access-control tests

A production release fails acceptance if a visible click target has no tested outcome.
