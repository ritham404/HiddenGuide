"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MapPin, Users, AlertTriangle, TrendingUp, Search, Shield, CheckCircle, XCircle } from "lucide-react"

const mockStats = {
  totalUsers: 1247,
  totalGuides: 89,
  totalTravelers: 1158,
  pendingApprovals: 12,
  totalBookings: 456,
  monthlyGrowth: 23,
}

const mockPendingGuides = [
  {
    id: 1,
    name: "Arjun Mehta",
    location: "Jaipur, Rajasthan",
    email: "arjun.mehta@email.com",
    joinDate: "2024-01-10",
    specialties: ["Heritage Tours", "Desert Safari"],
    idVerified: true,
  },
  {
    id: 2,
    name: "Kavya Nair",
    location: "Kochi, Kerala",
    email: "kavya.nair@email.com",
    joinDate: "2024-01-12",
    specialties: ["Backwater Tours", "Spice Gardens"],
    idVerified: false,
  },
]

const mockReports = [
  {
    id: 1,
    reporter: "Sarah M.",
    reported: "Guide: Ramesh Kumar",
    reason: "Late arrival",
    date: "2024-01-10",
    status: "investigating",
  },
  {
    id: 2,
    reporter: "David L.",
    reported: "Traveler: John Doe",
    reason: "Inappropriate behavior",
    date: "2024-01-08",
    status: "resolved",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleGuideApproval = (guideId: number, action: "approve" | "reject") => {
    console.log(`${action} guide ${guideId}`)
    // In a real app, this would update the guide status
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
              <Badge variant="destructive">Admin</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." className="pl-10 w-64" />
              </div>
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage the HiddenGuide platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.totalGuides} guides, {mockStats.totalTravelers} travelers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Guide applications awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">+{mockStats.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Good</div>
              <p className="text-xs text-muted-foreground">2 active reports to review</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New guide registered: Kavya Nair</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Booking completed: Sarah M. → Ramesh K.</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Report filed: Late arrival issue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Review Guide Applications
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Handle Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Guide Approvals</CardTitle>
                  <CardDescription>Review and approve new guide applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPendingGuides.map((guide) => (
                      <div key={guide.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {guide.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{guide.name}</div>
                            <div className="text-sm text-gray-600">{guide.location}</div>
                            <div className="text-sm text-gray-600">{guide.email}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              {guide.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Applied: {guide.joinDate}</div>
                            <div className="flex items-center mt-1">
                              {guide.idVerified ? (
                                <Badge variant="default" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  ID Verified
                                </Badge>
                              ) : (
                                <Badge variant="destructive" className="text-xs">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  ID Pending
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleGuideApproval(guide.id, "approve")}>
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleGuideApproval(guide.id, "reject")}>
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
                <CardDescription>Review and resolve user-reported issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{report.reason}</div>
                        <div className="text-sm text-gray-600">
                          Reported by {report.reporter} against {report.reported}
                        </div>
                        <div className="text-sm text-gray-600">Date: {report.date}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={report.status === "resolved" ? "default" : "destructive"}>
                          {report.status}
                        </Badge>
                        {report.status === "investigating" && (
                          <div className="space-x-2">
                            <Button size="sm">Resolve</Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    Analytics charts would be implemented here
                    <br />
                    <span className="text-sm">User registration trends, booking patterns, etc.</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Destinations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Goa</span>
                      <span className="font-semibold">156 bookings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chikmagalur</span>
                      <span className="font-semibold">89 bookings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Udaipur</span>
                      <span className="font-semibold">67 bookings</span>
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
