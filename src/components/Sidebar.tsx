import React, { useEffect, useState } from 'react'
import { TABS } from '../constants'

interface SidebarProps {
  onValueChange: (value: { name: string; url: string }) => void
  sidebarValue: string
}

const Sidebar: React.FC<SidebarProps> = ({ onValueChange, sidebarValue }) => {
  const tabs = TABS
  const [activeTab, setActiveTab] = useState(tabs[0].name)

  const handleTabClick = (value: { name: string; url: string }) => {
    setActiveTab(value.name)
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
