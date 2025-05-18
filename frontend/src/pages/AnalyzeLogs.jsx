// frontend/src/pages/AnalyzeLogs.jsx
import React, { useState } from "react";
import axios from "axios";

const AnalyzeLogs = () => {
  const [path, setPath] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/analyze-local", {
        path: path.trim(),
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to analyze logs. Check backend or path.");
    }
  };

  const getHealthColor = (count) => {
    if (count === 0) return "text-red-600";
    if (count < 5000) return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">🛠️ Analyze Extracted Diagnostic Logs</h2>
      <input
        className="border p-2 w-full rounded mb-4"
        type="text"
        placeholder="Enter full path to extracted /nodes directory"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <button onClick={handleAnalyze} className="bg-blue-600 text-white px-4 py-2 rounded">
        Analyze
      </button>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {data && data.base_folder && (
        <>
          <div className="mt-6 text-gray-500 text-sm">
            📁 Base folder: <code>{data.base_folder}</code>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.node_summaries || {}).map(([nodeIp, logs]) => {
              const systemLog = logs["system.log"] || {};
              const debugLog = logs["debug.log"] || {};
              const total = (systemLog.count || 0) + (debugLog.count || 0);
              const color = getHealthColor(total);

              return (
                <div key={nodeIp} className={`p-4 border rounded shadow ${color}`}>
                  <div className="font-semibold">🖥️ Node: {nodeIp}</div>
                  <div>📊 Total Entries: {total}</div>
                  <div className="text-sm mt-2">
                    <div>🧾 system.log:</div>
                    <div className="ml-2 text-xs">
                      ⏱️ From: {systemLog.start || "-"}<br />
                      ⏱️ To: {systemLog.end || "-"}<br />
                      📄 Count: {systemLog.count || 0}
                    </div>
                    <div className="mt-1">🧾 debug.log:</div>
                    <div className="ml-2 text-xs">
                      ⏱️ From: {debugLog.start || "-"}<br />
                      ⏱️ To: {debugLog.end || "-"}<br />
                      📄 Count: {debugLog.count || 0}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyzeLogs;
