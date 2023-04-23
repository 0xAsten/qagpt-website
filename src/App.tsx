import React, { useState } from 'react'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Call your Firebase Cloud Function to get the answer
    // Replace 'your_cloud_function_url' with your actual Cloud Function URL
    // const response = await fetch('your_cloud_function_url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ question }),
    // })

    // const data = await response.json()

    // setAnswer(data.answer)
    setAnswer(
      "Introduction\n\nWhat is Cairo?\n\nCairo is a programming language designed for a virtual CPU of the same name. The unique aspect of this processor is that it was not created for the physical constraints of our world but for cryptographic ones, making it capable of efficiently proving the execution of any program running on it. This means that you can perform time consuming operations on a machine you don't trust, and check the result very quickly on a cheaper machine.\nWhile Cairo 0 used to be directly compiled to CASM, the Cairo CPU assembly, Cairo 1 is a more high level language. It first compiles to Sierra, an intermediate representation of Cairo which will compile later down to a safe subset of CASM. The point of Sierra is to ensure your CASM will always be provable, even when the computation fails.\n\nWhat can you do with it?"
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-2xl font-bold mb-4'>
            Question Answering over Docs
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='question' className='block mb-2'>
              Your question:
            </label>
            <input
              type='text'
              id='question'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className='w-full p-2 mb-6 text-indigo-700 border-b-2
              border-indigo-500 outline-none focus:bg-gray-100'
            />
            <button
              type='submit'
              className='w-full px-3 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none'
            >
              Get Answer
            </button>
          </form>
          {answer && (
            <div className='mt-6'>
              <h2 className='text-xl font-bold mb-2'>Answer:</h2>
              <p className='text-indigo-700'>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
