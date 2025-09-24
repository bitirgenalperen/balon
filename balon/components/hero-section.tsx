"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, Gift, Video } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div
          className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-sparkle"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-sparkle"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-accent rounded-full animate-sparkle"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-3 h-3 bg-primary rounded-full animate-sparkle"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8 animate-float">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Celebrate Every
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Special Moment
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Transform your celebrations with custom video messages and discover perfect gift ideas that make every
            special day unforgettable.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/video-generation">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4"
            >
              Start Celebrating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-card text-lg px-8 py-4 bg-transparent"
            onClick={() => {
              const servicesSection = document.getElementById("services-section")
              servicesSection?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explore Services
          </Button>
        </div>

        {/* Services Grid */}
        <div id="services-section" className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/video-generation">
            <Card className="p-8 hover:bg-card/80 transition-all duration-300 hover:scale-105 cursor-pointer group border-border/50">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Custom Video Generation</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Create personalized video messages with AI-powered customization. Perfect for birthdays, anniversaries,
                and special occasions.
              </p>
              <div className="mt-6 flex items-center text-primary font-semibold group-hover:text-primary/80">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Card>
          </Link>

          <Link href="/gift-ideas">
            <Card className="p-8 hover:bg-card/80 transition-all duration-300 hover:scale-105 cursor-pointer group border-border/50">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6 mx-auto group-hover:bg-secondary/20 transition-colors">
                <Gift className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Gift & Celebration Ideas</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Discover curated gift suggestions and celebration ideas tailored to every occasion and personality.
              </p>
              <div className="mt-6 flex items-center text-secondary font-semibold group-hover:text-secondary/80">
                Explore Ideas <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Card>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Making celebrations magical since 2024</span>
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
