'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Cpu, 
  GitBranch, 
  ShieldAlert, 
  Zap, 
  Lock, 
  Layers, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Terminal, 
  ChevronRight, 
  Check 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FEATURES, TESTIMONIALS, FAQS } from "@/lib/data"

// Scenarios for the Interactive Agent Builder
const SCENARIOS = [
  {
    id: "sentry",
    trigger: "Sentry Error Triggered",
    agent: "SRE Debugger Agent",
    action: "Write Patch & Hotfix",
    logs: [
      "⚡ [Trigger] Received webhook from Sentry. Error: 'TypeError: Cannot read properties of undefined (reading 'split')' at app/api/user/route.ts:42",
      "🔍 [Agent] Analyzing stack trace and Git history...",
      "📦 [Sandbox] Spawning secure ephemeral micro-container (Node.js runtime)...",
      "🧠 [Agent] Located bug. Split called on unvalidated user payload 'email'. Writing patch...",
      "🧪 [Sandbox] Running unit tests with mock payload...",
      "✅ [Sandbox] Tests passed successfully. Zero side effects detected.",
      "🚀 [Action] Generating GitHub Pull Request #1402: 'Fix: split null pointer exception' and alerting #ops Slack channel.",
      "🎉 [Finished] Workflow completed in 342ms. Self-healing cycle finished."
    ]
  },
  {
    id: "github",
    trigger: "New GitHub PR Created",
    agent: "Code Reviewer Agent",
    action: "Draft Code Review Comments",
    logs: [
      "⚡ [Trigger] Received webhook from GitHub. PR #892 'feat: optimize database queries' opened by @dev_dan.",
      "🔍 [Agent] Fetching diff payload and inspecting AST index changes...",
      "📦 [Sandbox] Initializing sandbox environment...",
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
    agent: "Support & Billing Agent",
    action: "Process Refund & Email User",
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
  // Interactive Playground State
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0])
  const [isRunning, setIsRunning] = useState(false)
  const [currentLogIndex, setCurrentLogIndex] = useState(-1)
  const [activeLogs, setActiveLogs] = useState<string[]>([])

  // Run the interactive agent simulation
  const handleRunAgent = () => {
    if (isRunning) return
    setIsRunning(true)
    setCurrentLogIndex(0)
    setActiveLogs([])
  }

  useEffect(() => {
    if (currentLogIndex === -1 || !isRunning) return

    if (currentLogIndex < selectedScenario.logs.length) {
      const timer = setTimeout(() => {
        setActiveLogs(prev => [...prev, selectedScenario.logs[currentLogIndex]])
        setCurrentLogIndex(prev => prev + 1)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      setIsRunning(false)
    }
  }, [currentLogIndex, isRunning, selectedScenario])

  // Change scenario
  const handleScenarioChange = (id: string) => {
    if (isRunning) return
    const scenario = SCENARIOS.find(s => s.id === id) || SCENARIOS[0]
    setSelectedScenario(scenario)
    setActiveLogs([])
    setCurrentLogIndex(-1)
  }

  // Helper to map icons
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
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center gap-6 pt-20 md:pt-28 text-center max-w-4xl px-4">
        <Badge variant="secondary" className="px-3 py-1 text-xs gap-1.5 font-medium border border-primary/20 bg-primary/5 text-primary animate-pulse">
          <SparklesIcon className="h-3.5 w-3.5" /> Aura v2.0 is officially Live
        </Badge>
        
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground text-balance">
          Autonomous Agents that Plan, Execute, and <span className="text-primary">Self-Heal</span>
        </h1>
        
        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
          Deploy secure, sandboxed agent networks that automatically monitor logs, write patches, and integrate with your full engineering stack. Zero-trust execution by default.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 justify-center">
          <Link href="/pricing" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold">
              Deploy Free Agent <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold" onClick={handleRunAgent}>
            <Play className="h-4 w-4 fill-current" /> Try Playground
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl mt-16 pt-8 border-t border-muted/50">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-extrabold text-foreground">12M+</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Agent Actions Run</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-extrabold text-foreground">99.99%</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Sandbox Isolation</span>
          </div>
          <div className="flex flex-col items-center gap-1 col-span-2 md:col-span-1">
            <span className="text-3xl font-extrabold text-foreground">&lt;400ms</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Average Latency</span>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Playground */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <Badge variant="outline" className="border-primary/30 text-primary">Interactive Demo</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Design Your First Agentic Workflow
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Configure a trigger, pair it with an autonomous agent, and watch it execute inside an isolated zero-trust sandbox.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Configuration Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Card className="flex-1 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg">Workflow Configurator</CardTitle>
                <CardDescription>Select a scenario to load the trigger and agent pairing</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 flex-1">
                {/* Scenario Selectors */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-foreground">Select Scenario</label>
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
                        <span className="font-medium text-sm">{s.trigger.split(" ")[0]} Scenario</span>
                        <ChevronRight className={`h-4 w-4 transition-transform ${selectedScenario.id === s.id ? "translate-x-1" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trigger & Agent Details */}
                <div className="space-y-4 pt-4 border-t">
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
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Autonomous Action</h4>
                      <p className="text-sm font-medium text-foreground">{selectedScenario.action}</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/10 p-4 border-t">
                <Button 
                  onClick={handleRunAgent} 
                  disabled={isRunning} 
                  className="w-full gap-2 font-semibold"
                  size="lg"
                >
                  <Play className="h-4 w-4 fill-current" /> {isRunning ? "Agent Running..." : "Run Sandbox Agent"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Console Output */}
          <div className="lg:col-span-7 flex">
            <Card className="flex-1 bg-black text-slate-300 font-mono text-xs overflow-hidden flex flex-col border-slate-800">
              <CardHeader className="bg-slate-950 p-4 border-b border-slate-900 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-slate-200">Aura Ephemeral Sandbox Console</span>
                </div>
                <Badge variant="outline" className="border-slate-800 text-slate-400 bg-slate-900/50 font-mono text-[10px]">
                  {isRunning ? "EXEC_RUNNING" : "EXEC_IDLE"}
                </Badge>
              </CardHeader>

              <CardContent className="p-4 flex-1 overflow-y-auto space-y-3 min-h-[300px] max-h-[420px]">
                {activeLogs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-20 gap-2">
                    <Terminal className="h-8 w-8 text-slate-700" />
                    <p>Click &quot;Run Sandbox Agent&quot; to inspect real-time execution steps</p>
                  </div>
                )}
                
                {activeLogs.map((log, index) => {
                  let colorClass = "text-slate-300"
                  if (log.startsWith("⚡")) colorClass = "text-amber-400"
                  else if (log.startsWith("✅")) colorClass = "text-emerald-400"
                  else if (log.startsWith("🚀")) colorClass = "text-primary"
                  else if (log.startsWith("🎉")) colorClass = "text-emerald-400 font-bold"
                  
                  return (
                    <div key={index} className={`leading-relaxed border-l-2 pl-3 py-0.5 animate-in fade-in duration-300 ${
                      log.startsWith("🎉") ? "border-emerald-500" : log.startsWith("🚀") ? "border-primary" : "border-slate-800"
                    }`}>
                      <span className={colorClass}>{log}</span>
                    </div>
                  )
                })}

                {isRunning && (
                  <div className="flex items-center gap-2 text-primary animate-pulse mt-2 pl-3">
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    <span>Processing next instruction...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">Core Platform</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Engineered for Security, Built for Scale
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Traditional pipelines break when conditions change. Aura AI agents plan dynamically, adapting to code changes and network environments.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feat) => (
            <Card key={feat.id} className="bg-card/40 backdrop-blur hover:bg-card/80 transition-colors">
              <CardHeader className="pb-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-max mb-3">
                  {getIcon(feat.iconName)}
                </div>
                <CardTitle className="text-lg font-semibold">{feat.title}</CardTitle>
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
          <Badge variant="outline" className="border-primary/30 text-primary">Social Proof</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Trusted by Engineering Leaders
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            See how scaling teams are automating core operations, saving hundreds of engineering hours, and keeping production secure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <Card key={index} className="flex flex-col justify-between bg-card/20 border-muted/60">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                  &ldquo;{t.content}&quot;
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 bg-muted/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={t.avatarUrl} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h4 className="text-sm font-semibold text-foreground leading-none">{t.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t.role}, <span className="text-primary font-medium">{t.company}</span></p>
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
          <Badge variant="outline" className="border-primary/30 text-primary">FAQ</Badge>
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
              <AccordionTrigger className="text-left hover:text-primary transition-colors py-4 text-base font-semibold">
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
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold">
                Talk to Solutions
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5 5 3Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
    </svg>
  )
}
