import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

interface Message {
  type: 'question' | 'answer'
  text: string
}

interface ChatProps {
  sidebarValue: { name: string; isOpen: boolean }
}

const Chat: React.FC<ChatProps> = (props) => {
  const { user, accessToken } = useContext(AuthContext)
  const [error, setError] = useState<string | null>(null)

  const { sidebarValue } = props
  const navigate = useNavigate()

  const dismissError = () => {
    setError(null)
  }

  useEffect(() => {
    if (!user) {
      console.log('navigate to login')
      navigate('/login')
    }
  }, [user, navigate])

  const [messages, setMessages] = useState<Message[]>([])

  // console.log('accessToken:' + accessToken)

  const callFirebaseFunction = async (
    functionUrl: string,
    question: string,
    collection_name: string
  ) => {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ question, collection_name }),
    })

    if (response.status !== 200) {
      throw new Error(response.statusText)
    }

    return response.body!
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dismissError()

    const input = event.currentTarget.querySelector('input') as HTMLInputElement
    const question = input.value.trim()

    if (!question) {
      return
    }

    const answerIndex = messages.length

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'question', text: question },
    ])

    input.value = ''

    let result
    try {
      // Call the Firebase Cloud Function and get the ReadableStream reader
      const functionUrl = 'https://api.thathub.xyz/qa'
      result = await callFirebaseFunction(
        functionUrl,
        question,
        sidebarValue.name
      )
    } catch (error: any) {
      setError(`Error calling Firebase Function: ${error.message}`)
      return
    }

    const reader = result.getReader()

    // Read and process the stream data
    let answer = ''

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

    // Save chat history to localStorage
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages]
      localStorage.setItem(
        'chatHistory_'.concat(sidebarValue.name),
        JSON.stringify(updatedMessages)
      )
      return updatedMessages
    })
  }

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem(
      'chatHistory_'.concat(sidebarValue.name)
    )
    // console.log('component mounted' + storedMessages)
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    } else {
      setMessages([])
    }
  }, [sidebarValue])

  // Save chat history to localStorage whenever messages change
  // useEffect(() => {
  //   console.log('messages changed' + messages)

  //   localStorage.setItem('chatHistory', JSON.stringify(messages))
  // }, [messages])

  const clearChatHistory = () => {
    setMessages([]) // Clear chat history from state
    localStorage.removeItem('chatHistory_'.concat(sidebarValue.name)) // Clear chat history from localStorage
  }

  return (
    <div className='flex flex-col h-full'>
      {error && (
        <div className='bg-red-500 text-white p-2 mb-2 rounded'>
          <span>{error}</span>
          <button
            className='bg-red-700 text-white p-1 ml-2 rounded'
            onClick={dismissError}
          >
            X
          </button>
        </div>
      )}
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
      {sidebarValue.isOpen ? (
        <>
          <form onSubmit={handleSubmit} className='flex p-4'>
            <input
              type='text'
              className='flex-grow p-2 border border-gray-300 rounded'
              placeholder='Type your question...'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white p-2 ml-2 mr-2 rounded'
            >
              Send
            </button>
            <button
              onClick={clearChatHistory}
              className='bg-red-500 text-white p-2 rounded'
            >
              Clear History
            </button>
          </form>
        </>
      ) : (
        <div className='p-4 text-center text-red-500 font-bold'>
          {sidebarValue.name} question answering over docs is not open. Please
          stay tuned!
        </div>
      )}
    </div>
  )
}

export default Chat
