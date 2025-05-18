from analyzer import analyze_opscenter_repair_logs

if __name__ == "__main__":
    base_path = "/Users/suraj/Downloads/ibngprd_cluster-diagnostics-2025_05_09_07_04_17_UTC"
    results = analyze_opscenter_repair_logs(base_path)

    print(f"🛠️ Total repair events found: {len(results)}")
    for r in results[:10]:  # print first 10 entries
        print(f"📄 {r['file']} | 🕒 {r['timestamp']} | 🔧 {r['status']} | 🧬 {r['keyspace']}")
        print(f"    {r['line']}")