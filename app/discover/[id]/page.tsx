"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Wand2, Palette, Type, Music, Search, Flame, Lightbulb, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

// Sample video data - in production, fetch this based on the ID from API
const allVideos = [
  [
    {
      id: "a1b2c3d4e5f6",
      title: "Birthday Female Room",
      thumbnail: "/video-generate/birthday/birthday_female_room.jpeg",
      videoUrl: "/video-generate/birthday/birthday_female_room.mp4",
      background: [
        { name: "Room", icon: "🏠", selected: true },
        { name: "Clouds", icon: "☁️", selected: false },
        { name: "Garden", icon: "🌳", selected: false },
      ],
      decorativeItems: [
        { name: "Balloons", icon: "🎈", selected: true },
        { name: "Confetti", icon: "🎊", selected: false },
        { name: "Gifts", icon: "🎁", selected: false }
      ]
    },
    {
      id: "c1blc3d4e5f6",
      title: "Birthday Male Clouds",
      thumbnail: "/video-generate/birthday/birthday_male_clouds.jpeg",
      videoUrl: "/video-generate/birthday/birthday_male_clouds.mp4",
      background: [
        { name: "Room", icon: "🏠", selected: true },
        { name: "Clouds", icon: "☁️", selected: false },
        { name: "Garden", icon: "🌳", selected: false },
      ],
      decorativeItems: [
        { name: "Balloons", icon: "🎈", selected: true },
        { name: "Confetti", icon: "🎊", selected: false },
        { name: "Gifts", icon: "🎁", selected: false }
      ]
    }
  ],
  [ 
    {
      id: "3m4n5o6p7q8r",
      title: "Romantic Petersburg",
      thumbnail: "/video-generate/romantic/romantic_petersburg.jpeg",
      videoUrl: "/video-generate/romantic/romantic_petersburg.mp4",
      background: [
        { name: "St. Petersburg", icon: "🏰", selected: true },
        { name: "Eiffel Tower", icon: "🗼", selected: false },
        { name: "Trevi Fountain", icon: "💦", selected: false }
      ],
      decorativeItems: [
        { name: "Cafe", icon: "☕", selected: true },
        { name: "Wine", icon: "🍷", selected: false },
        { name: "Dinner", icon: "🍽️", selected: false }
      ]
    },
    {
      id: "7g8h9i0j1k2l",
      title: "Romantic Paris",
      thumbnail: "/video-generate/romantic/romantic_paris.jpeg",
      videoUrl: "/video-generate/romantic/romantic_paris.mp4",
      background: [
        { name: "St. Petersburg", icon: "🏰", selected: true },
        { name: "Eiffel Tower", icon: "🗼", selected: false },
        { name: "Trevi Fountain", icon: "💦", selected: false }
      ],
      decorativeItems: [
        { name: "Cafe", icon: "☕", selected: true },
        { name: "Wine", icon: "🍷", selected: false },
        { name: "Dinner", icon: "🍽️", selected: false }
      ]
    }
  ],
  [
    {
      id: "f1f2f3f4f5f6",
      title: "BJK Celebration",
      thumbnail: "/video-generate/football/football_bjk.jpeg",
      videoUrl: "/video-generate/football/football_bjk.mp4",
      background: [
        { name: "Stadium", icon: "🏟️", selected: true },
        { name: "Field", icon: "⚽", selected: false },
        { name: "Home", icon: "🏠", selected: false }
      ],
      decorativeItems: [
        { name: "Beşiktaş", icon: "", selected: true },
        { name: "Trabzonspor", icon: "", selected: false },
        { name: "Galatasaray", icon: "", selected: false }
      ]
    },
    {
      id: "f7f8f9f0f1f2",
      title: "Trabzonspor Celebration",
      thumbnail: "/video-generate/football/football_trabzonspor.jpeg",
      videoUrl: "/video-generate/football/football_trabzonspor.mp4",
      background: [
        { name: "Stadium", icon: "🏟️", selected: true },
        { name: "Field", icon: "⚽", selected: false },
        { name: "Home", icon: "🏠", selected: false }
      ],
      decorativeItems: [
        { name: "Scarf", icon: "🧣", selected: false },
        { name: "Trophy", icon: "🏆", selected: true },
        { name: "Flag", icon: "🚩", selected: false }
      ]
    }
  ],
  [
    {
      id: "h1h2h3h4h5h6",
      title: "Halloween Celebration",
      thumbnail: "/video-generate/halloween/halloween_table.jpeg",
      videoUrl: "/video-generate/halloween/halloween_table.mp4",
      background: [
        { name: "Haunted House", icon: "🏚️", selected: true },
        { name: "Graveyard", icon: "⚰️", selected: false },
        { name: "Forest", icon: "🌲", selected: false }
      ],
      decorativeItems: [
        { name: "Pumpkin", icon: "🎃", selected: true },
        { name: "Ghost", icon: "👻", selected: false },
        { name: "Bat", icon: "🦇", selected: false }
      ]
    }
  ],
  [
    {
      id: "n1n2n3n4n5n6",
      title: "Newyear Celebration",
      thumbnail: "/video-generate/newyear/newyear_fly.jpeg",
      videoUrl: "/video-generate/newyear/newyear_fly.mp4",
      background: [
        { name: "City Lights", icon: "🌃", selected: true },
        { name: "Sky", icon: "🌤️", selected: false },
        { name: "Party Hall", icon: "🎪", selected: false }
      ],
      decorativeItems: [
        { name: "Fireworks", icon: "🎆", selected: true },
        { name: "Champagne", icon: "🍾", selected: false },
        { name: "Clock", icon: "🕛", selected: false }
      ]
    }
  ]
]

