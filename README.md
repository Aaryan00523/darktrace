# DARKTRACE — Dark Web Threat Actor De-anonymization Platform

> **Connecting Digital Footprints. Revealing Threat Actor Networks.**

DARKTRACE is a cyber threat intelligence (CTI) and threat actor de-anonymization web platform. It correlates fragmented darknet footprints across Tor hidden services, cryptographic keys, cryptocurrency ledgers, and underground forums into an explainable, interactive 3D relationship network.

---

## 🛡️ Executive Demonstration Overview

* **100% Synthetic Intelligence Dataset**: Zero real-world criminal data, zero unauthorized scraping, zero exploitation of real onion services.
* **Lawful Research Prototype**: Designed for SOC teams, cyber-intelligence analysts, and digital forensics researchers.
* **Core Pipeline**:
  `COLLECT → NORMALIZE → CORRELATE → ANALYZE → ATTRIBUTE → INVESTIGATE → REPORT`

---

## 🚀 Key Functional Modules

1. **3D Intelligence Globe (`/`)**
   - WebGL globe displaying cross-regional darknet crawler telemetry, nodes, and glowing arcs.
   - Interactive Raycasting with tooltips and click-to-focus capabilities.

2. **Main Command Center (`/dashboard`)**
   - Real-time KPI counters (128 Threat Actors, 500+ Relationships, 1,000+ Events, 52 Sources).
   - 3D/2D Relationship Network centered on threat actor **NIGHTFALL**.
   - Live streaming intelligence telemetry feed.

3. **3D Threat Actor Identity Graph (`/identity-graph`)**
   - Seamless toggle between **3D Mode** (Three.js WebGL) and **2D Mode** (Vector SVG).
   - Interactive nodes with custom geometries for handles, PGP keys, wallets, and infrastructure.
   - Clickable edges that open detailed relationship evidence and corroboration metrics.

4. **Threat Actor Profiles (`/actors`, `/actors/:id`)**
   - Deep forensic dossiers on **NIGHTFALL**, **SHADOW MERCHANT**, and **ORBITAL FOX**.
   - Explainable Attribution Confidence Engine (PGP 30%, Infrastructure 25%, Wallets 20%, Stylometry 15%, Behavior 10%).

5. **Infrastructure Intelligence (`/infrastructure`)**
   - Cascading 6-tier 3D infrastructure map:
     `Actor → Hidden Service → Host IP → TLS Certificate → Domain → Related Infrastructure`.
   - Comprehensive searchable indicator table.

6. **AI Persona & Stylometric Space (`/persona-intelligence`)**
   - 3D similarity vector space where spatial proximity represents stylometric cosine convergence.
   - Cross-platform comparative matrix across Dread, SilkCore, and Genesis Underground personas.

7. **3D Attribution Timeline (`/timeline`)**
   - Chronological ribbon spanning 2024 to 2026 with filterable milestone cards.

8. **Autonomous Intelligence Monitor (`/autonomous-monitor`)**
   - Central 3D Intelligence Engine core with orbiting crawler satellites.
   - Functional **RUN SCAN NOW** simulation that dynamically injects new indicators, updates dashboard metrics, and appends live logs.

9. **Investigation Case Workspace (`/investigations`, `/investigations/:id`)**
   - Multi-tab investigative console for **OPERATION ECLIPSE**.
   - Interactive analyst notes log, evidence vault, and case creation modal.

10. **Data Explorer (`/data-explorer`)**
    - Searchable, sortable, paginated tables for Actors, Handles, PGP Keys, Wallets, Infrastructure, Personas, and Relationships.
    - One-click CSV and JSON export.

11. **Report Generation Center (`/reports`)**
    - Client-side court-ready **PDF report compilation** via `jsPDF`.
    - Native browser **JSON** and **CSV** downloads.

12. **3D Enterprise System Architecture (`/architecture`)**
    - Interactive 3D stacked glass architecture planes detailing all 6 system tiers.

13. **Methodology & Legal Framework (`/about`)**
    - Documentation of the 7-stage intelligence lifecycle and ethical safeguards.

14. **Platform Settings (`/settings`)**
    - 3D WebGL rendering performance presets (High, Balanced, Performance) and dataset seed reset.

---

## ⌨️ Global Shortcuts & Utilities

- **`Ctrl + K` (or `Cmd + K`)**: Global Command Palette searching across all actors, handles, PGP fingerprints, wallets, and infrastructure.
- **TRACE AI Assistant**: Floating intelligence chatbot answering queries grounded directly in the synthetic dataset.
- **Investigation Walkthrough**: 7-step guided tour from Actor Discovery to Report Generation.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Cyber Threat Intelligence Dark Palette (`#05070B`, `#00F0FF`, `#A855F7`)
- **3D Graphics**: Three.js (WebGL rendering with custom orbital controls & raycasting)
- **State Management**: Zustand
- **Exports**: jsPDF, Native CSV/JSON Blobs
- **Icons**: Lucide React

---

## 📦 Getting Started

```bash
# Navigate to darktrace
cd C:\Users\rn512\.gemini\antigravity\scratch\darktrace

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## ⚖️ Legal & Ethical Notice

DARKTRACE is an intelligence-analysis prototype designed for lawful cybersecurity research and investigation. Demonstration data is 100% synthetic and does not represent real individuals or criminal entities.
