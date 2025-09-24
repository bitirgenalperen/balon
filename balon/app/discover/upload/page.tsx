import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud, Image as ImageIcon } from "lucide-react"

export default function DiscoverUploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Upload Your Template Here</h1>

          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <Card key={n} className="p-6 border-border/50">
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-2">
                    <div className="aspect-square rounded-md bg-muted/40 flex items-center justify-center">
                      <ImageIcon className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Template Variation {n}</p>
                  </div>
                  <div className="md:col-span-10 grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-foreground">Occasion</Label>
                      <Select>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Occasion" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="birthday">Birthday</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground">Style</Label>
                      <Select>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Style" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground">Keywords and Tags</Label>
                      <Input className="mt-2" placeholder="Keywords and Tags" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <UploadCloud className="h-4 w-4 mr-2" /> Upload
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


