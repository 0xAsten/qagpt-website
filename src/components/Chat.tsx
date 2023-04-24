import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

interface Message {
  type: 'question' | 'answer'
  text: string
}

const Chat: React.FC = () => {
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      console.log('navigate to login')
      navigate('/login')
    }
  }, [user, navigate])

  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const input = event.currentTarget.querySelector('input') as HTMLInputElement
    const question = input.value.trim()

    if (!question) {
      return
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'question', text: question },
      // Replace this line with the answer from your Firebase Cloud Function
      { type: 'answer', text: 'This is a sample answer.' },
    ])

    input.value = ''
  }

  return (
    <div className='flex flex-col h-full'>
      <div
        className='overflow-y-auto flex-grow mb-4 p-4 space-y-4'
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded ${
              message.type === 'question'
                ? 'bg-blue-500 text-white self-start'
                : 'bg-gray-300 self-end'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='flex p-4'>
        <input
          type='text'
          className='flex-grow p-2 border border-gray-300 rounded'
          placeholder='Type your question...'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 ml-2 rounded'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
