# Orbit · Fundação Futuro

> Português: [`README.pt-BR.md`](README.pt-BR.md)

Health monitoring software for astronauts on long-duration missions, with the **Orbit** glasses (bone-conduction audio, EEG and EOG) as a secondary deliverable. Our response to the **"Create Health Monitoring Software for Astronauts on Space Missions"** challenge of the NASA International Space Apps Challenge 2026.

> **Status as of November 15, 2026:** Step 0 is complete: 19 research tracks approved, 20 consolidated documents (`docs/00` to `docs/19`), indicator configuration and simulation profiles ready, and real samples recorded for the demonstration. The working prototype of the app, named **Orbit**, is in [`orbita/`](orbita/).
>
> **Deadline:** according to the official event page, submission closes on **Sunday, November 15, at 11:59 pm, local event time**. See [`docs/08-plano-prototipo-20h.md`](docs/08-plano-prototipo-20h.md), section 0.

## The problem

Long missions expose the crew to radiation, isolation, distance from Earth, altered gravity and a closed environment. The effects on the body (bone and muscle loss, changes in the heart, the immune system and the eyes, poor sleep, mood) appear slowly, and the farther from Earth, the more the crew itself has to notice them and act without waiting for the flight surgeon on the ground. On the ISS today, the environment is monitored continuously, but body data arrives per session, exam or sample, in separate systems.

## The solution in one sentence

