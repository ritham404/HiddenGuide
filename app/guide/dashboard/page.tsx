"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Calendar, MessageCircle, DollarSign, Users, CheckCircle, Clock, Settings } from "lucide-react"
import Link from "next/link"

const mockBookings = [
  {
    id: 1,
    traveler: "Sarah Mitchell",
    date: "2024-01-15",
    time: "09:00",
    duration: 6,
    people: 2,
    status: "pending",
    notes: "Looking for coffee plantation tour and waterfall hike",
    amount: 4800,
  },
  {
    id: 2,
    traveler: "David Chen",
    date: "2024-01-18",
    time: "10:00",
    duration: 4,
    people: 3,
    status: "confirmed",
    notes: "Interested in local culture and hidden spots",
    amount: 3200,
  },
  {
    id: 3,
    traveler: "Priya Sharma",
    date: "2024-01-12",
    time: "08:00",
    duration: 8,
    people: 2,
    status: "completed",
    notes: "Full day tour with photography focus",
    amount: 6400,
  },
]

const mockStats = {
  totalEarnings: 45600,
  thisMonth: 12800,
  totalBookings: 47,
  rating: 4.9,
  responseRate: 98,
}

export default function GuideDashboard() {
  const [activeTab, setActiveTab] = useState("bookings")

  const handleBookingAction = (bookingId: number, action: "accept" | "reject") => {
    console.log(`${action} booking ${bookingId}`)
    // In a real app, this would update the booking status
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold">HiddenGuide</span>
              <Badge variant="secondary">Guide</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/guide/profile">
                <Button variant="ghost">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
              </Link>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ramesh!</h1>
          <p className="text-gray-600">Manage your bookings and grow your guiding business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{mockStats.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+₹{mockStats.thisMonth.toLocaleString()} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">3 pending requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.rating}</div>
              <p className="text-xs text-muted-foreground">Based on 47 reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.responseRate}%</div>
              <p className="text-xs text-muted-foreground">Average response time: 2h</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-6">
              {mockBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {booking.traveler
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{booking.traveler}</CardTitle>
                          <CardDescription>
                            {new Date(booking.date).toLocaleDateString()} at {booking.time} • {booking.duration} hours •{" "}
                            {booking.people} people
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">₹{booking.amount}</div>
                        <Badge
                          variant={
                            booking.status === "pending"
                              ? "default"
                              : booking.status === "confirmed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {booking.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                          {booking.status === "confirmed" && <Calendar className="h-3 w-3 mr-1" />}
                          {booking.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{booking.notes}</p>
                    <div className="flex space-x-2">
                      {booking.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => handleBookingAction(booking.id, "accept")}>
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleBookingAction(booking.id, "reject")}>
                            Decline
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      {booking.status === "confirmed" && (
                        <Button size="sm" variant="outline">
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Availability Calendar</CardTitle>
                <CardDescription>Manage your available dates and times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Calendar component would be implemented here
                  <br />
                  <Button className="mt-4">Set Availability</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>January 2024</span>
                      <span className="font-semibold">₹12,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>December 2023</span>
                      <span className="font-semibold">₹15,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span>November 2023</span>
                      <span className="font-semibold">₹9,200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Sarah Mitchell</div>
                        <div className="text-sm text-gray-600">Jan 12, 2024</div>
                      </div>
                      <span className="font-semibold text-green-600">+₹6,400</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">David Chen</div>
                        <div className="text-sm text-gray-600">Jan 10, 2024</div>
                      </div>
                      <span className="font-semibold text-green-600">+₹3,200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
