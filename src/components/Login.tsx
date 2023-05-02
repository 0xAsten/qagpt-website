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
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Your logo'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        {user ? (
          <p className='mt-2 text-center text-sm text-gray-600'>
            You are logged in as {user.email}
          </p>
        ) : (
          <button
            onClick={loginWithGithub}
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            Log in with GitHub
          </button>
        )}
      </div>
    </div>
  )
}

export default Login