An **offline** dashboard that combines body data (wearables, medical equipment, text self-assessments, clicks and camera) with station environment data (CO2, O2, pressure, noise, radiation, space weather), compares each astronaut with their own baseline, shows the state on a **clickable human figure** and on a **crew-wide monitor** (with each person's consent), and says what to do and when to call the flight surgeon, always with the source of every threshold.

## Run the app

The app is in [`orbita/`](orbita/) (React, TypeScript, Vite, Tailwind CSS, Recharts and React Three Fiber). All automatic data is **simulated**. You need Git and Node.js 20 or 22 (LTS).

```bash
git clone https://github.com/edwardmguel/orbit-saude-astronautas.git
cd orbit-saude-astronautas/orbita
npm install
npm run dev        # http://localhost:5173
```

Production build: `npm run build` (output in `orbita/dist/`). A walkthrough of the demonstration is in [`orbita/README.md`](orbita/README.md).

## Start here

| If you are | Read |
| --- | --- |
| On the team, first time | [`docs/00-guia-de-leitura.md`](docs/00-guia-de-leitura.md) |
| A developer | [`docs/08-plano-prototipo-20h.md`](docs/08-plano-prototipo-20h.md), [`docs/05-arquitetura-software.md`](docs/05-arquitetura-software.md) and [`docs/03-indicadores-e-limiares.md`](docs/03-indicadores-e-limiares.md) |
| Building the app (the design documents call it ORBITA) | [`docs/17`](docs/17-revisao-prompt-orbita.md) (review of the team prompt), [`docs/18`](docs/18-design-orbita-responsivo.md) and [`docs/wireframes/orbita-responsivo.html`](docs/wireframes/orbita-responsivo.html) (design and screen drawings), [`docs/19`](docs/19-prompt-lovable-revisado.md) (revised prompt) |
| An AI assistant helping with the code | [`AGENTS.md`](AGENTS.md) |
| Presenting | [`docs/08`](docs/08-plano-prototipo-20h.md) (sections 0 and 6), [`docs/01`](docs/01-contexto-missao.md), [`docs/11`](docs/11-precedentes.md), [`docs/10`](docs/10-massa-energia-lancamento.md), [`docs/16`](docs/16-proximos-passos-e-impacto.md) |
| Building the glasses | [`docs/09`](docs/09-oculos-orbit.md), [`pesquisa/bruto/14`](pesquisa/bruto/14-oculos-pipeline-sinais.md) and [`pesquisa/bruto/15`](pesquisa/bruto/15-oculos-audio-acervo.md) |

Screen wireframes: open [`docs/wireframes/telas-prototipo.html`](docs/wireframes/telas-prototipo.html) in your browser.

The documentation in `docs/` and `pesquisa/` is written in Brazilian Portuguese, the team's language.

## Repository layout

```text
AGENTS.md                     context and rules for the AI development assistant (CLAUDE.md points here)
README.pt-BR.md               this README in Brazilian Portuguese
orbita/                       the Orbit app (React + TypeScript + Vite), with its own README
docs/                         consolidated, didactic documentation with sources (00 to 19)
  wireframes/                 prototype screens in HTML (telas-prototipo.html and orbita-responsivo.html)
pesquisa/
  METODO.md                   rules given to the research agents and the review cycle
  documento-inicial.md        copy of the source document (Google Docs, all tabs)
  bruto/                      the 19 full research tracks, with all citations
prototipo/
  config/
    indicadores.json          37 indicators and 6 crossing rules with color rule and source (from docs/03)
    perfis-simulacao.rascunho.json   37 indicators, 7 fictitious crew members, a 180-day script and scenarios C1 to C5
    orbita-ia-base.json       65 answers of the offline in-app assistant, each with a source
  dados/amostras-reais/       public ISS telemetry, NOAA SWPC and DONKI recorded on 2026-11-15, with scripts
Traycer/                      copy of this project's Traycer EPIC and instructions to import it on another computer
```

## How the research was done

Nineteen research tracks, each run by an AI agent instructed to use primary sources (nasa.gov, NASA Technical Reports Server, Human Research Roadmap, NASA-STD-3001, OSDR, other space agencies and peer-reviewed papers), to cite the URL of every fact with a confidence label, and to write "NOT FOUND" (in the files: "NÃO ENCONTRADO") instead of inventing. Every delivery was reviewed by the coordinator (automatic checks, spot checks and return for correction when needed) before approval, and track 19 ran a final cross-check of the main numbers. Full method in [`pesquisa/METODO.md`](pesquisa/METODO.md); all sources in [`docs/15-referencias.md`](docs/15-referencias.md).

| Track | File |
| --- | --- |
| 1. ECLSS, cabin environment, radiation and public telemetry | [`01-eclss-ambiente-radiacao.md`](pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| 2. Crew medical and physiological equipment | [`02-equipamentos-medicos-tripulacao.md`](pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| 3. Risks, indicators and alert thresholds | [`03-riscos-indicadores-limiares.md`](pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| 4. Precedents for the glasses, sleep and routine | [`04-precedentes-oculos-sono.md`](pesquisa/bruto/04-precedentes-oculos-sono.md) |
| 5. Mass, onboard computing and launch cost | [`05-massa-computacao-lancamento.md`](pesquisa/bruto/05-massa-computacao-lancamento.md) |
| 6. Open data, NASA software and data flow | [`06-dados-abertos-software-fluxo.md`](pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| 7. Official challenge and NASA interface and alarm standards | [`07-desafio-oficial-padroes-interface.md`](pesquisa/bruto/07-desafio-oficial-padroes-interface.md) |
| 8. Implementable self-assessments | [`08-autoavaliacoes-implementaveis.md`](pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| 9. Simulated data profiles | [`09-perfis-dados-simulados.md`](pesquisa/bruto/09-perfis-dados-simulados.md) |
| 10. Guidance and countermeasures | [`10-orientacoes-contramedidas.md`](pesquisa/bruto/10-orientacoes-contramedidas.md) |
| 11. Real samples for the demonstration | [`11-amostras-reais.md`](pesquisa/bruto/11-amostras-reais.md) |
| 12. Threshold consolidation | resulted in [`docs/03`](docs/03-indicadores-e-limiares.md) and [`indicadores.json`](prototipo/config/indicadores.json) |
| 13. Onboard medical AI | [`13-ia-medica-embarcada.md`](pesquisa/bruto/13-ia-medica-embarcada.md) |
| 14. Glasses signal pipeline | [`14-oculos-pipeline-sinais.md`](pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| 15. Glasses audio and sound library | [`15-oculos-audio-acervo.md`](pesquisa/bruto/15-oculos-audio-acervo.md) |
| 16. Artemis II, Gateway and Mars | [`16-artemis-marte.md`](pesquisa/bruto/16-artemis-marte.md) |
| 17. Path to flight | [`17-caminho-ate-voar.md`](pesquisa/bruto/17-caminho-ate-voar.md) |
| 18. Applications on Earth and impact | [`18-aplicacoes-terra-impacto.md`](pesquisa/bruto/18-aplicacoes-terra-impacto.md) |
| 19. Final cross-check | [`19-checagem-cruzada.md`](pesquisa/bruto/19-checagem-cruzada.md) |

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
