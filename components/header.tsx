'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Cpu, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-90 transition-opacity">
          <Cpu className="h-6 w-6 text-primary" />
          <span>Aura<span className="text-primary">.ai</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={isActive ? "text-foreground bg-accent/50 font-semibold" : "hover:text-foreground"}
                >
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/pricing">
            <Button className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground" onClick={() => setIsOpen(false)}>
                  <Cpu className="h-6 w-6 text-primary" />
                  <span>Aura<span className="text-primary">.ai</span></span>
                </Link>
                <div className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start text-base"
                        >
                          {link.label}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/pricing" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
