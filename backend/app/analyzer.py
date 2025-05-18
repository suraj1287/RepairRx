# File: backend/app/analyzer.py

import os
import re
from datetime import datetime
from glob import glob

def extract_timestamps(file_path):
    timestamp_pattern = re.compile(r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3})")
    log_format = "%Y-%m-%d %H:%M:%S,%f"
    timestamps = []

    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                match = timestamp_pattern.search(line)
                if match:
                    try:
                        timestamps.append(datetime.strptime(match.group(1), log_format))
                    except ValueError:
                        continue
    except Exception:
        pass

    return timestamps

def analyze_logs(base_path):
    results = {}
    nodes_path = os.path.join(base_path, "nodes")
    if not os.path.isdir(nodes_path):
        return {"error": f"{nodes_path} is not a valid directory"}

    for node_ip in os.listdir(nodes_path):
        node_logs_path = os.path.join(nodes_path, node_ip, "logs", "cassandra")
        if not os.path.isdir(node_logs_path):
            continue

        log_summary = {}

        for log_file in ["system.log", "debug.log"]:
            file_path = os.path.join(node_logs_path, log_file)
            if not os.path.isfile(file_path):
                continue

            timestamps = extract_timestamps(file_path)
            if timestamps:
                log_summary[log_file] = {
                    "start": min(timestamps).isoformat(),
                    "end": max(timestamps).isoformat(),
                    "count": len(timestamps),
                }

        if log_summary:
            results[node_ip] = log_summary

    return results
