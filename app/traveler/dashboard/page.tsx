"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Filter } from "lucide-react"
import Link from "next/link"

const mockGuides = [
  {
    id: 1,
    name: "Ramesh Kumar",
    location: "Chikmagalur, Karnataka",
    rating: 4.9,
    reviews: 47,
    hourlyRate: 800,
    specialties: ["Coffee Plantation Tours", "Waterfall Hikes", "Local Culture"],
    languages: ["English", "Hindi", "Kannada"],
    avatar: "/placeholder.svg?height=100&width=100",
    description:
      "Born and raised in Chikmagalur, I know every hidden waterfall and the best coffee estates. Let me show you the real beauty of my hometown!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Goa",
    rating: 4.8,
    reviews: 32,
    hourlyRate: 1200,
    specialties: ["Beach Tours", "Portuguese Heritage", "Local Cuisine"],
    languages: ["English", "Hindi", "Konkani"],
    avatar: "/placeholder.svg?height=100&width=100",
    description:
      "Explore Goa beyond the beaches! I'll take you to hidden churches, local markets, and authentic Goan restaurants.",
  },
  {
    id: 3,
    name: "Arjun Patel",
    location: "Udaipur, Rajasthan",
    rating: 4.7,
    reviews: 28,
    hourlyRate: 1000,
    specialties: ["Palace Tours", "Desert Safari", "Rajasthani Culture"],
    languages: ["English", "Hindi", "Rajasthani"],
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Discover the royal heritage of Udaipur with stories passed down through generations in my family.",
  },
]

export default function TravelerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold">HiddenGuide</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/traveler/bookings">
                <Button variant="ghost">My Bookings</Button>
              </Link>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Guide</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Where do you want to explore? (e.g., Chikmagalur, Goa, Udaipur)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={guide.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {guide.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{guide.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {guide.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({guide.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{guide.description}</CardDescription>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {guide.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Languages: {guide.languages.join(", ")}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">₹{guide.hourlyRate}/hour</div>
                  <div className="space-x-2">
                    <Link href={`/traveler/guide/${guide.id}`}>
                      <Button size="sm">View Profile</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
