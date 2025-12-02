"use client"

import { useEffect, useState } from "react"
import { auth, db } from "@/app/firebase/config"
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

type UseAuthResult = {
  user: User | null
  role: string | null
  loading: boolean
  signOut: () => Promise<void>
}

export default function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setLoading(true)
      if (!u) {
        setUser(null)
        setRole(null)
        setLoading(false)
        return
      }

      setUser(u)

      try {
        const docRef = doc(db, "users", u.uid)
        const snapshot = await getDoc(docRef)
        if (snapshot.exists()) {
          const data = snapshot.data() as any
          setRole(typeof data.role === "string" ? data.role : null)
        } else {
          setRole(null)
        }
      } catch (e) {
        console.error("failed to fetch user role:", e)
        setRole(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = async () => firebaseSignOut(auth)

  return { user, role, loading, signOut }
}
