import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Zap, Heart, Star, Play } from "lucide-react"

export default function VideoGenerationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Generate Your Gift</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Create personalized video messages that capture the perfect moment. Our AI-powered platform makes it easy
              to craft memorable celebrations.
            </p>
          </div>

          {/* Landing Preview Section (Step 0) */}
          <Card className="p-8 border-border/50 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-3 text-foreground">Generate Your Gift</h2>
                <p className="text-muted-foreground mb-6">Let's create your gift!</p>
                <Link href="/video-generation/flow">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    Generate
                  </Button>
                </Link>
              </div>
              <div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">short video/photo</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Why Choose Our Video Generation?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Generate professional-quality videos in minutes, not hours. Our AI technology streamlines the entire
                  process.
                </p>
              </Card>

              <Card className="p-6 text-center border-border/50">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Deeply Personal</h3>
                <p className="text-muted-foreground">
                  Every video is uniquely crafted with your personal message, photos, and chosen style preferences.
                </p>
              </Card>

              <Card className="p-6 text-center border-border/50">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Premium Quality</h3>
                <p className="text-muted-foreground">
                  High-definition output with professional animations, transitions, and audio quality that impresses.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
