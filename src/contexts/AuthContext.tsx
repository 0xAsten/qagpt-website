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

  const logout = async () => await auth.signOut()

  return (
    <AuthContext.Provider value={{ user, accessToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
