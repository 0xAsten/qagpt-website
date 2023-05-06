import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { TABS } from '../constants'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

interface SidebarProps {
  onValueChange: (value: { name: string; url: string; isOpen: boolean }) => void
  sidebarValue: string
}

const Sidebar: React.FC<SidebarProps> = ({ onValueChange, sidebarValue }) => {
  const tabs = TABS
  const [activeTab, setActiveTab] = useState(tabs[0].name)

  const { user } = useContext(AuthContext)

  const handleTabClick = (value: {
    name: string
    url: string
    isOpen: boolean
  }) => {
    setActiveTab(value.name)
    onValueChange(value)
  }

  const [maxRequests, setMaxRequests] = useState(null)

  useEffect(() => {
    if (!sidebarValue) {
      setActiveTab(sidebarValue)
    }

    if (user) {
      const fetchData = async () => {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setMaxRequests(docSnap.data().max_requests)
        }
      }

      fetchData()
    }
  }, [sidebarValue, user])

  return (
    <div className='sidebar'>
      {maxRequests && maxRequests > 10 && (
        <div className='text-base text-yellow-400 mb-4 font-bold'>
          ⭐ {maxRequests} requests/day
        </div>
      )}
      <ul className='tab-list'>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`tab-item p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
              tab.name === activeTab ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
