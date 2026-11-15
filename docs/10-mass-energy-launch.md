# 10. Mass, energy and launch

> Audience: the presenters and the project owner.
> How to use: each section answers one question with the calculation worked out step by step, so that anyone on the team can redo the number in front of the panel. The numbers ready for the slide are in section 10.
> Source: [`../pesquisa/bruto/05-massa-computacao-lancamento.md`](../pesquisa/bruto/05-massa-computacao-lancamento.md) (track 5). Estimates from track 5 remain marked [INFERENCE]. Prices in US dollars (US$), without conversion, with the date of the source.
> Warning: nothing here is a flight quote or certification. The glasses hardware is in [`09-orbit-glasses.md`](09-orbit-glasses.md).

---

## 1. Mass and weight: the difference that matters in orbit

| Quantity | What it is | Unit | Does it change in space? |
| --- | --- | --- | --- |
| **Mass** | Amount of matter in the object | kg | No |
| **Weight** | Force with which gravity pulls that mass: weight = mass × gravitational acceleration | newton (N) | Yes: on the ISS (International Space Station) the scale reads almost zero |

NASA explains that, in free fall (which is what orbit is), the weight reading is close to zero, but **mass and inertia remain**. [OFFICIAL, [NASA Glenn, What is microgravity](https://www.nasa.gov/centers-and-facilities/glenn/what-is-microgravity/)]

Two practical consequences:

1. **The cost of launching depends on mass**, not weight. A 72 g pair of glasses costs the same to lift as 72 g, even if up there it "weighs nothing".
2. **The glasses do not weigh on the nose, but they push when the head moves.** Accelerations, vibration and retention still create pressure at the contact points. On the Moon and on Mars, partial gravity returns. [INFERENCE, track 5]

**Worked calculation: weight of the glasses in each place** (force = mass × gravity; grams become kilograms by dividing by 1,000). [INFERENCE, track 5]

| Mass | Earth (9.81 m/s²) | Moon (about 1/6 of Earth) | Mars (about 0.38 of Earth) | ISS |
| ---: | ---: | ---: | ---: | --- |
| 54 g | 0.054 × 9.81 = **0.53 N** | 0.53 ÷ 6 = **0.088 N** | 0.53 × 0.38 = **0.20 N** | almost zero weight; mass remains 54 g |
| 72 g | 0.072 × 9.81 = **0.71 N** | 0.71 ÷ 6 = **0.118 N** | 0.71 × 0.38 = **0.27 N** | almost zero weight; mass remains 72 g |

---

## 2. What needs to go up

| Item | Mass | Basis |
| --- | ---: | --- |
| Orbit glasses, minimum scenario (no lenses) | 54 g = 0.054 kg | [INFERENCE, track 5], detail in [`09-orbit-glasses.md`](09-orbit-glasses.md), section 4 |
| Orbit glasses, realistic scenario (no lenses) | 72 g = 0.072 kg | same |
| Computing in the minimum configuration (onboard laptop already installed) | 0 g additional | [INFERENCE, track 5] |
| Computing in the dedicated configuration (full edge module) | 0.5 to 1.0 kg, engineering target | [INFERENCE, track 5] |
| Initial batch for four crew members, with accessories and spares | 2 kg, hypothesis | [INFERENCE, track 5] |
| Dedicated demonstration kit (computer, cables, spares) | 5 kg, margin | [INFERENCE, track 5] |

---

## 3. How much computing each ML task needs

### 3.1 Minimal vocabulary

- **Operation**: one multiplication or one addition. **FLOP** is an operation on a decimal number (floating point); MFLOP is one million, GFLOP is one billion. **MAC** (multiply-accumulate) combines one multiplication and one addition.
- **Parameters**: the numbers that a machine learning (ML) model has learned. They take up memory: **float32** uses 4 bytes per parameter and **int8** uses 1 byte.
- **TOPS**: trillions of operations per second, a measure of AI accelerators.

### 3.2 Table by task (track 5, with the numbers corrected)

| Task | Assumption | Processing cost | Model memory (weights only) | Source |
| --- | --- | --- | --- | --- |
| EEG and EOG filters | 4 channels × 250 samples/s; 2 biquad filters per channel; about 10 operations per filter and sample | about 20 thousand operations/s | kilobytes | [INFERENCE] |
| FFT (fast Fourier transform) and band power | 4 channels; 256-point FFT; about 5 × N × log₂N operations per FFT | about 41 thousand operations per set of 4 FFTs | a few kB per channel | [INFERENCE] |
| **Original DeepSleepNet** | Convolutional networks (CNN) plus BiLSTM (bidirectional LSTM recurrent network), 1 EEG (electroencephalogram) channel, 30 s epochs | FLOPs per epoch not located | **21 to 24.7 million parameters: 84 to 98.8 MB in float32, 21 to 24.7 MB in int8** | [PAPER, original](https://arxiv.org/abs/1703.04046); counts in [SalientSleepNet](https://ijcai.org/proceedings/2021/0360.pdf) and [DeepSleepNet-Lite](https://arxiv.org/abs/2108.10600) |
| **TinySleepNet** | CNN plus LSTM, raw 1-channel EEG | FLOPs per epoch not located | **1.3 million: 5.2 MB in float32, 1.3 MB in int8** | [PAPER, IEEE EMBC 2020](https://ieeexplore.ieee.org/document/9176741/); [comparative count](https://arxiv.org/abs/2108.10600) |
| **DeepSleepNet-Lite** | Simplified CNN, 90 s sequence (three epochs) | FLOPs not located | **0.6 million: 2.4 MB in float32, 0.6 MB in int8**. Accuracy of 84.0 % (kappa 0.78) on Sleep-EDF v1 and 80.3 % (kappa 0.73) on v2, under the authors' own protocols | [PAPER](https://arxiv.org/abs/2108.10600) |
| **YASA** (feature-based) | Statistical and spectral features per epoch, then LightGBM (gradient boosting trees, 500 estimators, maximum depth 5) | **under 5 s for a whole night** of PSG (polysomnography) at 100 Hz on a basic laptop | not published; not a dense neural network | [PAPER, Vallat and Walker, eLife 2021](https://elifesciences.org/articles/70092). Median agreement of 87.5 % over 585 nights; 86.6 % in healthy adults and 84.3 % in obstructive apnea against a consensus of five experts |
| U-Sleep | about 3.1 million parameters, EEG and EOG (electrooculography) | no comparable FLOPs | about 12.4 MB in float32 (3.1 million × 4 bytes; track 5 writes about 12.5 MB), 3.1 MB in int8 | [PAPER](https://www.nature.com/articles/s41746-021-00440-5) |
| Time-series anomaly (Isolation Forest) | 24 features/s; 100 trees; average depth 8 | about 19,200 comparisons/s | under 1 MB | [INFERENCE] |
| Possible imaging with ResNet-18 (fundus or OCT, optical coherence tomography) | 1 image per inference | 1.8 GFLOP per image | 11.7 million, about 47 MB in float32 | [DOCUMENTATION](https://docs.pytorch.org/vision/2.0/models/generated/torchvision.models.resnet18.html) |
| Imaging with MobileNetV2 | 1 image per inference | 0.3 GMAC (up to 0.6 GFLOP) per image | 3.4 million, about 13.6 MB in float32 | [PAPER, CVPR 2018](https://openaccess.thecvf.com/content_cvpr_2018/papers/Sandler_MobileNetV2_Inverted_Residuals_CVPR_2018_paper.pdf) |
| Local language model with 1 to 8 billion parameters | 4-bit weights | needs extra memory for context and execution | 0.5 to 4 GB for weights alone | [INFERENCE]; not a requirement for classifying signals |

### 3.3 Worked calculations

| Calculation | Step by step | Result |
| --- | --- | --- |
| Filters | 4 channels × 250 samples/s × 2 filters × 10 operations | 20,000 operations/s |
| One 256-point FFT | 5 × 256 × log₂(256) = 5 × 256 × 8 | 10,240 operations |
| Four FFTs | 4 × 10,240 | 40,960, about 41 thousand operations |
| FFTs every 30 s | 40,960 ÷ 30 | about 1,365 operations/s |
| DeepSleepNet weights in float32 | 21,000,000 × 4 bytes to 24,700,000 × 4 bytes | 84 to 98.8 MB |
| DeepSleepNet weights in int8 | 21,000,000 × 1 byte to 24,700,000 × 1 byte | 21 to 24.7 MB |
| TinySleepNet weights | 1,300,000 × 4 bytes; × 1 byte | 5.2 MB; 1.3 MB |
| DeepSleepNet-Lite weights | 600,000 × 4 bytes; × 1 byte | 2.4 MB; 0.6 MB |
| Epochs in an 8 h night | 8 × 3,600 s ÷ 30 s | 960 epochs |
| YASA per epoch | 5 s ÷ 960 epochs | under 5.2 ms per epoch |
| Isolation Forest | 24 × 100 × 8 | 19,200 comparisons/s |
| ResNet-18, one image per minute | 1.8 GFLOP ÷ 60 s | 30 MFLOP/s (one every 10 s: 180 MFLOP/s) |
| 8-billion-parameter language model at 4 bits | 8,000,000,000 × 0.5 byte | 4 GB for weights alone |

Reading from track 5: filters and FFT stay far below the capacity of a microcontroller, a Raspberry Pi 5 or a laptop, and are negligible against any current CPU (central processing unit); for comparison, the Orin Nano Super kit advertises 67 TOPS, that is, 67 trillion operations per second (section 4.1). [INFERENCE, track 5]

### 3.4 The DeepSleepNet correction

Table 1 of the SleepMFormer paper prints **0.78 million parameters and 30.60 MFLOPs** for a model called "DeepSleepNet" (30 s epoch at 100 Hz) and 0.41 million (6.84 MFLOPs) for "TinySleepNet". These values **do not match** the counts for the canonical models: SalientSleepNet compares the original DeepSleepNet with 21 million parameters, and the DeepSleepNet-Lite paper reports about 24.7 million for the original and 1.3 million for TinySleepNet. SleepMFormer does not explain which variant produced the smaller numbers. **Do not use 0.78 million or 30.6 MFLOPs to size the original DeepSleepNet.** The original paper describes the architecture but does not give the weight count. [PAPER, [SleepMFormer](https://www.mdpi.com/2076-3425/16/1/95); [SalientSleepNet](https://ijcai.org/proceedings/2021/0360.pdf); [DeepSleepNet-Lite](https://arxiv.org/abs/2108.10600)]

### 3.5 Conclusion for the pitch

Acquisition of EEG and EOG, band power, sleep staging and simple anomaly detection **fit on a CPU**. A GPU (graphics processing unit) is not a requirement; it only buys capacity for vision and generative language. [INFERENCE, track 5] YASA is the lowest-cost option, but the published configuration uses central EEG, EOG and EMG (electromyography); without EMG and with electrodes on the frame, it needs its own validation. [PAPER, [Vallat and Walker](https://elifesciences.org/articles/70092)]

If the team wants local language: in an NVIDIA test (JetPack 6.2, INT4 via MLC), the Jetson Orin Nano 8 GB in Super mode generated about 19.1 tokens/s with Llama 3.1 8B, 43.1 with Llama 3.2 3B and 64.5 with SmolLM2 1.7B. It is a manufacturer benchmark, not guaranteed performance in a flight enclosure. [MANUFACTURER, [NVIDIA](https://developer.nvidia.com/blog/?p=95089)]

---

## 4. The two configurations

| | **Minimum** | **Dedicated** |
| --- | --- | --- |
| Computer | SSC (Station Support Computer, the station's support laptop) already approved | NVIDIA Jetson Orin NX 16 GB module with carrier board, storage and heat sink |
| Additional computing mass | **almost zero** (0 g if the laptop is already available) | **0.5 to 1.0 kg**, engineering target for the assembly, not a manufacturer specification |
| Power | that of the laptop that is already on | **15 to 25 W**, in a restricted power profile |
| Total mass to carry | 54 to 72 g (glasses only) | 0.572 to 1.072 kg (72 g glasses + module) |
| When it makes sense | Signal, sleep and anomaly | Vision and local language with lower latency, isolation of the software from the station, or redundancy |
| What is missing | Authorization to run software and access data; confirm CPU, memory and system of the current SSC | Qualification, thermal enclosure, approved power supply; the developer kit is not a space package |

Source of the two configurations: [INFERENCE, track 5]. For bench and demonstration, track 5 suggests the Orin Nano Super kit (175 g, 7 to 25 W).

About the SSC: the Johnson Space Center software process page lists HP ZBook 15 Gen 2 and iPads and warns not to assume the latest operating system; a 2020 document describes HP ZBooks modified for the ISS. Neither proves the current model. [OFFICIAL, [SSC catalog](https://tsc.jsc.nasa.gov/roi-swprocess/sw_platforms.html); [NASA NTRS](https://ntrs.nasa.gov/api/citations/20205011808/downloads/IntroductionISSCrewDisplays.pdf)]

### 4.1 Candidate platforms

| Platform | Mass and size | Consumption and performance | Public price | Source |
| --- | --- | --- | --- | --- |
| SSC on the station | 0 g additional; current model not confirmed | Current CPU and memory not confirmed | no incremental launch cost | [OFFICIAL](https://tsc.jsc.nasa.gov/roi-swprocess/sw_platforms.html) |
| Raspberry Pi 5, 8 GB | board of about 85 × 56 mm; mass not found | 4 Cortex-A76 cores at 2.4 GHz; 0.8 A × 5.1 V = about 4.1 W active; peaks near 12 W | US$ 175 (list, consulted on 15/11/2026) | [MANUFACTURER](https://pip-assets.raspberrypi.com/categories/892-raspberry-pi-5/documents/RP-008348-DS-10-raspberry-pi-5-product-brief.pdf), [consumption](https://www.raspberrypi.com/documentation/hardware/raspberrypi/power.html) |
| Jetson Orin Nano Super (kit) | 175 g; 100 × 79 × 21 mm | 67 TOPS sparse INT8 (33 dense); 7, 15 and 25 W modes | US$ 399 out of stock (15/11/2026); launched at US$ 249 (17/12/2024) | [MANUFACTURER](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/), [store](https://marketplace.nvidia.com/en-us/enterprise/robotics-edge/jetson-orin-nano-super-developer-kit/) |
| Jetson Orin NX 16 GB (module) | 69.6 × 45 mm; mass not located | up to 100 TOPS sparse INT8 (50 dense); 10 to 40 W | depends on the integrator | [MANUFACTURER](https://developer.nvidia.com/downloads/jetson-orin-nx-module-series-data-sheet) |
| HPE Edgeline EL4000 (infrastructure reference) | 17.2 to 17.6 kg; rack of 615 × 435 × 43 mm | 400 to 600 W typical, up to 800 W | enterprise quote | [MANUFACTURER](https://www.hpe.com/psnow/downloadDoc/HPE%20Edgeline%20EL4000%20Converged%20IoT%20System-c05211375.pdf) |

The ISS already runs commercial computing: Spaceborne Computer-2 (installed in 2021, with two HPE servers, 10-core Intel Xeon Silver 5215 processors and four NVIDIA Tesla GPUs) processed BioMole sequencing data on board. It is laboratory infrastructure, not a personal computer for the crew. [NASA/JPL, [presentation](https://ai.jpl.nasa.gov/public/documents/presentations/FSW-2022-Snapdragon-Presentation.pdf); PAPER/NTRS, [BioMole](https://ntrs.nasa.gov/citations/20220013040)]

### 4.2 Radiation

SBC-1 (Spaceborne Computer-1) operated 207 days without a restart [OFFICIAL, [NASA](https://www.nasa.gov/missions/station/iss-research/new-research-launching-to-space-station-aboard-northrop-grummans-15th-resupply-mission/)]; SBC-2 tests commercial off-the-shelf (COTS) computing and radiation error recovery. That does not qualify any board. Software mitigations recommended by track 5 for the prototype: watchdog with recovery, atomic writes, checksums, restarting inference without losing acquisition, periodic checkpoint, redundant copy of the settings and explicit discarding of corrupted samples; ECC (memory error correction) only where the hardware supports it. [INFERENCE, track 5]

---

## 5. Energy

### 5.1 How much each part consumes per day

| Part | Calculation | Energy per day |
| --- | --- | --- |
| Glasses, useful energy (baseline scenario) | 35 mW × 17 h + 30 mW × 9 h | 0.865 Wh |
| Glasses, energy drawn from the outlet to recharge | 0.865 Wh ÷ (0.70 × 0.85) | 1.454 Wh |
| Dedicated module on 24 h at 15 W | 15 W × 24 h | 360 Wh |
| Dedicated module on 24 h at 25 W | 25 W × 24 h | 600 Wh |

The glasses rows are [INFERENCE, track 5] (full calculation in [`09-orbit-glasses.md`](09-orbit-glasses.md), section 5). The module rows are our own calculation over the 15 to 25 W range. Reading: one day of the dedicated module at 15 W uses as much energy as about 250 glasses recharges (360 ÷ 1.454 = 248).

### 5.2 Power on the ISS

- A service panel on the ISS provides **120 V direct current** for utility loads. Having the outlet does not authorize plugging in any power supply: charger, conversion, cable, battery and protection need approval for the configuration. [OFFICIAL, [NASA, utility panel](https://www.nasa.gov/blogs/stationreport/2021/05/07/iss-daily-summary-report-5-07-2021/)]
- **28 V DC was not confirmed** as a public crew outlet; do not assume an internal bus is an available connector. [INFERENCE, track 5]
- The Raspberry Pi 5 expects 5 V and recommends a power supply of up to 27 W; the Jetson Orin Nano has profiles of 7 to 25 W. Both require an approved isolated power supply and regulated conversion. [MANUFACTURER, [Pi 5](https://www.raspberrypi.com/documentation/computers/getting-started.html?file=README.md); [Jetson](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)]

### 5.3 Power in a Mars habitat

NASA describes the Fission Surface Power program in the class of **40 kW electric** continuous; an architecture study for four crew members evaluates 15 kW as the minimum for certain life-support functions. [OFFICIAL, [NASA, Fission Surface Power](https://www.nasa.gov/exploration-systems-development-mission-directorate/fission-surface-power/); PAPER/NTRS, [four crew members](https://ntrs.nasa.gov/citations/20170006519)]

```text
25 W ÷ 40,000 W × 100 = 0.0625 %
25 W ÷ 15,000 W × 100 = 0.17 %
```

Even the dedicated module at the maximum profile would be a very small fraction of a habitat's power.

---

## 6. How much it costs to carry to the ISS

### 6.1 Price references

| Reference | Date | Value | Correct reading |
| --- | --- | --- | --- |
| CRS-1 (Commercial Resupply Services 1: Dragon and Cygnus) | OIG (Office of Inspector General, NASA's internal audit office) audit published on 26/04/2018 | **US$ 63,200/kg** estimated; US$ 191.3 million per mission on average | Transport and logistics contract to the ISS, not the marginal cost of one gram |
| CRS-2 (Dragon, Cygnus and Dream Chaser) | 2016 projection revised in the same 2018 report | **US$ 71,800/kg** projected; US$ 300.6 million per flight | 14 % more expensive per kg than CRS-1 (71,800 ÷ 63,200 = 1.136); projection, not a current quote |
| Dragon (CRS-1) | OIG, 2014 | US$ 133.3 million per flight; 3,310 kg of indicated capacity | 133,300,000 ÷ 3,310 = about US$ 40,300/kg of theoretical capacity [INFERENCE] |
| Cygnus (CRS-1) | OIG, 2014 | US$ 237.5 million per flight; 2,700 kg | 237,500,000 ÷ 2,700 = about US$ 88,000/kg [INFERENCE] |
| Falcon 9 | SpaceX table consulted on 15/11/2026 | US$ 74 million per launch; up to 22,000 kg to LEO (Low Earth Orbit) if fully expendable | 74,000,000 ÷ 22,000 = US$ 3,364/kg; not the price of cargo delivered to the ISS |

Sources: [OFFICIAL, OIG 2018](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf); [OFFICIAL, OIG 2014](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-14-031.pdf); [MANUFACTURER, SpaceX](https://www.spacex.com/assets/media/Capabilities%26Services.pdf).

**Why CRS costs so much more than the Falcon 9 division:** CRS buys the entire logistics mission: pressurized capsule, safety integration, cargo preparation, approach and operation at the station, return or disposal and schedule. The OIG points to integration expenses of at least US$ 700 million at the start of CRS-2, and the capsule may run out of volume before maximum mass. [OFFICIAL, [OIG 2018](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf)]

### 6.2 Allocation calculation

```text
allocated cost = transported mass × historical average cost per kg
```

| Mass | Calculation with US$ 63,200/kg (CRS-1) | Calculation with US$ 71,800/kg (CRS-2 projected) |
| ---: | ---: | ---: |
| 0.05 kg (50 g) | 0.05 × 63,200 = US$ 3,160 | 0.05 × 71,800 = US$ 3,590 |
| 0.054 kg (minimum glasses) | US$ 3,413 | US$ 3,877 |
| 0.072 kg (realistic glasses) | US$ 4,550 | US$ 5,170 |
| 2 kg (batch of four) | US$ 126,400 | US$ 143,600 |
| 5 kg (dedicated kit) | US$ 316,000 | US$ 359,000 |

[INFERENCE, track 5, on the 2018 OIG averages]

> **Mandatory caveat in the presentation:** these values **are not a marginal quote**. The agency does not buy a fraction of a mission for a wearable, and the launch does not burn fuel proportional to each gram. The cargo takes up part of the capacity and volume of an already planned mission; the real cost depends on space, integration, priority and contract. Use the phrase "historical share of the average transport cost". [INFERENCE, track 5]

---

## 7. The rocket equation, step by step

### 7.1 The idea in one sentence

To gain speed, the rocket throws mass backward (the burned propellant). More cargo requires more propellant, and that extra propellant also has to be accelerated while it has not yet been burned; that is why the calculation grows exponentially, not in a straight line.

### 7.2 The ingredients

| Symbol | Name | What it means | Value used |
| --- | --- | --- | --- |
| Δv (delta-v) | Change of velocity | How much the maneuver needs to accelerate, in m/s | 9,400 m/s to reach low orbit [INFERENCE, track 5] |
| Isp | Specific impulse | Engine efficiency, in seconds: the higher it is, the less propellant for the same maneuver | 348 s (Falcon 9 Merlin Vacuum) [SECONDARY] |
| g0 | Standard gravity | Conversion constant | 9.80665 m/s² |
| m0 | Initial mass | Full stage: structure, propellant and cargo | |
| mf | Final mass | What is left after the burn | |
| R | Mass ratio | m0 ÷ mf | calculated |
| ln and exp | Natural logarithm and exponential | exp undoes ln: if y = ln(x), then x = exp(y); exp(y) is the number 2.718 raised to y | |

About the values: reaching low orbit requires an orbital velocity of about 7.8 km/s, plus losses from gravity, drag and steering; a NASA document shows an ideal velocity near 9.26 km/s, and track 5 uses 9.4 km/s as a representative value of 9.3 to 9.5 km/s. [OFFICIAL, [NASA NTRS](https://ntrs.nasa.gov/api/citations/20080013338/downloads/20080013338.pdf?attachment=true); [NASA Glenn, flight to orbit](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/flight-to-orbit/)] The Isp of 348 s is not in a current official SpaceX data sheet (hence [SECONDARY](https://spacelaunchlive.com/engines/merlin-1d-vacuum/)); NASA's historical data sheet for an earlier generation of the Merlin 1D showed about 340 s in vacuum. [OFFICIAL, [NASA](https://sma.nasa.gov/LaunchVehicle/assets/spacex-falcon-9-data-sheet.pdf)]

### 7.3 The formula

The ideal form (without drag) of the Tsiolkovsky equation, according to NASA: [OFFICIAL, [NASA Glenn, ideal rocket equation](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/)]

```text
Δv = Isp × g0 × ln(m0 ÷ mf)

Isolating the mass ratio:
R = m0 ÷ mf = exp(Δv ÷ (Isp × g0))

Extra propellant for each extra mass that needs to arrive at the end of the burn:
additional propellant = (R − 1) × additional mass
```

### 7.4 Worked calculation: ascent to low orbit

| Step | What to do | Calculation | Result |
| --- | --- | --- | --- |
| 1 | Multiply Isp by g0 (the result comes out in m/s) | 348 s × 9.80665 m/s² | 3,412.7 m/s |
| 2 | Divide the delta-v by that value | 9,400 ÷ 3,412.7 | 2.7544 |
| 3 | Apply the exponential | exp(2.7544) | R = 15.71 |
| 4 | Subtract 1 to keep only the propellant | 15.71 minus 1 | **14.71 kg of propellant per kg of cargo** |
| 5 | See the propellant fraction in the stage | 14.71 ÷ 15.71 | 0.936: 94 % of the initial mass would be propellant |

In words: in an idealized stage, each kilogram that needs to remain in the stage after the burn requires 15.71 kg at the start, of which 14.71 kg is propellant. [INFERENCE, track 5]

### 7.5 Examples

The "Calculation" column shows the rounded factor; the results use the unrounded factor (14.7117), which is why 5 kg gives 73.56 kg and not 73.55 kg:

| Additional cargo | Calculation | Idealized additional propellant |
| ---: | --- | ---: |
| 0.05 kg (50 g) | 14.71 × 0.05 | **0.74 kg** |
| 0.054 kg (minimum glasses) | 14.71 × 0.054 | 0.79 kg |
| 0.072 kg (realistic glasses) | 14.71 × 0.072 | 1.06 kg |
| 2 kg | 14.71 × 2 | **29.42 kg** |
| 5 kg | 14.71 × 5 | **73.56 kg** |

**Why "exponential" matters:** with the ideal delta-v of 9.26 km/s instead of 9.4 km/s, the factor falls from 14.71 to 14.08 kg/kg. A delta-v 1.5 % lower changes the factor by about 4 %. [our calculation with the same formula]

### 7.6 Worked calculation: injection to Mars

To leave low orbit toward Mars, an example injection is around 3.6 km/s (depends on planetary alignment) [INFERENCE, track 5, from the [NASA Trajectory Browser](https://trajbrowser.arc.nasa.gov/user_guide.php)]. With the cryogenic RL10 engine, Isp of 465.5 s in one variant (others lie between 449.7 and 460.9 s) [MANUFACTURER, [L3Harris](https://www.l3harris.com/sites/default/files/2024-07/l3harris-ar-rl10-spec-sheet.pdf)]:

| Step | Calculation | Result |
| --- | --- | --- |
| 1 | 465.5 × 9.80665 | 4,565.0 m/s |
| 2 | 3,600 ÷ 4,565.0 | 0.7886 |
| 3 | exp(0.7886) | R = 2.20 |
| 4 | 2.20 minus 1 | 1.20 kg of propellant per kg |
| Examples | 0.05 kg; 2 kg; 5 kg | 0.06 kg; 2.40 kg; 6.00 kg |

The factor is much smaller because the engine is more efficient and the maneuver asks for less velocity. This table deals with mass in the injection stage, not landed mass; do not add it to the Mars factor in section 8. [INFERENCE, track 5]

### 7.7 What this calculation is not

- It is an **idealized single stage** with constant Isp, with no extra structure, residual propellant, tanks, engine, margin or atmospheric losses. It is not a Falcon 9 mission calculation: the real rocket has several stages, each with its own Isp and dry mass, and discards empty tanks. [INFERENCE, track 5]
- **Didactic reading:** 50 g of cargo is "worth" about 0.74 kg of propellant in the idealized ascent. **Operational reading:** the rocket is already sized for the planned cargo; a small accessory takes up mass and volume margin, and nobody adds 0.74 kg to the tank because of it. In the pitch, show the equation as **sensitivity**, and use the allocated cost (section 6) as the cost number. [INFERENCE, track 5]

---

## 8. Mars: the "gear ratio"

NASA calls **gear ratio** the increase in the vehicle's initial mass when 1 extra kg of cargo is included. It varies with mission, duration, trajectory, propulsion and architecture; it is not a price or a universal factor. [OFFICIAL, [NASA, 2023 architecture review](https://ntrs.nasa.gov/api/citations/20230016121/downloads/Round-Trip%20Mars%20Mission%20Mass%20Challenges.pdf)]

Example from a one-way surface delivery architecture, with aerocapture, in NASA material dated 15/02/2022: **7.4 kg in low orbit and 148 kg on Earth for every 1 kg of cargo landed on Mars**. Another ratio in the same material (11.3 kg in low orbit for 1 kg of propellant already on the surface) is a different case and should not be confused. [OFFICIAL, [2022 NASA presentation](https://ntrs.nasa.gov/api/citations/20220002258/downloads/Trademark%20FAU%20for%20export%20-2.15.2022%20BE%20No%20One%20Has%20Gone%202.0.pdf); [NASA, mass example](https://ntrs.nasa.gov/api/citations/20160005017/downloads/20160005017.pdf?attachment=true)]

| Cargo on the Mars surface | In low orbit (× 7.4) | On Earth (× 148) |
| ---: | ---: | ---: |
| 0.05 kg | 0.37 kg | 7.4 kg |
| 0.054 kg (minimum glasses) | 0.40 kg | 7.99 kg |
| 0.072 kg (realistic glasses) | 0.53 kg | 10.66 kg |
| 2 kg | 14.8 kg | 296 kg |
| 5 kg | 37 kg | 740 kg |

[INFERENCE, multiplication of the factors of one specific NASA architecture] The mass on Earth **is not only fuel**: it includes everything that architecture needs to move the cargo through the stages. That is why 148 is much larger than the 14.71 in section 7: the gear ratio adds ascent, travel, descent, thermal protection and stages.

Round-trip crewed missions are much more demanding: the 2023 NASA analysis estimates about 10.6 kg of propellant per kg of cargo on a 1,100-day mission and 34.4 kg/kg in an 850-day scenario. [OFFICIAL, [NASA 2023](https://ntrs.nasa.gov/api/citations/20230016121/downloads/Round-Trip%20Mars%20Mission%20Mass%20Challenges.pdf)]

**There is no public tariff to land 1 kg on Mars.** The Falcon 9 carries up to 4,020 kg on a Mars trajectory; 74,000,000 ÷ 4,020 = US$ 18,408/kg, but that is only launch to the trajectory, without landing, lander or thermal protection. [MANUFACTURER, [SpaceX](https://www.spacex.com/assets/media/Capabilities%26Services.pdf); INFERENCE, track 5]

---

## 9. Final cost table by scenario

| Scenario | Mass | ISS allocation (US$ 63,200 to 71,800/kg) | Idealized propellant on ascent (14.71 kg/kg) | Mars: in low orbit (× 7.4) | Mars: on Earth (× 148) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Minimum: one pair of glasses | 0.054 kg | US$ 3,413 to 3,877 | 0.79 kg | 0.40 kg | 7.99 kg |
| Realistic: one pair of glasses | 0.072 kg | US$ 4,550 to 5,170 | 1.06 kg | 0.53 kg | 10.66 kg |
| Dedicated: one pair of glasses and module | 0.572 to 1.072 kg | US$ 36,150 to 76,970 | 8.42 to 15.77 kg | 4.23 to 7.93 kg | 84.66 to 158.66 kg |
| Initial batch for four crew members | 2 kg | US$ 126,400 to 143,600 | 29.42 kg | 14.8 kg | 296 kg |
| Dedicated demonstration kit | 5 kg | US$ 316,000 to 359,000 | 73.56 kg | 37 kg | 740 kg |

How to read: the ISS allocation is a historical share of the OIG average cost (in the dedicated row, from the lowest mass at the lowest price to the highest mass at the highest price); the propellant is an equation sensitivity, not real refueling; the Mars masses use the factors of a 2022 NASA architecture. On Mars there is no price: a surface tariff is missing, and any future budget must include a descent vehicle and thermal protection. The minimum, dedicated, batch and kit rows reproduce table D3 of track 5; the realistic row and the propellant column are our own calculations with the same factors. [INFERENCE]

---

## 10. Numbers for the slide

| # | Number | Suggested phrase | Source |
| --- | --- | --- | --- |
| 1 | **54 to 72 g** | "The Orbit glasses weigh, by estimate, between 54 and 72 g, without the lenses." | Track 5 estimate based on data sheets [JINS](https://www.jins.com/jp/client_info/JINSJINS/infoimage/20211006_Press%20Release1.pdf), [ISL](https://media.digikey.com/pdf/Data%20Sheets/ISL%20PDFs/SPK-I-81368.pdf) and [TinyCircuits](https://files.tinycircuits.com/Datasheets/ASR00035_500mAh.pdf) |
| 2 | **97.2 MB per night** | "Four channels of EEG and EOG recorded all night generate 97.2 MB." | Track 5 calculation based on the [ADS1299 data sheet](https://www.ti.com/lit/ds/symlink/ads1299.pdf) |
| 3 | **8 g and 1.85 Wh** | "An 8 g battery covers one day of use (0.865 Wh); daily recharge." | [TinyCircuits](https://files.tinycircuits.com/Datasheets/ASR00035_500mAh.pdf); [INFERENCE] budget from track 5 |
| 4 | **Almost zero extra mass** | "All the analysis runs on the laptop that is already on the station; the sleep model fits on a CPU." | [INFERENCE, track 5]; YASA processes a night in under 5 s ([eLife](https://elifesciences.org/articles/70092)) |
| 5 | **0.5 to 1.0 kg and 15 to 25 W** | "If NASA wants a dedicated computer, it is a module of up to 1 kg and 25 W." | [INFERENCE, track 5]; [Orin NX](https://developer.nvidia.com/downloads/jetson-orin-nx-module-series-data-sheet) profiles |
| 6 | **US$ 63,200/kg** | "By the OIG historical average, carrying one pair of glasses to the ISS is equivalent to about US$ 3,400 to US$ 5,200 of transport cost." | [OIG 2018](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf); allocation, not a quote |
| 7 | **14.71 kg of propellant per kg** | "In the ideal rocket equation, each extra kilo would require almost 15 kg of propellant: that is why every gram counts." | [NASA Glenn](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/); track 5 assumptions |
| 8 | **148 kg on Earth per kg on Mars** | "On Mars, each landed kilo costs 148 kg on Earth, in one NASA architecture example." | [NASA, 2022](https://ntrs.nasa.gov/api/citations/20220002258/downloads/Trademark%20FAU%20for%20export%20-2.15.2022%20BE%20No%20One%20Has%20Gone%202.0.pdf) |

Rules for the presenter: say "estimate" for numbers 1 to 5; say "historical average, not a quote" for number 6; say "idealized calculation" for number 7; say "example of one architecture" for number 8.

---

## 11. Gaps

- Masses of lens, board, electrodes, wiring, housing and transducer need to be weighed; 54 g and 72 g are lower bounds.
- The model, CPU, memory and permissions of the current SSC need to be confirmed with the process owner.
- 28 V DC was not identified as a crew outlet; 120 V DC is confirmed, but it also requires an approved power supply and interface.
- The price per kg comes from 2018 OIG contracts and 2016 projections; a current quote for small cargo, integration, packaging and return is missing.
- The Isp of 348 s is from a secondary source; the Raptor has no complete public official data sheet per variant.
- The ratios 7.4 and 148 are from a 2022 NASA architecture, not fixed mass or price; there is no landing tariff on Mars.
- No computing platform was benchmarked with Orbit data; radiation, thermal and EMI of the dedicated module were not assessed.
