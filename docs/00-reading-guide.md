# 00. Reading guide

> Nobody needs to read everything. Pick your profile and follow the order. Estimated time in parentheses.

## Everyone (40 minutes, before the kickoff)

1. [`../README.md`](../README.md): what the project is and how the repository is organized (3 min).
2. [`01-mission-context.md`](01-mission-context.md): the ISS, the crew routine, the 5 hazards (RIDGE) and what happens to the body in space (15 min).
3. [`07-interface-design.md`](07-interface-design.md) and the wireframes in [`wireframes/prototype-screens.html`](wireframes/prototype-screens.html) (open in the browser) (10 min).
4. [`08-prototype-plan-20h.md`](08-prototype-plan-20h.md): who does what and when (7 min).
5. [`14-answered-questions.md`](14-answered-questions.md): the answers to the questions the team raised (5 min).

## By profile, after the kickoff

| Profile | Read in this order | Purpose |
| --- | --- | --- |
| **Interface dev** (Dev A) | `07` → `05` (sections 1 and 3) → `06` (the types the screen receives) → `03` (only the master table, for the explanation texts) | Build screens and components |
| **Data and input dev** (Dev B) | `06` → `02` → `12` → `03` (ranges for the simulator) → `05` (section 3.3, scenarios) | Simulated generator, check-in, quick tests |
| **Engine and ML dev** (Dev C) | `03` → `04` → `06` → `05` (sections 2 and 4) | Rules, baseline, cross-referencing, alerts |
| **Project owner (glasses)** | `09` → `10` → `11` → `pesquisa/bruto/04` and `05` | Orbit glasses, mass, energy, pitch |
| **Presenter** | `08` (section 0 and 6) → `01` → `11` → `10` → `16` → `14` | Deadline, narrative, precedents, feasibility numbers and final slides |
| **Whoever runs the code in Lovable** | `17` → `18` (with the drawings in `wireframes/orbita-responsive.html`) → `19` (the prompt to paste) | Build ORBITA already connected to the research |
| **Development AI** | [`../AGENTS.md`](../AGENTS.md) first, then the task document | Domain rules and conventions |

## Document map

| # | Document | Question it answers |
| --- | --- | --- |
| 00 | Reading guide | Where do I start? |
| 01 | [Mission context](01-mission-context.md) | What happens to the body in space and why? |
| 02 | [Equipment and data](02-equipment-and-data.md) | What equipment exists on the ISS, what does it measure, how does it deliver the data and in what unit? |
| 03 | [Indicators and thresholds](03-indicators-and-thresholds.md) | When is a value green, yellow or red, according to whom? |
| 04 | [Data cross-referencing](04-data-cross-referencing.md) | How to compute each indicator and how to combine data from different sources? |
| 05 | [Software architecture](05-software-architecture.md) | How is the system assembled, at NASA and in the prototype? |
| 06 | [Data model](06-data-model.md) | Which entities, fields and units? |
| 07 | [Interface design](07-interface-design.md) | Which screens, colors and components? |
| 08 | [20-hour plan](08-prototype-plan-20h.md) | Who does what and when? |
| 09 | [Orbit glasses](09-orbit-glasses.md) | What are the glasses like and what data do they deliver to the software? |
| 10 | [Mass, energy and launch](10-mass-energy-launch.md) | How much does it weigh, how much does it consume, how much does it cost to launch? |
| 11 | [Precedents](11-precedents.md) | Does NASA already do something similar? Where is our differentiator? |
| 12 | [Open data sources](12-open-data-sources.md) | What real NASA and NOAA data can the prototype use? |
| 13 | [Glossary](13-glossary.md) | What does each acronym mean? |
| 14 | [Answered questions](14-answered-questions.md) | Answers to the questions in the initial document |
| 15 | [References](15-references.md) | List of official sources used |
| 16 | [Next steps and impact](16-next-steps-and-impact.md) | What changes for the Moon and Mars, how to get to the ISS and what is it for on Earth? (basis of the final slides) |
| 17 | [ORBITA prompt review](17-orbita-prompt-review.md) | What the team's Lovable prompt gets right and what needs to change to match the research? |
| 18 | [ORBITA responsive design](18-orbita-responsive-design.md) and [screen drawings](wireframes/orbita-responsive.html) | What does each ORBITA screen look like on a phone, a laptop and a large screen? |
| 19 | [Revised Lovable prompt](19-revised-lovable-prompt.md) | Which prompt to paste into Lovable to build the app already aligned with the research? |

## How to read the source labels

The research marks each claim with its confidence level:

| Label | Meaning |
| --- | --- |
| [OFFICIAL] | Document from NASA or another space agency |
| [PAPER] | Peer-reviewed scientific article |
| [MANUFACTURER] | Manufacturer page or datasheet |
| [EARTH-GUIDELINE] | Clinical guideline used on Earth, when NASA does not define its own value |
| [TESTED] | The research team opened the endpoint and confirmed the format |
| [SECONDARY] | Press or another indirect source |
| [INFERENCE] | Deduction by the research, with the reasoning explained |
