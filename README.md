# RepairRx 🛠️📊

**Version:** 1.0  
**Last Updated:** May 18, 2025  
**Author:** Suraj Shelke  
**Project Type:** Full-Stack Diagnostic Assistant for Apache Cassandra / DSE Repair Issues

---


## 🚀 Overview

RepairRx is a GenAI-powered log diagnostics and repair assistant tool built specifically for Apache Cassandra and DataStax Enterprise (DSE) clusters.

It allows support engineers and admins to:
- Upload or navigate to manually extracted diagnostic tarballs.
- Parse node-level system/debug logs.
- Identify log coverage range, repair issues, and timestamp patterns.
- Deep-diagnose repair anomalies (failed sessions, anticompaction skips, etc.).
- Visualize per-node health with severity markers.

RepairRx is designed for urgent, high-priority support cases where customers provide logs or diagnostics and seek rapid RCA and guidance.

---


## ✨ Key Features

- 📂 Local diagnostic tarball path navigation (no upload required).
- 📈 System + Debug log range analysis per node (timestamp + entry count).
- 🧠 Deep repair diagnostics:
  - Categorizes repair entries (Validation, Anticompaction, Failures, etc.)
  - Groups logs by INFO / WARN / ERROR
  - Supports expandable drill-down view per node
- 🎨 Color-coded UI for severity.
- 🧪 Backend powered by FastAPI and log parsers
- 🌐 Frontend built with React + TailwindCSS

---


## 🧰 Tech Stack

| Layer      | Tech Used           |
|------------|---------------------|
| Frontend   | React, Tailwind CSS |
| Backend    | FastAPI             |
| Language   | Python              |
| UI Routing | React Router DOM    |
| Log Parsing | Regex + Python     |

---


## ⚙️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/suraj1287/RepairRx.git
cd RepairRx
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

> Backend runs at: `http://127.0.0.1:8000/analyze-local`

---

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at: `http://localhost:5173/`

---

### 4. Manual Diagnostic Tarball Extraction

Extract the customer-provided tar.gz to a directory like:
```
/Users/suraj/Downloads/ibngprd_cluster-diagnostics-2025_05_09_07_04_17_UTC/
```

This should contain:
```
nodes/<ip>/logs/cassandra/{system.log, debug.log}
opscenterd/repair_service_logs/  (optional)
```

---


## 🧪 Usage Instructions

### 🔎 Log Analyzer Flow:
1. Navigate to **Analyze Logs** from the sidebar.
2. Enter the full path to the extracted diagnostic folder.
3. Hit **Analyze**.

✅ The app will:
- Parse all node logs.
- Show system/debug time coverage.
- Detect repair-related entries with severity classification.
- Provide a drill-down view per node.

---


## 📋 Sample Output

```
📊 Log Summary by Node:
  - 173.37.133.202: From 2025-05-08T22:03 to 2025-05-09T00:05 (16093 entries)
  - 173.37.133.205: From 2025-05-08T10:54 to 2025-05-09T00:05 (13485 entries)
```

🛠️ Repair Diagnostics (Grouped):
```
  - Category: Anticompaction Start
  - Severity: INFO
  - Node: 173.37.133.215
  - Timestamp: 2025-05-08 22:54:08,088
```

---


## 🔮 Future Enhancements

> These are ideas to be implemented in v2.x

- Export repair summary and logs as CSV
- Time-range filtering on frontend
- Compare multiple diagnostic snapshots
- Detect advanced failure patterns like:
  - "Repair session timed out"
  - "Stream failed"
  - "Repair already finished"
- Search by keyspace/table
- Download filtered JSON snapshot

---

## 📸 UI Preview

Here’s what RepairRx looks like in action:

### 🔍 Per-node Log Summary
![Node Summary](assets/node_summary.png)

### 📊 Deep Repair Diagnostics with Filtering
![Repair Diagnostics](assets/repair_diagnostics.png)

### 📁 Diagnostic Tarball Selection & Timeline
![Timeline](assets/timeline_view.png)

## 🤝 Contribution

Feel free to raise PRs, issues, or suggestions via GitHub.

---

## 🧑‍💻 Maintained By

**Suraj Shelke**  
Cloud Support Engineer - Apache Cassandra & DSE  
Mumbai, India

---
