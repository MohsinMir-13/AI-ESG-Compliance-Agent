import React from "react";

const SmartHighlighting = () => {
  return (
    <div>
      <h2>Smart Highlighting</h2>
      <p>smart highlighting</p>
    </div>
  );
};

const RegulatoryChangeTracker = () => {
  return (
    <div>
      <h2>Regulatory Change Tracker</h2>
      <p>Regulatory Change Tracker</p>
    </div>
  );
};

const DocumentAnalyzer = () => {
  return (
    <div>
      <h1>Document Analyzer</h1>
      <SmartHighlighting />
      <RegulatoryChangeTracker />
    </div>
  );
};

export default DocumentAnalyzer;