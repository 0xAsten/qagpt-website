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

  const callFirebaseFunction = async (
    functionUrl: string,
    question: string,
    collection_name: string
  ) => {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, collection_name }),
    })

    return response.body
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const input = event.currentTarget.querySelector('input') as HTMLInputElement
    const question = input.value.trim()

    if (!question) {
      return
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'question', text: question },
    ])

    input.value = ''

    // Call the Firebase Cloud Function and get the ReadableStream reader
    const functionUrl = 'http://127.0.0.1:8080/qa'
    const body = await callFirebaseFunction(functionUrl, question, 'Cairo1')
    const reader = body!.getReader()

    // Read and process the stream data
    let answer = ''
    const answerIndex = messages.length
    // console.log('answerIndex' + answerIndex)

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'answer', text: answer },
    ])

    const decoder = new TextDecoder('utf-8')

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      const chunk = decoder.decode(value)
      answer += chunk

      // eslint-disable-next-line no-loop-func
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages]
        updatedMessages[answerIndex + 1] = { type: 'answer', text: answer }
        return updatedMessages
      })
    }
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
