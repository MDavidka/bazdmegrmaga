'use client'

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Cpu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { CHAT_KNOWLEDGE_BASE } from "@/lib/data"

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi there! I'm Aura Assistant. Ask me anything about Aura AI, our features, pricing, or security. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [isOpen, messages, isThinking])

  const generateAIResponse = (userText: string): string => {
    const text = userText.toLowerCase()
    
    if (text.includes("price") || text.includes("pricing") || text.includes("cost") || text.includes("free") || text.includes("plan")) {
      return "Aura AI offers three primary plans:\n\n1. **Developer Plan**: Free ($0). Includes 3 active agents and 1,000 steps/month.\n2. **Scale Plan**: $49/month ($39 if billed annually). Includes unlimited agents, 50,000 steps/month, and advanced self-healing logs.\n3. **Enterprise Plan**: $199/month ($159 if billed annually). Includes dedicated clusters, custom connectors, and 24/7 priority support."
    }
    
    if (text.includes("security") || text.includes("safe") || text.includes("database") || text.includes("sandbox") || text.includes("secure")) {
      return "Security is built into Aura's core. Every agent executes in an isolated, read-only, ephemeral micro-container. This zero-trust sandbox blocks unauthorized network calls and memory access. Furthermore, any destructive database actions (like writing or deleting) can be configured to require manual human-in-the-loop approval."
    }
    
    if (text.includes("feature") || text.includes("what does") || text.includes("capabilities") || text.includes("do") || text.includes("self-healing")) {
      return "Aura AI provides cutting-edge features:\n\n• **Autonomous Agents**: Our agents dynamically plan their own operations rather than following rigid paths.\n• **Visual Flow Designer**: An interactive node-based dashboard to map agent execution.\n• **Self-Healing Compiler**: Automatically detects bugs/errors, writes a patch, and retries safely.\n• **500+ Connectors**: Native integrations with Slack, GitHub, Jira, AWS, Stripe, etc."
    }
    
    if (text.includes("integrate") || text.includes("slack") || text.includes("github") || text.includes("api") || text.includes("connect")) {
      return "Aura AI connects to over 500 third-party platforms natives, including Slack, GitHub, Jira, AWS, Postgres, and HubSpot. You can also import any custom internal API in seconds using standard OpenAPI/Swagger schemas. The agents will automatically learn how to query and authenticate with them."
    }

    if (text.includes("about") || text.includes("company") || text.includes("who are") || text.includes("founded")) {
      return "Aura AI was founded in 2024 by a team of AI research scientists and systems engineers in San Francisco, CA. Our mission is to unlock human potential by automating routine, complex engineering and business workflows safely through autonomous agent networks."
    }

    return "That's a great question! Aura AI is a platform designed to deploy autonomous, self-healing agent networks that streamline complex operations. If you'd like to test this live, you can try our interactive Workflow Builder on the homepage, or sign up for our Free Developer plan!"
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isThinking) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsThinking(true)

    // Simulate thinking and typing delay
    setTimeout(() => {
      const aiResponseText = generateAIResponse(userMessage.text)
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsThinking(false)
    }, 1200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="w-[360px] h-[480px] mb-4 flex flex-col shadow-2xl border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 animate-in slide-in-from-bottom-5 duration-200">
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                <Cpu className="h-4 w-4 animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  Aura Assistant <Sparkles className="h-3 w-3 text-primary" />
                </CardTitle>
                <CardDescription className="text-xs">Online • Ask about Aura</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg text-sm whitespace-pre-line leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs bg-muted/20 p-2.5 rounded-lg w-max">
                <Spinner className="h-3 w-3 text-primary" />
                <span>Aura is planning response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-muted/10">
            <form onSubmit={handleSend} className="flex w-full items-center gap-2">
              <Input
                placeholder="Ask pricing, features, security..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-background h-9"
              />
              <Button type="submit" size="icon" className="h-9 w-9" disabled={!input.trim() || isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="h-12 w-12 rounded-full shadow-lg flex items-center justify-center p-0"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>
    </div>
  )
}
