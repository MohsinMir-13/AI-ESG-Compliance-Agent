import React from "react";

const RuleBuilder = () => {
  return (
    <div>
      <h2>Rule Builder</h2>
      <p>Drag and drop rule builder</p>
    </div>
  );
};

const AuditTrailViewer = () => {
  return (
    <div>
      <h2>Audit Trail Viewer</h2>
      <p>Audit trail viewer</p>
    </div>
  );
};

const ComplianceWorkflow = () => {
  return (
    <div>
      <h1>Compliance Workflow</h1>
      <RuleBuilder />
      <AuditTrailViewer />
    </div>
  );
};

export default ComplianceWorkflow;