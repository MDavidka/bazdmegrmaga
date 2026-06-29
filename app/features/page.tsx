'use client'

import { useState } from "react"
import Link from "next/link"
import { 
  Cpu, 
  GitBranch, 
  ShieldAlert, 
  Zap, 
  Lock, 
  Layers, 
  ArrowRight, 
  Terminal, 
  CheckCircle2, 
  Network, 
  ShieldCheck, 
  Activity 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FEATURES } from "@/lib/data"

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredFeatures = activeTab === "all" 
    ? FEATURES 
    : FEATURES.filter(f => f.category === activeTab)

  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu className="h-5 w-5 text-primary" />
      case "GitBranch": return <GitBranch className="h-5 w-5 text-primary" />
      case "ShieldAlert": return <ShieldAlert className="h-5 w-5 text-primary" />
      case "Zap": return <Zap className="h-5 w-5 text-primary" />
      case "Lock": return <Lock className="h-5 w-5 text-primary" />
      case "Layers": return <Layers className="h-5 w-5 text-primary" />
      default: return <Cpu className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl flex flex-col gap-20">
      {/* Header */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-primary/30 text-primary">Capabilities</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Advanced Agentic Architecture
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Explore the engine behind Aura AI. Our platform combines low-latency LLM reasoning with strict, sandboxed container isolation to deliver reliable technical automation.
        </p>
      </section>

      {/* Feature Exploration Tabs */}
      <section className="flex flex-col gap-8">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="bg-muted/50 border">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="orchestration">Orchestration</TabsTrigger>
              <TabsTrigger value="scalability">Scalability</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredFeatures.map((feat) => (
                <Card key={feat.id} className="bg-card/40 hover:bg-card/80 transition-all duration-200 border-muted/60">
                  <CardHeader className="pb-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-max mb-3">
                      {getIcon(feat.iconName)}
                    </div>
                    <CardTitle className="text-lg font-semibold">{feat.title}</CardTitle>
                    <Badge variant="secondary" className="w-max capitalize mt-1.5 text-[10px] py-0 px-2">
                      {feat.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* How It Works (Visual Flow) */}
      <section className="grid gap-12 lg:grid-cols-12 items-center pt-8 border-t border-muted/50">
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <Badge variant="outline" className="border-primary/30 text-primary w-max">Execution Pipeline</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            The Self-Healing Compiler Cycle
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            When an agent detects an anomaly or error, it doesn't fail. It enters an automated compilation cycle to resolve the problem in isolation.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Ingest & Parse</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Logs are ingested, parsed into structural ASTs, and categorized by urgency.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Sandbox Simulation</h4>
                <p className="text-xs text-muted-foreground mt-0.5">The agent spins up a replica micro-container to test patch variations without risk.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Verify & Deploy</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Once tests pass, the patch is deployed via CI/CD, and Slack/GitHub are updated.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Console / Architectural Diagram Visual */}
        <div className="lg:col-span-7">
          <Card className="bg-muted/10 border-muted/60 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">Active Agent Mesh Topology</span>
              </div>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5 text-[10px]">
                SECURE MESH ACTIVE
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-background/50 border-muted p-4 text-center flex flex-col items-center gap-2">
                <Activity className="h-5 w-5 text-amber-500" />
                <h4 className="text-xs font-semibold">1. Telemetry Agent</h4>
                <p className="text-[10px] text-muted-foreground">Scans logs, errors, and performance traces.</p>
              </Card>

              <Card className="bg-background/50 border-primary/30 p-4 text-center flex flex-col items-center gap-2 ring-1 ring-primary/20">
                <Cpu className="h-5 w-5 text-primary animate-pulse" />
                <h4 className="text-xs font-semibold">2. Orchestrator</h4>
                <p className="text-[10px] text-muted-foreground">Coordinates sub-agents and container sandboxes.</p>
              </Card>

              <Card className="bg-background/50 border-muted p-4 text-center flex flex-col items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h4 className="text-xs font-semibold">3. Validator</h4>
                <p className="text-[10px] text-muted-foreground">Checks AST security policies and executes tests.</p>
              </Card>
            </div>

            <div className="rounded-lg bg-black p-4 font-mono text-[11px] text-slate-400 border border-slate-800">
              <span className="text-primary font-bold">aura-mesh --verify</span>
              <div className="mt-2 space-y-1">
                <p className="text-emerald-500">✔ Verified AST policies for 14 active agents</p>
                <p className="text-emerald-500">✔ Telemetry pipelines connected (Sentry, Datadog)</p>
                <p className="text-emerald-500">✔ Sandbox network isolation rules: ENABLED</p>
                <p className="text-slate-500 mt-2">// Ready for next execution trigger</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-muted/20 rounded-xl p-8 md:p-12 border flex flex-col items-center gap-6 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Ready to experience autonomous orchestration?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          Get started on our free tier today. Set up an agent in minutes and integrate it with your existing tools.
        </p>
        <div className="flex gap-4">
          <Link href="/pricing">
            <Button className="gap-2">
              View Pricing <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Schedule Demo</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
