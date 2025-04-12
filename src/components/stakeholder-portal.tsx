import React from "react";

const InvestorDashboard = () => {
  return (
    <div>
      <h2>Investor Dashboard</h2>
      <p>investor dashboard</p>
    </div>
  );
};

const SupplierCollaboration = () => {
  return (
    <div>
      <h2>Supplier Collaboration</h2>
      <p>supplier collaboration</p>
    </div>
  );
};

const StakeholderPortal = () => {
  return (
    <div>
      <h1>Stakeholder Portal</h1>
      <InvestorDashboard />
      <SupplierCollaboration />
    </div>
  );
};

export default StakeholderPortal;