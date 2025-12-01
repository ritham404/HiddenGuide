"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin } from "lucide-react"
import Link from "next/link"

// Firebase imports
import { auth, db } from "@/app/firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export default function SignupPage() {
  const router = useRouter()

  const [role, setRole] = useState("traveler") // default role
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      // 1️⃣ Create Firebase user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      const user = userCred.user

      // 2️⃣ Store role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        role: role,
        createdAt: new Date(),
      })

      // 3️⃣ Redirect based on role
      if (role === "guide") {
        router.push("/guide/dashboard")
      } else {
        router.push("/traveler/dashboard")
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold">HiddenGuide</span>
          </div>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Select your role and sign up</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <Label>I am a:</Label>
              <RadioGroup value={role} onValueChange={setRole} className="mt-2">

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="traveler" id="traveler" />
                  <Label htmlFor="traveler">Traveler</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="guide" id="guide" />
                  <Label htmlFor="guide">Guide</Label>
                </div>

              </RadioGroup>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-indigo-600 hover:underline">
                Login here
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
