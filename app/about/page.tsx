import Link from "next/link"
import { Cpu, ShieldCheck, HeartHandshake, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const VALUES = [
  {
    title: "Safety-First Compilation",
    description: "We believe autonomous software must execute in strictly bounded, zero-trust sandboxes. Security is not an afterthought — it is our primary compiler directive.",
    icon: <ShieldCheck className="h-5 w-5 text-primary" />
  },
  {
    title: "Developer-Centricity",
    description: "Aura is built by developers, for developers. We design our visual nodes, CLI, and APIs to augment engineering talent, not replace it.",
    icon: <Cpu className="h-5 w-5 text-primary" />
  },
  {
    title: "Trust & Transparency",
    description: "Every agent action, AST compilation, and container state is fully auditable. We log everything so you retain absolute control over your automation.",
    icon: <HeartHandshake className="h-5 w-5 text-primary" />
  }
]

const TEAM = [
  {
    name: "Dr. Aris Vance",
    role: "Co-Founder & CEO",
    bio: "Former AI Research Scientist at OpenAI. Specialist in LLM agent planning and reasoning loops.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Kenji Sato",
    role: "Co-Founder & CTO",
    bio: "Former Systems Architect at HashiCorp. Creator of several sandboxing and secure container systems.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Head of AI Safety",
    bio: "Ph.D. in Computer Science from Stanford. Focuses on sandboxing, AST analysis, and guardrail alignment.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl flex flex-col gap-20">
      {/* Header */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-primary/30 text-primary">Our Story</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Unlocking Creativity Through Secure Automation
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Founded in San Francisco in 2024, Aura AI is on a mission to build the safest and most reliable orchestration engine for autonomous agent networks.
        </p>
      </section>

      {/* Narrative Section */}
      <section className="grid gap-12 md:grid-cols-2 items-center">
        <div className="flex flex-col gap-5 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">The Origin of Aura</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In early 2024, our founders noticed a massive gap in the AI landscape: while large language models were becoming incredible at drafting code, there was no safe, reliable way to let those models *execute* that code inside production pipelines. Traditional CI/CD tools were too rigid, and giving LLMs raw access to servers was a security nightmare.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Aura AI was born to solve this. We combined cutting-edge LLM planning models with ephemeral, zero-trust sandboxing technology. This allows agents to write, compile, test, and deploy code in absolute isolation — creating self-healing systems that developers can trust completely.
          </p>
        </div>
        <div className="bg-muted/30 border rounded-xl p-8 flex flex-col justify-center gap-4">
          <Users className="h-8 w-8 text-primary" />
          <h3 className="text-lg font-bold text-foreground">A Global Engineering Force</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We are a fully distributed team of research scientists, systems architects, and security experts working together to build the next layer of the global developer stack. Our software operates with strict compliance and is audited regularly.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="flex flex-col gap-12 pt-8 border-t border-muted/50">
        <div className="text-center flex flex-col items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary">Our Values</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Guides Our Engineering</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((val, i) => (
            <Card key={i} className="bg-card/40 border-muted">
              <CardHeader className="pb-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-max mb-3">
                  {val.icon}
                </div>
                <CardTitle className="text-lg font-semibold">{val.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">{val.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="flex flex-col gap-12 pt-8 border-t border-muted/50">
        <div className="text-center flex flex-col items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary">Team</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Leadership & Research</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((member, i) => (
            <Card key={i} className="bg-card/20 border-muted/60 text-center flex flex-col items-center p-6 gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-base font-bold text-foreground">{member.name}</h4>
                <p className="text-xs text-primary font-medium mt-1">{member.role}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">{member.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-primary/5 rounded-xl p-8 md:p-12 border border-primary/15 flex flex-col items-center gap-6 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Want to build the future of AI engineering?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          We are always looking for passionate compilers, AI research scientists, and full-stack developers. Check our careers page or reach out directly.
        </p>
        <Link href="/contact">
          <Button className="gap-2 font-semibold">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
