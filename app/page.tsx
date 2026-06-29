'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Cpu, 
  GitBranch, 
  ShieldAlert, 
  Zap, 
  Lock, 
  Layers, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  ChevronRight, 
  Check,
  Sparkles,
  RefreshCw,
  Server,
  ArrowRightLeft,
  Settings,
  Users,
  TerminalSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FEATURES, TESTIMONIALS, FAQS } from "@/lib/data"

// Target Audiences / Ideal Customer Profiles (ICP) for Personalization
const ICPS = [
  {
    id: "sre",
    role: "SRE / DevOps",
    badge: "Auto-Remediation",
    heroTitle: "Self-healing infrastructure agents that",
    heroHighlight: "remediate Sentry errors",
    heroDesc: "Connect your monitoring tools to secure, isolated agent networks. Aura automatically inspects logs, spins up ephemeral sandboxes, writes hotfixes, and submits PRs."
  },
  {
    id: "security",
    role: "Security / SecOps",
    badge: "Zero-Trust Sandboxing",
    heroTitle: "Run third-party automation in secure",
    heroHighlight: "isolated sandboxes",
    heroDesc: "Every agent executes in an ephemeral, read-only container with strict memory limits and network controls. Enforce human-in-the-loop approvals for destructive operations."
  },
  {
    id: "product",
    role: "Product / BizOps",
    badge: "Intelligent Workflows",
    heroTitle: "Orchestrate multi-step AI agents that",
    heroHighlight: "automate complex operations",
    heroDesc: "Empower your teams to build intelligent workflows. Aura agents plan dynamically, execute API calls, handle rate limits, and adapt to system changes out of the box."
  }
]

// Scenarios for the Interactive Agent Builder
const SCENARIOS = [
  {
    id: "sentry",
    trigger: "Sentry Error Triggered",
    triggerIcon: "AlertCircle",
    agent: "SRE Debugger Agent",
    agentIcon: "Cpu",
    action: "Write Patch & Hotfix",
    actionIcon: "CheckCircle2",
    logs: [
      "⚡ [Trigger] Received webhook from Sentry. Error: 'TypeError: Cannot read properties of undefined (reading 'split')' at app/api/user/route.ts:42",
      "🔍 [Agent] Analyzing stack trace, AST structure, and Git history...",
      "📦 [Sandbox] Spawning secure ephemeral micro-container (Node.js runtime)...",
      "🧠 [Agent] Located bug. Split called on unvalidated user payload 'email'. Writing patch...",
      "🧪 [Sandbox] Running unit tests with mock payload inside sandbox...",
      "✅ [Sandbox] Tests passed successfully. Zero side effects detected.",
      "🚀 [Action] Generating GitHub Pull Request #1402: 'Fix: split null pointer exception' and alerting #ops Slack channel.",
      "🎉 [Finished] Workflow completed in 342ms. Self-healing cycle finished."
    ]
  },
  {
    id: "github",
    trigger: "New GitHub PR Created",
    triggerIcon: "GitBranch",
    agent: "Code Reviewer Agent",
    agentIcon: "TerminalSquare",
    action: "Draft Review Comments",
    actionIcon: "Sparkles",
    logs: [
      "⚡ [Trigger] Received webhook from GitHub. PR #892 'feat: optimize database queries' opened by @dev_dan.",
      "🔍 [Agent] Fetching diff payload and inspecting AST index changes...",
      "📦 [Sandbox] Initializing sandbox environment & starting schema parser...",
      "🧠 [Agent] Detected unindexed N+1 query in 'app/models/posts.ts' inside getRecentPosts().",
      "🧪 [Sandbox] Simulating query execution time. Unindexed: 420ms. Optimized suggestion: 12ms.",
      "✅ [Sandbox] Optimization code verified. No regressions.",
      "🚀 [Action] Posting code review comments directly on GitHub PR #892 with suggested index schema.",
      "🎉 [Finished] Review posted in 210ms. Code quality assured."
    ]
  },
  {
    id: "stripe",
    trigger: "Stripe Payment Failed",
    triggerIcon: "ArrowRightLeft",
    agent: "Support & Billing Agent",
    agentIcon: "Users",
    action: "Process Refund & Email",
    actionIcon: "CheckCircle2",
    logs: [
      "⚡ [Trigger] Received webhook from Stripe. charge.failed for customer_id: cus_N92k8a.",
      "🔍 [Agent] Querying billing history and checking user subscription tier...",
      "📦 [Sandbox] Opening secure customer database connection...",
      "🧠 [Agent] Detected duplicate charge due to transient network timeout. User is on Scale Plan.",
      "🧪 [Sandbox] Confirming billing transaction logs...",
      "✅ [Sandbox] Safe to proceed. No fraudulent pattern detected.",
      "🚀 [Action] Processing immediate refund, updating Stripe state, and sending personalized email to user apologizing for the transient error.",
      "🎉 [Finished] Refund processed and user notified in 410ms."
    ]
  }
]

