import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Filter, Search, Image as ImageIcon } from "lucide-react"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Discover</h1>
              <p className="mt-3 text-muted-foreground">Short description of the marketplace and templates.</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search" />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select>
                    <SelectTrigger className="w-[140px]"><SelectValue placeholder="Filter" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="md:justify-self-end">
              <Link href="/discover/upload">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"><Upload className="h-4 w-4 mr-2" />Upload</Button>
              </Link>
              <p className="mt-2 text-xs text-muted-foreground">are you a creator? upload your own template!</p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {["Trending templates", "Birthday Concept"].map((section) => (
              <Card key={section} className="p-6 border-border/50">
                <h2 className="text-xl font-semibold mb-4 text-foreground">{section}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Card key={i} className="p-3 border-border/50">
                      <div className="aspect-video rounded-md bg-muted/40 flex items-center justify-center mb-3">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Card Title</p>
                        <p className="text-xs text-muted-foreground">Secondary text</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


