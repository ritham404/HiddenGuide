import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Star, Shield } from "lucide-react"
import Link from "next/link"


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">HiddenGuide</span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Discover Hidden Gems with Local Guides</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with passionate local guides who know the secret spots, authentic experiences, and stories that make
          every destination unforgettable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/auth/signup?role=traveler">
            <Button size="lg" className="w-full sm:w-auto">
              I'm a Traveler
            </Button>
          </Link>
          <Link href="/auth/signup?role=guide">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              I'm a Guide
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Local Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Connect with passionate locals who know their city's best-kept secrets</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Star className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Authentic Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Skip the tourist traps and discover genuine local culture and hidden gems
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Safe & Trusted</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Verified guides, secure payments, and community reviews for peace of mind
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 HiddenGuide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
