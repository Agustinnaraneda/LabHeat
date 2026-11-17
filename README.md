# LabHeat — Virtual Heat Transfer Laboratory

LabHeat is an educational virtual laboratory that lets you observe how the temperature of water decreases over time and compare how the model behaves when different container materials are selected. The tool is based on Newton's Law of Cooling and presents its results through a chart and a downloadable file.

## How to Run a Trial

1. Open the application in an up-to-date browser.
2. Enter the initial water temperature and the ambient temperature.
3. Select the container material from the available options.
4. Press **Start** and watch the temperature curves over time.
5. Use **Stop** to end the observation, or **Reset** to begin a new trial.
6. Select **Download data (.csv)** to save the readings and analyze them in a spreadsheet.
7. Repeat with a different material, keeping the same initial and ambient temperatures so the comparison is fair.

## Background and Meaning of the Data

The mathematical model is:

```
T(t) = T_amb + (T₀ − T_amb) · e^(−kt)
```

Where:

- **T₀** is the initial temperature
- **T_amb** is the ambient temperature
- **t** is time
- **k** is the effective cooling constant

The **red curve** represents emulated readings from a DS18B20 sensor, and the **blue curve** is the result of applying a moving-average filter. These readings must not be presented as physical measurements taken with a connected sensor.

## Technologies and Structure

The documented development uses **HTML, CSS, and JavaScript**, with visualization built on **Chart.js**. The public code includes files for the interface structure, styles, interaction, and simulation. Before modifying or installing the project, we recommend reviewing the files and dependencies of the current version of the repository.

## Team and Responsibilities

| Member | Role |
| --- | --- |
| Mabel Lizama | Leadership |
| Agustín Araneda | Software |
| Martín Canario | Hardware |
| Ignacia Quiroz | Scientific background |
| Javier Collío | UX/UI |
| Alfonso Arancibia | Documentation |

## Scope and Limitations

LabHeat is a simulation designed to support learning. The cooling values assigned to each material are model parameters, not certified measurements of thermal properties. Validation of the full workflow, comparison of results, and evidence of contributions should be recorded separately.
