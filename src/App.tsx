import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Chat from './components/Chat'
import Head from './components/Head'
import { AuthProvider } from './contexts/AuthContext'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { TABS } from './constants'
import backgroundImage from './images/background.jpg'

function App() {
  const [sidebarValue, setSidebarValue] = useState(TABS[0])

  const handleSidebarValueChange = (value: {
    name: string
    url: string
    isOpen: boolean
  }) => {
    setSidebarValue(value)
  }

  return (
    <AuthProvider>
      <Router>
        <div
          className='flex min-h-screen bg-cover'
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className='flex-none w-64 p-6 bg-gray-800 text-white'>
            <Sidebar
              onValueChange={handleSidebarValueChange}
              sidebarValue={sidebarValue.name}
            />
          </div>
          <div className='flex-grow flex flex-col'>
            <Head sidebarValue={sidebarValue} />
            <div className='flex-grow p-6'>
              <Routes>
                <Route
                  path='/'
                  element={<Chat sidebarValue={sidebarValue} />}
                />
                <Route path='/login' element={<Login />} />
                {/* Add other routes as needed */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
