"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Heart, Star, Search, Filter, ExternalLink } from "lucide-react"

const giftCategories = [
  {
    id: "birthday",
    title: "Birthday Gifts",
    icon: Gift,
    color: "primary",
    gifts: [
      {
        name: "Personalized Photo Album",
        price: "$25-45",
        description: "Custom photo book with memories",
        rating: 4.8,
      },
      {
        name: "Experience Day Voucher",
        price: "$50-200",
        description: "Adventure or relaxation experiences",
        rating: 4.9,
      },
      { name: "Custom Star Map", price: "$30-60", description: "Star alignment from a special date", rating: 4.7 },
      { name: "Subscription Box", price: "$20-50/month", description: "Monthly curated surprises", rating: 4.6 },
    ],
  },
  {
    id: "anniversary",
    title: "Anniversary Gifts",
    icon: Heart,
    color: "secondary",
    gifts: [
      {
        name: "Custom Couple Portrait",
        price: "$40-80",
        description: "Artistic illustration of the couple",
        rating: 4.9,
      },
      { name: "Memory Jar", price: "$15-30", description: "Jar filled with shared memories", rating: 4.8 },
      { name: "Weekend Getaway", price: "$200-500", description: "Romantic escape for two", rating: 4.9 },
      { name: "Engraved Jewelry", price: "$50-150", description: "Personalized with special date", rating: 4.7 },
    ],
  },
  {
    id: "graduation",
    title: "Graduation Gifts",
    icon: Star,
    color: "accent",
    gifts: [
      {
        name: "Professional Portfolio",
        price: "$30-60",
        description: "Elegant portfolio for job hunting",
        rating: 4.7,
      },
      { name: "Inspirational Book Set", price: "$25-50", description: "Books for personal growth", rating: 4.6 },
      { name: "Tech Accessories", price: "$40-120", description: "Laptop stand, wireless charger, etc.", rating: 4.8 },
      { name: "Celebration Dinner", price: "$50-150", description: "Special meal at favorite restaurant", rating: 4.9 },
    ],
  },
]

export function GiftCategories() {
  const [selectedCategory, setSelectedCategory] = useState("birthday")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const currentCategory = giftCategories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search and Filters */}
      <Card className="p-6 mb-8 border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for gift ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-25">Under $25</SelectItem>
              <SelectItem value="25-50">$25 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="over-100">Over $100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {giftCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {category.title}
            </Button>
          )
        })}
      </div>

      {/* Gift Grid */}
      {currentCategory && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 bg-${currentCategory.color}/10 rounded-full flex items-center justify-center`}>
              <currentCategory.icon className={`h-5 w-5 text-${currentCategory.color}`} />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{currentCategory.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory.gifts.map((gift, index) => (
              <Card
                key={index}
                className="p-6 hover:bg-card/80 transition-all duration-300 hover:scale-105 border-border/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{gift.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {gift.price}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{gift.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-foreground">{gift.rating}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Find
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Celebration Ideas Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Celebration Ideas</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Party Planning Tips</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Plan decorations that match the recipient's personality</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <span>Create a playlist of their favorite songs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <span>Prepare a memory sharing activity</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Document the celebration with photos and videos</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-foreground">DIY Celebration Ideas</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <span>Create a custom photo wall or timeline</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <span>Make personalized party favors</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Design custom invitations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <span>Set up a themed photo booth</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
