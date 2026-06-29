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
      case "Cpu": return <Cpu className="h-4.5 w-4.5 text-primary" />
      case "GitBranch": return <GitBranch className="h-4.5 w-4.5 text-primary" />
      case "ShieldAlert": return <ShieldAlert className="h-4.5 w-4.5 text-primary" />
      case "Zap": return <Zap className="h-4.5 w-4.5 text-primary" />
      case "Lock": return <Lock className="h-4.5 w-4.5 text-primary" />
      case "Layers": return <Layers className="h-4.5 w-4.5 text-primary" />
      default: return <Cpu className="h-4.5 w-4.5 text-primary" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl flex flex-col gap-20 font-sans relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <section className="text-center flex flex-col items-center gap-3.5 max-w-3xl mx-auto relative z-10">
        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs px-2.5 py-0.5">
          Capabilities
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
          Advanced Agentic Architecture
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Explore the engine behind Aura AI. Our platform combines low-latency LLM reasoning with strict, sandboxed container isolation to deliver reliable technical automation.
        </p>
      </section>

      {/* Feature Exploration Tabs */}
      <section className="flex flex-col gap-6 relative z-10">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="bg-secondary/40 border border-border/40 p-1 rounded-full h-11">
              <TabsTrigger value="all" className="rounded-full text-xs font-semibold px-4">All Features</TabsTrigger>
              <TabsTrigger value="orchestration" className="rounded-full text-xs font-semibold px-4">Orchestration</TabsTrigger>
              <TabsTrigger value="scalability" className="rounded-full text-xs font-semibold px-4">Scalability</TabsTrigger>
              <TabsTrigger value="security" className="rounded-full text-xs font-semibold px-4">Security</TabsTrigger>
              <TabsTrigger value="integrations" className="rounded-full text-xs font-semibold px-4">Integrations</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredFeatures.map((feat) => (
                <Card key={feat.id} className="bg-card/40 hover:bg-card/80 transition-all duration-300 border-border/40 hover:border-primary/20 shadow-sm flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary w-max mb-3 border border-primary/10">
                      {getIcon(feat.iconName)}
                    </div>
                    <CardTitle className="text-base font-bold tracking-tight">{feat.title}</CardTitle>
                    <Badge variant="secondary" className="w-max capitalize mt-2 text-[9px] py-0.5 px-2 font-semibold">
                      {feat.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* How It Works (Visual Flow) */}
      <section className="grid gap-12 lg:grid-cols-12 items-center pt-10 border-t border-border/40 relative z-10">
        <div className="lg:col-span-5 flex flex-col gap-5 text-left">
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs px-2.5 py-0.5 w-max">
            Execution Pipeline
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            The Self-Healing Compiler Cycle
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            When an agent detects an anomaly or error, it doesn't fail. It enters an automated compilation cycle to resolve the problem in isolation.
          </p>

          <div className="space-y-4 mt-2">
            <div className="flex gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Ingest & Parse</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Logs are ingested, parsed into structural ASTs, and categorized by urgency.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Sandbox Simulation</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">The agent spins up a replica micro-container to test patch variations without risk.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Verify & Deploy</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Once tests pass, the patch is deployed via CI/CD, and Slack/GitHub are updated.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Console / Architectural Diagram Visual */}
        <div className="lg:col-span-7">
          <Card className="bg-secondary/10 border-border/40 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <div className="flex items-center gap-2">
                <Network className="h-4.5 w-4.5 text-primary" />
                <span className="text-xs font-bold text-foreground">Active Agent Mesh Topology</span>
              </div>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5 text-[9px] font-bold px-1.5 py-0">
                SECURE MESH ACTIVE
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="bg-background/40 border-border/40 p-3.5 text-center flex flex-col items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-amber-500" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">1. Telemetry Agent</h4>
                <p className="text-[9px] text-muted-foreground leading-normal">Scans logs, errors, and performance traces.</p>
              </Card>

              <Card className="bg-background/40 border-primary/20 p-3.5 text-center flex flex-col items-center gap-2 ring-1 ring-primary/10">
                <Cpu className="h-4.5 w-4.5 text-primary animate-pulse" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">2. Orchestrator</h4>
                <p className="text-[9px] text-muted-foreground leading-normal">Coordinates sub-agents and container sandboxes.</p>
              </Card>

              <Card className="bg-background/40 border-border/40 p-3.5 text-center flex flex-col items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">3. Validator</h4>
                <p className="text-[9px] text-muted-foreground leading-normal">Checks AST security policies and executes tests.</p>
              </Card>
            </div>

            <div className="rounded-lg bg-black p-3.5 font-mono text-[10px] text-slate-400 border border-slate-800">
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
      <section className="text-center bg-secondary/10 rounded-2xl p-8 md:p-12 border border-border/40 flex flex-col items-center gap-5 max-w-4xl mx-auto w-full relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-tight">
          Ready to experience autonomous orchestration?
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-lg leading-relaxed">
          Get started on our free tier today. Set up an agent in minutes and integrate it with your existing tools.
        </p>
        <div className="flex gap-3 mt-1">
          <Link href="/pricing">
            <Button className="gap-1.5 text-xs font-bold h-9">
              <span>View Pricing</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="text-xs font-bold h-9 border-border/60">Schedule Demo</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
