"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DataAggregation, AlertCenter, GlobalESGScorecard, RiskHeatmap, ComplianceCalendar } from "@/components/data-aggregation";
import ReportingStudio from "@/components/reporting-studio";
import DocumentAnalyzer from "@/components/document-analyzer";
import RiskAssessment from "@/components/risk-assessment";
import ComplianceWorkflow from "@/components/compliance-workflow";
import StakeholderPortal from "@/components/stakeholder-portal";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const renderComponent = (activeComponent: string) => {
  switch (activeComponent) {
    case "dashboard":
      return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Alert Center</CardTitle>
            <CardDescription>Priority notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertCenter />
          </CardContent>
        </Card>
      );
    case "dataAggregation":
      return <DataAggregation />;
    case "riskAssessment":
      return <RiskAssessment />;
    case "complianceWorkflow":
      return <ComplianceWorkflow />;
    case "documentAnalyzer":
      return <DocumentAnalyzer />;
    case "stakeholderPortal":
      return <StakeholderPortal />;
    case "reportingStudio":
      return <ReportingStudio />;
    default:
      return null;
  }
};

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  return (
    <div className="flex h-screen">
      <Sidebar className="w-64">
        <SidebarHeader>
          <p>MENU</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarMenuItem
                onClick={() => setActiveComponent("dashboard")}
              >
                Dashboard
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={() => setActiveComponent("dataAggregation")}
              >
                Data Aggregation
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={() => setActiveComponent("riskAssessment")}
              >
                Risk Assessment
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={() => setActiveComponent("complianceWorkflow")}
              >
                Compliance Workflow
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={() => setActiveComponent("documentAnalyzer")}
              >
                Document Analyzer
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={() => setActiveComponent("stakeholderPortal")}
              >
                Stakeholder Portal
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={() => setActiveComponent("reportingStudio")}
              >
                Reporting Studio
              </SidebarMenuItem>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <p>Footer</p>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {renderComponent(activeComponent)}
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Global ESG Scorecard</CardTitle>
              <CardDescription>Real-time ESG health score</CardDescription>
            </CardHeader>
            <CardContent>
              <GlobalESGScorecard />
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Risk Heatmap</CardTitle>
              <CardDescription>Geographic visualization of supply chain risks</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskHeatmap />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Compliance Calendar</CardTitle>
              <CardDescription>Deadlines for regulatory filings</CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceCalendar />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