export default function LandingPage() {
  // ICP Personalization State
  const [selectedIcp, setSelectedIcp] = useState(ICPS[0])

  // Interactive Playground State
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0])
  const [isRunning, setIsRunning] = useState(false)
  const [currentLogIndex, setCurrentLogIndex] = useState(-1)
  const [activeLogs, setActiveLogs] = useState<string[]>([])
  const [activeStep, setActiveStep] = useState<"idle" | "trigger" | "agent" | "action">("idle")

  // Run the interactive agent simulation
  const handleRunAgent = () => {
    if (isRunning) return
    setIsRunning(true)
    setCurrentLogIndex(0)
    setActiveLogs([])
    setActiveStep("trigger")
  }

  useEffect(() => {
    if (currentLogIndex === -1 || !isRunning) return

    if (currentLogIndex < selectedScenario.logs.length) {
      // Determine active visual step based on log index
      if (currentLogIndex >= 1 && currentLogIndex < 6) {
        setActiveStep("agent")
      } else if (currentLogIndex >= 6) {
        setActiveStep("action")
      }

      const timer = setTimeout(() => {
        setActiveLogs(prev => [...prev, selectedScenario.logs[currentLogIndex]])
        setCurrentLogIndex(prev => prev + 1)
      }, 750)
      return () => clearTimeout(timer)
    } else {
      setIsRunning(false)
      setActiveStep("idle")
    }
  }, [currentLogIndex, isRunning, selectedScenario])

  // Change scenario
  const handleScenarioChange = (id: string) => {
    if (isRunning) return
    const scenario = SCENARIOS.find(s => s.id === id) || SCENARIOS[0]
    setSelectedScenario(scenario)
    setActiveLogs([])
    setCurrentLogIndex(-1)
    setActiveStep("idle")
  }

  // Map icon names to Lucide icons
  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu className="h-5 w-5 text-primary" />
      case "GitBranch": return <GitBranch className="h-5 w-5 text-primary" />
      case "ShieldAlert": return <ShieldAlert className="h-5 w-5 text-primary" />
      case "Zap": return <Zap className="h-5 w-5 text-primary" />
      case "Lock": return <Lock className="h-5 w-5 text-primary" />
      case "Layers": return <Layers className="h-5 w-5 text-primary" />
      case "AlertCircle": return <AlertCircle className="h-5 w-5 text-destructive" />
      case "CheckCircle2": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      case "TerminalSquare": return <TerminalSquare className="h-5 w-5 text-primary" />
      case "Sparkles": return <Sparkles className="h-5 w-5 text-primary" />
      case "ArrowRightLeft": return <ArrowRightLeft className="h-5 w-5 text-amber-500" />
      case "Users": return <Users className="h-5 w-5 text-primary" />
      default: return <Cpu className="h-5 w-5 text-primary" />
    }
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col gap-24 pb-24">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f15_1px,transparent_1px),linear-gradient(to_bottom,#0f0f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center gap-8 pt-20 md:pt-28 text-center max-w-5xl px-4 relative">
        {/* ICP Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-muted/40 border border-muted/80 backdrop-blur-sm max-w-md mx-auto mb-4">
          {ICPS.map((icp) => (
            <button
              key={icp.id}
              onClick={() => setSelectedIcp(icp)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedIcp.id === icp.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {icp.role}
            </button>
          ))}
        </div>

        {/* Dynamic Personalized Hero Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIcp.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="outline" className="px-3 py-1 text-xs gap-1.5 font-medium border-primary/20 bg-primary/5 text-primary">
              <Sparkles className="h-3 w-3 text-primary animate-pulse" /> {selectedIcp.badge} Mode Active
            </Badge>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Personalized Heading */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={selectedIcp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground text-balance max-w-4xl"
          >
            {selectedIcp.heroTitle}{" "}
            <span className="relative bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
              {selectedIcp.heroHighlight}
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* Dynamic Personalized Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selectedIcp.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="max-w-3xl text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed text-pretty"
          >
            {selectedIcp.heroDesc}
          </motion.p>
        </AnimatePresence>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 justify-center">
          <Link href="/pricing" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold shadow-lg shadow-primary/20">
              Deploy Free Agent <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold bg-background/50 backdrop-blur-sm" onClick={handleRunAgent}>
            <Play className="h-4 w-4 fill-current" /> Try Playground
          </Button>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl mt-16 pt-8 border-t border-muted/60">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">12M+</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Agent Actions Run</span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">99.99%</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Sandbox Isolation</span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-1 col-span-2 md:col-span-1">
            <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">&lt;400ms</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Average Latency</span>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Playground */}
      <section className="container mx-auto px-4 max-w-5xl relative">
        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">Interactive Sandbox Demo</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Watch an Agent Resolve Production Failures
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Select a scenario to configure a trigger, pair it with an autonomous agent, and watch it execute inside an isolated zero-trust sandbox.
          </p>
        </div>

        {/* Visual Node Diagram (The 2026 Interactive Experience) */}
        <div className="mb-8 p-6 rounded-xl border border-muted/80 bg-card/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative">
            
            {/* Visual Node 1: Trigger */}
            <div className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border w-full md:w-64 transition-all duration-300 ${
              activeStep === "trigger" 
                ? "border-destructive bg-destructive/5 ring-1 ring-destructive/30 shadow-lg shadow-destructive/5" 
                : "border-muted bg-card/50"
            }`}>
              {activeStep === "trigger" && (
                <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-destructive text-[9px] font-bold tracking-wider text-white animate-pulse">
                  TRIGGER ACTIVE
                </span>
              )}
              <div className={`p-3 rounded-lg ${activeStep === "trigger" ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground"}`}>
                {getIcon(selectedScenario.triggerIcon)}
              </div>
              <div className="text-center">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trigger Input</h4>
                <p className="text-sm font-bold text-foreground mt-0.5">{selectedScenario.trigger.split(" ")[0]} Event</p>
              </div>
            </div>

            {/* Glowing Connection Arrow 1 */}
            <div className="hidden md:flex flex-col items-center justify-center flex-1 relative h-10">
              <div className="w-full h-[2px] bg-muted relative">
                {activeStep === "trigger" && (
                  <motion.div 
                    className="absolute top-[-2px] left-0 h-1.5 w-1.5 rounded-full bg-destructive"
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  />
                )}
                {activeStep === "agent" && (
                  <motion.div 
                    className="absolute top-[-2px] left-0 h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  />
                )}
              </div>
              <span className="text-[10px] text-muted-foreground font-mono mt-1">secure webhook</span>
            </div>

            {/* Visual Node 2: Sandbox Agent */}
            <div className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border w-full md:w-64 transition-all duration-300 ${
              activeStep === "agent" 
                ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-lg shadow-primary/5 scale-105" 
                : "border-muted bg-card/50"
            }`}>
              {activeStep === "agent" && (
                <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-primary text-[9px] font-bold tracking-wider text-primary-foreground animate-pulse">
                  COMPILING PATCH
                </span>
              )}
              <div className={`p-3 rounded-lg ${activeStep === "agent" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                <Server className={`h-5 w-5 ${activeStep === "agent" ? "animate-spin" : ""}`} />
              </div>
              <div className="text-center">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Secure Sandbox</h4>
                <p className="text-sm font-bold text-foreground mt-0.5">{selectedScenario.agent}</p>
              </div>
            </div>

            {/* Glowing Connection Arrow 2 */}
            <div className="hidden md:flex flex-col items-center justify-center flex-1 relative h-10">
              <div className="w-full h-[2px] bg-muted relative">
                {activeStep === "agent" && (
                  <motion.div 
                    className="absolute top-[-2px] left-0 h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  />
                )}
                {activeStep === "action" && (
                  <motion.div 
                    className="absolute top-[-2px] left-0 h-1.5 w-1.5 rounded-full bg-emerald-500"
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  />
                )}
              </div>
              <span className="text-[10px] text-muted-foreground font-mono mt-1">AST validation</span>
            </div>

            {/* Visual Node 3: Target Action */}
            <div className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border w-full md:w-64 transition-all duration-300 ${
              activeStep === "action" 
                ? "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/5" 
                : "border-muted bg-card/50"
            }`}>
              {activeStep === "action" && (
                <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-emerald-500 text-[9px] font-bold tracking-wider text-white animate-pulse">
                  DEPLOYING FIX
                </span>
              )}
              <div className={`p-3 rounded-lg ${activeStep === "action" ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                {getIcon(selectedScenario.actionIcon)}
              </div>
              <div className="text-center">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Autonomous Action</h4>
                <p className="text-sm font-bold text-foreground mt-0.5">{selectedScenario.action}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Playground Controls & Console Output Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Configuration Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Card className="flex-1 flex flex-col justify-between border-muted/80 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" /> Configurator
                </CardTitle>
                <CardDescription>Select a production failure to run its self-healing workflow</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 flex-1">
                {/* Scenario Selectors */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Scenario</label>
                  <div className="flex flex-col gap-2">
                    {SCENARIOS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleScenarioChange(s.id)}
                        disabled={isRunning}
                        className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all ${
                          selectedScenario.id === s.id
                            ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                            : "border-border bg-card hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="font-semibold text-sm">{s.trigger.split(" ")[0]} Recovery</span>
                        <ChevronRight className={`h-4 w-4 transition-transform ${selectedScenario.id === s.id ? "translate-x-1 text-primary" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trigger & Agent Details */}
                <div className="space-y-4 pt-4 border-t border-muted/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-destructive/10 text-destructive mt-0.5">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trigger Webhook</h4>
                      <p className="text-sm font-medium text-foreground">{selectedScenario.trigger}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assigned Agent</h4>
                      <p className="text-sm font-medium text-foreground">{selectedScenario.agent}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Autonomous Action</h4>
                      <p className="text-sm font-medium text-foreground">{selectedScenario.action}</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/10 p-4 border-t border-muted/50">
                <Button 
                  onClick={handleRunAgent} 
                  disabled={isRunning} 
                  className="w-full gap-2 font-semibold"
                  size="lg"
                >
                  <RefreshCw className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} /> 
                  {isRunning ? "Agent Resolving..." : "Run Sandbox Agent"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Console Output */}
          <div className="lg:col-span-7 flex">
            <Card className="flex-1 bg-[#09090b] text-slate-300 font-mono text-xs overflow-hidden flex flex-col border-slate-800 shadow-2xl">
              <CardHeader className="bg-[#0c0c0e] p-4 border-b border-slate-900 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-slate-200">Aura Ephemeral Sandbox Console</span>
                </div>
                <Badge variant="outline" className="border-slate-800 text-slate-400 bg-slate-900/50 font-mono text-[10px]">
                  {isRunning ? "EXEC_RUNNING" : "EXEC_IDLE"}
                </Badge>
              </CardHeader>

              <CardContent className="p-4 flex-1 overflow-y-auto space-y-3 min-h-[340px] max-h-[440px]">
                {activeLogs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-24 gap-2">
                    <Terminal className="h-8 w-8 text-slate-700" />
                    <p className="font-semibold">Execution Pipeline Ready</p>
                    <p className="text-[11px] text-slate-600 max-w-xs">Click &quot;Run Sandbox Agent&quot; to inspect real-time self-healing logs</p>
                  </div>
                )}
                
                {activeLogs.map((log, index) => {
                  let colorClass = "text-slate-300"
                  if (log.startsWith("⚡")) colorClass = "text-amber-400 font-semibold"
                  else if (log.startsWith("🔍")) colorClass = "text-indigo-400"
                  else if (log.startsWith("✅")) colorClass = "text-emerald-400"
                  else if (log.startsWith("🚀")) colorClass = "text-primary font-semibold"
                  else if (log.startsWith("🎉")) colorClass = "text-emerald-400 font-bold"
                  
                  return (
                    <div key={index} className={`leading-relaxed border-l-2 pl-3 py-0.5 animate-in fade-in duration-300 ${
                      log.startsWith("🎉") ? "border-emerald-500" : log.startsWith("🚀") ? "border-primary" : "border-slate-800"
                    }`}>
                      <span className={colorClass}>{log}</span>
                    </div>
                  )
                })}

                {isRunning && currentLogIndex < selectedScenario.logs.length && (
                  <div className="flex items-center gap-2 text-primary animate-pulse mt-2 pl-3">
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    <span className="text-[11px]">Compiling next instruction...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="container mx-auto px-4 max-w-5xl relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />
        
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">Core Platform</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Engineered for Security, Built for Scale
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Traditional pipelines break when conditions change. Aura AI agents plan dynamically, adapting to code changes and network environments safely.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feat) => (
            <Card key={feat.id} className="bg-card/40 border-muted/80 backdrop-blur-sm hover:bg-card/80 hover:border-primary/20 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-max mb-3">
                  {getIcon(feat.iconName)}
                </div>
                <CardTitle className="text-lg font-bold tracking-tight">{feat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">Social Proof</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Trusted by Engineering Leaders
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            See how scaling teams are automating core operations, saving hundreds of engineering hours, and keeping production secure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <Card key={index} className="flex flex-col justify-between bg-card/20 border-muted/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                  &ldquo;{t.content}&quot;
                </p>
              </CardContent>
              <CardFooter className="border-t border-muted/50 pt-4 bg-muted/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-muted/80">
                    <AvatarImage src={t.avatarUrl} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-foreground leading-none">{t.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t.role}, <span className="text-primary font-semibold">{t.company}</span></p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">FAQ</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Everything you need to know about our autonomous sandbox agents and integration protocols.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-muted">
              <AccordionTrigger className="text-left hover:text-primary transition-colors py-4 text-base font-bold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 max-w-5xl">
        <Card className="border-primary/20 bg-primary/5 text-center p-8 md:p-12 relative overflow-hidden flex flex-col items-center gap-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_70%)] pointer-events-none" />
          
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">Get Started Today</Badge>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground max-w-2xl">
            Ready to Automate Your Engineering Pipelines?
          </h2>
          
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
            Create an account on our Developer Tier in less than 2 minutes. Deploy up to 3 agents completely free. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold">
                Deploy Free Agent <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold bg-background/50">
                Talk to Solutions
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
