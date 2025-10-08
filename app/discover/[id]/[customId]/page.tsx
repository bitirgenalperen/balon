"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Scissors, Type, ArrowLeft, Share, Download } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

// Sample video data - same structure as in the edit page
const allVideos = [
  [
    {
      id: "a1b2c3d4e5f6",
      title: "Birthday Female Room",
      thumbnail: "/video-generate/birthday/birthday_female_room.jpeg",
      videoUrl: "/video-generate/birthday/birthday_female_room.mp4"
    },
    {
      id: "c1blc3d4e5f6",
      title: "Birthday Male Clouds",
      thumbnail: "/video-generate/birthday/birthday_male_clouds.jpeg",
      videoUrl: "/video-generate/birthday/birthday_male_clouds.mp4"
    }
  ],
  [ 
    {
      id: "3m4n5o6p7q8r",
      title: "Romantic Petersburg",
      thumbnail: "/video-generate/romantic/romantic_petersburg.jpeg",
      videoUrl: "/video-generate/romantic/romantic_petersburg.mp4"
    },
    {
      id: "7g8h9i0j1k2l",
      title: "Romantic Paris",
      thumbnail: "/video-generate/romantic/romantic_paris.jpeg",
      videoUrl: "/video-generate/romantic/romantic_paris.mp4"
    }
  ],
  [
    {
      id: "f1f2f3f4f5f6",
      title: "BJK Celebration",
      thumbnail: "/video-generate/football/football_bjk.jpeg",
      videoUrl: "/video-generate/football/football_bjk.mp4"
    },
    {
      id: "f7f8f9f0f1f2",
      title: "Trabzonspor Celebration",
      thumbnail: "/video-generate/football/football_trabzonspor.jpeg",
      videoUrl: "/video-generate/football/football_trabzonspor.mp4"
    }
  ],
  [
    {
      id: "h1h2h3h4h5h6",
      title: "Halloween Celebration",
      thumbnail: "/video-generate/halloween/halloween_table.jpeg",
      videoUrl: "/video-generate/halloween/halloween_table.mp4"
    }
  ],
  [
    {
      id: "n1n2n3n4n5n6",
      title: "Newyear Celebration",
      thumbnail: "/video-generate/newyear/newyear_fly.jpeg",
      videoUrl: "/video-generate/newyear/newyear_fly.mp4"
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

// Get all videos in order
const allVideosFlat = allVideos.flat().filter(video => video && video.id)

export default function CustomGenerationPage() {
  const params = useParams()
  const id = params.id as string
  const customId = params.customId as string
  
  const [videoStart, setVideoStart] = useState(0)
  const [videoEnd, setVideoEnd] = useState(60)
  const [personalMessage, setPersonalMessage] = useState("")
  
  // Get the next video in the sequence
  const currentVideoIndex = allVideosFlat.findIndex(video => video.id === id)
  const nextVideo = allVideosFlat[(currentVideoIndex + 1) % allVideosFlat.length]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href={`/discover/${id}`}>
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Edit
            </Button>
          </Link>

          {/* Main Layout: 2/3 left video area, 1/3 right sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Video Player and Timeline (2/3 width) */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-border/50">
                {/* Video Player */}
                <div className="h-[60vh] aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-8 relative overflow-hidden">
                  <video
                    src={nextVideo?.videoUrl}
                    className="w-full h-full object-cover rounded-lg"
                    controls
                    loop
                    autoPlay
                    muted
                    playsInline
                  />
                  
                  {/* Decorative dots */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-3 h-3 bg-pink-400 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Timeline</Label>
                  <div className="relative">
                    <div className="w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-full">
                      <div 
                        className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-primary shadow-md transform -translate-y-1"
                        style={{ left: `${(videoStart / 60) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0:00</span>
                      <span>0:15</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Side - Edit Controls (1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Edit Video Section */}
              <Card className="p-6 border-border/50">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Scissors className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Edit Video</h3>
                </div>

                {/* Video Timeline */}
                <div className="space-y-4 mb-6">
                  <Label className="text-foreground font-medium">Video Timeline</Label>
                  <div className="w-full h-3 bg-gradient-to-r from-green-500 to-secondary rounded-full relative">
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0:00</span>
                      <span>0:15</span>
                      <span>0:30</span>
                      <span>0:45</span>
                      <span>1:00</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Start: {videoStart}s
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      End: {videoEnd}s
                    </span>
                  </div>
                </div>

                {/* Cut Controls */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-foreground text-sm">Start Cut</Label>
                    <div className="mt-2">
                      <div className="w-full h-2 bg-muted rounded-full relative">
                        <div 
                          className="absolute top-0 w-4 h-4 bg-white border-2 border-green-500 rounded-full shadow-md transform -translate-y-1 cursor-pointer"
                          style={{ left: `${(videoStart / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground text-sm">End Cut</Label>
                    <div className="mt-2">
                      <div className="w-full h-2 bg-muted rounded-full relative">
                        <div 
                          className="absolute top-0 w-4 h-4 bg-white border-2 border-red-500 rounded-full shadow-md transform -translate-y-1 cursor-pointer"
                          style={{ left: `${(videoEnd / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-primary font-medium text-sm">
                      Selected Duration: {videoEnd - videoStart}s
                    </p>
                  </div>
                </div>
              </Card>

              {/* Add Personal Message Section */}
              <Card className="p-6 border-border/50">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Type className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Add Personal Message</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-foreground text-sm">Personal Message</Label>
                    <Input 
                      placeholder="Enter your personal message..."
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Share as Gift Button */}
                <Link href={`/discover/${id}/${customId}/share`}>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold h-12 gap-3"
                  >
                    <Share className="h-5 w-5" />
                    Share as Gift
                  </Button>
                </Link>

                {/* Download Video Button */}
                <Button 
                  variant="outline"
                  className="w-full bg-white border-border hover:bg-muted text-foreground font-semibold h-12 gap-3"
                  onClick={() => {
                    // Handle download functionality
                    console.log('Download video clicked')
                  }}
                >
                  <Download className="h-5 w-5" />
                  Download Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
