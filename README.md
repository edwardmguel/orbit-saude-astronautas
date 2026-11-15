# Orbit · Future Foundation

**Your first doctor, 20 light-minutes from Earth.**

> Portugues: [`README.pt-BR.md`](README.pt-BR.md)

Health monitoring software for astronauts on long-duration missions, with the **Orbit** glasses (bone-conduction audio, EEG and EOG) as a secondary deliverable. Our response to the **"Create Health Monitoring Software for Astronauts on Space Missions"** challenge of the NASA International Space Apps Challenge 2026.

## The Problem

Long missions expose astronauts to the five hazards of human spaceflight identified by NASA's Human Research Program: space radiation, isolation and confinement, distance from Earth, altered gravity fields and hostile, closed environments.

These hazards can lead to immune system changes, bone loss, cardiovascular problems, vision changes (SANS), poor nutrition and mental health issues.

The challenge grows with distance:

- Communication between Mars and Earth can take up to 22 minutes one way.
- Solar conjunction can cut contact for about two weeks.
- Astronauts are not doctors, and health changes are often slow and silent.
- Symptoms tend to be underreported.

Far from Earth, every astronaut must be their own first doctor.

## Our Solution

Orbit continuously monitors astronaut health, interprets each indicator and tells the crew what to do, even without a connection to Earth.

- **Collect:** automatic data (heart rate, radiation dose, blood oxygen, attention) and a short daily check-in (hydration, fatigue, appetite, blood tests).
- **Understand:** a 3D Digital Twin where each body system is color-coded as green (nominal), yellow (monitor) or red (act).
- **Act:** one clear recommended action per alert, plus compact reports for flight surgeons.

## Key Features

- 3D Digital Twin with clickable body systems
- Health trend charts
- Daily check-in and reports
- Gamification for healthy habits
- Crew view to switch between astronauts
- AI assistant for guided triage
- Radiation tracker
- Ground sync when a signal is available

## Future Vision

- Support crews on the Moon, on Mars and in commercial spaceflight
- Build a continuous health database for spaceflight research
- Bring the same technology to Earth: remote communities, polar stations, aircrews, elderly people living alone and disaster zones

What keeps an astronaut healthy on Mars can keep a family safe on Earth.

## Run the app

The app is in [`orbita/`](orbita/) (React, TypeScript, Vite, Tailwind CSS, Recharts and React Three Fiber). All automatic data is **simulated**. You need Git and Node.js 20 or 22 (LTS).

```bash
git clone https://github.com/edwardmguel/orbit-saude-astronautas.git
cd orbit-saude-astronautas/orbita
npm install
npm run dev        # http://localhost:5173
```

Production build: `npm run build` (output in `orbita/dist/`). A walkthrough of the demonstration is in [`orbita/README.md`](orbita/README.md).

## How the research was done

Nineteen research tracks, each run by an AI agent instructed to use primary sources (nasa.gov, NASA Technical Reports Server, Human Research Roadmap, NASA-STD-3001, OSDR, other space agencies and peer-reviewed papers), to cite the URL of every fact with a confidence label, and to write "NOT FOUND" (in the files: "NÃO ENCONTRADO") instead of inventing. Every delivery was reviewed by the coordinator (automatic checks, spot checks and return for correction when needed) before approval, and track 19 ran a final cross-check of the main numbers. Full method in [`pesquisa/METHOD.md`](pesquisa/METHOD.md)!.

## Open decisions for the project owner

- **License and repository visibility at submission.** The Space Apps terms ask for an open license on original contributions (Apache 2.0 is the default). The repository is private.
- **Redistribution of the real samples.** The content license of the public ISS telemetry and of the position API was not found; decide before making the repository public.
- **Judging criteria and AI-use rule.** The global page was down; check the local event page.

## Use of Super Intelligence (SI)

This project was developed with the assistance of SI tools:

- Ideation, research and writing: Claude (Anthropic) and ChatGPT (OpenAI) were used for brainstorming, summarizing NASA HRP and CSA public resources, and drafting project texts.
- Code: the user interface was prototyped with Lovable and developed with Claude Code and Traycer. All generated code was reviewed and adapted by the team.
- Visual design: the Digital Twin body illustration and UI layout were SI-generated and are marked as such in the application.
- Data: the 300-day mission dataset used in the demo is synthetic and was SI-assisted. It does not represent real astronaut data.
- In-app AI: the medical triage assistant uses the Claude API, representing an onboard model in this prototype.

No NASA logos, flags, mission patches or other NASA branding elements were generated or modified with SI tools.

## Disclaimer

Academic and demonstration project. It is not a medical device, has not been clinically validated and does not replace the judgment of flight surgeons or the station's alarm systems. Crew member names and individual data on the screens are fictitious. Research was done with AI agents under human and coordinator review.

## Acknowledgements

Orbit was built on open research from NASA and the Canadian Space Agency (CSA). Thank you for making space science available to everyone.

- [5 Hazards of Human Spaceflight (NASA HRP)](https://www.nasa.gov/hrp/hazards/)
- [Risks of Human Spaceflight (NASA HRP)](https://www.nasa.gov/hrp/risks/)
- [Ongoing HRP Research in Space (NASA HRP)](https://www.nasa.gov/hrp/ongoing-hrp-research/)
- [Monitoring Radiation for Astronaut Health (CSA)](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp)
- [Why Do We Conduct Science Experiments in Space? (CSA)](https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp)

## Team

**Future Foundation**: Edward Miguel | Newton Vidal | Pedro Santos | Samuel Costa
