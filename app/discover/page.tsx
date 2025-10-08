"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Sparkles, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

// Sample video data - replace with actual data from your API
const videoData = [
  [
    {
      id: "a1b2c3d4e5f6",
      title: "Birthday Celebration",
      thumbnail: "/video-generate/birthday/birthday_female_room.jpeg",
      videoUrl: "/video-generate/birthday/birthday_female_room.mp4"
    },
    {
      id: "c1blc3d4e5f6",
      title: "Birthday Celebration",
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



type VideoType = {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
}

// Extract first video from each category for trending preview
const previewVideos = videoData
  .map(category => category[0])
  .filter((video): video is VideoType => video && !!video.id) // Filter out empty entries

// Organize videos by category
const categories = [
  {
    name: "Birthday",
    videos: videoData[0] || [], // Birthday videos
    icon: "🎂"
  },
  {
    name: "Anniversary", 
    videos: videoData[1] || [], // Romantic videos
    icon: "💕"
  },
  {
    name: "Sports",
    videos: videoData[2] || [], // Football videos
    icon: "⚽"
  },
  {
    name: "Halloween",
    videos: videoData[3] || [], // Halloween videos
    icon: "🎃"
  },
  {
    name: "New Year",
    videos: videoData[4] || [], // New Year videos
    icon: "🎆"
  }
]

function VideoCard({ video }: { video: VideoType }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="group overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[9/16] relative bg-muted">
        <video
          src={video.videoUrl}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay={isHovered}
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause()
            e.currentTarget.currentTime = 0
          }}
        />
        {/* Use Template Button - appears on hover */}
        <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link href={`/discover/${video.id}`}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Use Template
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {video.title}
        </h3>
      </div>
    </Card>
  )
}

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">Discover</h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your celebrations with custom video messages and discover perfect gift ideas that make every
              special day unforgettable.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4"
            >
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trending Templates Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Trending Templates</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {previewVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>

          {/* Category Sections */}
          {categories.map((category) => (
            <div key={category.name} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-3xl font-bold text-foreground">{category.name}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}