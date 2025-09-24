"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { href: "/video-generation", label: "Custom Videos" },
    { href: "/gift-ideas", label: "Gift Ideas" },
    { href: "/discover", label: "Discover" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/20 border border-amber-500">
              <span className="font-bold text-lg">🎈</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              balon
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/profile" aria-label="Profile">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/video-generation">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">Try Now</Button>
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="md:hidden flex items-center gap-1">
            <Link href="/profile" aria-label="Profile">
              <Button variant="ghost" size="sm" className="text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="px-3 py-2">
                <Link href="/video-generation">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Try Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
