import { Navigation } from "@/components/navigation"
import { GiftCategories } from "@/components/gift-categories"
import { Card } from "@/components/ui/card"
import { Gift, Lightbulb, Users, Sparkles } from "lucide-react"

export default function GiftIdeasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-secondary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Gift & Celebration Ideas</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Discover the perfect gifts and celebration ideas for every special occasion. From thoughtful presents to
              memorable experiences, we've got you covered.
            </p>
          </div>

          {/* Main Content */}
          <GiftCategories />

          {/* Why Choose Our Ideas Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Why Our Gift Ideas Stand Out</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center border-border/50">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Curated Selection</h3>
                <p className="text-muted-foreground">
                  Every gift idea is carefully selected based on popularity, reviews, and meaningful impact on
                  recipients.
                </p>
              </Card>

              <Card className="p-6 text-center border-border/50">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">For Every Relationship</h3>
                <p className="text-muted-foreground">
                  Whether it's family, friends, colleagues, or partners, find the perfect gift for every relationship
                  type.
                </p>
              </Card>

              <Card className="p-6 text-center border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Memorable Experiences</h3>
                <p className="text-muted-foreground">
                  Beyond physical gifts, discover experience ideas that create lasting memories and strengthen bonds.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
