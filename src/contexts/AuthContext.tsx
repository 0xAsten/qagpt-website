import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { User } from 'firebase/auth'

interface AuthContextProps {
  user: User | null
  accessToken: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  accessToken: null,
  logout: () => {},
})

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const refreshToken = async () => {
    const token = await user!.getIdToken(true)
    // Do anything you need with the new token, such as updating it in your state or local storage
    setAccessToken(token)
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
      if (user) {
        user.getIdToken().then((token) => setAccessToken(token))
      } else {
        setAccessToken(null)
      }
    })

    let timeoutId: string | number | NodeJS.Timeout | undefined

    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      user &&
        user.getIdTokenResult().then((result) => {
          if (result.expirationTime) {
            const expiresIn =
              new Date(result.expirationTime).getTime() - new Date().getTime()
            timeoutId = setTimeout(refreshToken, expiresIn)
          }
        })
    })

    return () => {
      unsubscribe()
      clearTimeout(timeoutId)
    }
  }, [])

  const logout = async () => await auth.signOut()

  return (
    <AuthContext.Provider value={{ user, accessToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
