// Import deps
import React, { useState } from 'react'
import axios from 'axios'
import './../styles/login.css'

// Create Login component
export const Login = () => {
  // Prepare states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState('')
  const mainUrl = process.env.REACT_APP_API_URL;

  // Reset form
  const handleInputsReset = () => {
    setUsername('')
    setPassword('')
    setError('')
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate inputs
    if (username.length === 0 || password.length === 0) {
      setError('Please fill in all fields')
      return
    }

    try {
      const endpoint = isRegistering ? '/user/register' : '/user/login'
      const response = await axios.post(mainUrl + endpoint, {
        username,
        password
      })

      if(response.status == 401)
        setIsRegistering(true);
      handleInputsReset()
      
      // Here you can handle successful login/register
      // For example, store token in localStorage and redirect
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', username)
        window.location.href = '/links';
        // Add navigation logic here
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setIsRegistering(true)
      setError(error.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <div className="login-wrapper">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-row">
          <label className="form-label" htmlFor="username">Username:</label>
          <input
            className="form-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="password">Password:</label>
          <input
            className="form-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button type="submit" className="btn btn-submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <button
          type="button"
          className="btn btn-switch"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          Switch to {isRegistering ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}
