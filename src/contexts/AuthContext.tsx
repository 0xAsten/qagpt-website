import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { User } from 'firebase/auth'

interface AuthContextProps {
  user: User | null
  accessToken: string | null
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  accessToken: null,
})

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
      if (user) {
        user.getIdToken().then((token) => setAccessToken(token))
      } else {
        setAccessToken(null)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, accessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
