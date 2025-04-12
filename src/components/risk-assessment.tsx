import React from 'react';

const InteractiveRiskMatrix = () => {
  return (
    <div>
      <h2>Interactive Risk Matrix</h2>
      <p>interactive matrix</p>
    </div>
  );
};

const ScenarioSimulator = () => {
  return (
    <div>
      <h2>Scenario Simulator</h2>
      <p>Scenario simulator</p>
    </div>
  );
};

const RiskAssessment = () => {
  return (
    <div>
      <h1>Risk Assessment Module</h1>
      <InteractiveRiskMatrix />
      <ScenarioSimulator />
    </div>
  );
};

export default RiskAssessment;