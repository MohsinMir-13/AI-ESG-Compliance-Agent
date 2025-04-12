import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

interface Alert {
  title: string;
  description: string;
  severity: "critical" | "warning";
}

const AlertCenter = () => {
  const alerts: Alert[] = [
    {
      title: "Carbon Emissions Exceeded",
      description: "Carbon emissions exceeded target by 12%.",
      severity: "critical",
    },
    {
      title: "Water Usage High",
      description: "Water usage is higher than the established thresholds",
      severity: "warning",
    },
    {
      title: "Supply Chain Risk Detected",
      description: "High deforestation risk detected in a supplier region.",
      severity: "critical",
    },
    {
      title: "Diversity score low",
      description: "The diversity score is low.",
      severity: "warning",
    },
  ];

  return (
    <div>
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-md"
          style={{
            backgroundColor:
              alert.severity === "critical" ? "#ffebee" : "#fffde7",
          }}
        >
          <div className="flex items-center space-x-2">
            <span
              className={`rounded-full w-3 h-3 ${
                alert.severity === "critical" ? "bg-red-500" : "bg-yellow-500"
              }`}
            ></span>
            <h3 className="font-semibold">{alert.title}</h3>
          </div>
          <p className="text-sm">{alert.description}</p>
        </div>
      ))}
    </div>
  );
};

const GlobalESGScorecard = () => {
  const [score, setScore] = useState<number>(50);

  const updateScore = () => {
    const randomScore = Math.floor(Math.random() * 101);
    setScore(randomScore);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Global ESG Scorecard</h2>
      <p className="text-sm text-muted-foreground">
        Real-time ESG health score
      </p>
      <div className="text-4xl font-bold mt-2">{score}</div>
      <Button onClick={updateScore} className="mt-2">
        Update Score
      </Button>
    </div>
  );
};

const RiskHeatmap = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Risk Heatmap</h2>
      <p className="text-sm text-muted-foreground">
        Geographic visualization of supply chain risks
      </p>
      <p>Interactive map</p>
    </div>
  );
};

const ComplianceCalendar = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Compliance Calendar</h2>
      <p className="text-sm text-muted-foreground">
        Deadlines for regulatory filings
      </p>
      <p>list of deadlines</p>
    </div>
  );
};

const DataOnboardingWizard = () => {
  return (
    <div>
      <h2>Data Onboarding Wizard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Connect to ERP API</CardTitle>
          <CardDescription>Connect to your ERP system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="text" placeholder="ERP API Endpoint" />
        </CardContent>
        <CardFooter>
          <Button>Connect</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Connect to HRMS API</CardTitle>
          <CardDescription>Connect to your HRMS system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="text" placeholder="HRMS API Endpoint" />
        </CardContent>
        <CardFooter>
          <Button>Connect</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Step 3: Upload CSVs</CardTitle>
          <CardDescription>Upload CSV files for other data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="file" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Step 4: Connect to public Disclosures</CardTitle>
          <CardDescription>Connect to public disclosures</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="text" placeholder="Public Disclosures URL" />
        </CardContent>
        <CardFooter>
          <Button>Connect</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const DataQualityCheck = () => {
  return (
    <div>
      <h2>Data Quality Check</h2>
      <p>Checking data quality... Please wait.</p>
    </div>
  );
};

const DataAggregation = () => {
  return (
    <div>
      <h2>Data Aggregation</h2>
      <DataOnboardingWizard />
      <DataQualityCheck />
    </div>
  );
};

const RiskAssessment = () => {
  return (
    <div>
      <h2>Risk Assessment</h2>
    </div>
  );
};

const ComplianceWorkflow = () => {
  return (
    <div>
      <h2>Compliance Workflow</h2>
    </div>
  );
};

const DocumentAnalyzer = () => {
  return (
    <div>
      <h2>Document Analyzer</h2>
    </div>
  );
};

const StakeholderPortal = () => {
  return (
    <div>
      <h2>Stakeholder Portal</h2>
    </div>
  );
};

const ReportingStudio = () => {
  return (
    <div>
      <h2>Reporting Studio</h2>
    </div>
  );
};

export {
  DataAggregation,
  RiskAssessment,
  ComplianceWorkflow,
  DocumentAnalyzer,
  StakeholderPortal,
  ReportingStudio,
  GlobalESGScorecard,
  RiskHeatmap,
  ComplianceCalendar,
  AlertCenter,
};