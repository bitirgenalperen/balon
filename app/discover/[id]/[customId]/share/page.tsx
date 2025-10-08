"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Gift, 
  Calendar, 
  Heart, 
  Play,
  Package,
  Circle,
  Heart as HeartIcon,
  Handshake,
  Palette,
  PartyPopper
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function ShareGiftPage() {
  const params = useParams()
  const id = params.id as string
  const customId = params.customId as string
  
  const [selectedWrap, setSelectedWrap] = useState<string | null>("present-box")
  const [revealDate, setRevealDate] = useState("")
  const [personalMessage, setPersonalMessage] = useState("Happy Birthday! Can't wait for you to see this ✨")

  const wrapOptions = [
    {
      id: "present-box",
      title: "Present Box",
      description: "Unwrap like a gift box",
      icon: Package,
      color: "bg-yellow-500"
    },
    {
      id: "balloon-pop",
      title: "Balloon Pop",
      description: "Pop balloons to reveal",
      icon: Circle,
      color: "bg-red-500"
    },
    {
      id: "hearts-opening",
      title: "Hearts Opening",
      description: "Hearts bloom and open",
      icon: HeartIcon,
      color: "bg-pink-500"
    },
    {
      id: "shake-reveal",
      title: "Shake Reveal",
      description: "Shake device to reveal",
      icon: Handshake,
      color: "bg-yellow-600"
    },
    {
      id: "scratch-reveal",
      title: "Scratch Reveal",
      description: "Scratch to uncover",
      icon: Palette,
      color: "bg-purple-500"
    },
    {
      id: "confetti-burst",
      title: "Confetti Burst",
      description: "Confetti explosion reveal",
      icon: PartyPopper,
      color: "bg-blue-500"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href={`/discover/${id}/${customId}`}>
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Video
            </Button>
          </Link>

          {/* Video Preview Section */}
          <Card className="p-8 mb-8 border-border/50">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Play className="h-10 w-10 text-primary ml-1" />
                </div>
                <p className="text-foreground font-medium">Your celebration video</p>
              </div>
              
              {/* Decorative dots */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-pink-400 rounded-full"></div>
            </div>
          </Card>

          {/* Wrap It Up Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Wrap It Up</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wrapOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <Card 
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      selectedWrap === option.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedWrap(option.id)}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Set Countdown Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Set Countdown</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reveal Date Card */}
              <Card className="p-6 border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Reveal Date</h3>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={revealDate}
                    onChange={(e) => setRevealDate(e.target.value)}
                    className="pl-10"
                    placeholder="Select reveal date"
                  />
                </div>
              </Card>

              {/* Countdown Preview Card */}
              <Card className="p-6 border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Countdown Preview</h3>
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-6 text-center">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {revealDate ? "3 days, 12 hours left" : "-- days, -- hours left"}
                  </p>
                  <p className="text-sm text-muted-foreground">Until the big reveal</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Personal Message Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Personal Message</h2>
            </div>

            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Message to Recipient</h3>
              <Textarea
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                placeholder="Happy Birthday! Can't wait for you to see this ✨"
                className="min-h-[120px] mb-3"
              />
              <p className="text-sm text-muted-foreground">
                This message will appear before the reveal animation
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold h-12"
              onClick={() => {
                // Handle share functionality
                console.log('Share gift created')
              }}
            >
              Create Gift Link
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-border hover:bg-muted text-foreground font-semibold h-12"
              onClick={() => {
                // Handle preview functionality
                console.log('Preview gift')
              }}
            >
              Preview Gift
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
