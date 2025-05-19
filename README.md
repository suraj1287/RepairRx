Great! Below is a professional, comprehensive, and well-structured README to replace your current one. It includes every major step you took — from project setup, backend/frontend wiring, deep repair diagnostics integration, log parser logic, UI improvements, and more — with explanation for each.

⸻


# RepairRx 🛠️📊

**Version:** 1.0  
**Author:** Suraj Shelke  
**Date:** May 18, 2025  
**Repository:** [github.com/suraj1287/RepairRx](https://github.com/suraj1287/RepairRx)

---

## 🔍 What is RepairRx?

RepairRx is a GenAI-powered diagnostic log analysis assistant tailored for **Apache Cassandra** and **DataStax Enterprise (DSE)** clusters. It was designed to streamline root-cause analysis and provide **rapid repair insights** by parsing `system.log`, `debug.log`, and optionally, **OpsCenter repair logs** from diagnostic tarballs.

> This tool reduces manual toil and accelerates RCA during high-priority support cases by turning complex logs into structured, visual repair insights.

---

## 💡 Why the name “RepairRx”?

Just like a prescription (Rx) helps fix symptoms in healthcare, **RepairRx** offers a remedy for Cassandra/DSE repair pains. It diagnoses, categorizes, and visualizes cluster health & repair anomalies — node by node.

---

## 🧱 Tech Stack

| Layer         | Tools Used                        |
|---------------|-----------------------------------|
| Frontend      | React, Tailwind CSS, React Router |
| Backend       | FastAPI, Python 3.11+             |
| Log Parsing   | Regex, datetime, categorization   |
| Communication | REST API                          |

---

## 🚧 Journey & Steps Followed

### 🛠️ Project Initialization

```bash
mkdir RepairRx && cd RepairRx
gh repo create RepairRx --public

	•	Created backend and frontend folders.
	•	Initialized Git tracking and pushed first commit.

⸻

⚙️ Backend Setup (FastAPI)

1. Folder structure:

backend/
└── app/
    ├── main.py
    └── analyzer.py

2. Python Virtual Environment:

cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn

3. Core endpoints added:
	•	/analyze-local: Accepts a local folder path, parses logs from nodes.
	•	Log timestamps are extracted and summarized per node and log file.
	•	Added deep repair diagnostics using regex match patterns for:
	•	Validation Complete
	•	Anticompaction Start
	•	Repair Session Failed
	•	Streaming Started, etc.

4. Example curl test:

curl -X POST http://127.0.0.1:8000/analyze-local \
  -H "Content-Type: application/json" \
  -d '{"path": "/Users/suraj/Downloads/ibngprd_cluster-diagnostics-2025_05_09_07_04_17_UTC"}'


⸻

🖥️ Frontend Setup (React + Tailwind)

cd frontend
npm create vite@latest
npm install
npm install -D tailwindcss postcss autoprefixer react-router-dom axios
npx tailwindcss init -p

	•	Tailwind integrated in src/index.css
	•	Page structure:
	•	src/pages/AnalyzeLogs.jsx
	•	src/components/Sidebar.jsx
	•	Routing added via App.jsx

⸻

🔍 Functionality Implemented

✅ Local Path Navigation
	•	No need to upload — just paste the full extracted diagnostics path.
	•	Parses:
	•	system.log, debug.log
	•	Optionally: opscenterd/repair_service_logs/ (if included)

📊 Log Summary
	•	Per node: Start timestamp, End timestamp, Count of entries
	•	Files tracked: system.log, debug.log

🧠 Deep Repair Diagnostics
	•	Filters only repair-related lines.
	•	Categories: Repair Session Failure, Anticompaction Start, etc.
	•	Grouped by:
	•	Node
	•	Log type
	•	Severity (INFO, WARN, ERROR)

🎨 UI Enhancements
	•	Color-coded badges for severity
	•	Expand/collapse per-node details
	•	Scrollable summary section

⸻

🧪 Testing Done
	•	Verified backend /analyze-local endpoint with real diagnostic tarballs
	•	Frontend tested using React dev server on http://localhost:5173
	•	Confirmed log timeline and repair pattern extraction works across 30+ nodes

⸻

📦 Folder Expectations

Extract diagnostic tarball like:

/Users/suraj/Downloads/ibngprd_cluster-diagnostics-2025_05_09_07_04_17_UTC/

And expect:

nodes/<ip>/logs/cassandra/{system.log, debug.log}
opscenterd/repair_service_logs/  (optional)


⸻

📷 Screenshots

🟩 Node Health Timeline

🧠 Repair Diagnostic Grouping


⸻

📈 Future Roadmap (Optional Enhancements)

Reserved for v2.x

	•	Export results to CSV/JSON
	•	Snapshot diff comparison
	•	Regex rule tuning
	•	Streamline full upload workflow via browser
	•	Role-based usage (Support vs DevOps)

⸻

🙋‍♂️ Maintainer

Suraj Shelke
Cloud Support Engineer — Apache Cassandra & DSE
Mumbai, India
GitHub: suraj1287

⸻

🌍 GitHub Project Link

🔗 https://github.com/suraj1287/RepairRx

⸻


Let me know if you'd like this broken into sections for a blog, doc site, or PDF.
