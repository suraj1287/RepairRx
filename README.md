# RepairRx 🛠️📊

**Version:** 1.0  
**Last Updated:** May 18, 2025  
**Author:** Suraj Shelke  
**GitHub:** [github.com/suraj1287/RepairRx](https://github.com/suraj1287/RepairRx)

---

## 📘 Project Overview

**RepairRx** is a full-stack diagnostic assistant built to help **support engineers** rapidly analyze **repair-related issues** in **Apache Cassandra** and **DataStax Enterprise (DSE)** clusters.

Designed for **urgent troubleshooting**, it parses extracted diagnostic tarballs and presents:
- 📊 Node-level log coverage (system/debug).
- 🛠️ Deep repair diagnostics (anticompaction, failures, validation).
- 🎨 Visual health indicators with drill-down support.

---

## 🎯 Motivation

As a Cloud Support Engineer, I often receive diagnostic tarballs or logs from customers asking:  
**“Was repair running?” “Why did it fail?” “Do the logs contain the time I reported?”**

The traditional way of answering this is time-consuming.  
**RepairRx** was built to:
- Automate the first-level analysis.
- Detect common failure patterns.
- Empower engineers with GenAI-enhanced insights and UI-driven summarization.

---

## 🛠️ Tech Stack

| Layer         | Technology Used         |
|---------------|--------------------------|
| Frontend UI   | React + Tailwind CSS     |
| Backend API   | FastAPI (Python 3.13)    |
| Log Parsing   | Regex-based, severity-aware |
| Deployment    | Local-first (no upload needed) |
| GenAI (future)| OpenAI GPT-4o planned for insight generation |

---

## 🏗️ Architecture Overview

📁 Diagnostic Folder (local)
└── nodes//logs/cassandra/{system.log, debug.log}
└── opscenterd/repair_service_logs/ (optional)

🌐 Frontend (React)
└── Sidebar Navigation
└── Analyze Logs page
└── Displays: Node Summary, Repair Categories, Severity

🧠 Backend (FastAPI)
└── /analyze-local API
├── Timestamp extraction from logs
├── Repair pattern recognition
├── Severity grouping (INFO, WARN, ERROR)
├── Response JSON → rendered by React

---

## 🔁 Build Journey & Key Steps

This section outlines **how I built RepairRx from scratch**:

### ✅ Backend (FastAPI)
- Initialized `main.py` with a working `/analyze-local` POST API.
- Parses system/debug logs from diagnostic tarball path.
- Extracts timestamp ranges, log counts per node.
- Extended to include repair log classification:
  - Anticompaction Start
  - Validation Complete
  - Repair Session Failures
- Classified by severity (INFO/WARN/ERROR).

### ✅ Frontend (React + Tailwind)
- Initialized React project with Vite + Tailwind setup.
- Created `Sidebar.jsx` for navigation.
- Built `AnalyzeLogs.jsx` to:
  - Accept user input path.
  - Display log summary + repair diagnostics.
  - Color-code based on severity.
  - Expand/collapse per node.

### ✅ Fixes and Enhancements
- 📦 Switched from upload to local directory scan.
- 🪵 Rewrote log readers to be fault-tolerant.
- 🎨 Made repair entries scrollable and grouped.
- 🧪 Manually verified timestamp match per node.
- 🐞 Fixed UI crash on large logs by limiting & grouping entries.
- 🗂️ Structured screenshots under `/frontend/assets/`

---

## 🚀 Usage Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/suraj1287/RepairRx.git
cd RepairRx


⸻

2. Backend Setup (FastAPI)

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Runs on: http://127.0.0.1:8000/analyze-local

⸻

3. Frontend Setup (React)

cd frontend
npm install
npm run dev

Open: http://localhost:5173

⸻

4. Prepare Diagnostic Tarball

Extract the file under:

/Users/<your-username>/Downloads/<diagnostic-folder>/

Make sure it contains:

nodes/<ip>/logs/cassandra/{system.log, debug.log}


⸻

🧪 Features in Action

✅ Per-node Log Coverage

Shows start → end timestamps with log count.


⸻

⚠️ Repair Log Breakdown

Grouped by type and severity.


⸻

🔍 Timeline + Severity View

Helpful for comparing time ranges with issue window.


⸻

🔮 Future Enhancements

Planned in v2.x:
	•	Export JSON/CSV snapshots.
	•	Search repair logs by keyspace/table.
	•	Filter logs by date/time range.
	•	Detect known failure patterns like:
	•	“Repair already finished”
	•	“Stream failed”
	•	“Session timed out”
	•	GenAI Recommendations (GPT-4o).

⸻

👨‍💻 Maintained by

Suraj Shelke
Cloud Support Engineer – Apache Cassandra / DSE
Mumbai, India
GitHub: suraj1287
Project: RepairRx

⸻
