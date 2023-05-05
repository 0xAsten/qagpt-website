import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface HeadProps {
  sidebarValue: { name: string; url: string }
}

const Head = (props: HeadProps) => {
  const { user, logout } = useContext(AuthContext)
  const { sidebarValue } = props
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <div className='bg-blue-500 flex justify-between items-center p-4'>
      <h1 className='text-white text-xl'>
        Question Answering over{' '}
        <span className='text-yellow-400'>
          <Link
            to={sidebarValue.url}
            className='underline font-bold hover:text-yellow-600 transition-colors duration-200'
          >
            {sidebarValue.name}
          </Link>
        </span>{' '}
        Docs
      </h1>
      {user && (
        <div className='flex items-center'>
          <span className='text-white mr-4'>Logged in as: {user.email}</span>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Head
