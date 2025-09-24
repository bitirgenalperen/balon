"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Check } from "lucide-react"
import { useMemo, useState } from "react"

type StepKey = "occasion" | "recipient" | "personalize" | "vibe" | "preview" | "share"

const steps: { key: StepKey; label: string }[] = [
  { key: "occasion", label: "Occasion" },
  { key: "recipient", label: "Recipient" },
  { key: "personalize", label: "Personalize" },
  { key: "vibe", label: "Vibe" },
  { key: "preview", label: "Preview" },
  { key: "share", label: "Share" },
]

export default function VideoGenerationFlowPage() {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const active = useMemo<StepKey>(() => steps[activeIdx].key, [activeIdx])

  const goNext = () => setActiveIdx((i) => Math.min(i + 1, steps.length - 1))
  const goPrev = () => setActiveIdx((i) => Math.max(i - 1, 0))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stepper */}
          <div className="flex items-center justify-between gap-4 mb-6">
            {steps.map((s, idx) => {
              const isDone = idx < activeIdx
              const isActive = idx === activeIdx
              return (
                <div key={s.key} className="flex-1 flex items-center gap-3">
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center ${
                      isActive
                        ? "border-accent text-accent bg-accent/10"
                        : isDone
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground"
                    }`}
                    aria-label={s.label}
                  >
                    {isDone ? <Check className="h-5 w-5" /> : idx + 1}
                  </button>
                  <div className="hidden sm:block">
                    <p className={`text-sm ${isActive ? "text-accent" : isDone ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="h-px w-full bg-accent/30 rounded mb-8" />

          <div className={`${active === "preview" || active === "share" ? "grid md:grid-cols-2 gap-8" : "max-w-2xl mx-auto"}`}>
            {(active === "preview" || active === "share") && (
              <Card className="p-8 border-border/50 bg-card/60">
                <h3 className="text-xl font-bold mb-4 text-foreground">Video Preview</h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Your video preview will appear here</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Right: Dynamic Form */}
            <Card className="p-8 border-border/50 bg-card/60 space-y-4">
              {active === "occasion" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">What's the Occasion?</h2>
                  <div className="flex items-center gap-5 overflow-x-auto pb-2">
                    {[
                      { label: "Birthday", color: "bg-primary/20 text-primary border-primary" },
                      { label: "Anniversary", color: "bg-secondary/20 text-secondary border-secondary" },
                      { label: "Graduation", color: "bg-yellow-300/40 text-yellow-700 border-yellow-400" },
                      { label: "Thank You", color: "bg-emerald-300/40 text-emerald-700 border-emerald-400" },
                      { label: "Wedding", color: "bg-fuchsia-300/40 text-fuchsia-700 border-fuchsia-400" },
                      { label: "Custom", color: "bg-muted text-muted-foreground border-dashed" },
                    ].map((opt, i) => (
                      <div key={i} className="text-center min-w-28">
                        <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${opt.color}`}>{opt.label}</div>
                        <p className="mt-2 text-sm text-foreground">{opt.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={goPrev}>Previous</Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {active === "recipient" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Who Are We Celebrating?</h2>
                  <div>
                    <Label className="text-foreground">Recipient's Name</Label>
                    <Input className="mt-2 bg-background/60 border-border focus-visible:ring-accent" placeholder="e.g., Mom, John Doe" />
                  </div>
                  <div>
                    <Label className="text-foreground">Your Relationship</Label>
                    <Input className="mt-2 bg-background/60 border-border focus-visible:ring-accent" placeholder="e.g., Sister, Best Friend" />
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={goPrev}>Previous</Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {active === "personalize" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Add Your Personal Touch</h2>
                  <div>
                    <Label className="text-foreground">Key Memories, Inside Jokes, or Messages</Label>
                    <Textarea className="mt-2 min-h-[120px] bg-background/60 border-border focus-visible:ring-accent" placeholder="e.g., Remember that trip to the beach..." />
                  </div>
                  <div>
                    <Label className="text-foreground">Add Background Music (Optional)</Label>
                    <div className="mt-2 border border-dashed border-accent/40 bg-background/40 rounded-md p-6 text-center text-muted-foreground">Upload a file or drag and drop</div>
                  </div>
                  <div className="pt-2 border-t border-border/60" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Customize Link Preview</h3>
                    <Label className="text-foreground">Preview Title</Label>
                    <Input className="mt-2 mb-4 bg-background/60 border-border focus-visible:ring-accent" placeholder="A Special Message for Mom" />
                    <Label className="text-foreground">Preview Description</Label>
                    <Input className="mt-2 mb-4 bg-background/60 border-border focus-visible:ring-accent" placeholder="We all got together to make this for you!" />
                    <Label className="text-foreground">Upload Thumbnail Image (Optional)</Label>
                    <div className="mt-2 border border-dashed border-accent/40 bg-background/40 rounded-md p-6 text-center text-muted-foreground">Upload a file or drag and drop</div>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={goPrev}>Previous</Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {active === "vibe" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Choose a Vibe</h2>
                  <p className="text-muted-foreground">Select an artistic style to direct your celebration video.</p>
                  <div className="flex items-start gap-6 overflow-x-auto pb-2">
                    {[
                      { label: "Sentimental", circle: "bg-violet-200 text-violet-700 border-violet-500" },
                      { label: "Funny", circle: "bg-pink-200 text-pink-700 border-pink-500" },
                      { label: "Cinematic", circle: "bg-slate-300 text-slate-700 border-slate-400" },
                      { label: "Retro", circle: "bg-amber-300 text-amber-800 border-amber-400" },
                      { label: "Cartoon", circle: "bg-emerald-300 text-emerald-800 border-emerald-400" },
                      { label: "Heartfelt", circle: "bg-rose-300 text-rose-800 border-rose-400" },
                      { label: "Epic", circle: "bg-sky-300 text-sky-800 border-sky-400" },
                    ].map((v, i) => (
                      <div key={i} className="text-center min-w-28">
                        <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center ${v.circle}`}>{v.label}</div>
                        <p className="mt-2 text-sm text-foreground">{v.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={goPrev}>Previous</Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {active === "preview" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Preview</h2>
                  <p className="text-muted-foreground text-sm">Review your selections and proceed to generate.</p>
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={goPrev}>Previous</Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={goNext}>Generate Demo</Button>
                  </div>
                </div>
              )}

              {active === "share" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Share Your Gift</h2>
                    <p className="text-muted-foreground mt-1">It's ready!</p>
                  </div>

                  {/* Wrap it up */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Wrap it up</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: "Present box", emoji: "🎁" },
                        { label: "Heart gift", emoji: "💝" },
                        { label: "Balloon pop", emoji: "🎈" },
                        { label: "Confetti", emoji: "🎊" },
                      ].map((opt) => (
                        <Card key={opt.label} className="p-4 border-border/50 hover:border-accent/60 transition-colors">
                          <div className="aspect-square rounded-md bg-muted/40 flex items-center justify-center text-4xl">
                            <span>{opt.emoji}</span>
                          </div>
                          <p className="mt-2 text-sm text-center text-foreground">{opt.label}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* How to surprise */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">How to surprise</h3>
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        "Scratch to reveal",
                        "Flip to open",
                        "Unwrap",
                      ].map((label) => (
                        <Button key={label} variant="outline" className="h-12 justify-center text-foreground border-border hover:border-accent/60">
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <p className="text-foreground font-medium">Set your Countdown</p>
                        <button
                          type="button"
                          aria-pressed="false"
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-foreground transition-transform" />
                        </button>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Date</p>
                        <div className="flex gap-3">
                          <Select>
                            <SelectTrigger className="bg-background/60 border-border w-24"><SelectValue placeholder="12" /></SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                <SelectItem key={d} value={`${d}`}>{d}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="bg-background/60 border-border w-36"><SelectValue placeholder="April" /></SelectTrigger>
                            <SelectContent>
                              {[
                                "January","February","March","April","May","June","July","August","September","October","November","December",
                              ].map((m) => (
                                <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="bg-background/60 border-border w-28"><SelectValue placeholder="2026" /></SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 6 }, (_, i) => 2025 + i).map((y) => (
                                <SelectItem key={y} value={`${y}`}>{y}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Time</p>
                        <div className="flex gap-3">
                          <Select>
                            <SelectTrigger className="bg-background/60 border-border w-24"><SelectValue placeholder="18" /></SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                                <SelectItem key={h} value={`${h}`}>{h}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="bg-background/60 border-border w-24"><SelectValue placeholder="05" /></SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                                <SelectItem key={m} value={`${m}`}>{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Note & Share */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Add a note</h3>
                        <Textarea className="min-h-[120px] bg-background/60 border-border focus-visible:ring-accent" placeholder="Input field" />
                        <div className="mt-2 flex gap-2">
                          <Button variant="outline" size="sm">add sticker</Button>
                          <Button variant="outline" size="sm">add voice</Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Share via..</h3>
                        <div className="flex items-center gap-3">
                          {["bg-emerald-500","bg-violet-500","bg-amber-400","bg-orange-500"].map((c,i)=> (
                            <div key={i} className={`w-9 h-9 rounded-full ${c}`} />
                          ))}
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Share</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">your video will be automatically saved to your account</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}



