"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Users, CalendarDays, Library, UserCog, Share2, Bell, X } from "lucide-react"
import { useMemo, useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

export default function ProfilePage() {
  const [hasGroups] = useState(true)
  const [libraryFilter, setLibraryFilter] = useState<"sent" | "received">("sent")
  const [inviteFor, setInviteFor] = useState<string | null>(null)
  const [inviteLink, setInviteLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const createInvite = (group: string) => {
    const token = Math.random().toString(36).slice(2, 10)
    const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com"
    const url = `${origin}/invite/${token}`
    setInviteLink(url)
    setInviteFor(group)
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Profile</h1>

          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="bg-card/60 border border-border">
              <TabsTrigger value="info" className="gap-2 data-[state=active]:bg-amber-500/20 data-[state=active]:border data-[state=active]:border-amber-500">
                <UserCog className="h-4 w-4" />User Information
              </TabsTrigger>
              <TabsTrigger value="circle" className="gap-2 data-[state=active]:bg-amber-500/20 data-[state=active]:border data-[state=active]:border-amber-500">
                <Users className="h-4 w-4" />Your Circle
              </TabsTrigger>
              <TabsTrigger value="calendar" className="gap-2 data-[state=active]:bg-amber-500/20 data-[state=active]:border data-[state=active]:border-amber-500">
                <CalendarDays className="h-4 w-4" />Calendar
              </TabsTrigger>
              <TabsTrigger value="collab" className="gap-2 data-[state=active]:bg-amber-500/20 data-[state=active]:border data-[state=active]:border-amber-500">
                <Share2 className="h-4 w-4" />Collaborations
              </TabsTrigger>
              <TabsTrigger value="library" className="gap-2 data-[state=active]:bg-amber-500/20 data-[state=active]:border data-[state=active]:border-amber-500">
                <Library className="h-4 w-4" />Library
              </TabsTrigger>
            </TabsList>

            {/* User Information */}
            <TabsContent value="info">
              <Card className="p-8 border-border/50 bg-card/60">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-foreground">Name</Label>
                    <Input className="mt-2 bg-background/60 border-border" defaultValue="Sude" />
                  </div>
                  <div>
                    <Label className="text-foreground">Last Name</Label>
                    <Input className="mt-2 bg-background/60 border-border" defaultValue="Guvenç" />
                  </div>
                  <div>
                    <Label className="text-foreground">E-mail Address</Label>
                    <Input className="mt-2 bg-background/60 border-border" defaultValue="sude@example.com" />
                  </div>
                  <div>
                    <Label className="text-foreground">Display Name</Label>
                    <Input className="mt-2 bg-background/60 border-border" defaultValue="guvenc.sude" />
                  </div>
                </div>
                <div className="pt-6">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Save</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Your Circle */}
            <TabsContent value="circle">
              <CircleSection />
            </TabsContent>

            {/* Calendar */}
            <TabsContent value="calendar">
              <Card className="p-8 border-border/50 bg-card/60 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Calendar</h2>
                <CalendarSection />
              </Card>
            </TabsContent>

            {/* Collaborations */}
            <TabsContent value="collab">
              <Card className="p-8 border-border/50 bg-card/60 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Your Groups</h2>
                {hasGroups ? (
                  <div className="space-y-4">
                    {["ODTÜ","Teknokent","Ev Ahalisi"].map((group) => (
                      <div key={group} className="rounded-md border border-border bg-background/60 p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{group}</p>
                          <Button variant="outline" size="sm" onClick={() => createInvite(group)}>Invite</Button>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          {[1,2,3].map((i)=> (
                            <div key={i} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">👤</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-16">
                    <p>Seems like you haven't been a part of a collaborative celebration.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2">
                      <Plus className="h-4 w-4" /> Create a group
                    </div>
                  </div>
                )}
              </Card>
              {inviteFor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/50" onClick={() => setInviteFor(null)} />
                  <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card/90 backdrop-blur p-6">
                    <h3 className="text-lg font-semibold text-foreground">Group link created</h3>
                    <p className="text-sm text-muted-foreground mt-1">Group: {inviteFor}</p>
                    <div className="mt-4 flex items-center gap-2" aria-live="polite">
                      <Input readOnly value={inviteLink} className="bg-background/60 border-border" id="invite-link-input" />
                      <Button
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={async () => {
                          try {
                            if (navigator.clipboard?.writeText) {
                              await navigator.clipboard.writeText(inviteLink)
                            } else {
                              const input = document.getElementById("invite-link-input") as HTMLInputElement | null
                              if (input) {
                                input.select()
                                document.execCommand("copy")
                              }
                            }
                            setCopied(true)
                          } catch {
                            setCopied(false)
                          }
                        }}
                      >
                        {copied ? "Copied" : "Copy link"}
                      </Button>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setInviteFor(null)}>Close</Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Library */}
            <TabsContent value="library">
              <Card className="p-8 border-border/50 bg-card/60 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Library</h2>
                  <div className="relative inline-flex items-center rounded-full bg-background/60 border border-border p-1">
                    <button
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        libraryFilter === "sent" ? "bg-amber-500/20 text-foreground border border-amber-500" : "text-muted-foreground"
                      }`}
                      onClick={() => setLibraryFilter("sent")}
                    >
                      sent
                    </button>
                    <button
                      className={`ml-1 px-3 py-1 text-sm rounded-full transition-colors ${
                        libraryFilter === "received" ? "bg-amber-500/20 text-foreground border border-amber-500" : "text-muted-foreground"
                      }`}
                      onClick={() => setLibraryFilter("received")}
                    >
                      received
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {(libraryFilter === "sent" ? [1,2] : [3,4]).map((i)=> (
                    <div key={i} className="rounded-md border border-border p-4">
                      <h3 className="font-semibold text-foreground mb-3">{libraryFilter === "sent" ? "Bilgesu - Birthday 12/09/2025" : "From Ayşe - Congrats 02/04/2025"}</h3>
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">▶</div>
                        <div className="col-span-2 rounded-md border border-border bg-background/60 p-4 text-sm text-muted-foreground">{libraryFilter === "sent" ? "Happy Birthday to you!!!" : "You did it! So proud of you."}</div>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        {(libraryFilter === "sent" ? ["Ayşe","Fatma"] : ["Me","Ayşe"]).map((n)=> (
                          <div key={n} className="text-center">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">👤</div>
                            <p className="text-xs text-muted-foreground">{n}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function CalendarSection() {
  const [selected, setSelected] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<{ id: number; date: Date; title: string }[]>([
    { id: 1, date: new Date(new Date().getFullYear(), new Date().getMonth(), 12), title: "Alperen - Birthday" },
    { id: 2, date: new Date(new Date().getFullYear(), new Date().getMonth(), 18), title: "Eren - Anniversary" },
    { id: 3, date: new Date(new Date().getFullYear(), new Date().getMonth(), 24), title: "Bilgesu - Graduation" },
  ])
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [hour, setHour] = useState<string>("18")
  const [minute, setMinute] = useState<string>("00")

  const dayHasEvent = (day: Date) => events.some((e) => isSameDay(e.date, day))

  function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  }

  const selectedDayEvents = useMemo(() => {
    if (!selected) return [] as typeof events
    return events.filter((e) => isSameDay(e.date, selected))
  }, [selected, events])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="rounded-md border border-border p-4 bg-background/60">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(d)=>{ setSelected(d); if(d){ setTitle(""); setHour("18"); setMinute("00"); setModalOpen(true);} }}
          modifiers={{ event: dayHasEvent }}
          modifiersClassNames={{ event: "relative" }}
          className="rdp text-foreground"
          styles={{
            caption: { color: "inherit" },
            head_cell: { color: "hsl(var(--muted-foreground))" },
          }}
        />
        {/* Event dots overlay */}
        <style>{`.rdp-day_event {position: relative}
          .rdp-day_event::after{content:'';position:absolute;bottom:6px;left:50%;transform:translateX(-50%);width:6px;height:6px;border-radius:9999px;background:var(--accent);}`}</style>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Saved Dates</p>
          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => {
              if (!selected) return
              setTitle("New Celebration")
              setModalOpen(true)
            }}
          >
            Add
          </Button>
        </div>
        {events.length === 0 && <p className="text-muted-foreground">No saved dates yet.</p>}
        {events.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-md border border-border bg-background/60 px-3 py-2">
            <span className="text-sm text-foreground">{item.title}</span>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline"><Bell className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" onClick={() => setEvents((e) => e.filter((x) => x.id !== item.id))}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {selected && (
          <div className="mt-4 rounded-md border border-border p-3 bg-background/60">
            <p className="text-sm font-medium text-foreground">Events on {selected.toDateString()}</p>
            {selectedDayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground mt-1">No events on this day.</p>
            ) : (
              <ul className="mt-2 list-disc pl-5 text-sm text-foreground">
                {selectedDayEvents.map((e) => (
                  <li key={e.id}>{e.title}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
            <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card/90 backdrop-blur p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Add Event</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Title</Label>
                  <Input className="mt-2 bg-background/60 border-border" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Celebration title" />
                </div>
                <div>
                  <Label className="text-foreground">Time</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Select value={hour} onValueChange={setHour}>
                      <SelectTrigger className="w-24 bg-background/60 border-border"><SelectValue placeholder="HH" /></SelectTrigger>
                      <SelectContent>
                        {Array.from({length:24},(_,i)=>i).map(h=> (
                          <SelectItem key={h} value={`${h}`}>{h.toString().padStart(2,'0')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={minute} onValueChange={setMinute}>
                      <SelectTrigger className="w-24 bg-background/60 border-border"><SelectValue placeholder="MM" /></SelectTrigger>
                      <SelectContent>
                        {Array.from({length:60},(_,i)=>i).map(m=> (
                          <SelectItem key={m} value={`${m}`}>{m.toString().padStart(2,'0')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={()=>setModalOpen(false)}>Cancel</Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={()=>{
                  if(!selected) return
                  const d = new Date(selected)
                  d.setHours(Number(hour))
                  d.setMinutes(Number(minute))
                  setEvents(e=>[...e,{id:Date.now(), date:d, title: title || 'New Celebration'}])
                  setModalOpen(false)
                }}>Save</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CircleSection() {
  const [members, setMembers] = useState<{ id: number; name: string; email: string; image?: string }[]>([
    { id: 1, name: "Ayşe", email: "ayse@example.com" },
    { id: 2, name: "Fatma", email: "fatma@example.com" },
    { id: 3, name: "mom", email: "mom@example.com" },
    { id: 4, name: "dad", email: "dad@example.com" },
    { id: 5, name: "amir", email: "amir@example.com" },
  ])
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState<string | undefined>(undefined)

  return (
    <Card className="p-8 border-border/50 bg-card/60 space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Your Circle</h2>
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        <button
          className="w-20 h-20 rounded-full border-2 border-dashed border-accent/60 text-muted-foreground flex items-center justify-center"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </button>
        {members.map((m) => (
          <div key={m.id} className="text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl overflow-hidden">
              {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : "👤"}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{m.name}</p>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card/90 backdrop-blur p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Add to Your Circle</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Image</Label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:rounded file:border-0 file:bg-accent file:px-3 file:py-2 file:text-accent-foreground file:hover:bg-accent/90"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => setImage(reader.result as string)
                    reader.readAsDataURL(file)
                  }}
                />
                {image && (
                  <div className="mt-3 w-20 h-20 rounded-full overflow-hidden">
                    <img src={image} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <Label className="text-foreground">Name</Label>
                <Input className="mt-2 bg-background/60 border-border" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" />
              </div>
              <div>
                <Label className="text-foreground">Email</Label>
                <Input className="mt-2 bg-background/60 border-border" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email@example.com" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={()=>{
                if(!name || !email) return
                setMembers(m=>[...m,{id:Date.now(), name, email, image}])
                setName("")
                setEmail("")
                setImage(undefined)
                setOpen(false)
              }}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}


