import { useState } from 'react'
import './App.css'

function App() {
  const [userInput, setUserInput] = useState('')
  const [responseMessage, setResponseMessage] = useState('Response will appear here after submit.')

  function onInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(event.target.value)
  }

  async function onSubmissionHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const value = userInput.trim()
    if (!value) return

    localStorage.setItem('product', value)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: value }),
      })

      if (!response.ok) {
        setResponseMessage('Request failed. Please try again.')
        return
      }

      const data = await response.json()
      setResponseMessage(data.message ?? 'Request sent successfully.')
      setUserInput('')
    } catch {
      setResponseMessage('Could not reach the server.')
    }
  }

  return (
    <>
    <div id="Welcome-statement" style={{textAlign:"center"}}>
      <h2>Hi, what products are you selling?</h2>
      <form onSubmit={onSubmissionHandler}>
        <input
          type="text"
          placeholder="Type here..."
          value={userInput}
          onChange={onInputChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>      

    </div>

    <div id="input-container">
      <h3>Response</h3>
      <div id="response-box">{responseMessage}</div>
    </div>

    </>
  )
}

export default App
