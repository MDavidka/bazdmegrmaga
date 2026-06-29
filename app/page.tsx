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
  Sparkles,
  RefreshCw,
  Server,
  ArrowRightLeft,
  Settings,
  Users,
  TerminalSquare,
  ShieldCheck,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FEATURES, TESTIMONIALS, FAQS } from "@/lib/data"

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
  const [selectedIcp, setSelectedIcp] = useState(ICPS[0])
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0])
  const [isRunning, setIsRunning] = useState(false)
  const [currentLogIndex, setCurrentLogIndex] = useState(-1)
  const [activeLogs, setActiveLogs] = useState<string[]>([])
  const [activeStep, setActiveStep] = useState<"idle" | "trigger" | "agent" | "action">("idle")

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

  const handleScenarioChange = (id: string) => {
    if (isRunning) return
    const scenario = SCENARIOS.find(s => s.id === id) || SCENARIOS[0]
    setSelectedScenario(scenario)
    setActiveLogs([])
    setCurrentLogIndex(-1)
    setActiveStep("idle")
  }

  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu className="h-5 w-5" />
      case "GitBranch": return <GitBranch className="h-5 w-5" />
      case "ShieldAlert": return <ShieldAlert className="h-5 w-5" />
      case "Zap": return <Zap className="h-5 w-5" />
      case "Lock": return <Lock className="h-5 w-5" />
      case "Layers": return <Layers className="h-5 w-5" />
      case "AlertCircle": return <AlertCircle className="h-5 w-5" />
      case "CheckCircle2": return <CheckCircle2 className="h-5 w-5" />
      case "TerminalSquare": return <TerminalSquare className="h-5 w-5" />
      case "Sparkles": return <Sparkles className="h-5 w-5" />
      case "ArrowRightLeft": return <ArrowRightLeft className="h-5 w-5" />
      case "Users": return <Users className="h-5 w-5" />
      default: return <Cpu className="h-5 w-5" />
    }
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col gap-24 pb-24 font-sans">
      {/* Premium Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14151a_1px,transparent_1px),linear-gradient(to_bottom,#14151a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center gap-8 pt-16 md:pt-24 text-center max-w-5xl px-4 relative">
        {/* Tactile Pill Role Selectors */}
        <div className="flex items-center justify-center p-1 rounded-full bg-secondary/40 border border-border/40 backdrop-blur-md max-w-md mx-auto mb-2">
          {ICPS.map((icp) => (
            <button
              key={icp.id}
              onClick={() => setSelectedIcp(icp)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedIcp.id === icp.id
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
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
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" /> {selectedIcp.badge} Mode Active
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
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground max-w-4xl text-balance leading-[1.1]"
          >
            {selectedIcp.heroTitle}{" "}
            <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
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
            className="max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed text-pretty"
          >
            {selectedIcp.heroDesc}
          </motion.p>
        </AnimatePresence>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mt-4 justify-center">
          <Link href="/pricing" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-sm font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all">
              <span>Deploy Free Agent</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto gap-2 text-sm font-bold bg-background/40 backdrop-blur-sm border-border/60 hover:bg-muted"
            onClick={handleRunAgent}
          >
            <Play className="h-3.5 w-3.5 fill-current" /> 
            <span>Try Playground</span>
          </Button>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">12M+</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Agent Actions Run</span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">99.99%</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Sandbox Isolation</span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-1 col-span-2 md:col-span-1">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">&lt;400ms</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Average Latency</span>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Playground */}
      <section className="container mx-auto px-4 max-w-5xl relative">
        <div className="text-center flex flex-col items-center gap-3 mb-10">
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs px-2.5 py-0.5">
            Interactive Simulation
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Watch an Agent Resolve Production Failures
          </h2>
          <p className="max-w-2xl text-muted-foreground text-xs sm:text-sm">
            Select a scenario to configure a trigger, pair it with an autonomous agent, and watch it execute inside an isolated zero-trust sandbox.
          </p>
        </div>

        {/* Visual Node Diagram */}
        <div className="mb-8 p-6 rounded-2xl border border-border/40 bg-secondary/10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative z-10">
            
            {/* Visual Node 1: Trigger */}
            <div className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border w-full md:w-64 transition-all duration-300 ${
              activeStep === "trigger" 
                ? "border-destructive/40 bg-destructive/5 ring-1 ring-destructive/20 shadow-md shadow-destructive/5" 
                : "border-border/50 bg-card/60"
            }`}>
              {activeStep === "trigger" && (
                <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-destructive text-[8px] font-bold tracking-wider text-white animate-pulse">
                  TRIGGER ACTIVE
                </span>
              )}
              <div className={`p-2.5 rounded-lg border transition-all ${
                activeStep === "trigger" 
                  ? "bg-destructive/10 text-destructive border-destructive/20" 
                  : "bg-muted/50 text-muted-foreground border-border/50"
              }`}>
                {getIcon(selectedScenario.triggerIcon)}
              </div>
              <div className="text-center">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trigger Event</h4>
                <p className="text-xs font-bold text-foreground mt-0.5">{selectedScenario.trigger.split(" ")[0]} Hook</p>
              </div>
            </div>

            {/* Glowing Connection Arrow 1 */}
            <div className="hidden md:flex flex-col items-center justify-center flex-1 relative h-10">
              <div className="w-full h-[1px] bg-border/60 relative">
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
              <span className="text-[9px] text-muted-foreground font-mono mt-1.5">secure webhook</span>
            </div>

            {/* Visual Node 2: Sandbox Agent */}
            <div className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border w-full md:w-64 transition-all duration-300 ${
              activeStep === "agent" 
                ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20 shadow-md shadow-primary/5 scale-105" 
                : "border-border/50 bg-card/60"
            }`}>
              {activeStep === "agent" && (
                <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-primary text-[8px] font-bold tracking-wider text-primary-foreground animate-pulse">
                  COMPILING PATCH
                </span>
              )}
              <div className={`p-2.5 rounded-lg border transition-all ${
                activeStep === "agent" 
                  ? "bg-primary/10 text-primary border-primary/20" 
                  : "bg-muted/50 text-muted-foreground border-border/50"
              }`}>
                <Server className={`h-5 w-5 ${activeStep === "agent" ? "animate-pulse" : ""}`} />
              </div>
              <div className="text-center">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Secure Sandbox</h4>
                <p className="text-xs font-bold text-foreground mt-0.5">{selectedScenario.agent}</p>
              </div>
            </div>

            {/* Glowing Connection Arrow 2 */}
            <div className="hidden md:flex flex-col items-center justify-center flex-1 relative h-10">
              <div className="w-full h-[1px] bg-border/60 relative">
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
              <span className="text-[9px] text-muted-foreground font-mono mt-1.5">AST validation</span>
            </div>

            {/* Visual Node 3: Target Action */}
            <div className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border w-full md:w-64 transition-all duration-300 ${
              activeStep === "action" 
                ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-md shadow-emerald-500/5" 
                : "border-border/50 bg-card/60"
            }`}>
              {activeStep === "action" && (
                <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-emerald-500 text-[8px] font-bold tracking-wider text-white animate-pulse">
                  DEPLOYING FIX
                </span>
              )}
              <div className={`p-2.5 rounded-lg border transition-all ${
                activeStep === "action" 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                  : "bg-muted/50 text-muted-foreground border-border/50"
              }`}>
                {getIcon(selectedScenario.actionIcon)}
              </div>
              <div className="text-center">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Autonomous Action</h4>
                <p className="text-xs font-bold text-foreground mt-0.5">{selectedScenario.action}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Playground Controls & Console Output Grid */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Configuration Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Card className="flex-1 flex flex-col justify-between border-border/40 bg-card/40 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Settings className="h-4.5 w-4.5 text-primary" /> Configurator
                </CardTitle>
                <CardDescription className="text-xs">Select a production failure to run its self-healing workflow</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-5 flex-1">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Scenario</label>
                  <div className="flex flex-col gap-1.5">
                    {SCENARIOS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleScenarioChange(s.id)}
                        disabled={isRunning}
                        className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                          selectedScenario.id === s.id
                            ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                            : "border-border/60 bg-card hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="font-semibold text-xs">{s.trigger.split(" ")[0]} Recovery</span>
                        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${selectedScenario.id === s.id ? "translate-x-1 text-primary" : "text-muted-foreground"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/40 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded bg-destructive/10 text-destructive mt-0.5">
                      <AlertCircle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trigger Webhook</h4>
                      <p className="font-medium text-foreground mt-0.5">{selectedScenario.trigger}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded bg-primary/10 text-primary mt-0.5">
                      <Cpu className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Assigned Agent</h4>
                      <p className="font-medium text-foreground mt-0.5">{selectedScenario.agent}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-500 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Autonomous Action</h4>
                      <p className="font-medium text-foreground mt-0.5">{selectedScenario.action}</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t border-border/40">
                <Button 
                  onClick={handleRunAgent} 
                  disabled={isRunning} 
                  className="w-full gap-2 font-bold text-xs h-10"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? "animate-spin" : ""}`} /> 
                  <span>{isRunning ? "Agent Resolving..." : "Run Sandbox Agent"}</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Console Output */}
          <div className="lg:col-span-7 flex">
            <Card className="flex-1 bg-[#09090b] text-slate-300 font-mono text-[11px] overflow-hidden flex flex-col border-border/60 shadow-xl">
              <CardHeader className="bg-secondary/40 px-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Terminal className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium">aura-ephemeral-sandbox:~</span>
                  </div>
                </div>
                <Badge variant="outline" className="border-border/40 text-slate-400 bg-black/40 font-mono text-[9px] px-1.5 py-0">
                  {isRunning ? "EXEC_RUNNING" : "EXEC_IDLE"}
                </Badge>
              </CardHeader>

              <CardContent className="p-4 flex-1 overflow-y-auto space-y-2.5 min-h-[320px] max-h-[420px]">
                {activeLogs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-20 gap-2">
                    <Terminal className="h-7 w-7 text-slate-700" />
                    <p className="font-bold text-xs text-slate-400">Execution Pipeline Ready</p>
                    <p className="text-[10px] text-slate-600 max-w-xs leading-normal">Click &quot;Run Sandbox Agent&quot; to inspect real-time self-healing logs</p>
                  </div>
                )}
                
                {activeLogs.map((log, index) => {
                  let colorClass = "text-slate-300"
                  if (log.startsWith("⚡")) colorClass = "text-amber-400 font-semibold"
                  else if (log.startsWith("🔍")) colorClass = "text-indigo-400"
                  else if (log.startsWith("✅")) colorClass = "text-emerald-400"
                  else if (log.startsWith("🚀")) colorClass = "text-primary font-semibold"
                  else if (log.startsWith("🎉")) colorClass = "text-emerald-400 font-bold animate-pulse"
                  
                  return (
                    <div key={index} className={`leading-relaxed border-l pl-3 py-0.5 animate-in fade-in duration-300 ${
                      log.startsWith("🎉") ? "border-emerald-500" : log.startsWith("🚀") ? "border-primary" : "border-border/40"
                    }`}>
                      <span className={colorClass}>{log}</span>
                    </div>
                  )
                })}

                {isRunning && currentLogIndex < selectedScenario.logs.length && (
                  <div className="flex items-center gap-2 text-primary animate-pulse mt-2 pl-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px]">Compiling next instruction...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grayscale Logo Cloud */}
      <section className="container mx-auto px-4 max-w-5xl text-center">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-6">TRUSTED BY TEAMS AT</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30 grayscale hover:opacity-40 transition-opacity">
          <span className="text-sm font-extrabold tracking-wider">HASHICORP</span>
          <span className="text-sm font-extrabold tracking-wider">VERCEL</span>
          <span className="text-sm font-extrabold tracking-wider">DATADOG</span>
          <span className="text-sm font-extrabold tracking-wider">STRIPE</span>
          <span className="text-sm font-extrabold tracking-wider">SENTRY</span>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="container mx-auto px-4 max-w-5xl relative">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs px-2.5 py-0.5">
            Core Platform
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Engineered for Security, Built for Scale
          </h2>
          <p className="max-w-2xl text-muted-foreground text-xs sm:text-sm">
            Traditional pipelines break when conditions change. Aura AI agents plan dynamically, adapting to code changes and network environments safely.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feat) => (
            <Card key={feat.id} className="bg-card/40 border-border/40 backdrop-blur-sm hover:bg-card/80 hover:border-primary/20 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary w-max mb-3 border border-primary/10">
                  {getIcon(feat.iconName)}
                </div>
                <CardTitle className="text-base font-bold tracking-tight">{feat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs px-2.5 py-0.5">
            Social Proof
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Trusted by Engineering Leaders
          </h2>
          <p className="max-w-2xl text-muted-foreground text-xs sm:text-sm">
            See how scaling teams are automating core operations, saving hundreds of engineering hours, and keeping production secure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <Card key={index} className="flex flex-col justify-between bg-card/20 border-border/40 backdrop-blur-sm hover:border-border/80 transition-all">
              <CardContent className="pt-5">
                <p className="text-xs text-muted-foreground leading-relaxed italic mb-5">
                  &ldquo;{t.content}&rdquo;
                </p>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4 pb-4 bg-muted/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border border-border/40">
                    <AvatarImage src={t.avatarUrl} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left leading-none">
                    <h4 className="text-xs font-bold text-foreground">{t.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">{t.role}, <span className="text-primary font-semibold">{t.company}</span></p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="text-center flex flex-col items-center gap-3 mb-10">
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs px-2.5 py-0.5">
            FAQ
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl text-muted-foreground text-xs sm:text-sm">
            Everything you need to know about our autonomous sandbox agents and integration protocols.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/40">
              <AccordionTrigger className="text-left hover:text-primary transition-colors py-3.5 text-sm font-bold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3.5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 max-w-5xl">
        <Card className="border-primary/20 bg-primary/5 text-center p-8 md:p-12 relative overflow-hidden flex flex-col items-center gap-5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.1),transparent_70%)] pointer-events-none" />
          
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs px-2.5 py-0.5">
            Get Started Today
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground max-w-xl leading-tight">
            Ready to Automate Your Engineering Pipelines?
          </h2>
          
          <p className="max-w-md text-muted-foreground text-xs sm:text-sm">
            Create an account on our Developer Tier in less than 2 minutes. Deploy up to 3 agents completely free. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-xs font-bold">
                <span>Deploy Free Agent</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-xs font-bold bg-background/50 border-border/60">
                Talk to Solutions
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
