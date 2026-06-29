export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: "orchestration" | "scalability" | "security" | "integrations";
}

export interface PricingTier {
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const FEATURES: Feature[] = [
  {
    id: "agent-orch",
    title: "Autonomous Agent Orchestration",
    description: "Deploy self-healing, multi-agent networks that coordinate on complex, multi-step engineering and business tasks without human intervention.",
    iconName: "Cpu",
    category: "orchestration"
  },
  {
    id: "visual-builder",
    title: "Visual Flow Designer",
    description: "Build, debug, and monitor autonomous workflows in real-time with an intuitive node-based visual drag-and-drop playground.",
    iconName: "GitBranch",
    category: "orchestration"
  },
  {
    id: "self-healing",
    title: "Self-Healing Workflows",
    description: "Agents automatically detect execution errors, inspect logs, write patch code, and retry failed operations dynamically.",
    iconName: "ShieldAlert",
    category: "security"
  },
  {
    id: "infinite-scaling",
    title: "Serverless Scale",
    description: "Run millions of parallel agent actions. Pay only for the exact computing milliseconds your workflows consume.",
    iconName: "Zap",
    category: "scalability"
  },
  {
    id: "enterprise-security",
    title: "Zero-Trust Sandbox",
    description: "Every agent executes in a secure, isolated, ephemeral micro-container with strict memory limits and network access controls.",
    iconName: "Lock",
    category: "security"
  },
  {
    id: "native-integrations",
    title: "500+ Native Integrations",
    description: "Seamlessly connect to GitHub, Slack, Jira, AWS, Stripe, Postgres, HubSpot, and any custom API out of the box.",
    iconName: "Layers",
    category: "integrations"
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Developer",
    priceMonthly: 0,
    priceAnnually: 0,
    description: "Perfect for exploring agentic workflows and building proof-of-concepts.",
    features: [
      "Up to 3 active autonomous agents",
      "1,000 execution steps per month",
      "Visual workflow designer",
      "Standard community support",
      "Basic logs and execution history (3 days)"
    ],
    cta: "Start Free",
    featured: false
  },
  {
    name: "Scale",
    priceMonthly: 49,
    priceAnnually: 39,
    description: "For fast-growing startups automating core production pipelines.",
    features: [
      "Unlimited active agents",
      "50,000 execution steps per month",
      "Visual workflow designer & CLI",
      "Priority email & Slack support (8hr SLA)",
      "Advanced error logs & self-healing logs (30 days)",
      "Custom HTTP API triggers"
    ],
    cta: "Upgrade to Scale",
    featured: true
  },
  {
    name: "Enterprise",
    priceMonthly: 199,
    priceAnnually: 159,
    description: "For organizations requiring custom security, compliance, and custom scaling.",
    features: [
      "Unlimited active agents & execution steps",
      "Dedicated serverless cluster execution",
      "Custom integration connectors",
      "24/7 Phone & Slack support (1hr SLA)",
      "SSO/SAML, audit logs, and SOC2 compliance",
      "Dedicated Solutions Architect"
    ],
    cta: "Contact Sales",
    featured: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "VP of Engineering",
    company: "Vortex SaaS",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    content: "Aura AI completely transformed our deployment pipeline. We deployed an autonomous release agent that monitors Sentry, rolls back buggy code, and alerts the team with patch suggestions. It saved us dozens of production hours."
  },
  {
    name: "Marcus Chen",
    role: "Lead Platform Architect",
    company: "HyperScale Corp",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    content: "The visual designer is incredible, but the zero-trust sandboxing is the real winner. Our security team approved Aura in days because every agent executes in its own isolated ephemeral container."
  },
  {
    name: "Elena Rostova",
    role: "Founder & CTO",
    company: "Cognitive Devs",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    content: "We built an autonomous customer support agent that reads database states, drafts custom API requests, and solves 70% of technical tickets. Aura is easily the best investment we made this year."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What is an autonomous agent?",
    answer: "Unlike traditional static workflows that follow hardcoded step-by-step rules, an autonomous agent uses a large language model (LLM) to dynamically plan its own tasks, handle unexpected errors, use external APIs, and evaluate its own work to achieve a high-level goal."
  },
  {
    question: "How does the self-healing workflow work?",
    answer: "If an execution step fails (e.g., a rate limit is hit or an API payload schema changes), Aura's self-healing compiler inspects the error, checks the API documentation in its knowledge base, writes a revised action, and retries the process safely in a sandbox before applying it."
  },
  {
    question: "Is Aura secure? Can agents destroy my database?",
    answer: "Security is our highest priority. Every workflow agent executes in a completely isolated, read-only, ephemeral micro-container. You have absolute control over permissions, and any database write actions can be configured to require manual human-in-the-loop approval."
  },
  {
    question: "Can I connect Aura to my internal APIs?",
    answer: "Yes! Aura supports custom OpenAPI/Swagger schemas. You can import your internal endpoints in seconds, and our agents will automatically learn how to authenticate and communicate with them."
  },
  {
    question: "What happens if I exceed my execution step limit?",
    answer: "For the Developer plan, we will temporarily pause execution and notify you to upgrade. For the Scale plan, additional steps are billed at a flat rate of $0.001 per step, so your services never go offline."
  }
];

export const CHAT_KNOWLEDGE_BASE = `
Aura AI is an autonomous agent orchestration platform for modern engineering teams.
Key Features:
1. Autonomous Agent Orchestration: Agents plan, execute, and adapt workflows.
2. Visual Flow Designer: Drag-and-drop node editor to map agents and triggers.
3. Self-Healing Workflows: Automatic error logging, patch writing, and retries.
4. Ephemeral Zero-Trust Sandboxes: High security, isolated micro-containers.
5. 500+ Integrations: Slack, GitHub, Jira, AWS, Stripe, Postgres.

Pricing:
- Developer: Free ($0). 3 agents, 1,000 steps/month, standard support.
- Scale: $49/mo ($39/mo if billed annually). Unlimited agents, 50,000 steps, self-healing logs.
- Enterprise: $199/mo ($159/mo if billed annually). Dedicated cluster, 24/7 support, SOC2/SSO compliance.

Company Info:
- Founded in 2024 by a group of AI research scientists and systems engineers.
- Mission is to unlock human creativity by automating routine technical workflows safely.
- Headquartered in San Francisco, CA.
`;
