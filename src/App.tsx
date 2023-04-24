import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Chat from './components/Chat'
import Head from './components/Head'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='flex min-h-screen'>
          <div className='flex-none w-64 p-6 bg-gray-800 text-white'>
            {/* Sidebar content */}
          </div>
          <div className='flex-grow flex flex-col'>
            <Head />
            <div className='flex-grow p-6'>
              <Routes>
                <Route path='/' element={<Chat />} />
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
