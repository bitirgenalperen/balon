"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Play, Sparkles, Upload, Wand2 } from "lucide-react"

export function VideoGenerationForm() {
  const [formData, setFormData] = useState({
    recipientName: "",
    occasion: "",
    personalMessage: "",
    videoStyle: "",
    duration: "",
  })

  const occasions = [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Graduation",
    "Promotion",
    "New Baby",
    "Retirement",
    "Holiday",
    "Thank You",
    "Congratulations",
  ]

  const videoStyles = [
    "Animated Celebration",
    "Photo Slideshow",
    "Text Animation",
    "Confetti & Balloons",
    "Elegant Minimal",
    "Fun & Playful",
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="p-8 border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Wand2 className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Create Your Video</h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="recipient" className="text-sm font-medium text-foreground">
                Recipient Name
              </Label>
              <Input
                id="recipient"
                placeholder="Who is this video for?"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="occasion" className="text-sm font-medium text-foreground">
                Occasion
              </Label>
              <Select
                value={formData.occasion}
                onValueChange={(value) => setFormData({ ...formData, occasion: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select an occasion" />
                </SelectTrigger>
                <SelectContent>
                  {occasions.map((occasion) => (
                    <SelectItem key={occasion} value={occasion.toLowerCase()}>
                      {occasion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Personal Message
              </Label>
              <Textarea
                id="message"
                placeholder="Write your heartfelt message here..."
                value={formData.personalMessage}
                onChange={(e) => setFormData({ ...formData, personalMessage: e.target.value })}
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="style" className="text-sm font-medium text-foreground">
                Video Style
              </Label>
              <Select
                value={formData.videoStyle}
                onValueChange={(value) => setFormData({ ...formData, videoStyle: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a style" />
                </SelectTrigger>
                <SelectContent>
                  {videoStyles.map((style) => (
                    <SelectItem key={style} value={style.toLowerCase().replace(/\s+/g, "-")}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium text-foreground">
                Video Duration
              </Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30s">30 seconds</SelectItem>
                  <SelectItem value="60s">1 minute</SelectItem>
                  <SelectItem value="90s">1.5 minutes</SelectItem>
                  <SelectItem value="120s">2 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-3">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Video
              </Button>
            </div>
          </div>
        </Card>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card className="p-8 border-border/50">
            <h3 className="text-xl font-bold mb-4 text-foreground">Video Preview</h3>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your video preview will appear here</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
              <Button variant="outline" size="sm">
                Add Music
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-border/50">
            <h4 className="font-semibold mb-3 text-foreground">Popular Features</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">AI Voice Generation</Badge>
              <Badge variant="secondary">Custom Animations</Badge>
              <Badge variant="secondary">Photo Integration</Badge>
              <Badge variant="secondary">Music Library</Badge>
              <Badge variant="secondary">HD Quality</Badge>
              <Badge variant="secondary">Quick Export</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
