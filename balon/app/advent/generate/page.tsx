"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useMemo, useState } from "react"

export default function AdventGeneratePage() {
  const [days, setDays] = useState<string>("24")
  const [type, setType] = useState<string>("")
  const [audience, setAudience] = useState<string>("family")
  const [interests, setInterests] = useState<string>("")
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [openStyle, setOpenStyle] = useState<string>("unwrap")
  const [contentType, setContentType] = useState<string>("text")
  const [message, setMessage] = useState<string>("")

  const numDays = useMemo(() => Number(days || 0) || 24, [days])

  const getActivity = (i: number) => {
    const base = type || "surprise"
    const audienceText = audience === "partner" ? "with your partner" : audience === "kids" ? "with the kids" : audience === "friends" ? "with friends" : "with family"
    const ideas: Record<string, string[]> = {
      physical: [
        "Go for a cozy evening walk and spot holiday lights",
        "Do a short home yoga or stretching session",
        "Have a living-room dance-off to a festive playlist",
      ],
      "watching-movie/series": [
        "Watch a classic holiday movie together",
        "Start a mini-series and binge one episode",
        "Rewatch a nostalgic favorite with hot cocoa",
      ],
      intimate: [
        "Write love notes to each other and read them aloud",
        "Cook a candlelit dinner for two",
        "Create a gratitude list before bed",
      ],
      "acts-of-kindness": [
        "Donate items you no longer need",
        "Write a thank-you message to someone",
        "Pay it forward with a small treat",
      ],
      "outdoor-adventure": [
        "Visit a local market or fair",
        "Take a scenic walk and snap photos",
        "Try a new café or dessert spot",
      ],
      "learning-&-creativity": [
        "Bake a new cookie recipe",
        "Craft DIY ornaments",
        "Learn a magic trick or simple song",
      ],
      surprise: [
        "Open a tiny letter with a sweet challenge",
        "Share a story from a favorite memory",
        "Make a warm drink and play a 10‑minute game",
      ],
    }
    const pool = ideas[base as keyof typeof ideas] ?? ideas.surprise
    const pick = pool[i % pool.length]
    const extra = interests ? ` Hint: ${interests}.` : ""
    return `${pick} ${audienceText}.${extra}`
  }

  useEffect(() => {
    if (openIdx !== null) {
      setOpenStyle("unwrap")
      setContentType("text")
      setMessage(getActivity(openIdx))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-border/50">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Generate Advent Calendar</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <Label className="text-foreground">Total number of days</Label>
                  <Select value={days} onValueChange={setDays}>
                    <SelectTrigger className="mt-2"><SelectValue placeholder="Select days" /></SelectTrigger>
                    <SelectContent>
                      {["6","12","24","30"].map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Type of things on the calendar</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="mt-2"><SelectValue placeholder="Choose type" /></SelectTrigger>
                    <SelectContent>
                      {[
                        "Physical",
                        "Watching Movie/Series",
                        "Intimate",
                        "Acts of Kindness",
                        "Outdoor Adventure",
                        "Learning & Creativity",
                      ].map((t) => (
                        <SelectItem key={t} value={t.toLowerCase().replace(/\s+/g, "-")}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Audience</Label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger className="mt-2"><SelectValue placeholder="Select audience" /></SelectTrigger>
                    <SelectContent>
                      {["family","partner","friends","kids"].map((a)=> (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Interests, themes, restrictions (optional)</Label>
                  <Textarea className="mt-2" placeholder="e.g., cozy winter vibes, no alcohol, loves puzzles and cooking" value={interests} onChange={(e)=>setInterests(e.target.value)} />
                </div>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Generate</Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Calendar cards</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {Array.from({ length: numDays }).map((_, i) => (
                    <button
                      key={i}
                      className="aspect-square rounded-md border border-border bg-card/60 hover:bg-card/80 transition-colors flex items-center justify-center text-sm text-foreground"
                      onClick={() => setOpenIdx(i)}
                    >
                      Day {i + 1}
                    </button>
                  ))}
                </div>

                {openIdx !== null && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpenIdx(null)} />
                    <div className="relative z-10 w-full max-w-2xl rounded-lg border border-border bg-card/90 backdrop-blur p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-xl font-semibold text-foreground">Reveal</h4>
                        <Button variant="outline" size="sm" onClick={() => setOpenIdx(null)}>Close</Button>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-1">
                          <Label className="text-foreground">Open Style</Label>
                          <Select value={openStyle} onValueChange={setOpenStyle}>
                            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unwrap">Unwrap</SelectItem>
                              <SelectItem value="scratch">Scratch to reveal</SelectItem>
                              <SelectItem value="flip">Flip to open</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-1">
                          <Label className="text-foreground">Content Type</Label>
                          <Select value={contentType} onValueChange={setContentType}>
                            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="photo">Photo</SelectItem>
                              <SelectItem value="experience">Experience</SelectItem>
                              <SelectItem value="audio">Audio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-1 text-sm text-muted-foreground mt-6 md:mt-0">Day #{openIdx + 1}</div>
                      </div>

                      <div className="mt-4">
                        <Label className="text-foreground">Message</Label>
                        <Textarea className="mt-2 min-h-[120px]" value={message} onChange={(e)=>setMessage(e.target.value)} />
                      </div>

                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpenIdx(null)}>Close</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}


