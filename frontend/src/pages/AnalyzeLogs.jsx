import React, { useState } from "react";
import axios from "axios";

const severityColors = {
  INFO: "text-blue-600",
  WARN: "text-yellow-600",
  ERROR: "text-red-600",
};

const AnalyzeLogs = () => {
  const [path, setPath] = useState("");
  const [result, setResult] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [severityFilter, setSeverityFilter] = useState("ALL");

  const handleAnalyze = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze-local", {
        path,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing logs:", error);
    }
  };

  const toggleNode = (node) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node]: !prev[node],
    }));
  };

  const filteredRepairs = (repairs) => {
    if (severityFilter === "ALL") return repairs;
    return repairs.filter((r) => r.severity === severityFilter);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Analyze Cassandra Logs</h2>
      <div className="mb-4">
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="Enter path to extracted diagnostic folder"
          className="border border-gray-300 rounded px-3 py-2 w-2/3 mr-2"
        />
        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze
        </button>
      </div>

      {result && (
        <div>
          <div className="mb-4">
            <strong>📂 Base Folder:</strong> {result.base_folder}
          </div>

          <div className="flex items-center mb-2 gap-3">
            <span className="font-semibold">Filter by severity:</span>
            {["ALL", "INFO", "WARN", "ERROR"].map((level) => (
              <button
                key={level}
                onClick={() => setSeverityFilter(level)}
                className={`px-3 py-1 rounded border ${
                  severityFilter === level
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {Object.entries(result.node_summaries).map(([node, data]) => (
            <div key={node} className="border rounded mb-6 shadow">
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <h3 className="font-semibold">
                  🖥️ Node: <span className="text-indigo-600">{node}</span>
                </h3>
                <button
                  onClick={() => toggleNode(node)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {expandedNodes[node] ? "Collapse ▲" : "Expand ▼"}
                </button>
              </div>

              {expandedNodes[node] && (
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    {["system.log", "debug.log"].map((log) => {
                      const logData = data.logs[log];
                      if (!logData) return null;
                      let color =
                        logData.count === 0
                          ? "text-red-600"
                          : logData.count < 5000
                          ? "text-yellow-600"
                          : "text-green-600";

                      return (
                        <div key={log} className="bg-white p-3 border rounded">
                          <h4 className="font-medium">{log}</h4>
                          <p className={color}>
                            From <code>{logData.start}</code> to{" "}
                            <code>{logData.end}</code> —{" "}
                            <strong>{logData.count}</strong> entries
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {data.repairs && filteredRepairs(data.repairs).length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">🛠️ Repair Events</h4>
                      <div className="space-y-1 max-h-72 overflow-y-auto border rounded p-2 bg-gray-50">
                        {filteredRepairs(data.repairs).map((entry, idx) => (
                          <div
                            key={idx}
                            className={`text-sm ${severityColors[entry.severity] || "text-gray-800"}`}
                          >
                            <code>{entry.timestamp}</code> —{" "}
                            <strong>{entry.category}</strong>:{" "}
                            <span>{entry.line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyzeLogs;