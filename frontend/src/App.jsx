import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AnalyzeLogs from './pages/AnalyzeLogs';

function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to RepairRx</h2>
      <p>This is your Cassandra Repair Analysis Toolkit. Use the sidebar to navigate and analyze diagnostics.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-white overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<AnalyzeLogs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;