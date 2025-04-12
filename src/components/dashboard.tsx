"use client";

import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Input} from "@/components/ui/input";

const Dashboard = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = async () => {
    // Handle form submission
    console.log("Company Name:", companyName);
    console.log("Industry:", industry);
    // Call your data aggregation function here
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarTrigger />
          <div>
            <h2 className="font-semibold text-lg">ESGComply AI</h2>
            <p className="text-muted-foreground">Your AI Compliance Assistant</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Data Input</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Input
                  type="text"
                  placeholder="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Button onClick={handleSubmit}>Aggregate Data</Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-muted-foreground text-sm">
            Copyright © {new Date().getFullYear()} ESGComply AI
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Welcome to your ESG compliance dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/*  Add dashboard content here */}
              <p>No data to display yet. Please enter company details.</p>
            </CardContent>
            <CardFooter>
              {/*  Add footer content here */}
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </>
  );
};

export default Dashboard;
