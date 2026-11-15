# Research method (rules given to all research agents)

This file records the context and the rules that each research agent received. It helps the team understand how the research was done and lets the next agents follow the same standard.

## Part A. Project context

We are a team of 4 people (team "Fundação Futuro") that will present to NASA a health monitoring solution for astronauts on long-duration missions (ISS today; Moon, Gateway and Mars in the future). The official challenge: create a visual tool that helps astronauts assess their own health during the mission and receive treatment and improvement guidance, collecting health indicators through any type of input (automatic sensors, telemetry, typed text, clicks, camera images, ultrasound, etc.).

The solution has two deliverables:

1. **Primary:** a visual software (functional prototype in 20 hours) that gathers health indicators of the crew and of the station environment, cross-references these data, shows the health status with a color code, charts over time, a human figure that can be clicked by body part, gamification of healthy habits, and says when a result deserves the attention of the crew themselves or of the flight surgeons on the ground. It works 100% offline inside the station, with embedded machine learning.
2. **Secondary:** IoT glasses called "Orbit": bone-conduction audio (rain and fauna sounds from each astronaut's culture, adapted to the time of day, with a smooth transition to a night ambience near bedtime) + EEG + EOG.

The development team does not know the space or medical domain. The research becomes technical documentation in the repository, which teaches the team and serves as context for the AI that helps with development. Everything must be consistent with NASA's reality: real equipment, real data, real units, real names and acronyms.

Documents that already exist in the repository (`C:\Users\ingri\Documents\github\NASA`), which the agent may read for context: `docs/05-software-architecture.md`, `docs/06-data-model.md`, `docs/07-interface-design.md`, `docs/04-data-cross-referencing.md`, `docs/08-prototype-plan-20h.md` and the earlier research in `pesquisa/bruto/`.

## Part B. Research rules

1. Use web search and read the primary sources. Without web access, stop and notify the coordinator.
2. Source priority: (a) NASA (nasa.gov, ntrs.nasa.gov, humanresearchroadmap.nasa.gov, standards.nasa.gov, osdr.nasa.gov, data.nasa.gov, api.nasa.gov, technology.nasa.gov); (b) other agencies (ESA, JAXA, CSA, Roscosmos/IBMP, NOAA for space weather); (c) peer-reviewed articles; (d) manufacturers and official software documentation. Wikipedia and blogs only to find the primary source.
3. Research in stages and in depth: when finding a system, run specific searches by the exact name, acronym and technical report.
4. Each relevant factual claim carries the source URL, with a confidence label: [OFFICIAL], [PAPER], [MANUFACTURER], [EARTH-GUIDELINE], [TESTED], [SECONDARY], [INFERENCE] (with the reasoning explained).
5. Never invent numbers, names, dates, endpoints or units. If not found, write "NOT FOUND" and list what was tried.
6. Record dates, responsible parties and current status (2025 and 2026) of equipment and software.

## Part C. Delivery format

1. Brazilian Portuguese, keeping technical names and acronyms in English, with the expansion on first mention. (In the English version of this repository, write in English.)
2. **Non-negotiable writing rule from the project owner:** no em dash (U+2014), no en dash (U+2013), no spaced hyphen acting as a dash. Use comma, colon, parentheses or period. A hyphen in a compound word is allowed. Numeric ranges in words ("60 to 100 bpm"). Before finishing, search the file for U+2014, U+2013 and for the sequence space, hyphen, space in the middle of sentences, and fix them. Literal code or JSON excerpts copied from a real response stay as they came, inside code blocks.
3. Write **only** to your own output file. Other agents write in parallel to neighboring files.
4. Structured Markdown, with tables. Depth instead of summary.
5. Save incrementally, at each completed section.
6. At the end: "Executive summary" (10 findings), "Implications for the software" (or for the glasses, depending on the task), "Gaps and open questions" and "Sources" (complete list of URLs).
7. When finished, reply to the coordinator's message with: file path, number of lines, 5 to 10 main findings and the gaps.

## Coordinator review

Each delivery is reviewed before being approved: coverage of all requested items, absence of em dash and en dash, a URL with a label on each fact, spot-checking of the most important numbers and claims. If something fails, the coordinator returns it to the agent with the list of corrections.
