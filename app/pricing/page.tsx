'use client'

import { useState } from "react"
import Link from "next/link"
import { Check, Cpu, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PRICING_TIERS } from "@/lib/data"

export default function PricingPage() {
  const [isAnnual, setIsAnnually] = useState(true)

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl flex flex-col gap-16">
      {/* Header */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-primary/30 text-primary">Pricing Plans</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Predictable Pricing for Teams of All Sizes
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          No hidden execution fees. Pay for what you need, and scale up smoothly as your agent workflows grow.
        </p>

        {/* Billing Cycle Switch */}
        <div className="flex items-center gap-3 mt-6 bg-muted/30 p-2 rounded-full border">
          <Label htmlFor="billing-toggle" className={`text-sm cursor-pointer px-3 py-1 rounded-full transition-colors ${!isAnnual ? "bg-background text-foreground font-semibold shadow-sm" : "text-muted-foreground"}`}>
            Billed Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnually}
          />
          <Label htmlFor="billing-toggle" className={`text-sm cursor-pointer px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors ${isAnnual ? "bg-background text-foreground font-semibold shadow-sm" : "text-muted-foreground"}`}>
            Billed Annually
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] font-bold border-none px-1.5 py-0">
              Save ~20%
            </Badge>
          </Label>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="grid gap-8 lg:grid-cols-3 items-stretch">
        {PRICING_TIERS.map((tier) => {
          const price = isAnnual ? tier.priceAnnually : tier.priceMonthly
          
          return (
            <Card 
              key={tier.name} 
              className={`flex flex-col justify-between relative transition-all duration-200 ${
                tier.featured 
                  ? "border-primary bg-card shadow-xl ring-1 ring-primary/20 scale-105 lg:scale-105 z-10" 
                  : "border-muted bg-card/40 hover:bg-card/80"
              }`}
            >
              {tier.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground border-none">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  {tier.name}
                  {tier.name === "Developer" && <Cpu className="h-4 w-4 text-primary/60" />}
                </CardTitle>
                <CardDescription className="text-sm min-h-[40px] mt-2">
                  {tier.description}
                </CardDescription>
                
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">${price}</span>
                  <span className="text-sm text-muted-foreground font-medium">/month</span>
                </div>
                {isAnnual && price > 0 && (
                  <span className="text-[10px] text-emerald-500 font-semibold mt-1">
                    Billed annually (${price * 12}/yr)
                  </span>
                )}
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between">
                <Separator className="mb-6" />
                
                <ul className="space-y-3 text-sm flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="p-0.5 rounded-full bg-primary/10 text-primary mt-0.5 shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-muted-foreground leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6 pb-6 bg-muted/5 border-t">
                {tier.name === "Enterprise" ? (
                  <Link href="/contact" className="w-full">
                    <Button variant="outline" className="w-full font-semibold" size="lg">
                      {tier.cta}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/contact" className="w-full">
                    <Button 
                      className="w-full font-semibold" 
                      variant={tier.featured ? "default" : "outline"}
                      size="lg"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </section>

      {/* Enterprise / Feature Comparison CTA */}
      <section className="text-center flex flex-col items-center gap-4 max-w-2xl mx-auto mt-8 p-6 rounded-xl border bg-muted/20">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Need custom agent permissions or self-hosted sandboxes?</h3>
        <p className="text-sm text-muted-foreground">
          We offer custom deployment environments, HIPAA compliance, and custom LLM model routing for enterprise organizations. Talk to our systems architects.
        </p>
        <Link href="/contact">
          <Button variant="link" className="gap-1.5 font-semibold text-primary">
            Contact Enterprise Solutions <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
