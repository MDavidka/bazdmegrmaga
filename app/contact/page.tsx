'use client'

import { useState } from "react"
import { Mail, MessageSquare, MapPin, CheckCircle, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.")
      return
    }

    setIsSubmitting(true)

    // Simulate API Request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl flex flex-col gap-12">
      {/* Header */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-primary/30 text-primary">Contact Us</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Connect with Our Systems Architects
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Have questions about sandboxing, integrations, or custom SLA agreements? Our systems team is ready to help.
        </p>
      </section>

      {/* Main Content */}
      <section className="grid gap-10 md:grid-cols-12 items-stretch mt-4">
        {/* Contact Form Card */}
        <div className="md:col-span-7 flex">
          <Card className="flex-1 flex flex-col justify-between">
            {isSuccess ? (
              <CardContent className="py-16 text-center flex flex-col items-center gap-5 justify-center h-full">
                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold">Message Sent Successfully</CardTitle>
                  <CardDescription className="text-sm max-w-sm mx-auto">
                    Thank you for reaching out! A senior systems architect will review your inquiry and contact you within 4 hours.
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsSuccess(false)} className="gap-2 mt-4">
                  <ArrowLeft className="h-4 w-4" /> Send Another Message
                </Button>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
                <CardHeader>
                  <CardTitle className="text-lg">Send a Message</CardTitle>
                  <CardDescription>Fill out the details below and we will get back to you shortly.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name <span className="text-primary">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">Work Email <span className="text-primary">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-background"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">How can we help? <span className="text-primary">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your automation needs, active integrations, or custom requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-background min-h-[120px]"
                      disabled={isSubmitting}
                    />
                  </div>
                </CardContent>

                <CardFooter className="bg-muted/5 p-4 border-t">
                  <Button type="submit" className="w-full gap-2 font-semibold" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner className="h-4 w-4" /> Sending Message...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>

        {/* Info Pane */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Office Location */}
          <Card className="bg-card/40 border-muted/60">
            <CardHeader className="pb-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-max mb-2">
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-bold">Headquarters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Aura AI Technologies Inc.<br />
                548 Market St, Suite 9021<br />
                San Francisco, CA 94104
              </p>
            </CardContent>
          </Card>

          {/* SLA Commitments */}
          <Card className="bg-card/40 border-muted/60">
            <CardHeader className="pb-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-max mb-2">
                <Clock className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-bold">Support Commitments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                We maintain active systems engineers across North America, Europe, and Asia-Pacific to provide round-the-clock support.
              </p>
              <div className="flex flex-col gap-1.5 pt-2 border-t">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Enterprise SLA:</span>
                  <span>1-hour response</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Scale SLA:</span>
                  <span>8-hour response</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Developer Tier:</span>
                  <span>Community forums</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <Card className="bg-card/40 border-muted/60 flex-1">
            <CardHeader className="pb-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-max mb-2">
                <Mail className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-bold">Direct Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Feel free to reach out to our dedicated teams directly:</p>
              <div className="space-y-2 pt-2 border-t">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">General & Press</span>
                  <a href="mailto:info@aura.ai" className="text-primary hover:underline font-medium">info@aura.ai</a>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Technical Support</span>
                  <a href="mailto:support@aura.ai" className="text-primary hover:underline font-medium">support@aura.ai</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