// Flatten the array and create a lookup object by ID
const videoData: { [key: string]: any } = {}
allVideos.forEach(category => {
  category.forEach(video => {
    if (video && video.id) {
      videoData[video.id] = video
    }
  })
})

export default function VideoEditPage() {
  const params = useParams()
  const id = params.id as string
  const video = videoData[id]
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  
  // Initialize selected items based on video data
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    video?.background?.find((item: any) => item.selected)?.name || null
  )
  const [selectedDecorativeItem, setSelectedDecorativeItem] = useState<string | null>(
    video?.decorativeItems?.find((item: any) => item.selected)?.name || null
  )

  const handleGenerateVideo = () => {
    if (!uploadedImage) return
    
    setIsGenerating(true)
    setProgress(0)
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsGenerating(false)
            setProgress(0)
            // Generate a random custom ID and redirect
            const customId = Math.random().toString(36).substring(2, 15)
            window.location.href = `/discover/${id}/${customId}`
          }, 1000)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-muted-foreground">Video not found</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/discover">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          {/* Main Layout: 1/3 left sidebar, 2/3 right video */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Edit Options (1/3 width) */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-border/50 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-foreground">{video.title}</h2>

                {/* Image Upload Section */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label className="text-foreground mb-2 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Label>
                    {uploadedImage ? (
                      <div className="relative">
                        <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
                          <div className="flex items-center gap-4">
                            <img 
                              src={uploadedImage} 
                              alt="Uploaded" 
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">Image uploaded</p>
                              <p className="text-xs text-muted-foreground">Ready to use in your video</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setUploadedImage(null)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*'
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (e) => {
                                setUploadedImage(e.target?.result as string)
                              }
                              reader.readAsDataURL(file)
                            }
                          }
                          input.click()
                        }}
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Customize Scene Section */}
                <div className="space-y-6">
                  {/* Background Section */}
                  {video.background && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">Background</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {video.background.map((item: any) => (
                          <button
                            key={item.name}
                            onClick={() => setSelectedBackground(item.name)}
                            className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-lg transition-colors ${
                              selectedBackground === item.name
                                ? "bg-primary/10 border-primary" 
                                : "bg-background border-border hover:border-primary/50"
                            }`}
                          >
                            <span className="text-2xl mb-1">{item.icon}</span>
                            <span className="text-xs text-center leading-tight">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Decorative Items Section */}
                  {video.decorativeItems && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">Decorative Items</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {video.decorativeItems.map((item: any) => (
                          <button
                            key={item.name}
                            onClick={() => setSelectedDecorativeItem(item.name)}
                            className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-lg transition-colors ${
                              selectedDecorativeItem === item.name
                                ? "bg-accent/10 border-accent" 
                                : "bg-background border-border hover:border-primary/50"
                            }`}
                          >
                            <span className="text-2xl mb-1">{item.icon}</span>
                            <span className="text-xs text-center leading-tight">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Music Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Music className="h-5 w-5 text-primary" />
                      Add Music
                    </h3>
                    
                    {/* Search Bar */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search music tracks..." 
                        className="pl-10 bg-background/50 border-border"
                      />
                    </div>

                    {/* Trending Section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2 text-foreground flex items-center gap-2">
                        <Flame className="h-4 w-4 text-secondary" />
                        Trending
                      </h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {[
                          { title: "Happy Birthday Classic", subtitle: "Celebration Mix", duration: "0:45" },
                          { title: "Upbeat Pop Celebration", subtitle: "Party Vibes", duration: "1:20" }
                        ].map((track) => (
                          <div key={track.title} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                            <div>
                              <p className="text-sm font-medium text-foreground">{track.title}</p>
                              <p className="text-xs text-muted-foreground">{track.subtitle}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{track.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions Section */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-foreground flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-accent" />
                        Suggestions
                      </h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {[
                          { title: "Romantic Piano", subtitle: "Love Songs", duration: "1:15" },
                          { title: "Family Moments", subtitle: "Heartwarming", duration: "0:55" }
                        ].map((track) => (
                          <div key={track.title} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                            <div>
                              <p className="text-sm font-medium text-foreground">{track.title}</p>
                              <p className="text-xs text-muted-foreground">{track.subtitle}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{track.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button 
                    className="w-full gap-2"
                    disabled={!uploadedImage}
                    variant={!uploadedImage ? "outline" : "default"}
                    onClick={handleGenerateVideo}
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate Video
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save as Draft
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Side - Video Display (2/3 width) */}
            <div className="lg:col-span-2">
              <Card className="p-6 border-border/50 h-[calc(100vh-8rem)]">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Video Preview</h3>
                <div className="h-[calc(100%-3rem)] flex items-center justify-center">
                  <div className="h-full aspect-[9/16] bg-muted rounded-lg overflow-hidden">
                    <video
                      src={video.videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      loop
                      autoPlay
                      muted
                      playsInline
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Video Generation Modal */}
      {isGenerating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-semibold text-center text-foreground mb-2">
              Creating Your Video
            </h3>
            
            {/* Subtitle */}
            <p className="text-center text-muted-foreground mb-6">
              AI is working its magic...
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Progress Percentage */}
            <p className="text-center text-foreground font-medium">
              {Math.round(progress)}% complete
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

