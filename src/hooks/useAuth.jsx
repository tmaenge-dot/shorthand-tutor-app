import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // fetch additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          setCurrentUser({ uid: user.uid, email: user.email, ...(userDoc.exists() ? userDoc.data() : {}) })
        } catch (err) {
          console.error('Error fetching user doc', err)
          setCurrentUser({ uid: user.uid, email: user.email })
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = async ({ email, password, displayName }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(res.user, { displayName })
    }
    // create user doc
    await setDoc(doc(db, 'users', res.user.uid), {
      email,
      displayName: displayName || null,
      createdAt: new Date().toISOString(),
      plan: 'free'
    })
    return res.user
  }

  const login = async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user
  }

  const logout = async () => {
    await signOut(auth)
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
