import os
import re
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LOG_TIMESTAMP_PATTERN = re.compile(r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3})")
LOG_FORMAT = "%Y-%m-%d %H:%M:%S,%f"

REPAIR_PATTERNS = [
    ("Anticompaction Start", re.compile(r"Starting anticompaction for (\S+)")),
    ("Anticompaction File", re.compile(r"Anticompacting \[BigTableReader\(path='([^']+)'\)\]")),
    ("Anticompaction Skipped", re.compile(r"do not intersect repaired ranges")),
    ("Repair Failure", re.compile(r"Repair task failed")),
    ("Repair Session Failure", re.compile(r"Repair session .* failed with error")),
    ("Validation Complete", re.compile(r"Validation complete")),
    ("Streaming Start", re.compile(r"Syncing files for")),
]

class AnalyzeRequest(BaseModel):
    path: str

@app.post("/analyze-local")
async def analyze_local(request: AnalyzeRequest):
    base_path = request.path
    node_summaries = {}

    nodes_path = os.path.join(base_path, "nodes")
    if not os.path.isdir(nodes_path):
        return {"error": f"{nodes_path} is not a valid directory"}

    for node_ip in os.listdir(nodes_path):
        node_dir = os.path.join(nodes_path, node_ip, "logs", "cassandra")
        if not os.path.isdir(node_dir):
            continue

        log_summary = {}
        repair_entries = []

        for log_file in ["system.log", "debug.log"]:
            file_path = os.path.join(node_dir, log_file)
            if not os.path.isfile(file_path):
                continue

            timestamps = []
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        match = LOG_TIMESTAMP_PATTERN.search(line)
                        if match:
                            try:
                                timestamp = datetime.strptime(match.group(1), LOG_FORMAT)
                                timestamps.append(timestamp)

                                # Only analyze repair-related lines
                                if "repair" in line.lower():
                                    for category, pattern in REPAIR_PATTERNS:
                                        if pattern.search(line):
                                            level = "INFO"
                                            if "ERROR" in line:
                                                level = "ERROR"
                                            elif "WARN" in line:
                                                level = "WARN"

                                            repair_entries.append({
                                                "timestamp": match.group(1),
                                                "file": log_file,
                                                "node": node_ip,
                                                "severity": level,
                                                "category": category,
                                                "line": line.strip()
                                            })
                                            break
                            except ValueError:
                                continue
            except Exception:
                continue

            if timestamps:
                log_summary[log_file] = {
                    "start": min(timestamps).isoformat(),
                    "end": max(timestamps).isoformat(),
                    "count": len(timestamps)
                }

        if log_summary or repair_entries:
            node_summaries[node_ip] = {
                "logs": log_summary,
                "repairs": repair_entries
            }

    return {
        "base_folder": base_path,
        "node_summaries": node_summaries
    }