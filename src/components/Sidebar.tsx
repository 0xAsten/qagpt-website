import React, { useEffect, useState } from 'react'
import { TABS } from '../constants'

interface SidebarProps {
  onValueChange: (value: string) => void
  sidebarValue: string
}

const Sidebar: React.FC<SidebarProps> = ({ onValueChange, sidebarValue }) => {
  const tabs = TABS
  const [activeTab, setActiveTab] = useState(tabs[0])

  const handleTabClick = (value: string) => {
    setActiveTab(value)
    onValueChange(value)
  }

  useEffect(() => {
    if (!sidebarValue) {
      setActiveTab(sidebarValue)
    }
  }, [sidebarValue])

  return (
    <div className='sidebar'>
      <ul className='tab-list'>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`tab-item p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
              tab === activeTab ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
