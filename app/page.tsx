import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        <HeroSection />
      </main>
    </div>
  )
}
