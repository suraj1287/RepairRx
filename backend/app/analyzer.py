import os
from glob import glob
from datetime import datetime

def analyze_opscenter_repair_logs(base_folder):
    repair_log_dir = os.path.join(base_folder, "opscenterd/repair_service_logs")
    results = []

    if not os.path.exists(repair_log_dir):
        return []

    log_files = glob(os.path.join(repair_log_dir, "*.log"))

    for log_file in log_files:
        with open(log_file, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                if "Repair task completed" in line or "Repair task failed" in line:
                    try:
                        timestamp = datetime.strptime(line[:23], "%Y-%m-%d %H:%M:%S,%f")
                    except Exception:
                        continue

                    status = "success" if "completed" in line else "failed"
                    keyspace = "unknown"
                    if "for keyspace" in line:
                        parts = line.split("for keyspace")
                        if len(parts) > 1:
                            keyspace = parts[1].split()[0].strip()

                    results.append({
                        "file": os.path.basename(log_file),
                        "timestamp": timestamp.isoformat(),
                        "status": status,
                        "keyspace": keyspace,
                        "line": line.strip()
                    })
    return results
