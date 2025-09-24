import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, CalendarDays, Play } from "lucide-react"

export default function AdventLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Advent Calendar</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Generate a personalized advent calendar filled with delightful activities and surprises.</p>
          </div>

          <Card className="p-8 border-border/50 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Preview</h2>
                <p className="text-muted-foreground mb-4">See how your calendar will look. Each day opens a fun activity.</p>
                <Link href="/advent/generate">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">Generate</Button>
                </Link>
              </div>
              <div>
                <img
                  src="/image.png"
                  alt="Advent Calendar preview"
                  className="w-100 rounded-md border border-border object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}


