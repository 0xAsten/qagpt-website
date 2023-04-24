import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Head = () => {
  const { user, logout } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <div className='bg-blue-500 flex justify-between items-center p-4'>
      <h1 className='text-white text-xl'>Question Answering over Docs</h1>
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