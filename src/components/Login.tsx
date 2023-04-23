import React, { useEffect, useContext } from 'react'
import { auth, githubProvider } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signInWithRedirect } from 'firebase/auth'
import { AuthContext } from '../contexts/AuthContext'

const Login: React.FC = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      handleLoginSuccess()
    }
  })

  const loginWithGithub = () => {
    signInWithRedirect(auth, githubProvider)
  }

  const handleLoginSuccess = () => {
    navigate('/')
  }

  return (
    <div>
      {user ? (
        <p>You are logged in as {user.email}</p>
      ) : (
        <button onClick={loginWithGithub}>Log in with GitHub</button>
      )}
    </div>
  )
}

export default Login
