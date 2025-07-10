"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Star, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

const mockGuide = {
  id: 1,
  name: "Ramesh Kumar",
  location: "Chikmagalur, Karnataka",
  rating: 4.9,
  reviews: 47,
  hourlyRate: 800,
  dayRate: 5000,
  specialties: ["Coffee Plantation Tours", "Waterfall Hikes", "Local Culture"],
  languages: ["English", "Hindi", "Kannada"],
  avatar: "/placeholder.svg?height=150&width=150",
  description:
    "Born and raised in Chikmagalur, I know every hidden waterfall and the best coffee estates. Let me show you the real beauty of my hometown!",
  longDescription:
    "I've been guiding travelers for over 8 years and have explored every corner of Chikmagalur. My passion is sharing the stories behind our coffee culture, taking you to waterfalls that aren't on any map, and introducing you to local families who have been growing coffee for generations. Whether you want adventure, culture, or relaxation, I'll customize the perfect experience for you.",
  hiddenSpots: [
    "Secret waterfall accessible only by a 2km trek",
    "Family-owned coffee estate with 100+ year history",
    "Sunrise viewpoint known only to locals",
    "Traditional Malnad cuisine at grandmother's kitchen",
  ],
}

const mockReviews = [
  {
    id: 1,
    traveler: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Ramesh showed us the most incredible hidden waterfall! His knowledge of coffee cultivation was fascinating. Highly recommend!",
  },
  {
    id: 2,
    traveler: "David L.",
    rating: 5,
    date: "1 month ago",
    comment:
      "Best guide experience ever! Ramesh took us to places we never would have found on our own. The local food recommendations were spot on.",
  },
  {
    id: 3,
    traveler: "Priya K.",
    rating: 4,
    date: "2 months ago",
    comment:
      "Great day exploring Chikmagalur with Ramesh. Very knowledgeable and friendly. The coffee plantation tour was educational and fun.",
  },
]

export default function GuideProfile() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    duration: "4",
    people: "2",
    notes: "",
  })

  const handleBookingSubmit = () => {
    console.log("Booking request:", bookingData)
    // In a real app, this would send the booking request
    alert("Booking request sent! Ramesh will respond within 24 hours.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/traveler/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold">HiddenGuide</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guide Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={mockGuide.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {mockGuide.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{mockGuide.name}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockGuide.location}
                    </div>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-medium text-lg">{mockGuide.rating}</span>
                      <span className="text-gray-600 ml-2">({mockGuide.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mockGuide.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About Me</h3>
                    <p className="text-gray-700">{mockGuide.longDescription}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <p className="text-gray-700">{mockGuide.languages.join(", ")}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">My Hidden Spots</h3>
                    <ul className="space-y-1">
                      {mockGuide.hiddenSpots.map((spot, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          {spot}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({mockReviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.traveler}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book with {mockGuide.name}</CardTitle>
                <CardDescription>
                  <div className="space-y-2">
                    <div>₹{mockGuide.hourlyRate}/hour</div>
                    <div>₹{mockGuide.dayRate}/full day</div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Send Booking Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book with {mockGuide.name}</DialogTitle>
                      <DialogDescription>
                        Fill in your details and we'll send your request to the guide
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={bookingData.date}
                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={bookingData.time}
                            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">Duration (hours)</Label>
                          <Input
                            id="duration"
                            type="number"
                            min="1"
                            max="12"
                            value={bookingData.duration}
                            onChange={(e) => setBookingData({ ...bookingData, duration: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="people">Number of People</Label>
                          <Input
                            id="people"
                            type="number"
                            min="1"
                            max="10"
                            value={bookingData.people}
                            onChange={(e) => setBookingData({ ...bookingData, people: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Special Requests (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="e.g., Looking for a hiking experience, interested in coffee culture..."
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                        />
                      </div>

                      <Button onClick={handleBookingSubmit} className="w-full">
                        Send Request
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Have questions? Send a message to {mockGuide.name}</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
